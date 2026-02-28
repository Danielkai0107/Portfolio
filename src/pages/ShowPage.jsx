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

        if (urlProjectId && urlCategory) {
          // URL 入口：用 urlCategory 精確匹配類別名稱，再在該類別中找項目
          const matchedCategory = projectsData.find(
            (cat) => cat.category === urlCategory
          );

          if (matchedCategory) {
            const project = matchedCategory.items.find(
              (item) => String(item.id) === String(urlProjectId)
            );
            if (project) {
              setCurrentItem({ ...project, category: urlCategory });
              setCurrentList(matchedCategory.items);
            }
          }
        } else if (selectedProject) {
          // MenuPage 入口：用 _categoryDocId 精確匹配類別
          let matchedCategory = null;

          if (selectedProject._categoryDocId) {
            matchedCategory = projectsData.find(
              (p) => p.id === selectedProject._categoryDocId
            );
          }

          if (!matchedCategory) {
            // 後備：遍歷查找（適用於沒有 _categoryDocId 的舊入口）
            matchedCategory = projectsData.find((project) =>
              project.items.some((item) => item.id === selectedProject.id)
            );
          }

          if (matchedCategory) {
            setCurrentList(matchedCategory.items);
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
        <div className="show-skeleton">
          <div className="show-skeleton__title">
            <div className="skeleton-block" />
            <div className="skeleton-block" />
            <div className="show-skeleton__title-icons">
              <div className="skeleton-block" />
              <div className="skeleton-block" />
            </div>
          </div>
          <div className="show-skeleton__content">
            <div className="skeleton-block" />
            <div className="skeleton-block" />
            <div className="skeleton-block" />
          </div>
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
            {currentItem.info && <span className="show_main_title_subtitle">{currentItem.info}</span>}
            {currentItem.description && (
              <span className="show_main_title_description">{currentItem.description}</span>
            )}
          </h1>
          <ul className="icon_list">
            {currentItem.externalLink && (
              <li className="web external-link">
                <a
                  href={currentItem.externalLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    analyticsService.trackExternalLinkClick(
                      currentItem.id,
                      "external",
                      currentItem.externalLink
                    )
                  }
                >
                  <span></span>
                  <p>查看案例分析</p>
                </a>
              </li>
            )}
            {(currentItem.URL?.figma ||
              currentItem.URL?.github ||
              currentItem.URL?.web) && <p>前往作品：</p>}
            {currentItem.URL?.figma && (
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
            {currentItem.URL?.github && (
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
            {currentItem.URL?.web && (
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
          {(currentItem.images?.slice(1) || [])
            .filter(Boolean)
            .map((src, i) => (
              <ImageDisplay
                key={`${currentItem.id}-${i}`}
                src={src}
                alt={`${currentItem.title} - ${i + 1}`}
                showAnalysis={false}
              />
            ))}
          {currentItem.proto && currentItem.proto.length > 0 && (
            <FigmaEmbed url={currentItem.proto[0]} />
          )}
          <TopBtn />
        </section>
      </article>
    </aside>
  );
};

export default ShowPage;
