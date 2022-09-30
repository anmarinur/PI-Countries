import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { getCountries, filterCountryByContinent, orderByName, orderByPopulation, getActivities, filterByActivities } from "../actions";
import Card from './Card';
import Error from "./Error";
import Paginado from './Paginado';
import SearchBar from "./SearchBar";
import style from './Home.module.css'
import image from '../assets/static_background.jpg'

export function Home(){

  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);
  const dispatch = useDispatch();

  const [render, setRender] = useState('');
  
  // Paginado
  const [currentPage, setCurrentPage] = useState(1);  // 1
  let statusPages = '';  // 'various'
  let currentCountries;       // Null
  const countriesPageOne = 9;
  const countriesPerPage = 10;


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
    
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    dispatch(getCountries())
    dispatch(getActivities())
  }, [dispatch]);

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
          <button onClick={(e) => handlerClickHome(e)}>Home</button>
          <SearchBar />
          <Link to='/activities'><button>Add activity</button></Link>
          <div>
            <h3>Order by Name</h3>
            <select onChange={(e) => handlerOrderByName(e)}>
              <option>-</option>
              <option value="ascName">Ascendent</option>
              <option value="descName">Descendent</option>
            </select>
          </div>
          <div>
            <h3>Order by Population</h3>
            <select onChange={(e) => handlerOrderByPopulation(e)}>
              <option>-</option>
              <option value="ascPop">Ascendent</option>
              <option value="descPop">Descendent</option>
            </select>
          </div>
          <div>
          <h3>Filter by Continent</h3>
            <select onChange={(e) => handlerFilterContinent(e)}>
              <option value="All">All</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="Oceania">Oceania</option>
              <option value="South America">South America</option>
            </select>
          </div>
          <div>
            <h3>Filter by Activities</h3>
            <select onChange={(e) => handlerFilterActivity(e)}>
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
          <button onClick={(e) => handlerClickReset(e)}>Reload</button>
        </div>
        <div className={style.cards}>
          {
            typeof currentCountries === 'string' ? <Error msg={currentCountries} /> : currentCountries.map((el) => {
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
            typeof currentCountries === 'string' ? <div></div> : <Paginado statusPages={statusPages} allCountries={allCountries.length} paginado={paginado} />
          }
        </div>
      </div>
    </div>
  )

}