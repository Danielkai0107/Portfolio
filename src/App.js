// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from "./pages/Home";
import ShowPage from "./pages/ShowPage";
import MenuPage from "./pages/MenuPage";

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Project/:id/:category" element={<ShowPage />} />
        <Route path="/Menu/:list" element={<MenuPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
