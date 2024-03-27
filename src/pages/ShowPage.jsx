import React, { useEffect, useState } from 'react';
import { projects } from '../libs/projects';
import { useNavigate, useParams } from 'react-router-dom';

const ShowPage = () => {
  const navigate = useNavigate();
  const { id, category } = useParams();
  const [ID, setID] = useState(parseInt(id));
  const currentList = projects[category].items;
  const currentItem = currentList.find((item) => item.id === ID);

  const handleBack = () => {
    navigate('/');
  }

  const handleToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  const handlePrev = () => {
    if (ID - 1 <= 0) {
      setID(currentList.length);
    } else {
      setID(ID - 1);
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    if (ID + 1 > currentList.length) {
      setID(1);
    } else {
      setID(ID + 1);
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [ID])

  return (
    <aside className="show">
      <figure className="icon back" onClick={handleBack}>
        <span></span>
        <p>Back</p>
      </figure>
      <figure className="icon prev" onClick={handlePrev}>
        <span></span>
        <p>Prev</p>
      </figure>
      <figure className="icon next" onClick={handleNext}>
        <span></span>
        <p>Next</p>
      </figure>
      <article className="show_main" key={ID}>
        <section className="show_main_title">
          <h1>{currentItem.title}
            <span>{currentItem.info}</span>
          </h1>
          <ul className="icon_list">
            {currentItem.URL.figma && (
              <li className="figma">
                <a href={currentItem.URL.figma} target="_blank" rel="noreferrer">
                  <span></span>
                </a>
              </li>
            )}
            {currentItem.URL.github && (
              <li className="github">
                <a href={currentItem.URL.github} target="_blank" rel="noreferrer">
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
            <ul class="dots">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </figure>
          <img
            src={currentItem && currentItem.images[0]}
            alt=""
          />
          <ul onClick={handleToTop}>
            <li>
              <span></span>
              <p>TO THE TOP</p>
            </li>
          </ul>
        </section>
      </article>
    </aside>
  );
};

export default ShowPage;
