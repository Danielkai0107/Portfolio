import React, { useState, useEffect } from 'react';

const ImgSlider = ({images}) => {

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 5000); // 輪播間隔時間，這裡設置為 3 秒

    return () => clearInterval(interval);
  }, [currentImage, images.length]);

  return (
    <section className='sliderContainer'>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt=""
          className={index === currentImage ? 'fade-in' : 'fade-out'}
        />
      ))}
    </section>
  );
};

export default ImgSlider;
