import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getCountryId } from '../actions';
import { Link } from 'react-router-dom';
import style from './Detail.module.css'
import image from '../assets/static_background.jpg'

export default function Detail(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryId(props.match.params.id));
  }, [props.match.params.id, dispatch]);

  const country = useSelector((state) => state.country);
  console.log(country)

  return(
    <div>
      <img className={style.imgbg} src={image} alt="background"/>
      <div className={style.blur}>
        {
          country.length > 0 ? (
            <div className={style.container}>
              <h1 className={style.h1} >{country[0].name}</h1>
              <img className={style.flag} src={country[0].flagImg} alt="flag" width="250px"/>
              <div className={style.body}>
                <div className={style.subContainer}>
                  <h2 className={style.h2}>Id:</h2>
                  <p className={style.p}>{country[0].id}</p>
                </div>
                <div className={style.subContainer}>
                  <h2 className={style.h2}>Capital:</h2>
                  <p className={style.p}>{country[0].capital}</p>
                </div>
                <div className={style.subContainer}>
                  <h2 className={style.h2}>Continent:</h2>
                  <p className={style.p}>{country[0].continent}</p>
                </div>
                <div className={style.subContainer}>
                  <h2 className={style.h2}>Subregion:</h2>
                  <p className={style.p}>{country[0].subregion}</p>
                </div>
                <div className={style.subContainer}>
                  <h2 className={style.h2}>Area:</h2>
                  <p className={style.p}>{country[0].area} Km<sup>2</sup></p>
                </div>
                <div className={style.subContainer}>
                  <h2 className={style.h2}>Population:</h2>
                  <p className={style.p}>{country[0].population}</p>
                </div>
                <div className={style.subContainer}>
                  <h2 className={style.h2}>Activities:</h2>
                  {
                    country[0].Activities.length > 0 ? country[0].Activities.map ((el, i) => {
                      return i < country[0].Activities.length-1 ? <p className={style.p}>{el.name},</p> : <p className={style.p}>{el.name}</p>
                    }
                    ) : <p className={style.p}>Ninguna actividad</p>
                  } 
                </div>
              </div>
            </div>
          ) : <h1>Loading...</h1>
        }
        <Link to="/home">
          <button className={style.button}>Back</button>
        </Link>
      </div>
    </div>
  )
}