import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getCountryId, setFlag } from '../actions';
import { Link } from 'react-router-dom';
import style from './Detail.module.css'
import image from '../assets/static_background.jpg'

export default function Detail(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryId(props.match.params.id));
    dispatch(setFlag(true))
  }, [props.match.params.id, dispatch]);

  const country = useSelector((state) => state.country);

  return(
    <div>
      <img className={style.imgbg} src={image} alt="background"/>
      <div className={style.blur}>
        {
          country.length > 0 ? (
            <div className={style.container}>
              <h1 className={style.h1} >{country[0].name}</h1>
              <img className={style.flag} src={country[0].flagImg} alt="flag" width="250px"/>
              <div className={style.info}>
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
                </div>
                <div className={style.activities}>
                  <h2 className={style.h2}>Activities:</h2>
                  <div className={style.contActivities}>
                    {
                      country[0].Activities.length > 0 ? country[0].Activities.map ((el, i) => {
                        return (
                          <div key={i} className={style.activity}>
                            <div className={style.subContainer}>
                              <h3 className={style.h3}>Name:</h3>
                              <p className={style.p3}>{el.name}</p>
                            </div>
                            <div className={style.subContainer}>
                              <h3 className={style.h3}>Difficulty:</h3>
                              <p className={style.p3}>{el.difficulty}</p>
                            </div>
                            <div className={style.subContainer}>
                              <h3 className={style.h3}>Duration:</h3>
                              <p className={style.p3}>{el.duration}</p>
                            </div>
                            <div className={style.subContainer}>
                              <h3 className={style.h3}>Season:</h3>
                              <p className={style.p3}>{el.season}</p>
                            </div>
                          </div>
                        )
                        }
                      ) : <p className={style.p}>Nothing added yet</p>
                    } 
                  </div>
                </div>
              </div>

              
            </div>
          ) : <h1>Error</h1>
        }
        <Link to="/home">
          <button className={style.button}>Back</button>
        </Link>
      </div>
    </div>
  )
}