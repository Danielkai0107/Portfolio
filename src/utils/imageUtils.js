// 圖片路徑處理工具

/**
 * 檢測圖片 URL 類型
 * @param {string} url - 圖片 URL
 * @returns {string} - 'firebase' | 'local' | 'external' | 'invalid'
 */
export const detectImageType = (url) => {
  if (!url || typeof url !== "string") return "invalid";

  // Firebase Storage URL
  if (url.includes("firebasestorage.googleapis.com")) {
    return "firebase";
  }

  // 本地相對路徑
  if (url.startsWith("/") || url.startsWith("./")) {
    return "local";
  }

  // 外部 HTTPS URL
  if (url.startsWith("https://") || url.startsWith("http://")) {
    return "external";
  }

  return "invalid";
};

/**
 * 驗證圖片是否可以載入
 * @param {string} url - 圖片 URL
 * @returns {Promise<boolean>} - 是否成功載入
 */
export const validateImageUrl = (url) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      console.log(`✅ 圖片載入成功: ${url}`);
      resolve(true);
    };

    img.onerror = () => {
      console.log(`❌ 圖片載入失敗: ${url}`);
      resolve(false);
    };

    // 設置超時時間（10秒）
    setTimeout(() => {
      console.log(`⏰ 圖片載入超時: ${url}`);
      resolve(false);
    }, 10000);

    img.src = url;
  });
};

/**
 * 批次檢測專案中的所有圖片
 * @param {Array} projects - 專案陣列
 * @returns {Promise<Object>} - 檢測結果統計
 */
export const validateAllProjectImages = async (projects) => {
  console.log("🔍 開始檢測所有專案圖片...");

  const results = {
    total: 0,
    success: 0,
    failed: 0,
    firebase: 0,
    local: 0,
    external: 0,
    invalid: 0,
    details: [],
  };

  for (const project of projects) {
    if (!project.items || !Array.isArray(project.items)) continue;

    for (const item of project.items) {
      if (!item.images || !Array.isArray(item.images)) continue;

      for (let i = 0; i < item.images.length; i++) {
        const imageUrl = item.images[i];
        if (!imageUrl) continue;

        results.total++;

        const type = detectImageType(imageUrl);
        results[type]++;

        const isValid = await validateImageUrl(imageUrl);
        if (isValid) {
          results.success++;
        } else {
          results.failed++;
        }

        results.details.push({
          project: project.category,
          item: item.title,
          imageIndex: i,
          url: imageUrl,
          type,
          isValid,
        });
      }
    }
  }

  // 輸出統計結果
  console.log("\n📊 圖片檢測結果統計:");
  console.log(`總圖片數: ${results.total}`);
  console.log(
    `成功載入: ${results.success} (${(
      (results.success / results.total) *
      100
    ).toFixed(1)}%)`
  );
  console.log(
    `載入失敗: ${results.failed} (${(
      (results.failed / results.total) *
      100
    ).toFixed(1)}%)`
  );
  console.log(`Firebase Storage: ${results.firebase}`);
  console.log(`本地路徑: ${results.local}`);
  console.log(`外部連結: ${results.external}`);
  console.log(`無效路徑: ${results.invalid}`);

  // 顯示失敗的圖片詳細資訊
  const failedImages = results.details.filter((item) => !item.isValid);
  if (failedImages.length > 0) {
    console.log("\n❌ 載入失敗的圖片:");
    failedImages.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.project} > ${item.item} > 圖片${
          item.imageIndex + 1
        }`
      );
      console.log(`   URL: ${item.url}`);
      console.log(`   類型: ${item.type}`);
    });
  }

  return results;
};

/**
 * 在開發模式下顯示圖片資訊
 * @param {string} url - 圖片 URL
 * @param {string} title - 項目標題
 */
export const logImageInfo = (url, title = "") => {
  if (process.env.NODE_ENV !== "development") return;

  const type = detectImageType(url);
  const emoji = {
    firebase: "🔥",
    local: "📁",
    external: "🌐",
    invalid: "❌",
  };

  console.log(`${emoji[type]} ${type.toUpperCase()}: ${title} -> ${url}`);
};
