import React, { useState, useEffect } from "react";
import {
  getAllProjects,
  deleteProjectItem,
  addCategory,
  deleteCategory,
  updateCategoryName,
  updateCategoryDescription,
  updateCategoryInfo,
  toggleCategoryVisibility,
  initializeExistingCategoryDescriptions,
  initializeExistingCategoryVisibility,
  moveCategoryUp,
  moveCategoryDown,
  moveItemUp,
  moveItemDown,
  moveItemToFirst,
  moveItemToLast,
  moveItemToCategory,
} from "../services/projectService";
import { onAuthChange, logout } from "../services/authService";
import analyticsService from "../services/analyticsService";
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
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  // 合併編輯相關狀態
  const [editingCategoryInfo, setEditingCategoryInfo] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryDescription, setEditCategoryDescription] = useState("");

  // Analytics 統計數據狀態
  const [analyticsStats, setAnalyticsStats] = useState(null);

  // 拖曳相關狀態
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverCategory, setDragOverCategory] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // 載入 Analytics 統計數據
  const loadAnalyticsStats = () => {
    const stats = analyticsService.getLocalStats();
    setAnalyticsStats(stats);
  };

  // 重置 Analytics 統計數據
  const handleResetStats = () => {
    const confirm = window.confirm(
      "確定要重置所有統計數據嗎？此操作無法復原。"
    );
    if (confirm) {
      analyticsService.resetStats();
      loadAnalyticsStats();
      window.alert("統計數據已重置");
    }
  };

  // 載入所有專案資料
  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();
      setProjects(data);

      // 載入完專案資料後也載入統計數據
      loadAnalyticsStats();
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

  // 初始化分類描述
  const handleInitializeDescriptions = async () => {
    const result = window.confirm(
      "這將為沒有描述的現有分類自動新增預設描述。要繼續嗎？"
    );
    if (!result) return;

    try {
      const updatedCount = await initializeExistingCategoryDescriptions();
      if (updatedCount > 0) {
        window.alert(`已成功初始化 ${updatedCount} 個分類的描述！`);
        loadProjects(); // 重新載入資料
      } else {
        window.alert("所有分類都已有描述，無需初始化。");
      }
    } catch (error) {
      console.error("初始化描述失敗:", error);
      window.alert("初始化過程中發生錯誤，請查看控制台。");
    }
  };

  // 初始化分類可見性
  const handleInitializeVisibility = async () => {
    const result = window.confirm(
      "這將為沒有可見性設定的現有分類自動設定為可見。要繼續嗎？"
    );
    if (!result) return;

    try {
      const updatedCount = await initializeExistingCategoryVisibility();
      if (updatedCount > 0) {
        window.alert(`已成功初始化 ${updatedCount} 個分類的可見性！`);
        loadProjects(); // 重新載入資料
      } else {
        window.alert("所有分類都已有可見性設定，無需初始化。");
      }
    } catch (error) {
      console.error("初始化可見性失敗:", error);
      window.alert("初始化過程中發生錯誤，請查看控制台。");
    }
  };

  // 新增大類別
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      window.alert("請輸入類別名稱");
      return;
    }

    // 檢查是否重複
    const isDuplicate = projects.some(
      (project) =>
        project.category.toLowerCase() === newCategoryName.trim().toLowerCase()
    );

    if (isDuplicate) {
      window.alert("此類別名稱已存在");
      return;
    }

    try {
      await addCategory({
        category: newCategoryName.trim(),
        description: newCategoryDescription.trim() || "作品展示",
        items: [],
      });

      window.alert("大類別新增成功！");
      setNewCategoryName("");
      setNewCategoryDescription("");
      setShowAddCategoryForm(false);
      loadProjects(); // 重新載入資料
    } catch (error) {
      console.error("新增大類別失敗:", error);
      window.alert("新增大類別失敗");
    }
  };

  // 取消新增類別
  const handleCancelAddCategory = () => {
    setNewCategoryName("");
    setNewCategoryDescription("");
    setShowAddCategoryForm(false);
  };

  // 開始編輯分類名稱（保持舊函數名以兼容現有代碼）
  const handleEditCategory = (categoryId, currentName) => {
    setEditingCategoryInfo(categoryId);
    setEditCategoryName(currentName);
  };

  // 開始編輯分類描述（保持舊函數名以兼容現有代碼）
  const handleEditDescription = (categoryId, currentDescription) => {
    // 現在統一使用合併編輯功能
    const project = projects.find((p) => p.id === categoryId);
    if (project) {
      handleEditCategoryInfo(categoryId, project.category, currentDescription);
    }
  };

  // 開始編輯分類資訊（合併標題和描述）
  const handleEditCategoryInfo = (
    categoryId,
    currentName,
    currentDescription
  ) => {
    setEditingCategoryInfo(categoryId);
    setEditCategoryName(currentName);
    setEditCategoryDescription(currentDescription || "作品展示");
  };

  // 確認編輯分類資訊（合併更新）
  const handleUpdateCategoryInfo = async () => {
    if (!editCategoryName.trim()) {
      window.alert("請輸入類別名稱");
      return;
    }

    if (!editCategoryDescription.trim()) {
      window.alert("請輸入類別描述");
      return;
    }

    // 檢查是否重複
    const isDuplicate = projects.some(
      (project) =>
        project.id !== editingCategoryInfo &&
        project.category.toLowerCase() === editCategoryName.trim().toLowerCase()
    );

    if (isDuplicate) {
      window.alert("此類別名稱已存在");
      return;
    }

    try {
      await updateCategoryInfo(
        editingCategoryInfo,
        editCategoryName.trim(),
        editCategoryDescription.trim()
      );
      window.alert("類別資訊更新成功！");
      setEditingCategoryInfo(null);
      setEditCategoryName("");
      setEditCategoryDescription("");
      loadProjects(); // 重新載入資料
    } catch (error) {
      console.error("更新類別資訊失敗:", error);
      window.alert("更新類別資訊失敗");
    }
  };

  // 取消編輯分類資訊
  const handleCancelEditCategoryInfo = () => {
    setEditingCategoryInfo(null);
    setEditCategoryName("");
    setEditCategoryDescription("");
  };

  // 切換分類可見性
  const handleToggleVisibility = async (categoryId, categoryName) => {
    try {
      const newVisibility = await toggleCategoryVisibility(categoryId);
      const statusText = newVisibility ? "顯示" : "隱藏";
      window.alert(`「${categoryName}」已設為${statusText}`);
      loadProjects(); // 重新載入資料
    } catch (error) {
      console.error("切換可見性失敗:", error);
      window.alert("切換可見性失敗");
    }
  };

  // 刪除分類
  const handleDeleteCategory = async (categoryId, categoryName, itemCount) => {
    const confirmMessage =
      itemCount > 0
        ? `確定要刪除「${categoryName}」分類嗎？\n此分類包含 ${itemCount} 個項目，刪除後無法復原。`
        : `確定要刪除「${categoryName}」分類嗎？`;

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      await deleteCategory(categoryId);
      window.alert("分類已成功刪除");
      loadProjects(); // 重新載入資料
    } catch (error) {
      console.error("刪除分類失敗:", error);
      window.alert("刪除分類失敗");
    }
  };

  // 向上移動分類
  const handleMoveCategoryUp = async (categoryId, categoryName) => {
    try {
      await moveCategoryUp(categoryId);
      window.alert(`「${categoryName}」已向上移動`);
      loadProjects(); // 重新載入資料
    } catch (error) {
      console.error("向上移動分類失敗:", error);
      window.alert(error.message || "向上移動分類失敗");
    }
  };

  // 向下移動分類
  const handleMoveCategoryDown = async (categoryId, categoryName) => {
    try {
      await moveCategoryDown(categoryId);
      window.alert(`「${categoryName}」已向下移動`);
      loadProjects(); // 重新載入資料
    } catch (error) {
      console.error("向下移動分類失敗:", error);
      window.alert(error.message || "向下移動分類失敗");
    }
  };

  // 向上移動子項目
  const handleMoveItemUp = async (categoryId, itemId, itemTitle) => {
    try {
      await moveItemUp(categoryId, itemId);
      window.alert(`「${itemTitle}」已向上移動`);
      loadProjects(); // 重新載入資料
    } catch (error) {
      console.error("向上移動子項目失敗:", error);
      window.alert(error.message || "向上移動子項目失敗");
    }
  };

  // 向下移動子項目
  const handleMoveItemDown = async (categoryId, itemId, itemTitle) => {
    try {
      await moveItemDown(categoryId, itemId);
      window.alert(`「${itemTitle}」已向下移動`);
      loadProjects(); // 重新載入資料
    } catch (error) {
      console.error("向下移動子項目失敗:", error);
      window.alert(error.message || "向下移動子項目失敗");
    }
  };

  // 移動子項目到最前面
  const handleMoveItemToFirst = async (categoryId, itemId, itemTitle) => {
    try {
      await moveItemToFirst(categoryId, itemId);
      window.alert(`「${itemTitle}」已移動到最前面`);
      loadProjects(); // 重新載入資料
    } catch (error) {
      console.error("移動子項目到最前面失敗:", error);
      window.alert(error.message || "移動子項目到最前面失敗");
    }
  };

  // 移動子項目到最後面
  const handleMoveItemToLast = async (categoryId, itemId, itemTitle) => {
    try {
      await moveItemToLast(categoryId, itemId);
      window.alert(`「${itemTitle}」已移動到最後面`);
      loadProjects(); // 重新載入資料
    } catch (error) {
      console.error("移動子項目到最後面失敗:", error);
      window.alert(error.message || "移動子項目到最後面失敗");
    }
  };

  // 處理拖曳開始
  const handleDragStart = (e, categoryId, item) => {
    setDraggedItem({ categoryId, item });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    // 設定拖曳圖片
    if (e.target) {
      e.target.style.opacity = "0.5";
    }
  };

  // 處理拖曳結束
  const handleDragEnd = (e) => {
    if (e.target) {
      e.target.style.opacity = "";
    }
    setDraggedItem(null);
    setDragOverCategory(null);
    setDragOverIndex(null);
  };

  // 處理拖曳進入類別區域
  const handleDragOverCategory = (e, categoryId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverCategory(categoryId);
    // 當拖曳到類別區域（而非具體項目）時，清除 index
    if (e.target.classList.contains('admin-category') || e.target.closest('.items-grid')) {
      setDragOverIndex(null);
    }
  };

  // 處理拖曳離開類別區域
  const handleDragLeaveCategory = (e) => {
    e.preventDefault();
    // 只有當離開整個類別區域時才清除
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverCategory(null);
      setDragOverIndex(null);
    }
  };

  // 處理拖曳進入項目區域
  const handleDragOverItem = (e, categoryId, itemIndex) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    setDragOverCategory(categoryId);
    setDragOverIndex(itemIndex);
  };

  // 處理放置項目到指定位置
  const handleDropItem = async (e, targetCategoryId, targetIndex) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem) return;

    const { categoryId: sourceCategoryId, item } = draggedItem;

    // 如果是在同一個類別內移動，不處理（使用現有的移動功能）
    if (sourceCategoryId === targetCategoryId) {
      setDraggedItem(null);
      setDragOverCategory(null);
      setDragOverIndex(null);
      return;
    }

    try {
      await moveItemToCategory(
        sourceCategoryId,
        item.id,
        targetCategoryId,
        targetIndex
      );
      const targetCategory = projects.find(p => p.id === targetCategoryId);
      window.alert(`「${item.title}」已成功移動到「${targetCategory?.category}」`);
      loadProjects(); // 重新載入資料
    } catch (error) {
      console.error("移動項目失敗:", error);
      window.alert(`移動項目失敗: ${error.message}`);
    } finally {
      setDraggedItem(null);
      setDragOverCategory(null);
      setDragOverIndex(null);
    }
  };

  // 處理放置到類別區域（添加到最後）
  const handleDropCategory = async (e, targetCategoryId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem) return;

    const { categoryId: sourceCategoryId, item } = draggedItem;

    // 如果是在同一個類別內，不處理
    if (sourceCategoryId === targetCategoryId) {
      setDraggedItem(null);
      setDragOverCategory(null);
      setDragOverIndex(null);
      return;
    }

    try {
      await moveItemToCategory(
        sourceCategoryId,
        item.id,
        targetCategoryId,
        null // null 表示添加到最後
      );
      const targetCategory = projects.find(p => p.id === targetCategoryId);
      window.alert(`「${item.title}」已成功移動到「${targetCategory?.category}」`);
      loadProjects(); // 重新載入資料
    } catch (error) {
      console.error("移動項目失敗:", error);
      window.alert(`移動項目失敗: ${error.message}`);
    } finally {
      setDraggedItem(null);
      setDragOverCategory(null);
      setDragOverIndex(null);
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
            <button
              className="btn btn-secondary"
              onClick={handleInitializeDescriptions}
              disabled={loading || projects.length === 0}
              title="為現有分類初始化描述"
            >
              初始化描述
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleInitializeVisibility}
              disabled={loading || projects.length === 0}
              title="為現有分類初始化可見性"
            >
              初始化可見性
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setShowAddCategoryForm(true)}
              disabled={loading}
              title="新增大類別"
            >
              + 新增大類別
            </button>
            <span className="user-email">{user?.email}</span>
            <button className="btn logout-btn" onClick={handleLogout}>
              登出
            </button>
          </div>
        </div>
      </header>

      {/* Analytics 統計面板 */}
      {analyticsStats && (
        <section className="analytics-dashboard">
          <div className="dashboard-header">
            <h2>網站數據統計</h2>
            <div className="dashboard-actions">
              <button
                className="btn btn-small"
                onClick={loadAnalyticsStats}
                title="重新載入統計數據"
              >
                刷新
              </button>
              <button
                className="btn btn-small btn-danger"
                onClick={handleResetStats}
                title="重置所有統計數據"
              >
                重置
              </button>
            </div>
          </div>

          <div className="stats-grid">
            {/* 總瀏覽次數 */}
            <div className="stat-card">
              <div className="stat-content">
                <h3>總頁面瀏覽次數</h3>
                <div className="stat-number">
                  {analyticsStats.totalPageViews.toLocaleString()}
                </div>
                <p className="stat-description">所有頁面的累計瀏覽數</p>
              </div>
            </div>

            {/* 項目總瀏覽數 */}
            <div className="stat-card">
              <div className="stat-content">
                <h3>項目總瀏覽數</h3>
                <div className="stat-number">
                  {Object.values(analyticsStats.projectViews)
                    .reduce((total, project) => total + project.views, 0)
                    .toLocaleString()}
                </div>
                <p className="stat-description">所有項目的累計瀏覽數</p>
              </div>
            </div>

            {/* 外部連結總點擊 */}
            <div className="stat-card">
              <div className="stat-content">
                <h3>外部連結點擊</h3>
                <div className="stat-number">
                  {(
                    analyticsStats.externalClicks.figma +
                    analyticsStats.externalClicks.github +
                    analyticsStats.externalClicks.web
                  ).toLocaleString()}
                </div>
                <div className="stat-breakdown">
                  <span>Figma: {analyticsStats.externalClicks.figma}</span>
                  <span>GitHub: {analyticsStats.externalClicks.github}</span>
                  <span>Web: {analyticsStats.externalClicks.web}</span>
                </div>
              </div>
            </div>

            {/* 最後更新時間 */}
            <div className="stat-card">
              <div className="stat-content">
                <h3>最後更新</h3>
                <div className="stat-time">
                  {new Date(analyticsStats.lastUpdated).toLocaleString("zh-TW")}
                </div>
                <p className="stat-description">統計數據最後更新時間</p>
              </div>
            </div>
          </div>

          {/* 最受歡迎項目排行 */}
          <div className="ranking-section">
            <h3>最受歡迎項目 (瀏覽次數排行)</h3>
            <div className="ranking-list">
              {analyticsStats.mostPopularProjects
                .slice(0, 5)
                .map((project, index) => (
                  <div key={project.id} className="ranking-item">
                    <span className="rank">#{index + 1}</span>
                    <span className="project-title">{project.title}</span>
                    <span className="project-views">
                      {project.views} 次瀏覽
                    </span>
                    <span className="project-time">
                      平均 {project.averageTime}秒
                    </span>
                  </div>
                ))}
              {analyticsStats.mostPopularProjects.length === 0 && (
                <div className="empty-state">尚無項目瀏覽數據</div>
              )}
            </div>
          </div>

          {/* 停留時間最長項目排行 */}
          <div className="ranking-section">
            <h3>停留時間最長項目 (用戶最感興趣)</h3>
            <div className="ranking-list">
              {analyticsStats.longestViewProjects
                .slice(0, 5)
                .map((project, index) => (
                  <div key={project.id} className="ranking-item">
                    <span className="rank">#{index + 1}</span>
                    <span className="project-title">{project.title}</span>
                    <span className="project-time">
                      平均 {project.averageTime}秒
                    </span>
                    <span className="project-views">
                      {project.views} 次瀏覽
                    </span>
                  </div>
                ))}
              {analyticsStats.longestViewProjects.length === 0 && (
                <div className="empty-state">尚無停留時間數據</div>
              )}
            </div>
          </div>
        </section>
      )}

      <main className="admin-main">
        {projects.map((project, index) => (
          <section 
            key={project.id} 
            className={`admin-category ${dragOverCategory === project.id && dragOverIndex === null ? 'drag-over-category' : ''}`}
            onDragOver={(e) => handleDragOverCategory(e, project.id)}
            onDragLeave={handleDragLeaveCategory}
            onDrop={(e) => handleDropCategory(e, project.id)}
          >
            <div className="category-header">
              {editingCategoryInfo === project.id ? (
                <div className="category-edit-form">
                  <input
                    type="text"
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                    className="category-name-input"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleUpdateCategoryInfo();
                      }
                    }}
                  />
                  <input
                    type="text"
                    value={editCategoryDescription}
                    onChange={(e) => setEditCategoryDescription(e.target.value)}
                    className="category-description-input"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleUpdateCategoryInfo();
                      }
                    }}
                    placeholder="輸入類別描述"
                  />
                  <div className="edit-form-buttons">
                    <button
                      className="btn btn-small btn-success"
                      onClick={handleUpdateCategoryInfo}
                    >
                      確認
                    </button>
                    <button
                      className="btn btn-small btn-secondary"
                      onClick={handleCancelEditCategoryInfo}
                    >
                      取消
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="category-title-group">
                    <div className="sort-buttons">
                      <button
                        className="btn btn-small btn-sort"
                        onClick={() =>
                          handleMoveCategoryUp(project.id, project.category)
                        }
                        title="向上移動分類"
                        disabled={index === 0}
                      >
                        ↑
                      </button>
                      <button
                        className="btn btn-small btn-sort"
                        onClick={() =>
                          handleMoveCategoryDown(project.id, project.category)
                        }
                        title="向下移動分類"
                        disabled={index === projects.length - 1}
                      >
                        ↓
                      </button>
                    </div>
                    <div className="category-info">
                      <h2>{project.category}</h2>
                      <p className="category-description">
                        {project.description || "作品展示"}
                        {project.visible === false && (
                          <span className="hidden-badge">已隱藏</span>
                        )}
                      </p>
                    </div>
                    <div className="category-actions">
                      <div className="edit-buttons">
                        <button
                          className="btn btn-small btn-secondary"
                          onClick={() =>
                            handleEditCategoryInfo(
                              project.id,
                              project.category,
                              project.description
                            )
                          }
                          title="編輯分類標題和描述"
                        >
                          編輯
                        </button>
                        <button
                          className="btn btn-small btn-visibility"
                          onClick={() =>
                            handleToggleVisibility(project.id, project.category)
                          }
                          title="切換分類可見性"
                        >
                          {project.visible === false ? "顯示" : "隱藏"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddItem(project.id)}
                  >
                    + 新增項目
                  </button>
                </>
              )}
            </div>

            <div className="items-grid">
              {project.items?.map((item, itemIndex) => (
                <div 
                  key={item.id} 
                  className={`admin-item ${draggedItem?.item.id === item.id ? 'dragging' : ''} ${dragOverCategory === project.id && dragOverIndex === itemIndex ? 'drag-over-item' : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, project.id, item)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOverItem(e, project.id, itemIndex)}
                  onDrop={(e) => handleDropItem(e, project.id, itemIndex)}
                >
                  <div className="item-sort-controls">
                    <button
                      className="btn btn-small btn-sort btn-sort-first"
                      onClick={() =>
                        handleMoveItemToFirst(project.id, item.id, item.title)
                      }
                      title="移動到最前面"
                      disabled={itemIndex === 0}
                    >
                      ⇈
                    </button>
                    <button
                      className="btn btn-small btn-sort"
                      onClick={() =>
                        handleMoveItemUp(project.id, item.id, item.title)
                      }
                      title="向上移動一位"
                      disabled={itemIndex === 0}
                    >
                      ↑
                    </button>
                    <button
                      className="btn btn-small btn-sort"
                      onClick={() =>
                        handleMoveItemDown(project.id, item.id, item.title)
                      }
                      title="向下移動一位"
                      disabled={itemIndex === project.items.length - 1}
                    >
                      ↓
                    </button>
                    <button
                      className="btn btn-small btn-sort btn-sort-last"
                      onClick={() =>
                        handleMoveItemToLast(project.id, item.id, item.title)
                      }
                      title="移動到最後面"
                      disabled={itemIndex === project.items.length - 1}
                    >
                      ⇊
                    </button>
                  </div>

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

            {/* 分類刪除區域 */}
            <div className="category-delete-section">
              <button
                className="btn btn-small btn-danger"
                onClick={() =>
                  handleDeleteCategory(
                    project.id,
                    project.category,
                    project.items?.length || 0
                  )
                }
                title="刪除分類"
              >
                刪除分類「{project.category}」
              </button>
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

      {/* 新增大類別表單 Modal */}
      {showAddCategoryForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="form-group">
              <label htmlFor="newCategoryName">新類別名稱:</label>
              <input
                type="text"
                id="newCategoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="newCategoryDescription">新類別描述:</label>
              <input
                type="text"
                id="newCategoryDescription"
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleAddCategory}>
                新增
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleCancelAddCategory}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
