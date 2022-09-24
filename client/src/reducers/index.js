import { FILTER_BY_CONTINENTS, GET_ACTIVITIES, GET_COUNTRIES, GET_COUNTRY_ID, GET_NAME_COUNTRIES, ORDER_BY_NAME, ORDER_BY_POPULATION, POST_ACTIVITY } from "../types";

const initialState = {
  countries: [],
  countriesBackUp: [],
  activities: [],
  country: []
}

function rootReducer(state = initialState, action){
  switch (action.type) {
    case GET_COUNTRIES: 
      return {
        ...state,
        countries: action.payload,
        countriesBackUp: action.payload
      }
      case GET_NAME_COUNTRIES:
        return {
          ...state,
          countries: action.payload,
          countriesBackUp: action.payload
        }
        case GET_ACTIVITIES:
          return {
            ...state,
            activities: action.payload
          }
          case POST_ACTIVITY:
            return {
              ...state
            }
            case FILTER_BY_CONTINENTS:
              const allCountries = state.countriesBackUp;
              const statusFiltered = action.payload === 'All' ? allCountries : allCountries.filter(el => el.continent === action.payload)
              return {
                ...state,
                countries: statusFiltered
              }
              case ORDER_BY_NAME:
                let arraySortedName = action.payload === 'descName' ? 
                  state.countries.sort((a, b) => {
                    if (a.name > b.name) {
                      return -1;
                    }
                    if (a.name < b.name) {
                      return 1;
                    }
                    return 0;
                  }) :
                  state.countries.sort((a, b) => {
                    if (a.name > b.name) {
                      return 1;
                    }
                    if (a.name < b.name) {
                      return -1;
                    }
                    return 0;
                  });
                return {
                  ...state,
                  countries: arraySortedName
                }
                case ORDER_BY_POPULATION:
                  let arraySortedPop = action.payload === 'descPop' ?
                    state.countries.sort((a, b) => {
                      if (a.population > b.population) {
                        return -1;
                      }
                      if (a.population < b.population) {
                        return 1;
                      }
                      return 0;
                    }) : 
                    state.countries.sort((a, b) => {
                      if (a.population > b.population) {
                        return 1;
                      }
                      if (a.population < b.population) {
                        return -1;
                      }
                      return 0;
                    });
                  return {
                    ...state,
                    countries: arraySortedPop
                  }
                  case GET_COUNTRY_ID:
                    return {
                      ...state,
                      country: action.payload
                    }
                    default:
                      return state;  
  }
}

export default rootReducer;