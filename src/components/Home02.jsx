import React, { useEffect, useState } from 'react';
import { projects } from '../libs/projects.js';

const Home02 = ({ handleSetShow }) => {
  const items = projects[0].items;
  const [currentItem, setCurrentItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 6000);

    setCurrentItem(projects[0].items[currentIndex]);
    setFadeKey((prevKey) => prevKey + 1);

    return () => clearInterval(interval);
  }, [currentIndex, items.length]);

  return (
    <article className='home02 panel'>
      <section className='home02_title'>
        <h1>APP UI</h1>
        <h1>Projects</h1>
      </section>
      <section className='home02_main'>
        <img className='home02_main_bgc fade-in-out' key={`bgc-${fadeKey}`} src={currentItem && currentItem.images[2]} alt="" />
        <figure className='icon--into' onClick={() => { handleSetShow(currentItem.id, 0) }}>
          <span></span>
        </figure>
        <ul className='card'>
          <li className='card_info fade-in-out' key={`card-info-${fadeKey}`}>
            <span></span>
            <p>{currentItem && currentItem.info}</p>
          </li>
          <li className='card_img fade-in-out' key={`card-img-${fadeKey}`}>
            <img src={currentItem && currentItem.images[1]} alt="" />
          </li>
        </ul>
        <ul className='list'>
          <li>
            {items.map((item, index) =>
              <p key={`item-${index}`} onClick={() => { handleSetShow(item.id, 0) }}>0{index + 1} {item.title}</p>
            )}
          </li>
          <li className='fade-in-out' key={`title-${fadeKey}`}>
            <h2 >0{currentItem && currentItem.id} {currentItem && currentItem.title}</h2>
          </li>
        </ul>
      </section>
    </article>
  );
};

export default Home02;
