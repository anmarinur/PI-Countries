import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { getCountries, filterCountryByContinent, orderByName, orderByPopulation, getActivities } from "../actions";
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
  let countriesPerPage = '';  // 'various'
  let currentCountries;       // Null

  if (allCountries.length - 9 <= 0) {
    countriesPerPage = 'one';
  } else {
    countriesPerPage = 'various';
  }

  if (countriesPerPage === 'one') {
    currentCountries = allCountries;
  } else if (countriesPerPage === 'various') {
    if (currentPage === 1) {
      currentCountries = allCountries.slice(0, 9)
    } else {
      const indexOfLastCountry = currentPage * 10 - 1;  // 19
      const indexOfFirstCountry = indexOfLastCountry - 10;  // 19 - 10 = 9
      currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);
    }
  }

  // if(typeof allCountries === 'string') {
  //   currentCountries = allCountries;
  // } else {
  //   currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry); // 10 a 20 -> 10 a 19
  // }
    
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    dispatch(getCountries())
    dispatch(getActivities())
  }, [dispatch]);

  function handlerClickHome(e) {
    dispatch(getCountries())
  }

  function handlerFilterContinent(e){
    e.preventDefault();
    dispatch(filterCountryByContinent(e.target.value));
    setCurrentPage(1);
    setRender(`Actualizado por ${e.target.value}`);
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
            <select>
              <option>All</option>
              {
                allActivities.map((activity) => {

                  return (
                    <option value={activity}>{activity}</option>
                  )
                })
              }
            </select>
          </div>
          <button onClick={(e) => handlerClickHome(e)}>Reset</button>
        </div>
        <div className={style.cards}>
          {
            typeof currentCountries === 'string' ? <Error msg={currentCountries} /> : currentCountries.map((el) => {
                  return (
                    <Link  style={{ textDecoration: 'none' }} to={'/home/' + el.id}>
                      <Card name= {el.name} continent={el.continent} flagImg = {el.flagImg} key={el.name}/>
                    </Link>
                  )
                })
          }
        </div>
        <div className={style.pages}>
          {
            typeof currentCountries === 'string' ? <div></div> : <Paginado countriesPerPage={countriesPerPage} allCountries={allCountries.length} paginado={paginado} />
          }
        </div>
      </div>
    </div>
  )

}