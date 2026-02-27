import React, { useState, useEffect } from "react";

const ImageDisplay = ({
  src,
  alt = "",
  className = "",
  fallback = "/images/placeholder.png",
  showAnalysis = true,
  onLoad,
  onError,
  ...props
}) => {
  const [imageStatus, setImageStatus] = useState("loading");
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
    setImageStatus("loading");
  }, [src]);

  const handleImageLoad = (e) => {
    setImageStatus("loaded");
    if (onLoad) onLoad(e);
  };

  const handleImageError = (e) => {
    if (currentSrc !== fallback) {
      setCurrentSrc(fallback);
      setImageStatus("loading");
    } else {
      setImageStatus("error");
      if (onError) onError(e);
    }
  };

  if (!src) {
    return (
      <img
        src={fallback}
        alt={alt}
        className={className}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
      />
    );
  }

  const isLoading = imageStatus !== "loaded";

  return (
    <div
      className={`skeleton-image-wrapper${isLoading ? " skeleton-image-wrapper--loading" : ""}`}
    >
      {isLoading && <div className="skeleton-shimmer" />}
      <img
        src={currentSrc}
        alt={alt}
        className={className}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.6s ease",
          ...props.style,
        }}
      />
    </div>
  );
};

export default ImageDisplay;
