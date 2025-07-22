// App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import ShowPage from "./pages/ShowPage";
import MenuPage from "./pages/MenuPage";
import AdminPage from "./pages/AdminPage";
import analyticsService from "./services/analyticsService";

// 路由追蹤組件
const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      analyticsService.trackPageView("home", "首頁");
    } else if (path.startsWith("/Project/")) {
      const pathSegments = path.split("/");
      const projectId = pathSegments[2];
      const category = pathSegments[3];
      analyticsService.trackPageView("project", `項目詳情 - ${category}`);
    } else if (path.startsWith("/Menu/")) {
      const pathSegments = path.split("/");
      const menuType = pathSegments[2];
      analyticsService.trackPageView("menu", `選單 - ${menuType}`);
    } else if (path === "/admin") {
      analyticsService.trackPageView("admin", "管理頁面");
    }
  }, [location]);

  return null;
};

const App = () => {
  useEffect(() => {
    console.log("🚀 Portfolio App Started - Analytics Enabled");
  }, []);

  return (
    <Router>
      <RouteTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/Project/:id/:category" element={<ShowPage />} />
        <Route path="/Menu/:list" element={<MenuPage />} />
      </Routes>
    </Router>
  );
};

export default App;
