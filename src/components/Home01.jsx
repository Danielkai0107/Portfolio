import React, { useEffect, useState, useMemo } from 'react';
import img1 from '../images/Home/1.jpg';
import img2 from '../images/Home/2.jpg';
import img3 from '../images/Home/3.png';
import img4 from '../images/Home/4.png';
import img5 from '../images/Home/5.jpg';
import img6 from '../images/Home/6.jpg';
import img7 from '../images/Home/7.jpg';

const Home01 = () => {
  const [currentImageIndexes, setCurrentImageIndexes] = useState([0, 0, 0, 0]);
  const [fadeKey, setFadeKey] = useState(0);

  const images = useMemo(() => [
    [img1, img2, img3, img4, img5, img6, img7],
    [img2, img3, img4, img5, img6, img7, img1],
    [img3, img4, img5, img6, img7, img1, img2],
    [img4, img5, img6, img7, img1, img2, img3]
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes(prevIndexes =>
        prevIndexes.map((index, i) => (index + 1) % images[i].length)
      );
      setFadeKey(prevKey => prevKey + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <article className='home01 panel'>
      <section className='home01_title'>
        <ul>
          <li>
            <span></span>
            <p>Daniel Kai</p>
          </li>
          <li>
            <h1>Portfolio</h1>
          </li>
          <li>
            <p>A passionate designer specializing in front-end development and graphic.</p>
          </li>
        </ul>
        <figure className='icon--scroll'>
          <span className='border'></span>
          <span className='dot'></span>
        </figure>
      </section>
      <section className='home01_show'>
        <ul>
          {images.map((imgArr, i) => (
            <li className='fade-in-out-1' key={`home-${i + 1}-${fadeKey}`}>
              <img src={imgArr[currentImageIndexes[i]]} alt="" />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default Home01;
