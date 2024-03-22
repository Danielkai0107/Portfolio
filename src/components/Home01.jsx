import React, { useEffect, useState, useMemo, memo } from 'react';
import img1 from '../images/Home/1.png';
import img2 from '../images/Home/2.png';
import img3 from '../images/Home/3.png';
import img4 from '../images/Home/4.png';
import img5 from '../images/Home/5.png';
import img6 from '../images/Home/6.png';

const Home01 = memo(() => {
  const [currentItem, setCurrentItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  const images = useMemo(() => [img1, img2, img3, img4, img5, img6], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    setCurrentItem(images[currentImageIndex]);
    setFadeKey((prevKey) => prevKey + 1);

    return () => clearInterval(interval);
  }, [currentImageIndex, images]);

  return (
    <article className='home01 panel'>
      <section className='home01_title'>
        <ul>
          <li>
            <span></span>
            <p>Daniel Kai</p>
          </li>
          <li>
            <h1>Design</h1>
            <h1>Portfolio</h1>
          </li>
          <li>
            <p>A passionate designer specializing in web and graphic design.</p>
          </li>
        </ul>
        <figure className='icon--scroll'>
          <span className='border'></span>
          <span className='dot'></span>
        </figure>
      </section>
      <section className='home01_show'>
        <ul>
          <li className='fade-in-out' key={fadeKey}>
            <img src={currentItem} alt="" />
          </li>
        </ul>
      </section>
    </article>
  );
})

export default Home01;
