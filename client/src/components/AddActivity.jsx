import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, postActivity } from '../actions';

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Se requiere un nombre';
  } else if (!input.season) {
    errors.season = 'Elija al menos una estación del año'
  }
  return errors;
}

export default function AddActivity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.countriesBackUp);
  const countriesOrdered = countries.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  const [input, setInput] = useState({
    name: '',
    difficulty: 0,
    duration: 0,
    season: '',
    countries: []
  })
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: typeof e.target.value === 'string' ? e.target.value.toLowerCase() : e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
    console.log(errors)
  }

  function handleCheck(e) {
    setInput({
      ...input,
      season: e.target.value
    })
  }

  function handleSelect(e) {
    e.preventDefault();
    setInput({
      ...input,
      countries: [...input.countries, e.target.value]
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input)
    dispatch(postActivity(input));
    alert("Actividad creada correctamente");
    setInput({
      name: '',
      difficulty: 0,
      duration: 0,
      season: '',
      countries: []
    });
    history.push('/home');
  }

  function handleDelete(el) {
    setInput({
      ...input,
      countries: input.countries.filter((country) => country !== el)
    })
  }

  useEffect(() => {
    dispatch(getActivities())
  }, [dispatch]);

  return (
    <div>
      <Link to="/home"><button>Home</button></Link>
      <h1>Add activities</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input type="text" value={input.name} placeholder="Name..." name="name" onChange={(e) => handleChange(e)}/>
        </div>
        {errors.name && (
          <p>{errors.name}</p>
        )}
        <div>
          <label>Difficulty:</label>
          <input type="number" value={input.difficulty} placeholder="Difficulty..." name="difficulty" onChange={(e) => handleChange(e)}/>
        </div>
        <div>
          <label>Duration:</label>
          <input type="number" value={input.duration} placeholder="Duration..." name="duration" onChange={(e) => handleChange(e)}></input>
        </div>
        <div>
          <label>Season:</label>
          <label><input  type="radio" value="Verano" name="seasons" onChange={(e) => handleCheck(e)}/> Verano</label>
          <label><input  type="radio" value="Otoño" name="seasons" onChange={(e) => handleCheck(e)}/> Otoño</label>
          <label><input  type="radio" value="Invierno" name="seasons" onChange={(e) => handleCheck(e)}/> Invierno</label>
          <label><input  type="radio" value="Primavera" name="seasons" onChange={(e) => handleCheck(e)}/> Primavera</label>
        </div>
        <select onChange={(e) => handleSelect(e)}>
        {
          countriesOrdered.map((el) => {
            return (
              <option value={el.id}>{el.name}</option>
            )
          })
        }
        </select>
        {/* <ul><li>{input.countries.map(el => el + ', ')}</li></ul> */}
        <button type="submit">Agregar</button>
      </form>
      {
        input.countries.map( el => {
          return (
            <div>
              <p>{el}</p>
              <button onClick={() => handleDelete(el)}>x</button>
            </div>
          )
        })
      }
    </div>
  )
}