import React, { useLayoutEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import App01 from "./projects/App01";
import AppUIDesign from "./pages/AppUIDesign";
import App02 from "./projects/App02";
import GraphicDesign from "./pages/GraphicDesign";
import WebsiteUIDesign from "./pages/WebsiteUIDesign";
import { Route, Routes, useLocation } from "react-router-dom";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const App = () => {
  return (
    <>
      <Wrapper>
        <Navbar />
        <Routes>
          <Route path="/AppUIDesign" element={<AppUIDesign />} />
          <Route path="/GraphicDesign" element={<GraphicDesign />} />
          <Route path="/WebsiteUIDesign" element={<WebsiteUIDesign />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/App01" element={<App01 />} />
          <Route path="/App02" element={<App02 />} />
        </Routes>
      </Wrapper>
    </>
  );
};

export default App;
