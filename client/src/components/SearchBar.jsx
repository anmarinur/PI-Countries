import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions";
import style from './SearchBar.module.css'

export default function SearchBar () {
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  function handlerInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handlerSubmit(e) {
    e.preventDefault();
    dispatch(getNameCountries(name))
    setName('')
  }

  return (
    <div className={style.container}>
      <input className={style.input} type="text" value={name} placeholder="Search..." onChange={(e) => handlerInputChange(e)}/>
      <button className={style.button} type="submit" onClick={(e) => handlerSubmit(e)}>Search</button>
    </div>
  )
}