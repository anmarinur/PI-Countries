import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getCountryId } from '../actions';
import { Link } from 'react-router-dom';


export default function Detail(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryId(props.match.params.id));
  }, [dispatch]);

  const country = useSelector((state) => state.country);

  return(
    <div>
      {
        country.length > 0 ? (
          <div>
            <h1>{country[0].name}</h1>
            <img src={country[0].flagImg} alt="flag" width="250px"/>
          </div>
        ) : <h1>Loading...</h1>
      }
      <Link to="/home">
        <button>Back</button>
      </Link>
    </div>
  )
}