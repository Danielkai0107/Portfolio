import React, { useState } from 'react';
import placeholder from '../images/reload.gif'; 


const ImageTag = ({ src }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  const handleImageError = () => {
    if (!error) {
      setImgSrc(placeholder); 
      setError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      onError={handleImageError}
      alt="description"
      className={error ? 'placeholder' : ''}
    />
  );
};

export default ImageTag;
