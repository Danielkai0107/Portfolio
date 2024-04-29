import React, { useEffect } from 'react'
import { projects } from '../libs/projects.js';
import { useNavigate, useParams } from 'react-router-dom';
import TopBtn from '../components/TopBtn';

const MenuPage = () => {
  const navigate = useNavigate();
  const { list } = useParams();
  const pIndex = list
  const items = projects[pIndex].items;

  const handleSetShow = (id, category) => {
    navigate(`/Project/${id}/${category}`);
  };

  const handleBack = () => {
    navigate(`/?scrollToId=section${pIndex}`, { replace: true });
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [list])

  return (
    <article className='menu'>
      <figure className="icon back" onClick={handleBack}>
        <span></span>
        <p>Home</p>
      </figure>
      <section className='menu_title'>
        <h1>Menu</h1>
      </section>
      <ul className='menu_list'>
        {items.map((item, index) => (
          <li key={index} onClick={() => { handleSetShow(item.id, pIndex) }}>
            <figure>
              <img src={item.images[1]} alt="" />
            </figure>
            <h1>
              <span>
                0{item.id}
              </span>
              {item.title}
            </h1>
            <p>
              {item.info}
            </p>
          </li>
        ))}
      </ul>
      <TopBtn />
    </article>
  )
}

export default MenuPage
