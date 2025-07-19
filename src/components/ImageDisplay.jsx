import React, { useState } from "react";

const ImageDisplay = ({
  src,
  alt = "",
  className = "",
  fallback = "/images/placeholder.png",
  showAnalysis = true, // 控制是否顯示開發模式分析標籤
  onLoad,
  onError,
  ...props
}) => {
  const [imageStatus, setImageStatus] = useState("loading"); // loading, loaded, error
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleImageLoad = (e) => {
    setImageStatus("loaded");
    if (onLoad) onLoad(e);
  };

  const handleImageError = (e) => {
    console.log(`圖片載入失敗: ${currentSrc}`);

    // 如果當前不是 fallback，切換到 fallback
    if (currentSrc !== fallback) {
      setCurrentSrc(fallback);
      setImageStatus("loading");
    } else {
      setImageStatus("error");
      if (onError) onError(e);
    }
  };

  // 檢查是否為 Firebase Storage URL
  const isFirebaseStorageUrl = (url) => {
    if (!url) return false;
    return (
      url.includes("firebasestorage.googleapis.com") ||
      url.includes("firebase") ||
      url.startsWith("https://")
    );
  };

  // 檢查是否為本地路徑
  const isLocalPath = (url) => {
    if (!url) return false;
    return url.startsWith("/") || url.startsWith("./");
  };

  // 如果沒有圖片來源，直接使用 fallback
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

  return (
    <>
      <img
        src={currentSrc}
        alt={alt}
        className={className}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
        style={{
          opacity: imageStatus === "loading" ? 0.7 : 1,
          transition: "opacity 0.3s ease",
          ...props.style,
        }}
      />

      {/* 顯示圖片來源類型（開發時使用，可透過 showAnalysis 控制） */}
      {process.env.NODE_ENV === "development" && showAnalysis && (
        <div
          style={{
            fontSize: "10px",
            color: "#666",
            marginTop: "2px",
            display: imageStatus === "loaded" ? "block" : "none",
          }}
        >
          {isFirebaseStorageUrl(currentSrc) && "🔥 Storage"}
          {isLocalPath(currentSrc) && "📁 Local"}
        </div>
      )}
    </>
  );
};

export default ImageDisplay;
