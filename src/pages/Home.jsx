import React, { useState, useEffect } from 'react';
import Home01 from '../components/Home01';
import ToTopBtn from '../components/TopBtn';
import MenuPage from './MenuPage';
import ShowPage from './ShowPage';

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleShowProject = (project) => {
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseShow = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollToId = params.get('scrollToId');
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <main className='home'>
      {selectedProject ? (
        <ShowPage selectedProject={selectedProject} handleCloseShow={handleCloseShow} />
      ) : (
        <>
          <Home01 />
          <section className='home_menu_title'>
            <h1>01 Website Design</h1>
            <h2>網頁設計</h2>
          </section>
          <MenuPage pIndex={1} handleShowProject={handleShowProject} />
          <section className='home_menu_title'>
            <h1>02 App UI UX Design</h1>
            <h2>使用者介面設計</h2>
          </section>
          <MenuPage pIndex={0} handleShowProject={handleShowProject} />
          <section className='home_menu_title'>
            <h1>03 Graphic Design</h1>
            <h2>平面設計</h2>
          </section>
          <MenuPage pIndex={2} handleShowProject={handleShowProject} />

          <ToTopBtn />
        </>
      )}
    </main>
  );
};

export default Home;
