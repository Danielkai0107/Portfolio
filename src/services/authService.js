import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/config";

// 使用信箱和密碼登入
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("登入失敗:", error);

    // 提供更友善的錯誤訊息
    let errorMessage;
    switch (error.code) {
      case "auth/user-not-found":
        errorMessage = "此信箱尚未註冊";
        break;
      case "auth/wrong-password":
        errorMessage = "密碼錯誤";
        break;
      case "auth/invalid-email":
        errorMessage = "信箱格式無效";
        break;
      case "auth/too-many-requests":
        errorMessage = "嘗試次數過多，請稍後再試";
        break;
      default:
        errorMessage = "登入失敗，請檢查信箱和密碼";
    }

    throw new Error(errorMessage);
  }
};

// 註冊新用戶 (可選功能)
export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("註冊失敗:", error);

    let errorMessage;
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "此信箱已被使用";
        break;
      case "auth/weak-password":
        errorMessage = "密碼強度不足，至少需要6個字符";
        break;
      case "auth/invalid-email":
        errorMessage = "信箱格式無效";
        break;
      default:
        errorMessage = "註冊失敗，請稍後再試";
    }

    throw new Error(errorMessage);
  }
};

// 登出
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("登出失敗:", error);
    throw new Error("登出失敗");
  }
};

// 監聽認證狀態變化
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// 獲取當前用戶
export const getCurrentUser = () => {
  return auth.currentUser;
};

// 檢查用戶是否已登入
export const isAuthenticated = () => {
  return !!auth.currentUser;
};
