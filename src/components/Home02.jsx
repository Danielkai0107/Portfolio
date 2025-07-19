import React, { useEffect, useState } from "react";
import { getAllProjects } from "../services/projectService";
import ImageDisplay from "./ImageDisplay";

const Home02 = ({ handleSetMenu, pIndex, id }) => {
  const [projects, setProjects] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const [cardImageIndex, setCardImageIndex] = useState(1); // 控制卡片圖片輪播 (1或2)
  const [loading, setLoading] = useState(true);

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

  // 項目輪播效果
  useEffect(() => {
    if (projects.length === 0 || !projects[pIndex]) return;

    const items = projects[pIndex].items;
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 6000);

    setCurrentItem(items[currentIndex]);
    setFadeKey((prevKey) => prevKey + 1);

    return () => clearInterval(interval);
  }, [currentIndex, projects, pIndex]);

  // 卡片圖片輪播效果 (images[1] 和 images[2] 互換)
  useEffect(() => {
    if (!currentItem || !currentItem.images) return;

    // 檢查是否有兩張不同的圖片可以輪播
    const hasImage1 = currentItem.images[1];
    const hasImage2 = currentItem.images[2];
    const canAlternate = hasImage1 && hasImage2 && hasImage1 !== hasImage2;

    if (!canAlternate) {
      // 如果不能輪播，就固定使用 images[1]
      setCardImageIndex(1);
      return;
    }

    const cardInterval = setInterval(() => {
      setCardImageIndex((prevIndex) => (prevIndex === 1 ? 2 : 1));
    }, 3000); // 每3秒切換一次卡片圖片

    return () => clearInterval(cardInterval);
  }, [currentItem]);

  if (loading || projects.length === 0 || !projects[pIndex]) {
    return (
      <article className="home02" id={id}>
        <section className="home02_title">
          <h1>載入中...</h1>
          <h1>Projects</h1>
        </section>
        <section className="home02_main">
          <div style={{ textAlign: "center", padding: "2rem", color: "white" }}>
            {loading ? "載入專案資料中..." : "找不到專案資料"}
          </div>
        </section>
      </article>
    );
  }

  return (
    <article className="home02" id={id}>
      <section className="home02_title">
        <h1>{projects[pIndex]?.category}</h1>
        <h1>Projects</h1>
      </section>
      <section className="home02_main">
        <ul className="card">
          <li
            className="card_img fade-in-out"
            key={`card-img-${cardImageIndex}-${fadeKey}`}
          >
            <ImageDisplay
              src={currentItem && currentItem.images[cardImageIndex]}
              alt={currentItem ? currentItem.title : ""}
            />
          </li>
        </ul>
        <ul className="home02_main_info">
          <li className="title fade-in-out" key={`title-${fadeKey}`}>
            <h2>
              0{currentItem && currentItem.id}{" "}
              {currentItem && currentItem.title}
            </h2>
            <p>{currentItem && currentItem.info}</p>
          </li>
          <figure
            className="icon--into"
            onClick={() => {
              handleSetMenu(pIndex);
            }}
          >
            <span></span>
          </figure>
        </ul>
      </section>
    </article>
  );
};

export default Home02;
