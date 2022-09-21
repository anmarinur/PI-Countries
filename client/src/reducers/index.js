import { FILTER_BY_CONTINENTS, GET_COUNTRIES } from "../types";

const initialState = {
  countries: [],
  countriesBackUp: []
}

function rootReducer(state = initialState, action){
  switch (action.type) {
    case GET_COUNTRIES: 
      return {
        ...state,
        countries: action.payload,
        countriesBackUp: action.payload
      }
    case FILTER_BY_CONTINENTS:
      const allCountries = state.countriesBackUp;
      const statusFiltered = action.payload === 'All' ? allCountries : allCountries.filter(el => el.continent === action.payload)
      return {
        ...state,
        countries: statusFiltered
      }
    default:
      return state;  
  }
}

export default rootReducer;