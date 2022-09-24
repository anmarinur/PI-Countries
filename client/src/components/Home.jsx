import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { getCountries, filterCountryByContinent, orderByName, orderByPopulation } from "../actions";
import Card from './Card';
import Error from "./Error";
import Paginado from './Paginado';
import SearchBar from "./SearchBar";

export function Home(){

  const allCountries = useSelector((state) => state.countries)
  const dispatch = useDispatch();

  const [render, setRender] = useState('');
  
  // Paginado
  const [currentPage, setCurrentPage] = useState(1);  // 1
  const [countriesPerPage, setCountriesPerPage] = useState(10);   // 10
  const indexOfLastCountry = currentPage * countriesPerPage;  // 2 * 10 = 20
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;  // 20 - 10 = 10
  let currentCountries;
  if(typeof allCountries === 'string') {
    currentCountries = allCountries;
  } else {
    currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry); // 10 a 20 -> 10 a 19
  }
    
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    dispatch(getCountries())
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
    <div>
      <SearchBar />
      <Link to='/activities'><button>Agregar actividad</button></Link>
      <button onClick={(e) => handlerClickHome(e)}>Home</button>
      <div>
        <h3>Order by name</h3>
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
      <select onChange={(e) => handlerFilterContinent(e)}>
        <option value="All">All</option>
        <option value="Africa">Africa</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="North America">North America</option>
        <option value="Oceania">Oceania</option>
        <option value="South America">South America</option>
      </select>
      
      {
        typeof currentCountries === 'string' ? <Error msg={currentCountries} /> : currentCountries.map((el) => {
              return (
                <Card name= {el.name} continent={el.continent} flagImg = {el.flagImg} key={el.name}/>
              )
            })
      }
      {
        typeof currentCountries === 'string' ? <div></div> : <Paginado countriesPerPage={countriesPerPage} allCountries={allCountries.length} paginado={paginado} />
      }
    </div>
  )

}