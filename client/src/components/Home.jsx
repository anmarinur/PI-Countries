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
      <h1>Home</h1>
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