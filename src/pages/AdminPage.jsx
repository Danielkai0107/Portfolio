import React, { useState, useEffect } from "react";
import { getAllProjects, deleteProjectItem } from "../services/projectService";
import { onAuthChange, logout } from "../services/authService";
import ItemForm from "../components/ItemForm";
import LoginForm from "../components/LoginForm";
import ImageDisplay from "../components/ImageDisplay";
import { validateAllProjectImages } from "../utils/imageUtils";
import {
  analyzeImageUsage,
  getImageDisplayLocations,
  getOptimizationSuggestions,
} from "../utils/imageAnalysis";

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 載入所有專案資料
  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error("載入專案失敗:", error);
      window.alert("載入專案資料失敗");
    } finally {
      setLoading(false);
    }
  };

  // 監聽認證狀態
  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setAuthLoading(false);

      if (user) {
        loadProjects(); // 只有登入時才載入專案
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

  // 刪除項目
  const handleDeleteItem = async (categoryId, itemId, itemTitle) => {
    if (!window.confirm(`確定要刪除項目「${itemTitle}」嗎？`)) {
      return;
    }

    try {
      await deleteProjectItem(categoryId, itemId);
      window.alert("項目已成功刪除");
      loadProjects(); // 重新載入資料
    } catch (error) {
      console.error("刪除項目失敗:", error);
      window.alert("刪除項目失敗");
    }
  };

  // 開始編輯項目
  const handleEditItem = (categoryId, item) => {
    setEditingItem({ categoryId, item });
  };

  // 開始新增項目
  const handleAddItem = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowAddForm(true);
  };

  // 關閉表單
  const handleCloseForm = () => {
    setEditingItem(null);
    setShowAddForm(false);
    setSelectedCategory(null);
    loadProjects(); // 重新載入資料
  };

  // 登出
  const handleLogout = async () => {
    try {
      await logout();
      setProjects([]);
    } catch (error) {
      console.error("登出失敗:", error);
    }
  };

  // 登入成功處理
  const handleLoginSuccess = (user) => {
    setUser(user);
    loadProjects();
  };

  // 檢測所有圖片
  const handleValidateImages = async () => {
    if (projects.length === 0) {
      window.alert("請先載入專案資料");
      return;
    }

    const result = window.confirm(
      "這將檢測所有專案的圖片載入狀況，可能需要一些時間。要繼續嗎？"
    );
    if (!result) return;

    try {
      await validateAllProjectImages(projects);
      window.alert("圖片檢測完成！請查看瀏覽器控制台（F12）查看詳細結果。");
    } catch (error) {
      console.error("圖片檢測失敗:", error);
      window.alert("檢測過程中發生錯誤，請查看控制台。");
    }
  };

  // 分析圖片使用情況
  const handleAnalyzeImages = () => {
    if (projects.length === 0) {
      window.alert("請先載入專案資料");
      return;
    }

    try {
      getImageDisplayLocations(); // 顯示使用位置
      const analysis = analyzeImageUsage(projects); // 進行分析
      getOptimizationSuggestions(analysis); // 提供建議

      window.alert(
        `圖片使用分析完成！\n\n` +
          `總項目數: ${analysis.total}\n` +
          `圖片二獨特: ${analysis.uniqueImage2} (${(
            (analysis.uniqueImage2 / analysis.total) *
            100
          ).toFixed(1)}%)\n` +
          `圖片二重複: ${analysis.duplicateImage2} (${(
            (analysis.duplicateImage2 / analysis.total) *
            100
          ).toFixed(1)}%)\n\n` +
          `詳細結果請查看瀏覽器控制台（F12）`
      );
    } catch (error) {
      console.error("圖片分析失敗:", error);
      window.alert("分析過程中發生錯誤，請查看控制台。");
    }
  };

  // 認證載入中
  if (authLoading) {
    return (
      <div className="login-container">
        <div className="loading">檢查登入狀態...</div>
      </div>
    );
  }

  // 未登入顯示登入表單
  if (!user) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  // 資料載入中
  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">載入中...</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="header-content">
          <div className="header-text">
            <h1>專案管理系統</h1>
            <p>管理您的作品集項目</p>
          </div>
          <div className="header-actions">
            <button
              className="btn btn-secondary"
              onClick={handleAnalyzeImages}
              disabled={loading || projects.length === 0}
              title="分析圖片使用情況和重複狀態"
            >
              分析圖片
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleValidateImages}
              disabled={loading || projects.length === 0}
              title="檢測所有圖片的載入狀況"
            >
              檢測載入
            </button>
            <span className="user-email">{user?.email}</span>
            <button className="btn logout-btn" onClick={handleLogout}>
              登出
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        {projects.map((project) => (
          <section key={project.id} className="admin-category">
            <div className="category-header">
              <h2>{project.category}</h2>
              <button
                className="btn btn-primary"
                onClick={() => handleAddItem(project.id)}
              >
                + 新增項目
              </button>
            </div>

            <div className="items-grid">
              {project.items?.map((item) => (
                <div key={item.id} className="admin-item">
                  <div className="item-image">
                    <ImageDisplay
                      src={item.images?.[0]}
                      alt={item.title}
                      fallback="/images/placeholder.png"
                    />
                  </div>

                  <div className="item-info">
                    <h3>{item.title}</h3>
                    <p>{item.info}</p>
                    <div className="item-links">
                      {item.URL?.figma && (
                        <span className="link-badge">Figma</span>
                      )}
                      {item.URL?.github && (
                        <span className="link-badge">GitHub</span>
                      )}
                      {item.URL?.web && <span className="link-badge">Web</span>}
                    </div>
                  </div>

                  <div className="item-actions">
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEditItem(project.id, item)}
                    >
                      編輯
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() =>
                        handleDeleteItem(project.id, item.id, item.title)
                      }
                    >
                      刪除
                    </button>
                  </div>
                </div>
              ))}

              {(!project.items || project.items.length === 0) && (
                <div className="empty-state">
                  <p>此分類尚無項目</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddItem(project.id)}
                  >
                    新增第一個項目
                  </button>
                </div>
              )}
            </div>
          </section>
        ))}
      </main>

      {/* 編輯表單 Modal */}
      {editingItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ItemForm
              categoryId={editingItem.categoryId}
              item={editingItem.item}
              onClose={handleCloseForm}
              isEdit={true}
            />
          </div>
        </div>
      )}

      {/* 新增表單 Modal */}
      {showAddForm && selectedCategory && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ItemForm
              categoryId={selectedCategory}
              item={null}
              onClose={handleCloseForm}
              isEdit={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
