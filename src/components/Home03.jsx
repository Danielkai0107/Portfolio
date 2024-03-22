import React, { useEffect, useState } from 'react'
import { projects } from '../libs/projects.js'
import loadIMG from '../images/loading.png'


const Home03 = ({ handleSetShow }) => {
  const items = projects[1].items
  const [currentItem, setCurrentItem] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 6000);

    setCurrentItem(projects[1].items[currentIndex]);
    setFadeKey((prevKey) => prevKey + 1);

    return () => clearInterval(interval);
  }, [currentIndex, items.length]);


  return (
    <article className='home03 panel'>
      <section className='home03_title'>
        <h1>WebPage</h1>
        <h1>Side Projects</h1>
      </section>
      <section className='home03_main'>
        <ul className='card'>
          <li className='card_info fade-in-out'  key={`card-info-${fadeKey}`}>
            <span></span>
            <p>{currentItem && currentItem.info}</p>
          </li>
          <li className='card_img fade-in-out'  key={`card-img-${fadeKey}`}>
            <img src={currentItem ? currentItem.images[1] : loadIMG} alt="" />
          </li>
        </ul>
        <section className='img'>
          <img className='home03_main_bgc fade-in-out'  key={`card-bgc-${fadeKey}`} src={currentItem ? currentItem.images[2] : loadIMG} alt="" />
          <figure className='icon--into' onClick={() => { handleSetShow(currentItem.id,1) }}>
            <span></span>
          </figure>
        </section>
        <ul className='list'>
          <li>
            {items.map((item, index) =>
              <p key={index} onClick={() => { handleSetShow(item.id, 1) }}>0{index + 1} {item.title}</p>
            )}
          </li>
        </ul>
        <ul className='title fade-in-out'  key={`card-title-${fadeKey}`}>
          <li>
            <span></span>
            <h3>0{currentItem && currentItem.id}</h3>
            <h2>{currentItem && currentItem.title}</h2>
          </li>
        </ul>
      </section>
    </article>
  )
}

export default Home03
