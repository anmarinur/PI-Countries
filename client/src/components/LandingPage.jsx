import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';
import video from '../assets/video.mp4'

export default function LandingPage (){
  return (
    <div className={style.body}>
      <div className={style.content}>
        <h1 className={style.h1}>Countries PI</h1>
        <h2 className={style.h2}>Anderson Marín</h2>
        <Link to="/home">
          <button className={style.button}>Enter</button>
        </Link>
      </div>
      <video className={style.video} autoPlay muted loop>
        <source src={video} type="video/mp4" /> 
      </video>
    </div>
  )
}