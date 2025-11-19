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
    const maxId =
      existingItems.length > 0
        ? Math.max(...existingItems.map((item) => item.id))
        : 0;
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
    const maxId =
      projects.length > 0 ? Math.max(...projects.map((p) => p.id)) : 0;
    const newOrder =
      projects.length > 0 ? Math.max(...projects.map((p) => p.order)) : 0;

    const newCategoryData = {
      id: maxId + 1,
      category: categoryData.category,
      description: categoryData.description || "作品展示", // 新增描述欄位
      visible: categoryData.visible !== false, // 預設為可見，除非明確設為 false
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

// 刪除整個分類
export const deleteCategory = async (categoryId) => {
  try {
    const docRef = doc(db, "projects", categoryId.toString());
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("分類不存在");
    }

    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("刪除分類時發生錯誤：", error);
    throw error;
  }
};

// 更新分類名稱
export const updateCategoryName = async (categoryId, newCategoryName) => {
  try {
    const docRef = doc(db, "projects", categoryId.toString());
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("分類不存在");
    }

    await updateDoc(docRef, {
      category: newCategoryName,
      updatedAt: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("更新分類名稱時發生錯誤：", error);
    throw error;
  }
};

// 更新分類描述
export const updateCategoryDescription = async (categoryId, newDescription) => {
  try {
    const docRef = doc(db, "projects", categoryId.toString());
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("分類不存在");
    }

    await updateDoc(docRef, {
      description: newDescription,
      updatedAt: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("更新分類描述時發生錯誤：", error);
    throw error;
  }
};

// 統一更新分類基本資訊（標題和描述）
export const updateCategoryInfo = async (
  categoryId,
  categoryName,
  description
) => {
  try {
    const docRef = doc(db, "projects", categoryId.toString());
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("分類不存在");
    }

    await updateDoc(docRef, {
      category: categoryName,
      description: description,
      updatedAt: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("更新分類資訊時發生錯誤：", error);
    throw error;
  }
};

// 切換分類可見性
export const toggleCategoryVisibility = async (categoryId) => {
  try {
    const docRef = doc(db, "projects", categoryId.toString());
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("分類不存在");
    }

    const currentData = docSnap.data();
    const newVisibility = !currentData.visible;

    await updateDoc(docRef, {
      visible: newVisibility,
      updatedAt: new Date().toISOString(),
    });

    return newVisibility;
  } catch (error) {
    console.error("切換分類可見性時發生錯誤：", error);
    throw error;
  }
};

// 初始化現有分類的描述欄位
export const initializeExistingCategoryDescriptions = async () => {
  try {
    const projects = await getAllProjects();
    const defaultDescriptions = {
      Web: "網頁設計",
      APP: "使用者介面設計",
      Graphic: "平面設計",
    };

    const updatePromises = projects
      .filter((project) => !project.description) // 只處理沒有描述的分類
      .map(async (project) => {
        const docRef = doc(db, "projects", project.id.toString());
        const defaultDescription =
          defaultDescriptions[project.category] || "作品展示";

        return updateDoc(docRef, {
          description: defaultDescription,
          updatedAt: new Date().toISOString(),
        });
      });

    if (updatePromises.length > 0) {
      await Promise.all(updatePromises);
      console.log(`已成功初始化 ${updatePromises.length} 個分類的描述`);
    }

    return updatePromises.length;
  } catch (error) {
    console.error("初始化分類描述時發生錯誤：", error);
    throw error;
  }
};

// 初始化現有分類的可見性欄位
export const initializeExistingCategoryVisibility = async () => {
  try {
    const projects = await getAllProjects();

    const updatePromises = projects
      .filter((project) => project.visible === undefined) // 只處理沒有 visible 欄位的分類
      .map(async (project) => {
        const docRef = doc(db, "projects", project.id.toString());

        return updateDoc(docRef, {
          visible: true, // 預設為可見
          updatedAt: new Date().toISOString(),
        });
      });

    if (updatePromises.length > 0) {
      await Promise.all(updatePromises);
      console.log(`已成功初始化 ${updatePromises.length} 個分類的可見性`);
    }

    return updatePromises.length;
  } catch (error) {
    console.error("初始化分類可見性時發生錯誤：", error);
    throw error;
  }
};

// 向上移動分類
export const moveCategoryUp = async (categoryId) => {
  try {
    const projects = await getAllProjects();
    const currentProject = projects.find((p) => p.id === categoryId);

    if (!currentProject) {
      throw new Error("找不到指定的分類");
    }

    // 找到當前分類的順序
    const currentOrder = currentProject.order;

    // 找到需要交換的上一個分類（order值小於當前且最接近的）
    const previousProject = projects
      .filter((p) => p.order < currentOrder)
      .sort((a, b) => b.order - a.order)[0];

    if (!previousProject) {
      throw new Error("已經是第一個分類，無法向上移動");
    }

    // 交換兩個分類的order值
    const currentDocRef = doc(db, "projects", categoryId.toString());
    const previousDocRef = doc(db, "projects", previousProject.id.toString());

    await updateDoc(currentDocRef, {
      order: previousProject.order,
      updatedAt: new Date().toISOString(),
    });

    await updateDoc(previousDocRef, {
      order: currentOrder,
      updatedAt: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("向上移動分類時發生錯誤：", error);
    throw error;
  }
};

// 向下移動分類
export const moveCategoryDown = async (categoryId) => {
  try {
    const projects = await getAllProjects();
    const currentProject = projects.find((p) => p.id === categoryId);

    if (!currentProject) {
      throw new Error("找不到指定的分類");
    }

    // 找到當前分類的順序
    const currentOrder = currentProject.order;

    // 找到需要交換的下一個分類（order值大於當前且最接近的）
    const nextProject = projects
      .filter((p) => p.order > currentOrder)
      .sort((a, b) => a.order - b.order)[0];

    if (!nextProject) {
      throw new Error("已經是最後一個分類，無法向下移動");
    }

    // 交換兩個分類的order值
    const currentDocRef = doc(db, "projects", categoryId.toString());
    const nextDocRef = doc(db, "projects", nextProject.id.toString());

    await updateDoc(currentDocRef, {
      order: nextProject.order,
      updatedAt: new Date().toISOString(),
    });

    await updateDoc(nextDocRef, {
      order: currentOrder,
      updatedAt: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("向下移動分類時發生錯誤：", error);
    throw error;
  }
};

// 向上移動子項目
export const moveItemUp = async (categoryId, itemId) => {
  try {
    const docRef = doc(db, "projects", categoryId.toString());
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("分類不存在");
    }

    const categoryData = docSnap.data();
    const items = [...(categoryData.items || [])];

    // 找到當前項目的索引
    const currentIndex = items.findIndex(
      (item) => item.id === parseInt(itemId)
    );

    if (currentIndex === -1) {
      throw new Error("找不到指定的項目");
    }

    if (currentIndex === 0) {
      throw new Error("已經是第一個項目，無法向上移動");
    }

    // 交換當前項目和上一個項目的位置
    [items[currentIndex - 1], items[currentIndex]] = [
      items[currentIndex],
      items[currentIndex - 1],
    ];

    await updateDoc(docRef, {
      items: items,
      updatedAt: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("向上移動子項目時發生錯誤：", error);
    throw error;
  }
};

// 向下移動子項目
export const moveItemDown = async (categoryId, itemId) => {
  try {
    const docRef = doc(db, "projects", categoryId.toString());
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("分類不存在");
    }

    const categoryData = docSnap.data();
    const items = [...(categoryData.items || [])];

    // 找到當前項目的索引
    const currentIndex = items.findIndex(
      (item) => item.id === parseInt(itemId)
    );

    if (currentIndex === -1) {
      throw new Error("找不到指定的項目");
    }

    if (currentIndex === items.length - 1) {
      throw new Error("已經是最後一個項目，無法向下移動");
    }

    // 交換當前項目和下一個項目的位置
    [items[currentIndex], items[currentIndex + 1]] = [
      items[currentIndex + 1],
      items[currentIndex],
    ];

    await updateDoc(docRef, {
      items: items,
      updatedAt: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("向下移動子項目時發生錯誤：", error);
    throw error;
  }
};

// 移動子項目到最前面
export const moveItemToFirst = async (categoryId, itemId) => {
  try {
    const docRef = doc(db, "projects", categoryId.toString());
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("分類不存在");
    }

    const categoryData = docSnap.data();
    const items = [...(categoryData.items || [])];

    // 找到當前項目的索引
    const currentIndex = items.findIndex(
      (item) => item.id === parseInt(itemId)
    );

    if (currentIndex === -1) {
      throw new Error("找不到指定的項目");
    }

    if (currentIndex === 0) {
      throw new Error("項目已經在最前面");
    }

    // 移動項目到最前面
    const [movedItem] = items.splice(currentIndex, 1);
    items.unshift(movedItem);

    await updateDoc(docRef, {
      items: items,
      updatedAt: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("移動子項目到最前面時發生錯誤：", error);
    throw error;
  }
};

// 移動子項目到最後面
export const moveItemToLast = async (categoryId, itemId) => {
  try {
    const docRef = doc(db, "projects", categoryId.toString());
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("分類不存在");
    }

    const categoryData = docSnap.data();
    const items = [...(categoryData.items || [])];

    // 找到當前項目的索引
    const currentIndex = items.findIndex(
      (item) => item.id === parseInt(itemId)
    );

    if (currentIndex === -1) {
      throw new Error("找不到指定的項目");
    }

    if (currentIndex === items.length - 1) {
      throw new Error("項目已經在最後面");
    }

    // 移動項目到最後面
    const [movedItem] = items.splice(currentIndex, 1);
    items.push(movedItem);

    await updateDoc(docRef, {
      items: items,
      updatedAt: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("移動子項目到最後面時發生錯誤：", error);
    throw error;
  }
};

// 移動項目到其他類別
export const moveItemToCategory = async (sourceCategoryId, itemId, targetCategoryId, targetIndex = null) => {
  try {
    // 獲取來源類別
    const sourceDocRef = doc(db, "projects", sourceCategoryId.toString());
    const sourceDocSnap = await getDoc(sourceDocRef);

    if (!sourceDocSnap.exists()) {
      throw new Error("來源分類不存在");
    }

    // 獲取目標類別
    const targetDocRef = doc(db, "projects", targetCategoryId.toString());
    const targetDocSnap = await getDoc(targetDocRef);

    if (!targetDocSnap.exists()) {
      throw new Error("目標分類不存在");
    }

    const sourceData = sourceDocSnap.data();
    const targetData = targetDocSnap.data();

    // 從來源類別中找到要移動的項目
    const sourceItems = [...(sourceData.items || [])];
    const itemIndex = sourceItems.findIndex((item) => item.id === parseInt(itemId));

    if (itemIndex === -1) {
      throw new Error("找不到指定的項目");
    }

    // 移除項目 from 來源類別
    const [movedItem] = sourceItems.splice(itemIndex, 1);

    // 將項目添加到目標類別
    const targetItems = [...(targetData.items || [])];
    
    // 處理 targetIndex：如果為 null 或超出範圍，則添加到最後
    if (targetIndex !== null && targetIndex >= 0 && targetIndex <= targetItems.length) {
      // 插入到指定位置
      targetItems.splice(targetIndex, 0, movedItem);
    } else {
      // 添加到最後
      targetItems.push(movedItem);
    }

    // 更新兩個類別
    await updateDoc(sourceDocRef, {
      items: sourceItems,
      updatedAt: new Date().toISOString(),
    });

    await updateDoc(targetDocRef, {
      items: targetItems,
      updatedAt: new Date().toISOString(),
    });

    return true;
  } catch (error) {
    console.error("移動項目到其他類別時發生錯誤：", error);
    throw error;
  }
};
