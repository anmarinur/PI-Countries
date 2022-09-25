import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';
import image from '../assets/background.jpg'
import video from '../assets/video_background.mp4'

export default function LandingPage (){
  return (
    <div className={style.component}>
      <video className={style.video} poster={image} autoPlay muted loop>
        <source src={video} type="video/mp4"/>
      </video>
      <div className={style.container}>
        <h3 className={style.h3}>Henry PI</h3>
        <h1 className={style.h1}>Countries App</h1>
        <h2 className={style.h2}>Anderson Marín</h2>
        <Link to="/home">
          <button className={style.button}><span>Enter</span></button>
        </Link>
      </div>
    </div>
  )
}