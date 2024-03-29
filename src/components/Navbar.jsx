import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    navigate(`/`);
  }

  return (
    <nav>
      <ul>
      </ul>
      <figure onClick={goToTop} >
        <span ></span>
      </figure>
    </nav>
  )
}

export default Navbar
