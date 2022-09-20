import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCountries } from "../actions";
import Card from './Card'

export function Home(){

  const allCountries = useSelector((state) => state.countries)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries())
  }, [dispatch])

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
      <select>
        <option>America</option>
        <option>Africa</option>
        <option>Asia</option>
        <option>Europa</option>
        <option>Oceanía</option>
      </select>
      {
        allCountries && allCountries.map((el) => {
          return (
            <Card name= {el.name} continent={el.continent} flagImg = {el.flagImg} key={el.name}/>
          )
        })
      }
    </div>
  )

}