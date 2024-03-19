import React, { useEffect, useState } from 'react';
import { projects } from '../libs/projects.js';

const Home05 = ({ handleSetShow }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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
      <section className='home05_main'>
        {currentList && currentList.map((item,index)=>
          <ul key={index} className='card' onClick={() => { handleSetShow(123) }}>
            <li className='card_info'>
              <span></span>
              <p>{item.title}</p> {/* Assuming each project has a title */}
            </li>
            <li className='card_img'>
              <img src={item.images[1]} alt="" />
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
