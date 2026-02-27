import React, { useState, useEffect } from "react";
import {
  addItemToCategory,
  updateProjectItem,
} from "../services/projectService";
import { uploadImage } from "../services/storageService";
import ImageDisplay from "./ImageDisplay";

const ItemForm = ({ categoryId, item, onClose, isEdit }) => {
  // images[0] = 封面（僅首頁圖卡）, images[1..] = 內頁圖片
  const [formData, setFormData] = useState({
    title: "",
    info: "",
    description: "",
    externalLink: "",
    URL: {
      figma: "",
      github: "",
      web: "",
    },
    images: [""],
    proto: [],
  });

  const [imageFiles, setImageFiles] = useState({
    cover: null,
    inner: [],
  });

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  // 編輯模式時載入現有資料（images[0]=封面, images[1..]=內頁）
  useEffect(() => {
    if (isEdit && item) {
      const raw = item.images || [];
      const images =
        raw.length > 0 ? raw : [""];
      setFormData({
        title: item.title || "",
        info: item.info || "",
        description: item.description || "",
        externalLink: item.externalLink || "",
        URL: {
          figma: item.URL?.figma || "",
          github: item.URL?.github || "",
          web: item.URL?.web || "",
        },
        images,
        proto: item.proto || [],
      });
      setImageFiles({ cover: null, inner: [] });
    }
  }, [isEdit, item]);

  // 處理表單輸入變化
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("URL.")) {
      const urlField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        URL: {
          ...prev.URL,
          [urlField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // 封面：單一檔案，僅影響首頁圖卡
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFiles((prev) => ({ ...prev, cover: file }));
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormData((prev) => ({
        ...prev,
        images: [ev.target.result, ...prev.images.slice(1)],
      }));
    };
    reader.readAsDataURL(file);
  };

  // 內頁：連續新增多張圖片（保留選擇順序）
  const handleInnerImagesChange = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;
    setImageFiles((prev) => ({ ...prev, inner: [...prev.inner, ...files] }));
    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (ev) => resolve(ev.target.result);
            reader.readAsDataURL(file);
          })
      )
    ).then((blobUrls) => {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images.slice(0, 1), ...prev.images.slice(1), ...blobUrls],
      }));
    });
    e.target.value = "";
  };

  // 移除內頁某一張（innerIndex 為內頁中的順序，0-based）
  const handleRemoveInnerImage = (innerIndex) => {
    const imageIndex = 1 + innerIndex;
    const removed = formData.images[imageIndex];
    const isNewImage = (u) => u && (String(u).startsWith("data:") || String(u).startsWith("blob:"));
    const wasNew = isNewImage(removed);
    const blobIndexInInner = formData.images
      .slice(1, imageIndex)
      .filter(isNewImage).length;

    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== imageIndex),
    }));
    if (wasNew) {
      setImageFiles((f) => ({
        ...f,
        inner: f.inner.filter((_, i) => i !== blobIndexInInner),
      }));
    }
  };

  // 處理 Figma 原型嵌入碼
  const handleProtoChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      proto: value ? [value] : [],
    }));
  };

  // 提交表單
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      window.alert("請輸入項目標題");
      return;
    }

    setLoading(true);
    setUploadProgress("準備中...");

    try {
      let finalFormData = { ...formData };

      // 上傳圖片：封面 + 內頁（新選的檔案才上傳）
      const folder = `category-${categoryId}`;
      let coverUrl = formData.images[0] || "";
      const innerUrls = [];

      if (imageFiles.cover) {
        setUploadProgress("上傳封面中...");
        const res = await uploadImage(imageFiles.cover, folder);
        coverUrl = res.url;
      }

      const innerPart = formData.images.slice(1) || [];
      let innerFileIdx = 0;
      for (const url of innerPart) {
        const isNew = url && typeof url === "string" && (url.startsWith("data:") || url.startsWith("blob:"));
        if (isNew && imageFiles.inner[innerFileIdx]) {
          setUploadProgress(`上傳內頁圖片 ${innerFileIdx + 1}/${imageFiles.inner.length}...`);
          const res = await uploadImage(imageFiles.inner[innerFileIdx], folder);
          innerUrls.push(res.url);
          innerFileIdx += 1;
        } else if (url && typeof url === "string" && (url.startsWith("http://") || url.startsWith("https://"))) {
          innerUrls.push(url);
        }
      }

      const isStoredUrl = (s) => typeof s === "string" && (s.startsWith("http://") || s.startsWith("https://"));
      const coverForStore = isStoredUrl(coverUrl) ? coverUrl : "";
      finalFormData.images =
        coverForStore || innerUrls.length > 0
          ? [coverForStore, ...innerUrls]
          : [""];

      // 清理 URL 資料 (移除空字串)
      const cleanedURL = Object.fromEntries(
        Object.entries(finalFormData.URL).map(([key, value]) => [
          key,
          value || null,
        ])
      );
      finalFormData.URL = cleanedURL;

      // 外連結：有值才寫入，空字串不存
      if (!finalFormData.externalLink?.trim()) {
        delete finalFormData.externalLink;
      } else {
        finalFormData.externalLink = finalFormData.externalLink.trim();
      }

      if (isEdit) {
        setUploadProgress("更新項目中...");
        await updateProjectItem(categoryId, item.id, finalFormData);
        window.alert("項目已成功更新！");
      } else {
        setUploadProgress("新增項目中...");
        await addItemToCategory(categoryId, finalFormData);
        window.alert("項目已成功新增！");
      }

      onClose(); // 關閉表單並重新載入資料
    } catch (error) {
      console.error("提交失敗:", error);
      window.alert(`操作失敗: ${error.message}`);
    } finally {
      setLoading(false);
      setUploadProgress("");
    }
  };

  return (
    <div className="item-form">
      <div className="form-header">
        <h3>{isEdit ? "編輯項目" : "新增項目"}</h3>
        <button className="close-btn" onClick={onClose} disabled={loading}>
          ×
        </button>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <p>{uploadProgress}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-group">
          <label htmlFor="title">標題 *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="info">副標題</label>
          <input
            type="text"
            id="info"
            name="info"
            value={formData.info}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="簡短副標題"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">說明描述</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            disabled={loading}
            rows={4}
            placeholder="內頁標題區的說明文字，字級較小"
          />
        </div>

        <div className="form-section">
          <h4>外連結（選填）</h4>
          <p className="form-hint">
            若有填寫，首頁圖卡點擊時會在新分頁開啟此連結，不會進入內頁。
          </p>
          <div className="form-group">
            <label htmlFor="externalLink">點擊圖卡開啟的網址</label>
            <input
              type="url"
              id="externalLink"
              name="externalLink"
              value={formData.externalLink}
              onChange={handleInputChange}
              disabled={loading}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="form-section">
          <h4>連結</h4>

          <div className="form-group">
            <label htmlFor="figma">Figma 連結</label>
            <input
              type="url"
              id="figma"
              name="URL.figma"
              value={formData.URL.figma}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="github">GitHub 連結</label>
            <input
              type="url"
              id="github"
              name="URL.github"
              value={formData.URL.github}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="web">網站連結</label>
            <input
              type="url"
              id="web"
              name="URL.web"
              value={formData.URL.web}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-section">
          <h4>封面</h4>
          <p className="form-hint">僅顯示於首頁圖卡，一張為限。</p>
          <div className="image-upload image-upload-cover">
            <label className="image-upload-label">封面圖</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              disabled={loading}
            />
            {formData.images[0] && (
              <div className="image-preview">
                <ImageDisplay src={formData.images[0]} alt="封面預覽" />
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h4>內頁圖片</h4>
          <p className="form-hint">可連續新增多張，用於內頁展示。</p>
          <div className="image-upload-group image-upload-inner">
            {(formData.images.slice(1) || []).map(
              (url, i) =>
                url ? (
                  <div key={i} className="image-upload-inner-item">
                    <div className="image-preview">
                      <ImageDisplay src={url} alt={`內頁 ${i + 1}`} />
                    </div>
                    <button
                      type="button"
                      className="btn-remove-inner-image"
                      onClick={() => handleRemoveInnerImage(i)}
                      disabled={loading}
                      title="移除"
                    >
                      ×
                    </button>
                  </div>
                ) : null
            )}
            <label className="image-upload-add-inner">
              <span>+ 新增圖片</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleInnerImagesChange}
                disabled={loading}
              />
            </label>
          </div>
        </div>

        <div className="form-section">
          <h4>Figma 原型嵌入碼</h4>
          <div className="form-group">
            <label htmlFor="proto">嵌入碼 (iframe)</label>
            <textarea
              id="proto"
              name="proto"
              value={formData.proto[0] || ""}
              onChange={handleProtoChange}
              disabled={loading}
              rows="4"
              placeholder="貼上 Figma 原型的 iframe 嵌入碼"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="btn btn-secondary"
          >
            取消
          </button>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "處理中..." : isEdit ? "更新" : "新增"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
