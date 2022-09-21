import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCountries, filterCountryByContinent } from "../actions";
import Card from './Card';
import Paginado from './Paginado';

export function Home(){

  const allCountries = useSelector((state) => state.countries)
  const dispatch = useDispatch();
  
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
    dispatch(filterCountryByContinent(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div>
      <input placeholder="Country name..."></input>
      <button>Search</button>
      <select>
        <option>Name asc</option>
        <option>Name desc</option>
        <option>Population asc</option>
        <option>Population desc</option>
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