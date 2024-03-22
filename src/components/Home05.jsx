import React, { useEffect, useState } from 'react';
import { projects } from '../libs/projects.js';
import loadIMG from '../images/loading.png'

const Home05 = ({ handleSetShow }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 6000);

    setFadeKey((prevKey) => prevKey + 1);
    setImageLoaded(false)

    return () => clearInterval(interval);

  }, [currentIndex]);

  const currentList = projects[currentIndex].items;

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <article className='home05 panel'>
      <section className='home05_title'>
        <h1>A <span>passionate</span> designer <span>specializing</span> in <span>web</span> and <span>graphic</span> design.</h1>
      </section>
      <section className='home05_main fade-in-out' key={`fade-main-${fadeKey}`}>
        {currentList && currentList.map((item, index) =>
          <ul key={index} className='card' onClick={() => { handleSetShow(item.id, currentIndex) }}>
            <li className='card_info'>
              <span></span>
              <p>{item.title}</p> {/* Assuming each project has a title */}
            </li>
            <li className='card_img'>
              <img src={imageLoaded && item ? item.images[1] : loadIMG} alt="" onLoad={() => setImageLoaded(true)}/>
            </li>
          </ul>
        )}
      </section>
      <figure className='icon--toTop' onClick={goToTop}>
        <span></span>
      </figure>
    </article>
  );
};

export default Home05;
