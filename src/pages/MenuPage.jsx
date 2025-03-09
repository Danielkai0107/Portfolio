import React, { useEffect } from "react";
import { projects } from "../libs/projects.js";

const MenuPage = ({ pIndex, handleShowProject }) => {
  const items = projects[pIndex].items;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pIndex]);

  return (
    <article className="menu">
      <ul className="menu_list">
        {items.map((item, index) => (
          <li key={index} onClick={() => handleShowProject(item)}>
            <figure>
              <img src={item.images[1]} alt="" />
            </figure>
            <div className="item_title">
              <span>0{item.id}</span>
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
