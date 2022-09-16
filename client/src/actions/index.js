import axios from 'axios';

export function getCountries() {
  return async function(dispatch) {
    var json = axios.get("http://localhost.3001/countries");
    return dispatch({
      type: 'GET_CARACTERS',
      payload: json.data
    })
  }
}