import axios from 'axios';
import { FILTER_BY_CONTINENTS, GET_COUNTRIES } from '../types';


export function getCountries() {
  return async function(dispatch) {
    let json = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type: GET_COUNTRIES,
      payload: json.data
    })
  }
}

export function filterCountryByContinent(payload) {
  console.log(payload)
  return {
    type: FILTER_BY_CONTINENTS,
    payload
  }
}