import React, { useEffect, useState } from 'react'
import { projects } from '../libs/projects.js'
import loadIMG from '../images/loading.png'

const Home04 = ({ handleSetShow }) => {
  const items = projects[2].items
  const [currentItem, setCurrentItem] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 6000);

    setCurrentItem(projects[2].items[currentIndex]);
    setFadeKey((prevKey) => prevKey + 1);
    setImageLoaded(false)

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
            <img src={imageLoaded && currentItem ? currentItem.images[0] : loadIMG} alt="" onLoad={() => setImageLoaded(true)} />
          </li>
        </ul>
        <ul className='card'>
          <li className='card_info fade-in-out' key={`bgc-info01-${fadeKey}`} >
            <span></span>
            <p>{currentItem && currentItem.info}</p>
          </li>
          <li className='card_img fade-in-out' key={`bgc-img01-${fadeKey}`} >
            <img src={imageLoaded && currentItem ? currentItem.images[1] : loadIMG} alt="" onLoad={() => setImageLoaded(true)} />
          </li>
        </ul>
        <ul className='card'>
          <li className='card_info fade-in-out' key={`bgc-info03-${fadeKey}`} >
            <span></span>
            <p>{currentItem && currentItem.info}</p>
          </li>
          <li className='card_img fade-in-out' key={`bgc-img03-${fadeKey}`} >
            <img src={imageLoaded && currentItem ? currentItem.images[2] : loadIMG} alt="" onLoad={() => setImageLoaded(true)} />
          </li>
        </ul>
        <figure className='icon--into' onClick={() => { handleSetShow(currentItem.id, 2) }}>
          <span></span>
        </figure>
        <ul className='list'>
          <li>
            {items.map((item, index) =>
              <p key={index} onClick={() => { handleSetShow(item.id, 2) }}>0{index + 1} {item.title}</p>
            )}
          </li>
        </ul>
      </section>
    </article>
  )
}

export default Home04
