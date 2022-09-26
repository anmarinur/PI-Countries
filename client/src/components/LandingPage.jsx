import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';
import image from '../assets/background.jpg'
import video from '../assets/video_background.mp4'


export default function LandingPage (){
  const [hover, setHover] = useState(true)

  function handleHover() {
    let current = hover;
    current ? setHover(false) : setHover(true)
  }

  return (
    <div className={style.component}>
      <video className={style.video} poster={image} autoPlay muted loop>
        <source src={video} type="video/mp4"/>
      </video>
      <div className={hover ? style.container : style.containerB}>
        {console.log(hover)}
        <h3 className={hover ? style.h3 : style.h3B}>Henry PI</h3>
        <h1 className={hover ? style.h1 : style.h1B}>Countries App</h1>
        <h2 className={hover ? style.h2 : style.h2B}>Anderson Marín</h2>
        <Link to="/home">
          <button className={style.button} onMouseEnter={() => handleHover()} onMouseLeave={() => handleHover()}><span>Enter</span></button>
        </Link>
      </div>
    </div>
  )
}