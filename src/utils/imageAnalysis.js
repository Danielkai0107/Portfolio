// 圖片使用情況分析工具

/**
 * 分析專案中的圖片使用情況
 * @param {Array} projects - 專案陣列
 * @returns {Object} - 分析結果
 */
export const analyzeImageUsage = (projects) => {
  console.log("🔍 開始分析圖片使用情況...");

  const analysis = {
    total: 0,
    uniqueImage2: 0,
    duplicateImage2: 0,
    sameAsMain: 0,
    sameAsImage1: 0,
    details: [],
  };

  projects.forEach((project, projectIndex) => {
    if (!project.items || !Array.isArray(project.items)) return;

    project.items.forEach((item, itemIndex) => {
      if (!item.images || !Array.isArray(item.images)) return;

      analysis.total++;

      const [main, image1, image2] = item.images;

      let image2Status = "unique";
      if (image2 === main) {
        analysis.sameAsMain++;
        image2Status = "same_as_main";
      } else if (image2 === image1) {
        analysis.sameAsImage1++;
        image2Status = "same_as_image1";
      } else {
        analysis.uniqueImage2++;
        image2Status = "unique";
      }

      if (image2Status !== "unique") {
        analysis.duplicateImage2++;
      }

      analysis.details.push({
        project: project.category,
        item: item.title,
        images: {
          main,
          image1,
          image2,
        },
        image2Status,
        isDuplicate: image2Status !== "unique",
      });
    });
  });

  // 輸出分析結果
  console.log("\n📊 圖片使用分析結果:");
  console.log(`總項目數: ${analysis.total}`);
  console.log(
    `圖片二獨特: ${analysis.uniqueImage2} (${(
      (analysis.uniqueImage2 / analysis.total) *
      100
    ).toFixed(1)}%)`
  );
  console.log(
    `圖片二重複: ${analysis.duplicateImage2} (${(
      (analysis.duplicateImage2 / analysis.total) *
      100
    ).toFixed(1)}%)`
  );
  console.log(`  - 與主圖相同: ${analysis.sameAsMain}`);
  console.log(`  - 與圖片一相同: ${analysis.sameAsImage1}`);

  // 顯示重複圖片的項目
  const duplicates = analysis.details.filter((item) => item.isDuplicate);
  if (duplicates.length > 0) {
    console.log("\n🔄 圖片二重複的項目:");
    duplicates.forEach((item, index) => {
      console.log(`${index + 1}. ${item.project} > ${item.item}`);
      console.log(
        `   狀態: ${
          item.image2Status === "same_as_main" ? "與主圖相同" : "與圖片一相同"
        }`
      );
    });
  }

  // 顯示獨特圖片的項目
  const unique = analysis.details.filter((item) => !item.isDuplicate);
  if (unique.length > 0) {
    console.log("\n✨ 圖片二獨特的項目:");
    unique.forEach((item, index) => {
      console.log(`${index + 1}. ${item.project} > ${item.item}`);
    });
  }

  return analysis;
};

/**
 * 檢測圖片在 UI 中的顯示位置
 * @returns {Object} - 顯示位置說明
 */
export const getImageDisplayLocations = () => {
  const locations = {
    "images[0]": [
      "ShowPage - 詳細頁面的主要圖片",
      "AdminPage - 管理頁面的縮圖預覽",
    ],
    "images[1]": [
      "MenuPage - 選單列表的項目縮圖",
      "Home02 - 首頁輪播的卡片圖片（與圖片二輪播）",
    ],
    "images[2]": ["Home02 - 首頁輪播的卡片圖片（與圖片一輪播）"],
  };

  console.log("\n📍 圖片在 UI 中的使用位置:");
  Object.entries(locations).forEach(([imageIndex, usages]) => {
    console.log(`\n${imageIndex}:`);
    usages.forEach((usage) => {
      console.log(`  • ${usage}`);
    });
  });

  return locations;
};

/**
 * 建議優化方案
 * @param {Object} analysis - 分析結果
 * @returns {Array} - 優化建議
 */
export const getOptimizationSuggestions = (analysis) => {
  const suggestions = [];

  if (analysis.duplicateImage2 > analysis.total * 0.5) {
    suggestions.push({
      type: "warning",
      title: "圖片二大量重複",
      description: `${analysis.duplicateImage2}/${analysis.total} 的項目圖片二重複使用，建議考慮移除或替換。`,
      action: "optimize_duplicates",
    });
  }

  if (analysis.sameAsMain > 0) {
    suggestions.push({
      type: "info",
      title: "與主圖重複",
      description: `${analysis.sameAsMain} 個項目的背景圖與主圖相同，首頁輪播效果不明顯。`,
      action: "replace_main_duplicates",
    });
  }

  if (analysis.uniqueImage2 === 0) {
    suggestions.push({
      type: "critical",
      title: "沒有獨特的背景圖",
      description:
        "所有項目的圖片二都是重複的，建議移除背景圖功能或添加獨特圖片。",
      action: "remove_or_add_unique",
    });
  }

  console.log("\n💡 優化建議:");
  suggestions.forEach((suggestion, index) => {
    const emoji =
      suggestion.type === "critical"
        ? "🚨"
        : suggestion.type === "warning"
        ? "⚠️"
        : "ℹ️";
    console.log(`${emoji} ${index + 1}. ${suggestion.title}`);
    console.log(`   ${suggestion.description}`);
  });

  return suggestions;
};
