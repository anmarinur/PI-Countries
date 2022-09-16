
const initialState = {
  countries: []
}

function rootReducer(state = initialState, action){
  switch (action.type) {
    case 'GET_COUNTRIES': 
      return {
        ...state,
        countries: action.payload
      }
  }
}

export default rootReducer;