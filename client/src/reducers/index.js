import { FILTER_BY_CONTINENTS, GET_COUNTRIES, ORDER_BY_NAME } from "../types";

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
    case ORDER_BY_NAME:
      let arraySorted = action.payload === 'ascName' ? 
        state.countries.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        }) :
        state.countries.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        });
      return {
        ...state,
        countries: arraySorted
      }
        
    default:
      return state;  
  }
}

export default rootReducer;