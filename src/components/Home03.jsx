import React, { useEffect, useState } from 'react'
import { projects } from '../libs/projects.js'

const Home03 = ({ handleSetShow }) => {
  const items = projects[0].items
  const [currentItem, setCurrentItem] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 4000);

    setCurrentItem(projects[0].items[currentIndex]);

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
          <li className='card_info'>
            <span></span>
            <p>AI English UI Projects</p>
          </li>
          <li className='card_img'>
            <img src={currentItem && currentItem.images[1]} alt="" />
          </li>
        </ul>
        <section className='img'>
          <img className='home03_main_bgc' src={currentItem && currentItem.images[2]} alt="" />
          <figure className='icon--into' onClick={() => { handleSetShow(currentItem) }}>
            <span></span>
          </figure>
        </section>
        <ul className='list'>
          <li>
            {items.map((item, index) =>
              <p key={index}>0{index + 1} {item.title}</p>
            )}
          </li>
        </ul>
        <ul className='title'>
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
