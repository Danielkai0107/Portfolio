import React from 'react'
import { Link } from 'react-router-dom'

const AppUIDesign = () => {


  return (
    <main className='app'>
      <article className='app_title'>
        <h1>
          App UI Design
        </h1>
        <p>
          應用程式專案作品
        </p>
      </article>
      <ul className='app_menu'>
        <Link to='/App01' className='app_menu_item'>
          <img src="/assets/images/AIEnglish/1.png" alt="" />
          <h1>AI English</h1>
          <p>介面設計</p>
        </Link>
        <Link to="/App02" className='app_menu_item'>
          <img src="/assets/images/UIDesign/1.png" alt="" />
          <h1>UI Redesign</h1>
          <p>痛點分析＆介面更新</p>
        </Link>
        <li className='app_menu_item'>
          <img src="/assets/images/Payment/1.png" alt="" />
          <h1>Payment UI</h1>
          <p>付費介面設計</p>
        </li>
        <li className='app_menu_item'>
          <img src="/assets/images/AIEnglish/4.png" alt="" />
          <h1>KIDS English</h1>
          <p>KIDS English 介面設計</p>
        </li>
      </ul>
    </main>
  )
}

export default AppUIDesign
