//Home.jsx
import React, { useEffect } from 'react';
import Home01 from '../components/Home01';
import Home02 from '../components/Home02';
import ToTopBtn from '../components/TopBtn';
import { useLocation, useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const handleSetMenu = (categoryIndex) => {
    navigate(`/Menu/${categoryIndex}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollToId = params.get('scrollToId');
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <main className='home'>
      <Home01 />
      <Home02 handleSetMenu={handleSetMenu} pIndex={0} id="section0" />
      <Home02 handleSetMenu={handleSetMenu} pIndex={1} id="section1" />
      <Home02 handleSetMenu={handleSetMenu} pIndex={2} id="section2" />
      <ToTopBtn />
    </main>
  );
};

export default Home;
