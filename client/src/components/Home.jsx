import React, { useEffect, useState } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from '../actions';

export default function Home (){

  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
  }, [])

  function handlerClick(e) {
    e.preventDefault;
    dispatch(getCountries());
  }

  return (
    <div>
      <Link to='/countries'></Link>
      <h1>Countries PI Home</h1>
      <button onClick={e => {handlerClick(e)}}>
        Volver a cargar las ciudades
      </button>
      <select>
        <option value="asc">Ascendente</option>
        <option value="desc">Descedente</option>
      </select>
      <select>
        <option value="America">America</option>
        <option value="Africa">Africa</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  )

}