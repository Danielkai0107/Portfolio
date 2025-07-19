import React, { useEffect, useState } from "react";
import TopBtn from "../components/TopBtn";
import FigmaEmbed from "../components/FigmaEmbed";
import ImageDisplay from "../components/ImageDisplay";
import { getAllProjects } from "../services/projectService";

const ShowPage = ({ selectedProject, handleCloseShow }) => {
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

        // 找到當前項目所屬的分類
        const category = projectsData.findIndex((project) =>
          project.items.some((item) => item.id === selectedProject.id)
        );

        if (category !== -1) {
          setCurrentList(projectsData[category].items);
        }
      } catch (err) {
        console.error("載入專案資料失敗：", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedProject]);

  const handlePrev = () => {
    const currentIndex = currentList.findIndex(
      (item) => item.id === currentItem.id
    );
    const prevIndex =
      (currentIndex - 1 + currentList.length) % currentList.length;
    setCurrentItem(currentList[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = currentList.findIndex(
      (item) => item.id === currentItem.id
    );
    const nextIndex = (currentIndex + 1) % currentList.length;
    setCurrentItem(currentList[nextIndex]);
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

  if (currentList.length === 0) {
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
      <figure className="icon back" onClick={handleCloseShow}>
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
                >
                  <span></span>
                </a>
              </li>
            )}
            {currentItem.URL.web && (
              <li className="web">
                <a href={currentItem.URL.web} target="_blank" rel="noreferrer">
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
