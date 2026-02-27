import React, { useEffect, useState } from "react";
import { getAllProjects } from "../services/projectService";
import ImageDisplay from "./ImageDisplay";

const Home02 = ({ handleSetMenu, pIndex, id }) => {
  const [projects, setProjects] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const [cardImageIndex, setCardImageIndex] = useState(0); // 封面為 images[0]，可選與 images[1] 輪播
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

  // 卡片圖片：封面 images[0]，若有 images[1] 可輪播
  useEffect(() => {
    if (!currentItem || !currentItem.images) return;

    const hasCover = currentItem.images[0];
    const hasSecond = currentItem.images[1];
    const canAlternate = hasCover && hasSecond && hasCover !== hasSecond;

    if (!canAlternate) {
      setCardImageIndex(0);
      return;
    }

    const cardInterval = setInterval(() => {
      setCardImageIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3000);

    return () => clearInterval(cardInterval);
  }, [currentItem]);

  if (loading || projects.length === 0 || !projects[pIndex]) {
    return (
      <article className="home02" id={id}>
        <section className="home02_title">
          <div className="skeleton-block" style={{ width: "160px", height: "2.5rem" }} />
          <div className="skeleton-block" style={{ width: "130px", height: "2.5rem" }} />
        </section>
        <section className="home02_main">
          <div className="home02-skeleton">
            <div className="home02-skeleton__card skeleton-block skeleton-block--circle" />
            <div className="home02-skeleton__info">
              <div className="skeleton-block" />
              <div className="skeleton-block" />
            </div>
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
              src={currentItem?.images?.[cardImageIndex]}
              alt={currentItem ? currentItem.title : ""}
            />
          </li>
        </ul>
        <ul className="home02_main_info">
          <li className="title fade-in-out" key={`title-${fadeKey}`}>
            <h2>
              0{currentIndex + 1} {currentItem && currentItem.title}
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
