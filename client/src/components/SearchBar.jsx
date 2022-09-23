import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions";

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
    <div>
      <input type="text" value={name} placeholder="Search..." onChange={(e) => handlerInputChange(e)}/>
      <button type="submit" onClick={(e) => handlerSubmit(e)}>Search</button>
    </div>
  )
}