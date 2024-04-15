import React, { useEffect, useState } from 'react';
import { projects } from '../libs/projects.js';

const Home02 = ({ handleSetShow, pIndex }) => {
  const items = projects[pIndex].items;
  const [currentItem, setCurrentItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 6000);

    setCurrentItem(projects[pIndex].items[currentIndex]);
    setFadeKey((prevKey) => prevKey + 1);

    return () => clearInterval(interval);
  }, [currentIndex, items.length, pIndex]);


  return (
    <article className='home02'>
      <section className='home02_title'>
        <h1>{projects[pIndex].category}</h1>
        <h1>Projects</h1>
      </section>
      <section className='home02_main'>
        <img className='home02_main_bgc fade-in-out' key={`bgc-${fadeKey}`} src={currentItem && currentItem.images[2]} alt="" />
        <ul className='card'>
          <li className='card_img fade-in-out' key={`card-img-${fadeKey}`}>
            <img src={currentItem && currentItem.images[1]} alt="" />
          </li>
        </ul>
        <ul className='home02_main_info'>
          <li className='title fade-in-out' key={`title-${fadeKey}`}>
            <h2 >0{currentItem && currentItem.id} {currentItem && currentItem.title}</h2>
            <p>{currentItem && currentItem.info}</p>
          </li>
          <figure className='icon--into' onClick={() => { handleSetShow(currentItem.id, pIndex) }}>
            <span></span>
          </figure>
        </ul>

      </section>
    </article>
  );
};

export default Home02;
