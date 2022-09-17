import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage (){
  return (
    <div>
      <h1>Bienvenidos a Countries PI</h1>
      <h2>Anderson Marín</h2>
      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </div>
  )
}