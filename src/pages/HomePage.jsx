import React from 'react'
import { Link } from 'react-router-dom'
import ImgSlider from '../components/ImgSlider'
import { ImageApp01 } from '../func/imgList'

const HomePage = () => {

  return (
    <main className='home'>
      <article className='home_title'>
        <h2>Hello, I'm Daniel.</h2>
        <h1>A passionate designer specializing in web and graphic design.</h1>
      </article>
      <article className='home_menu'>
        <Link to="/WebsiteUIDesign" className='home_menu_item'>
          <ImgSlider images={ImageApp01} />
          <h1>網頁設計</h1>
          <h2>Website UI Design</h2>
        </Link>
        <Link to="/AppUIDesign" className='home_menu_item'>
          <ImgSlider images={ImageApp01} />
          <h1>應用程式介面設計</h1>
          <h2>APP UI Design</h2>
        </Link>
        <Link to="/GraphicDesign" className='home_menu_item'>
          <ImgSlider images={ImageApp01} />
          <h1>平面設計</h1>
          <h2>Graphic Design</h2>
        </Link>
      </article>
    </main>
  )
}

export default HomePage
