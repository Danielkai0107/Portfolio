import React, { useEffect, useState } from 'react'
import { projects } from '../libs/projects.js'


const Home04 = ({ handleSetShow }) => {
  const items = projects[0].items
  const [currentItem, setCurrentItem] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 4000);

    setCurrentItem(projects[0].items[currentIndex]);
    setFadeKey((prevKey) => prevKey + 1);


    return () => clearInterval(interval);
  }, [currentIndex, items.length]);

  return (
    <article className='home04 panel'>
      <section className='home04_title'>
        <h1>Graphic</h1>
        <h1>Design</h1>
      </section>
      <section className='home04_main'>
        <ul className='card'>
          <li className='card_info fade-in-out' key={`bgc-info-${fadeKey}`} >
            <span></span>
            <p>{currentItem && currentItem.info}</p>
          </li>
          <li className='card_img fade-in-out' key={`bgc-img-${fadeKey}`} >
            <img src={currentItem && currentItem.images[0]} alt="" />
          </li>
        </ul>
        <ul className='card'>
          <li className='card_info fade-in-out' key={`bgc-info01-${fadeKey}`} >
            <span></span>
            <p>{currentItem && currentItem.info}</p>
          </li>
          <li className='card_img fade-in-out' key={`bgc-img01-${fadeKey}`} >
            <img src={currentItem && currentItem.images[1]} alt="" />
          </li>
        </ul>
        <ul className='card'>
          <li className='card_info fade-in-out' key={`bgc-info03-${fadeKey}`} >
            <span></span>
            <p>{currentItem && currentItem.info}</p>
          </li>
          <li className='card_img fade-in-out' key={`bgc-img03-${fadeKey}`} >
            <img src={currentItem && currentItem.images[2]} alt="" />
          </li>
        </ul>
        <figure className='icon--into' onClick={() => { handleSetShow(currentItem) }}>
          <span></span>
        </figure>
        <ul className='list'>
          <li>
            {items.map((item, index) =>
              <p key={index}>0{index + 1} {item.title}</p>
            )}
          </li>
        </ul>
      </section>
    </article>
  )
}

export default Home04
