import axios from 'axios';
import { FILTER_BY_CONTINENTS, GET_COUNTRIES, GET_NAME_COUNTRIES, ORDER_BY_NAME, ORDER_BY_POPULATION } from '../types';


export function getCountries() {
  return async function(dispatch) {
    let json = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type: GET_COUNTRIES,
      payload: json.data
    })
  }
}

export function getNameCountries(name) {
  return async function(dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/countries?name=" + name);
      return dispatch({
        type: GET_NAME_COUNTRIES,
        payload: json.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function filterCountryByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENTS,
    payload
  }
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload
  }
}

export function orderByPopulation(payload) {
  return {
    type: ORDER_BY_POPULATION,
    payload
  }
}