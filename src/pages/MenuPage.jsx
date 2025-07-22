import React, { useEffect, useState } from "react";
import { getAllProjects } from "../services/projectService";
import ImageDisplay from "../components/ImageDisplay";

const MenuPage = ({ pIndex, handleShowProject }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await getAllProjects();
        setProjects(projectsData);
      } catch (err) {
        console.error("載入專案資料失敗：", err);
        setError("載入專案資料時發生錯誤");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pIndex]);

  if (loading) {
    return (
      <article className="menu">
        <div style={{ textAlign: "center", padding: "2rem" }}>載入中...</div>
      </article>
    );
  }

  if (error) {
    return (
      <article className="menu">
        <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
          {error}
        </div>
      </article>
    );
  }

  const items = projects[pIndex]?.items || [];

  return (
    <article className="menu">
      <ul className="menu_list">
        {items.map((item, index) => (
          <li key={index} onClick={() => handleShowProject(item)}>
            <figure>
              <ImageDisplay src={item.images[1]} alt={item.title} />
            </figure>
            <div className="item_title">
              <span>0{index + 1}</span>
              <h1>{item.title}</h1>
            </div>
            <div className="goto_btn"></div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default MenuPage;
