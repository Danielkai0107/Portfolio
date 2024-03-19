import React from 'react'

const Navbar = ({setShowOpen}) => {

  const goToTop = () => {
    setShowOpen(false)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <nav>
      <ul>
        <li>About</li>
        <li>Work</li>
      </ul>
      <figure onClick={goToTop} >
        <span ></span>
      </figure>
    </nav>
  )
}

export default Navbar
