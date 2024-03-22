//Home.jsx
import React, { useRef } from 'react';
import Home01 from '../components/Home01';
import Home02 from '../components/Home02';
import Home03 from '../components/Home03';
import Home04 from '../components/Home04';
import Home05 from '../components/Home05';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();
  const handleSetShow = (currentItem, categoryIndex) => {
    navigate(`/Project/${currentItem}/${categoryIndex}`);
  };
  const homeContainer = useRef();
  
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    let items = gsap.utils.toArray('.panel')
    gsap.to(items, {
      xPercent: -100 * (items.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: homeContainer.current,
        pin: true,
        scrub: 1,
        snap: 1 / (items.length - 1),
        end: () => '+=' + document.querySelector(".home").offsetWidth
      }
    })

  }, { scope: homeContainer })

  return (
    <main className='home' ref={homeContainer}>
      <Home01 />
      <Home02 handleSetShow={handleSetShow} />
      <Home03 handleSetShow={handleSetShow} />
      <Home04 handleSetShow={handleSetShow} />
      <Home05 handleSetShow={handleSetShow} />
    </main>
  );
};

export default Home;
