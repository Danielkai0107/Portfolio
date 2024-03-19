import React from 'react'

const ShowPage = ({ setShowOpen ,showItem }) => {

  const handleBack = () => {
    setShowOpen(false)
  }
  return (
    <aside className='show'>
      <figure className='icon back' onClick={handleBack}>
        <span ></span>
        <p>Back</p>
      </figure>
      <figure className='icon prev'>
        <span ></span>
        <p>Prev</p>
      </figure>
      <figure className='icon next'>
        <span ></span>
        <p>Next</p>
      </figure>
      <article className='show_main'>
        <section className='show_main_title'>
          <h1>{showItem.title}</h1>
          <ul className='icon_list'>
            {showItem.URL.figma && <li className='figma'><a href={showItem.URL.figma}><span></span></a></li>}
            {showItem.URL.github && <li className='github'><a href={showItem.URL.github}><span></span></a></li>}
            {showItem.URL.web && <li className='web'><a href={showItem.URL.web}><span></span></a></li>}
          </ul>
        </section>
        <section className='show_main_content'>
          <img src={showItem.images[0]} alt="" />
        </section>
      </article>
    </aside>
  )
}

export default ShowPage
