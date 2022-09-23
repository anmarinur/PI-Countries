import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCountries, filterCountryByContinent, orderByName, orderByPopulation } from "../actions";
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from "./SearchBar";

export function Home(){

  const allCountries = useSelector((state) => state.countries)
  const dispatch = useDispatch();

  const [render, setRender] = useState('')
  
  // Paginado
  const [currentPage, setCurrentPage] = useState(1);  // 1
  const [countriesPerPage, setCountriesPerPage] = useState(10);   // 10
  const indexOfLastCountry = currentPage * countriesPerPage;  // 2 * 10 = 20
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;  // 20 - 10 = 10
  const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry); // 10 a 20 -> 10 a 19

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch]);

  function handlerFilterContinent(e){
    e.preventDefault();
    dispatch(filterCountryByContinent(e.target.value));
    setCurrentPage(1);
    setRender(`Actualizado por ${e.target.value}`)
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
      <select onChange={(e) => handlerOrderByName(e)}>
        <option>By Name</option>
        <option value="ascName">Ascendent</option>
        <option value="descName">Descendent</option>
      </select>
      <select onChange={(e) => handlerOrderByPopulation(e)}>
        <option>By Population</option>
        <option value="ascPop">Ascendent</option>
        <option value="descPop">Descendent</option>
      </select>
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
        currentCountries && currentCountries.map((el) => {
          return (
            <Card name= {el.name} continent={el.continent} flagImg = {el.flagImg} key={el.name}/>
          )
        })
      }
      <Paginado countriesPerPage={countriesPerPage} allCountries={allCountries.length} paginado={paginado} />
    </div>
  )

}