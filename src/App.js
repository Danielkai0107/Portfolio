import React, { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ShowPage from "./pages/ShowPage";

const App = () => {
  const [showOpen, setShowOpen] = useState(false);
  const [showItem, setShowItem] = useState([]);

  const handleShowPage = () => {
    setShowOpen(!showOpen);
  };

  const handleSetShow = (item) => {
    setShowItem(item)
    setShowOpen(true);
  };

  return (
    <>
      <Navbar setShowOpen={setShowOpen} />
      <Home handleShowPage={handleShowPage} handleSetShow={handleSetShow}/>
      {showOpen && <ShowPage setShowOpen={setShowOpen} showItem={showItem && showItem}/>}
    </>
  );
};

export default App;
