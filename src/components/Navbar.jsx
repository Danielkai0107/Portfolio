import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const [unstick, setUnstick] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 10) {
        setUnstick(false);
      }
      else if (currentScrollY > lastScrollY) {
        // 向上滾動
        setUnstick(true);
      } else {
        // 向下滾動
        setUnstick(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={unstick ? 'unstick' : ''}>
      <Link className='logo' to="/"></Link>
      <Link className='home_btn' to="/"></Link>
      <ul className='nav_md'>
        <Link className='nav_md_btn' to="/">Home</Link>
        <Link className='nav_md_btn' to="/">About</Link>
        <Link className='nav_md_btn' to="/">Connect</Link>
      </ul>
    </nav>
  )
}

export default Navbar
