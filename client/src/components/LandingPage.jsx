import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';
import image from '../assets/background.jpg'

export default function LandingPage (){
  return (
    <div className={style.component}>
      <img className={style.image} src={image} alt='background'/>
      <div className={style.headers}>
        <h1 className={style.h1}>Countries PI</h1>
        <h2 className={style.h2}>Anderson Marín</h2>
      </div>
      <Link to="/home">
        <button className={style.button}><span>Enter</span></button>
      </Link>
    </div>
  )
}