import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, postActivity } from '../actions';
import image from '../assets/static_background.jpg';
import style from './AddActivity.module.css'

export default function AddActivity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.countriesBackUp);
  const activities = useSelector((state) => state.activities)
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
  const [render, setRender] = useState('render')

  function validate(input) {
    if (!input.name) {
      errors.name = 'Se requiere un nombre';
    } else if (activities.includes(input.name)) {
      errors.name = 'Actividad ya registrada'
    } else {
      errors.name = '';
    }
    
    if(input.difficulty > 5 || input.difficulty < 1) {
      errors.difficulty = 'Elija un valor entre 1 y 5'
    } else {
      errors.difficulty = '';
    }

    if(input.duration < 1 || input.duration > 50) {
      errors.duration = 'Elija un valor entre 1 y 20'
    } else {
      errors.duration = '';
    }

    if (!input.season) {
      errors.season = 'Elija al menos una estación del año'
    } else {
      errors.season = '';
    }
    console.log(input.countries)
    if(input.countries.length === 0) {
      errors.countries = 'Elija al menos un país'
    } else {
      errors.countries = ''
    }
    console.log(errors.countries)
    return errors;
  }

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
  }

  function handleCheck(e) {
    console.log('entré')
    setInput({
      ...input,
      season: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleSelect(e) {
    setInput({
      ...input,
      countries: [...input.countries, e.target.value]
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
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
    setErrors({
      name: 'Se requiere un nombre',
      difficulty: 'Elija un valor entre 1 y 5',
      duration: 'Elija un valor entre 1 y 20',
      season: 'Elija al menos una estación del año',
      countries: 'Elija al menos un país'
    })
  }, [dispatch]);

  return (
    <div>
      <img className={style.imgbg} src={image} alt="background"/>
      <div className={style.blur}>
        <div className={style.header}>
          <Link to="/home"><button>Home</button></Link>
          <h1>Add activities</h1>
        </div>
        
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
          {errors.name && (
            <p>{errors.name}</p>
          )}
            <label>Name:</label>
            <input type="text" value={input.name} placeholder="Name..." name="name" onChange={(e) => handleChange(e)}/>
          </div>
          <div>
            {errors.difficulty && (
              <p>{errors.difficulty}</p>
            )}
            <label>Difficulty:</label>
            <input type="number" value={input.difficulty} placeholder="Difficulty..." name="difficulty" onChange={(e) => handleChange(e)}/>
          </div>
          <div>
            {errors.duration && (
              <p>{errors.duration}</p>
            )}
            <label>Duration:</label>
            <input type="number" value={input.duration} placeholder="Duration..." name="duration" onChange={(e) => handleChange(e)}></input>
          </div>
          <div>
            {errors.season && (
              <p>{errors.season}</p>
            )}
            <label>Season:</label>
            <label><input  type="radio" value="Verano" name="season" onChange={(e) => handleCheck(e)}/> Verano</label>
            <label><input  type="radio" value="Otoño" name="season" onChange={(e) => handleCheck(e)}/> Otoño</label>
            <label><input  type="radio" value="Invierno" name="season" onChange={(e) => handleCheck(e)}/> Invierno</label>
            <label><input  type="radio" value="Primavera" name="season" onChange={(e) => handleCheck(e)}/> Primavera</label>
          </div>
            {errors.countries && (
              <p>{errors.countries}</p>
            )}
          <select onChange={(e) => {handleSelect(e)}}>
            <option>Select countries</option>
          {
            countriesOrdered.map((el) => {
              return (
                <option value={el.id} name={el.name}>{el.name}</option>
              )
            })
          }
          </select>
          {
            <button type="submit" disabled={errors.name || errors.difficulty || errors.duration || errors.season || errors.countries ? true : ''}>Agregar</button>
          }
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
      </div>
  )
}