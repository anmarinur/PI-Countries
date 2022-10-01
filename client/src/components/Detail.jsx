import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getCountryId } from '../actions';
import { Link } from 'react-router-dom';


export default function Detail(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryId(props.match.params.id));
  }, [props.match.params.id, dispatch]);

  const country = useSelector((state) => state.country);

  return(
    <div>
      {
        country.length > 0 ? (
          <div>
            <h1>{country[0].name}</h1>
            <img src={country[0].flagImg} alt="flag" width="250px"/>
            <div>
              <p>Id:</p>
              <h2>{country[0].id}</h2>
            </div>
            <div>
              <p>Capital:</p>
              <h2>{country[0].capital}</h2>
            </div>
            <div>
              <p>Continent:</p>
              <h2>{country[0].continent}</h2>
            </div>
            <div>
              <p>Subregion:</p>
              <h2>{country[0].subregion}</h2>
            </div>
            <div>
              <p>Population:</p>
              <h2>{country[0].population}</h2>
            </div>
            <div>
              <p>Activities:</p>
              {
                country[0].Activities.length > 0 ? country[0].Activities.map ((el) => {
                    return (<p>{el.name}</p>)
                  }
                ) : 'Ninguna actividad'
              } 
            </div>
          </div>
        ) : <h1>Loading...</h1>
      }
      <Link to="/home">
        <button>Back</button>
      </Link>
    </div>
  )
}