import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

// 獲取所有專案資料
export const getAllProjects = async () => {
  try {
    const projectsCollection = collection(db, "projects");
    const q = query(projectsCollection, orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);

    const projects = [];
    querySnapshot.forEach((doc) => {
      projects.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return projects;
  } catch (error) {
    console.error("取得專案資料時發生錯誤：", error);
    throw error;
  }
};

// 根據分類獲取專案
export const getProjectsByCategory = async (category) => {
  try {
    const projectsCollection = collection(db, "projects");
    const querySnapshot = await getDocs(projectsCollection);

    const projects = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.category === category) {
        projects.push({
          id: doc.id,
          ...data,
        });
      }
    });

    return projects;
  } catch (error) {
    console.error("根據分類取得專案資料時發生錯誤：", error);
    throw error;
  }
};

// 根據 ID 獲取單一專案
export const getProjectById = async (projectId, itemId) => {
  try {
    const projects = await getAllProjects();

    for (const project of projects) {
      const item = project.items.find((item) => item.id === parseInt(itemId));
      if (item && project.id === parseInt(projectId)) {
        return { project, item };
      }
    }

    return null;
  } catch (error) {
    console.error("根據 ID 取得專案資料時發生錯誤：", error);
    throw error;
  }
};

// 新增項目到現有分類
export const addItemToCategory = async (categoryId, newItem) => {
  try {
    const docRef = doc(db, "projects", categoryId.toString());
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("分類不存在");
    }

    const categoryData = docSnap.data();
    const existingItems = categoryData.items || [];

    // 生成新的 ID
    const maxId = existingItems.length > 0 ? Math.max(...existingItems.map((item) => item.id)) : 0;
    const itemWithId = {
      ...newItem,
      id: maxId + 1,
    };

    const updatedItems = [...existingItems, itemWithId];

    await updateDoc(docRef, {
      items: updatedItems,
      updatedAt: new Date().toISOString(),
    });

    return itemWithId;
  } catch (error) {
    console.error("新增項目時發生錯誤：", error);
    throw error;
  }
};

// 編輯現有項目
export const updateProjectItem = async (categoryId, itemId, updatedItem) => {
  try {
    const docRef = doc(db, "projects", categoryId.toString());
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("分類不存在");
    }

    const categoryData = docSnap.data();
    const items = categoryData.items || [];

    const itemIndex = items.findIndex((item) => item.id === parseInt(itemId));
    if (itemIndex === -1) {
      throw new Error("項目不存在");
    }

    // 更新項目，保持原有 ID
    items[itemIndex] = {
      ...updatedItem,
      id: parseInt(itemId),
    };

    await updateDoc(docRef, {
      items: items,
      updatedAt: new Date().toISOString(),
    });

    return items[itemIndex];
  } catch (error) {
    console.error("更新項目時發生錯誤：", error);
    throw error;
  }
};

// 刪除項目
export const deleteProjectItem = async (categoryId, itemId) => {
  try {
    const docRef = doc(db, "projects", categoryId.toString());
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("分類不存在");
    }

    const categoryData = docSnap.data();
    const items = categoryData.items || [];

    const filteredItems = items.filter((item) => item.id !== parseInt(itemId));

    if (filteredItems.length === items.length) {
      throw new Error("項目不存在");
    }

    await updateDoc(docRef, {
      items: filteredItems,
      updatedAt: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("刪除項目時發生錯誤：", error);
    throw error;
  }
};

// 新增分類
export const addCategory = async (categoryData) => {
  try {
    const projects = await getAllProjects();
    const maxId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) : 0;
    const newOrder = projects.length > 0 ? Math.max(...projects.map((p) => p.order)) : 0;

    const newCategoryData = {
      id: maxId + 1,
      category: categoryData.category,
      items: categoryData.items || [],
      order: newOrder + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = doc(db, "projects", (maxId + 1).toString());
    await setDoc(docRef, newCategoryData);

    return newCategoryData;
  } catch (error) {
    console.error("新增分類時發生錯誤：", error);
    throw error;
  }
};
