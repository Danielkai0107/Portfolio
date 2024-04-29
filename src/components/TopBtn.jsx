import React from 'react'

const TopBtn = () => {

  const handleToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  return (
    <ul className='toTopBtn' onClick={handleToTop}>
      <li>
        <span></span>
        <p>TO THE TOP</p>
      </li>
    </ul>
  )
}

export default TopBtn
