import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBtn from "../components/TopBtn";
import FigmaEmbed from "../components/FigmaEmbed";
import ImageDisplay from "../components/ImageDisplay";
import { getAllProjects } from "../services/projectService";
import analyticsService from "../services/analyticsService";

const ShowPage = ({ selectedProject, handleCloseShow }) => {
  const { id: urlProjectId, category: urlCategory } = useParams();
  const [currentItem, setCurrentItem] = useState(selectedProject);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await getAllProjects();
        setProjects(projectsData);

        // 如果有 URL 參數，根據 URL 找到對應的項目
        if (urlProjectId && urlCategory) {
          let foundProject = null;
          let foundCategory = null;

          for (const category of projectsData) {
            const project = category.items.find(
              (item) => item.id === urlProjectId
            );
            if (project) {
              foundProject = { ...project, category: urlCategory };
              foundCategory = category.items;
              break;
            }
          }

          if (foundProject && foundCategory) {
            setCurrentItem(foundProject);
            setCurrentList(foundCategory);
          }
        } else if (selectedProject) {
          // 找到當前項目所屬的分類
          const category = projectsData.findIndex((project) =>
            project.items.some((item) => item.id === selectedProject.id)
          );

          if (category !== -1) {
            setCurrentList(projectsData[category].items);
          }
        }
      } catch (err) {
        console.error("載入專案資料失敗：", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedProject, urlProjectId, urlCategory]);

  // 追蹤項目瀏覽
  useEffect(() => {
    if (currentItem && !loading) {
      analyticsService.trackProjectView(currentItem);
    }
  }, [currentItem, loading]);

  // 組件卸載時追蹤停留時間
  useEffect(() => {
    return () => {
      analyticsService.onProjectChange();
    };
  }, []);

  const handlePrev = () => {
    // 記錄當前項目停留時間
    analyticsService.onProjectChange();

    const currentIndex = currentList.findIndex(
      (item) => item.id === currentItem.id
    );
    const prevIndex =
      (currentIndex - 1 + currentList.length) % currentList.length;
    setCurrentItem(currentList[prevIndex]);
  };

  const handleNext = () => {
    // 記錄當前項目停留時間
    analyticsService.onProjectChange();

    const currentIndex = currentList.findIndex(
      (item) => item.id === currentItem.id
    );
    const nextIndex = (currentIndex + 1) % currentList.length;
    setCurrentItem(currentList[nextIndex]);
  };

  const handleCloseShowWithTracking = () => {
    // 記錄停留時間
    analyticsService.onProjectChange();

    if (handleCloseShow) {
      handleCloseShow();
    }
  };

  // 追蹤外部連結點擊
  const handleLinkClick = (linkType, url) => {
    if (currentItem) {
      analyticsService.trackExternalLinkClick(currentItem.id, linkType, url);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentItem]);

  if (loading) {
    return (
      <aside className="show">
        <div style={{ textAlign: "center", padding: "2rem", color: "white" }}>
          載入中...
        </div>
      </aside>
    );
  }

  if (currentList.length === 0 || !currentItem) {
    return (
      <aside className="show">
        <div style={{ textAlign: "center", padding: "2rem", color: "white" }}>
          找不到專案資料
        </div>
      </aside>
    );
  }

  return (
    <aside className="show">
      <figure className="icon back" onClick={handleCloseShowWithTracking}>
        <span></span>
        <p>Home</p>
      </figure>
      <figure className="icon prev" onClick={handlePrev}>
        <span></span>
        <p>Prev</p>
      </figure>
      <figure className="icon next" onClick={handleNext}>
        <span></span>
        <p>Next</p>
      </figure>
      <article className="show_main" key={currentItem.id}>
        <section className="show_main_title">
          <h1>
            {currentItem.title}
            <span>{currentItem.info}</span>
          </h1>
          <ul className="icon_list">
            {(currentItem.URL.figma ||
              currentItem.URL.github ||
              currentItem.URL.web) && <p>前往作品：</p>}
            {currentItem.URL.figma && (
              <li className="figma">
                <a
                  href={currentItem.URL.figma}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    handleLinkClick("figma", currentItem.URL.figma)
                  }
                >
                  <span></span>
                </a>
              </li>
            )}
            {currentItem.URL.github && (
              <li className="github">
                <a
                  href={currentItem.URL.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    handleLinkClick("github", currentItem.URL.github)
                  }
                >
                  <span></span>
                </a>
              </li>
            )}
            {currentItem.URL.web && (
              <li className="web">
                <a
                  href={currentItem.URL.web}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => handleLinkClick("web", currentItem.URL.web)}
                >
                  <span></span>
                </a>
              </li>
            )}
          </ul>
        </section>
        <section className="show_main_content">
          <figure className="loading">
            <ul className="dots">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </figure>
          <ImageDisplay
            src={currentItem.images[0]}
            alt={currentItem.title}
            showAnalysis={false}
          />
          {currentItem.proto && <FigmaEmbed url={currentItem.proto} />}
          <TopBtn />
        </section>
      </article>
    </aside>
  );
};

export default ShowPage;
