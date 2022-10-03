import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { getCountries, filterCountryByContinent, orderByName, orderByPopulation, getActivities, filterByActivities } from "../../actions";
import Card from '../Card/Card';  
import Paginado from '../Paginado/Paginado';
import SearchBar from "../SearchBar/SearchBar";
import style from './Home.module.css'
import image from '../../assets/static_background.jpg'

export function Home(){

  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);
  const flag = useSelector((state) => state.flag);
  const dispatch = useDispatch();

  const [render, setRender] = useState('');

  useEffect(() => {
    dispatch(getActivities())
    if (!flag) {
      dispatch(getCountries())
    }
  }, [dispatch, flag]);
  
  // Paginado
  const [currentPage, setCurrentPage] = useState(1);  // 1
  let statusPages = '';  // 'various'
  let currentCountries;       // Null
  const countriesPageOne = 9;
  const countriesPerPage = 10;
  const lastPage = Math.ceil(((allCountries.length - countriesPageOne)/countriesPerPage)+1);


  if (allCountries.length - countriesPageOne <= 0) {
    statusPages = 'one';
  } else {
    statusPages = 'various';
  }

  if (statusPages === 'one') {
    currentCountries = allCountries;
  } else if (statusPages === 'various') {
    if (currentPage === 1) {
      currentCountries = allCountries.slice(0, countriesPageOne);
    } else {
      const indexOfLastCountry = currentPage * countriesPerPage - 1;  // 19
      const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;  // 19 - 10 = 9
      currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);
    }
  }
    
  function paginado (pageNumber) {
    if (typeof pageNumber === 'number') {
      setCurrentPage(pageNumber);
    } else {
      if (pageNumber === 'prev') {
        if (currentPage > 1) {
          const prev = currentPage - 1;
          setCurrentPage(prev);
        }
      } else if (pageNumber === 'next'){
        if (currentPage < lastPage && lastPage > 1) {
          const next = currentPage + 1;
          setCurrentPage(next);
        }
      }
    }
  }

  function handlerClickReset(e) {
    dispatch(getCountries())
  }

  function handlerClickHome(e) {
    setCurrentPage(1);
  }

  function handlerFilterContinent(e){
    e.preventDefault();
    dispatch(filterCountryByContinent(e.target.value));
    setCurrentPage(1);
  }

  function handlerFilterActivity(e) {
    e.preventDefault();
    dispatch(filterByActivities(e.target.value));
    setCurrentPage(1);
  }

  function handlerOrderByName(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setRender(`Actualizado por ${e.target.value}`)
  }

  function handlerOrderByPopulation(e){
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setRender(`Actualizado por ${e.target.value}`)
  }

  return (
    <div className={style.container}>
      <img className={style.imgbg} src={image} alt="background"/>
      <div className={style.blur}>

        <div className={style.header}>
          <h2 className={style.h2} onClick={(e) => handlerClickHome(e)}>Home</h2>
          <SearchBar />
          <Link style={{ textDecoration: 'none' }} to='/activities'><h2 className={style.h2}>Add activity</h2></Link>
          <div className={style.orderTitle}>
            <h3>Order by Name</h3>
            <select className={style.select} onChange={(e) => handlerOrderByName(e)}>
              <option>-</option>
              <option value="ascName">Ascendent</option>
              <option value="descName">Descendent</option>
            </select>
          </div>
          <div className={style.orderTitle}>
            <h3>Order by Population</h3>
            <select className={style.select} onChange={(e) => handlerOrderByPopulation(e)}>
              <option>-</option>
              <option value="ascPop">Ascendent</option>
              <option value="descPop">Descendent</option>
            </select>
          </div>
          <div className={style.orderTitle}>
          <h3>Filter by Continent</h3>
            <select className={style.select} onChange={(e) => handlerFilterContinent(e)}>
              <option value="All">All</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="Oceania">Oceania</option>
              <option value="South America">South America</option>
            </select>
          </div>
          <div className={style.orderTitle}>
            <h3>Filter by Activities</h3>
            <select className={style.select} onChange={(e) => handlerFilterActivity(e)}>
              <option value="All">All</option>
              {
                allActivities.map((activity, i) => {
                  return (
                    <option key={i} value={activity}>{activity[0].toUpperCase() + activity.substring(1).toLowerCase()}</option>
                  )
                })
              }
            </select>
          </div>
          <h2 className={style.h2} onClick={(e) => handlerClickReset(e)}>Reload</h2>
        </div>
        <div className={style.cards}>
          {
            currentCountries.map((el) => {
              return (
                <Link key={el.id} style={{ textDecoration: 'none' }} to={'/home/' + el.id}>
                  <Card name= {el.name} continent={el.continent} flagImg = {el.flagImg} key={el.name}/>
                </Link>
              )
            })
          }
        </div>
        <div className={style.pages}>
          {
            <Paginado statusPages={statusPages} paginado={paginado} lastPage={lastPage} currentPage={currentPage}/>
          }
        </div>
      </div>
    </div>
  )

}