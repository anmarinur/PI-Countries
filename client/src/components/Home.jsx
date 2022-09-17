import React, { useEffect, useState } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from '../actions';

export default function Home (){

  const dispatch = useDispatch();
  const allcountries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
  }, [])

}