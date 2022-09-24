import axios from 'axios';
import { FILTER_BY_CONTINENTS, GET_ACTIVITIES, GET_COUNTRIES, GET_COUNTRY_ID, GET_NAME_COUNTRIES, ORDER_BY_NAME, ORDER_BY_POPULATION } from '../types';


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

export function getCountryId(id) {
  return async function(dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/countries/" + id);
      return dispatch({
        type: GET_COUNTRY_ID,
        payload: json.data
      })
    } catch(error) {
      console.log(error)
    }
  }
}

export function getActivities() {
  return async function(dispatch) {
    let json = await axios.get("http://localhost:3001/activities");
    return dispatch({
      type: GET_ACTIVITIES,
      payload: json.data
    })
  }
}

export function postActivity(payload) {
  return async function(dispatch) {
    let json = await axios.post("http://localhost:3001/activities", payload);
    return json;
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