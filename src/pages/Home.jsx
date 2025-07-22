import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllProjects } from "../services/projectService";
import Home01 from "../components/Home01";
import ToTopBtn from "../components/TopBtn";
import MenuPage from "./MenuPage";
import ShowPage from "./ShowPage";

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleShowProject = (project) => {
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseShow = () => {
    setSelectedProject(null);
  };

  // 載入專案資料
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await getAllProjects();
        setProjects(projectsData);
      } catch (err) {
        console.error("載入專案資料失敗：", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollToId = params.get("scrollToId");
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  // 類別標題映射 - 維持原有的中文說明
  const getCategoryDescription = (category) => {
    const categoryMap = {
      Web: "網頁設計",
      APP: "使用者介面設計",
      Graphic: "平面設計",
      // 為新類別提供智能預設描述
      "UI/UX": "使用者體驗設計",
      Frontend: "前端開發",
      Backend: "後端開發",
      Mobile: "行動應用程式",
      Photography: "攝影作品",
      Illustration: "插畫設計",
      Branding: "品牌設計",
      Motion: "動態設計",
      Game: "遊戲設計",
      Product: "產品設計",
    };

    // 如果找不到對應的中文描述，使用智能推測
    if (categoryMap[category]) {
      return categoryMap[category];
    }

    // 根據常見關鍵字智能推測
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes("web") || lowerCategory.includes("website")) {
      return "網頁相關";
    }
    if (lowerCategory.includes("app") || lowerCategory.includes("mobile")) {
      return "應用程式相關";
    }
    if (lowerCategory.includes("ui") || lowerCategory.includes("ux")) {
      return "介面設計相關";
    }
    if (lowerCategory.includes("design") || lowerCategory.includes("graphic")) {
      return "設計相關";
    }

    // 預設描述
    return "作品展示";
  };

  if (loading) {
    return (
      <main className="home">
        <div style={{ textAlign: "center", padding: "2rem" }}>載入中...</div>
      </main>
    );
  }

  return (
    <main className="home">
      {selectedProject ? (
        <ShowPage
          selectedProject={selectedProject}
          handleCloseShow={handleCloseShow}
        />
      ) : (
        <>
          <Home01 />

          {/* 動態顯示可見的類別，編號基於可見類別的順序 */}
          {projects
            .filter((project) => project.visible !== false) // 先過濾出可見的分類
            .map((project, visibleIndex) => {
              // 找到該分類在原始陣列中的索引（用於 MenuPage 的 pIndex）
              const originalIndex = projects.findIndex(
                (p) => p.id === project.id
              );
              // 顯示編號基於可見分類的順序
              const displayNumber = visibleIndex + 1;

              return (
                <React.Fragment key={project.id}>
                  <section className="home_menu_title">
                    <h1>
                      {String(displayNumber).padStart(2, "0")}{" "}
                      {project.category}
                    </h1>
                    <h2>
                      {project.description ||
                        getCategoryDescription(project.category)}
                    </h2>
                  </section>
                  <MenuPage
                    pIndex={originalIndex}
                    handleShowProject={handleShowProject}
                  />
                </React.Fragment>
              );
            })}

          <ToTopBtn />

          {/* Admin 入口 - 隱蔽連結 */}
          <Link
            to="/admin"
            style={{
              position: "fixed",
              bottom: "20px",
              left: "20px",
              color: "rgba(255,255,255,0.3)",
              fontSize: "12px",
              textDecoration: "none",
              zIndex: 1000,
            }}
          >
            Admin
          </Link>
        </>
      )}
    </main>
  );
};

export default Home;
