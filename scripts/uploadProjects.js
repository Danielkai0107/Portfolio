const { initializeApp } = require("firebase/app");
const { getFirestore, collection, doc, setDoc } = require("firebase/firestore");
const { projects } = require("./projectsData.js");

// Firebase 配置
const firebaseConfig = {
  apiKey: "AIzaSyDC1WIgscSN4_l2FsP2Ot6GvKupfyIDcFI",
  authDomain: "portfolio-ec84e.firebaseapp.com",
  projectId: "portfolio-ec84e",
  storageBucket: "portfolio-ec84e.firebasestorage.app",
  messagingSenderId: "312143085982",
  appId: "1:312143085982:web:253ca82b9658a1a1c6168f",
  measurementId: "G-3VDWRRC75S",
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadProjects() {
  try {
    console.log("開始上傳專案資料到 Firebase...");

    // 為了避免重複的分類 ID，我們需要過濾掉重複的項目
    const uniqueProjects = projects.reduce((acc, current) => {
      const existingProject = acc.find(
        (project) => project.category === current.category
      );
      if (!existingProject) {
        acc.push(current);
      }
      return acc;
    }, []);

    for (let i = 0; i < uniqueProjects.length; i++) {
      const project = uniqueProjects[i];

      // 創建文件 ID（使用索引 + 1）
      const docId = (i + 1).toString();

      // 準備要上傳的資料
      const projectData = {
        id: i + 1,
        category: project.category,
        items: project.items,
        order: i + 1, // 用於排序
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // 上傳到 Firestore
      const projectRef = doc(db, "projects", docId);
      await setDoc(projectRef, projectData);

      console.log(`✅ 已上傳分類：${project.category} (ID: ${docId})`);
    }

    console.log("🎉 所有專案資料上傳完成！");
    console.log(`總共上傳了 ${uniqueProjects.length} 個分類`);

    // 輸出分類摘要
    uniqueProjects.forEach((project, index) => {
      console.log(
        `${index + 1}. ${project.category} - ${project.items.length} 個項目`
      );
    });
  } catch (error) {
    console.error("❌ 上傳過程中發生錯誤：", error);
  }
}

// 執行上傳
uploadProjects()
  .then(() => {
    console.log("上傳腳本執行完畢");
    process.exit(0);
  })
  .catch((error) => {
    console.error("腳本執行失敗：", error);
    process.exit(1);
  });
