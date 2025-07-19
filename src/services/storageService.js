import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

// 生成唯一檔案名稱
const generateUniqueFileName = (originalName) => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split(".").pop();
  return `${timestamp}_${randomString}.${extension}`;
};

// 上傳單一圖片
export const uploadImage = async (file, folder = "images") => {
  try {
    if (!file) {
      throw new Error("沒有選擇檔案");
    }

    // 檢查檔案類型
    if (!file.type.startsWith("image/")) {
      throw new Error("只能上傳圖片檔案");
    }

    // 檢查檔案大小 (限制 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error("圖片大小不能超過 5MB");
    }

    const uniqueFileName = generateUniqueFileName(file.name);
    const storageRef = ref(storage, `${folder}/${uniqueFileName}`);

    // 上傳檔案
    const snapshot = await uploadBytes(storageRef, file);

    // 獲取下載網址
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      url: downloadURL,
      fileName: uniqueFileName,
      path: `${folder}/${uniqueFileName}`,
    };
  } catch (error) {
    console.error("上傳圖片時發生錯誤：", error);
    throw error;
  }
};

// 上傳多張圖片
export const uploadMultipleImages = async (files, folder = "images") => {
  try {
    if (!files || files.length === 0) {
      throw new Error("沒有選擇檔案");
    }

    const uploadPromises = Array.from(files).map((file) =>
      uploadImage(file, folder)
    );
    const results = await Promise.all(uploadPromises);

    return results;
  } catch (error) {
    console.error("上傳多張圖片時發生錯誤：", error);
    throw error;
  }
};

// 上傳專案相關圖片 (main, image1, image2)
export const uploadProjectImages = async (
  mainImage,
  image1,
  image2,
  projectCategory
) => {
  try {
    const folder = `projects/${projectCategory}`;
    const uploadResults = {};

    // 上傳主要圖片
    if (mainImage) {
      uploadResults.main = await uploadImage(mainImage, folder);
    }

    // 上傳圖片1
    if (image1) {
      uploadResults.image1 = await uploadImage(image1, folder);
    }

    // 上傳圖片2
    if (image2) {
      uploadResults.image2 = await uploadImage(image2, folder);
    }

    return uploadResults;
  } catch (error) {
    console.error("上傳專案圖片時發生錯誤：", error);
    throw error;
  }
};

// 圖片壓縮函式 (可選)
export const compressImage = (file, maxWidth = 1200, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // 計算新尺寸
      let { width, height } = img;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      // 繪製並壓縮
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(resolve, "image/jpeg", quality);
    };

    img.src = URL.createObjectURL(file);
  });
};
