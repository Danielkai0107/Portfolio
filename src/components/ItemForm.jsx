import React, { useState, useEffect } from "react";
import {
  addItemToCategory,
  updateProjectItem,
} from "../services/projectService";
import { uploadProjectImages } from "../services/storageService";
import ImageDisplay from "./ImageDisplay";

const ItemForm = ({ categoryId, item, onClose, isEdit }) => {
  const [formData, setFormData] = useState({
    title: "",
    info: "",
    URL: {
      figma: "",
      github: "",
      web: "",
    },
    images: ["", "", ""],
    proto: [],
  });

  const [imageFiles, setImageFiles] = useState({
    main: null,
    image1: null,
    image2: null,
  });

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  // 編輯模式時載入現有資料
  useEffect(() => {
    if (isEdit && item) {
      setFormData({
        title: item.title || "",
        info: item.info || "",
        URL: {
          figma: item.URL?.figma || "",
          github: item.URL?.github || "",
          web: item.URL?.web || "",
        },
        images: item.images || ["", "", ""],
        proto: item.proto || [],
      });
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

  // 處理圖片檔案選擇
  const handleImageChange = (e, imageType) => {
    const file = e.target.files[0];
    if (file) {
      setImageFiles((prev) => ({
        ...prev,
        [imageType]: file,
      }));

      // 預覽圖片
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageIndex =
          imageType === "main" ? 0 : imageType === "image1" ? 1 : 2;
        setFormData((prev) => ({
          ...prev,
          images: prev.images.map((img, idx) =>
            idx === imageIndex ? e.target.result : img
          ),
        }));
      };
      reader.readAsDataURL(file);
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

      // 上傳新圖片到 Firebase Storage
      if (imageFiles.main || imageFiles.image1 || imageFiles.image2) {
        setUploadProgress("上傳圖片中...");

        const uploadResults = await uploadProjectImages(
          imageFiles.main,
          imageFiles.image1,
          imageFiles.image2,
          `category-${categoryId}`
        );

        // 更新圖片網址
        const newImages = [...formData.images];
        if (uploadResults.main) {
          newImages[0] = uploadResults.main.url;
        }
        if (uploadResults.image1) {
          newImages[1] = uploadResults.image1.url;
        }
        if (uploadResults.image2) {
          newImages[2] = uploadResults.image2.url;
        }

        finalFormData.images = newImages;
      }

      // 清理 URL 資料 (移除空字串)
      const cleanedURL = Object.fromEntries(
        Object.entries(finalFormData.URL).map(([key, value]) => [
          key,
          value || null,
        ])
      );
      finalFormData.URL = cleanedURL;

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
          <label htmlFor="info">說明</label>
          <input
            type="text"
            id="info"
            name="info"
            value={formData.info}
            onChange={handleInputChange}
            disabled={loading}
          />
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
          <h4>圖片</h4>

          <div className="image-upload-group">
            <div className="image-upload">
              <label>主要圖片</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "main")}
                disabled={loading}
              />
              {formData.images[0] && (
                <div className="image-preview">
                  <ImageDisplay src={formData.images[0]} alt="主要圖片預覽" />
                </div>
              )}
            </div>

            <div className="image-upload">
              <label>圖片 1</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "image1")}
                disabled={loading}
              />
              {formData.images[1] && (
                <div className="image-preview">
                  <ImageDisplay src={formData.images[1]} alt="圖片 1 預覽" />
                </div>
              )}
            </div>

            <div className="image-upload">
              <label>圖片 2</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "image2")}
                disabled={loading}
              />
              {formData.images[2] && (
                <div className="image-preview">
                  <ImageDisplay src={formData.images[2]} alt="圖片 2 預覽" />
                </div>
              )}
            </div>
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
