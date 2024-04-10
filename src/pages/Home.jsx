//Home.jsx
import React, { } from 'react';
import Home01 from '../components/Home01';
import Home02 from '../components/Home02';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();
  const handleSetShow = (currentItem, categoryIndex) => {
    navigate(`/Project/${currentItem}/${categoryIndex}`);
  };

  return (
    <main className='home'>
      <Home01 />
      <Home02 handleSetShow={handleSetShow} pIndex={2} />
      <Home02 handleSetShow={handleSetShow} pIndex={3} />
      <Home02 handleSetShow={handleSetShow} pIndex={0} />
      <Home02 handleSetShow={handleSetShow} pIndex={1} />
    </main>
  );
};

export default Home;
