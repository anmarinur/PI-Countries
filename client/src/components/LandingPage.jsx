import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';
import video from '../assets/video.mp4'
// import gif from '../assets/gif.gif'

export default function LandingPage (){
  return (
    <div className={style.component}>
      <video className={style.video} autoPlay muted loop>
        <source src={video} type="video/mp4" /> 
      </video>
      {/* <img src={gif} alt="gif"/> */}
      <div className={style.text}>
        <div className={style.headers}>
          <h1 className={style.h1}>Countries PI</h1>
          <h2 className={style.h2}>Anderson Marín</h2>
        </div>
        <Link to="/home">
          <button className={style.button}><span>Enter</span></button>
        </Link>
      </div>
    </div>
  )
}