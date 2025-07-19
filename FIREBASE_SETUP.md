# Firebase 資料庫整合說明

## 🎉 完成項目

您的作品集網站已經成功從本地資料轉移到 Firebase Firestore！

## 📁 新增的檔案

### 1. Firebase 配置

- `src/firebase/config.js` - Firebase 初始化設定檔

### 2. 資料服務

- `src/services/projectService.js` - 處理 Firebase 資料讀取的服務層

### 3. 上傳工具

- `scripts/uploadProjects.js` - 資料上傳腳本
- `scripts/projectsData.js` - 上傳用資料檔案

## 🔄 修改的組件

### 已更新的組件

1. **MenuPage.jsx** - 現在從 Firebase 讀取專案資料
2. **ShowPage.jsx** - 現在從 Firebase 讀取專案資料
3. **Home02.jsx** - 現在從 Firebase 讀取專案資料

所有組件都加入了：

- 載入狀態顯示
- 錯誤處理
- 資料安全檢查

## 📊 Firestore 資料結構

```
Collection: projects
├── Document: "1"
│   ├── id: 1
│   ├── category: "APP"
│   ├── order: 1
│   ├── items: [...]
│   ├── createdAt: "2025-01-28T..."
│   └── updatedAt: "2025-01-28T..."
├── Document: "2"
│   ├── id: 2
│   ├── category: "Web"
│   └── ...
└── Document: "3"
    ├── id: 3
    ├── category: "Graphic"
    └── ...
```

## 🚀 如何使用

### 啟動開發環境

```bash
npm start
```

### 重新上傳資料（如果需要）

```bash
npm run upload-projects
```

## 🔧 如何更新專案資料

### 方法 1：直接在 Firebase Console 更新

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 選擇您的專案 `portfolio-ec84e`
3. 進入 Firestore Database
4. 找到 `projects` collection
5. 直接編輯文檔

### 方法 2：更新程式碼後重新上傳

1. 修改 `scripts/projectsData.js` 中的資料
2. 執行 `npm run upload-projects`

## 🎯 主要優勢

### ✅ 已實現

- **即時同步**：資料變更即時反映在網站上
- **雲端儲存**：不再依賴本地檔案
- **載入優化**：加入載入狀態和錯誤處理
- **擴展性**：可輕鬆新增、修改、刪除專案

### 🚀 未來可擴展功能

- 使用者認證
- 即時資料監聽
- 離線支援
- 圖片上傳至 Firebase Storage
- 內容管理系統 (CMS)

## 📝 注意事項

1. **Firebase 配置**：您的 Firebase 配置已包含在程式碼中
2. **安全規則**：建議在 Firebase Console 中設定適當的安全規則
3. **備份**：原本的 `src/libs/projects.js` 檔案仍保留作為備份

## 🔒 安全建議

在生產環境中，建議：

1. 使用環境變數存儲 Firebase 配置
2. 設定適當的 Firestore 安全規則
3. 啟用 Firebase App Check

## 📞 如需協助

如果您遇到任何問題或需要新增功能，請告知！
