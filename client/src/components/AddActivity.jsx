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
  const [errors, setErrors] = useState({
      name: 'Se requiere un nombre',
      difficulty: 'Elija un valor entre 1 y 5',
      duration: 'Elija un valor entre 1 y 20',
      season: 'Elija al menos una estación del año',
      countries: 'Elija al menos un país'
  });
  let arrayCountries = input.countries;
  let filterCountries = [];

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

    if(input.duration < 1 || input.duration > 20) {
      errors.duration = 'Elija un valor entre 1 y 20'
    } else {
      errors.duration = '';
    }

    if (!input.season) {
      errors.season = 'Elija al menos una estación del año'
    } else {
      errors.season = '';
    }
    if(input.countries.length === 0) {
      errors.countries = 'Elija al menos un país'
    } else {
      errors.countries = ''
    }
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
    if (!input.countries.includes(e.target.value)) {
      arrayCountries.push(e.target.value)
    }
    setInput({
      ...input,
      countries: arrayCountries
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
    filterCountries = input.countries.filter((country) => country !== el)
    setInput({
      ...input,
      countries: filterCountries
    })
    setErrors(validate({
      ...input,
      countries: filterCountries
  }))
  }

  useEffect(() => {
    dispatch(getActivities())
  }, [dispatch]);

  return (
    <div>
      <img className={style.imgbg} src={image} alt="background"/>
      <div className={style.blur}>
        <div className={style.header}>
          <h1>Add activities</h1>
        </div>
        
        <div className={style.body}>  
          <form className={style.form}>
            <div className={style.contInputs}>
              <div className={style.nameError}>
                <label>Name:</label>
                {errors.name && <p className={style.error}>{errors.name}</p>}
              </div>
              <input className={style.input} type="text" value={input.name} placeholder="Name..." name="name" onChange={(e) => handleChange(e)} autoComplete='off'/>
            </div>

            <div className={style.contInputs}>
              <div className={style.nameError}>
                <label>Difficulty:</label>
                {errors.difficulty && <p className={style.error}>{errors.difficulty}</p>}
              </div>
              <input className={style.input} type="number" value={input.difficulty} placeholder="Difficulty..." name="difficulty" onChange={(e) => handleChange(e)} autoComplete='off'/>
            </div>

            <div className={style.contInputs}>
              <div className={style.nameError}>
                <label>Duration (hours):</label>
                {errors.duration && <p className={style.error}>{errors.duration}</p>}
              </div>
              <input className={style.input} type="number" value={input.duration} placeholder="Duration..." name="duration" onChange={(e) => handleChange(e)} autoComplete='off'></input>
            </div>

            <div className={style.contInputsRadio}>
              <div className={style.nameError}>
                <label>Season:</label>
                {errors.season && <p className={style.error}>{errors.season}</p>}
              </div>
              <div className={style.contRadios}>
                <label><input className={style.inputRadio} type="radio" value="Verano" name="season" onChange={(e) => handleCheck(e)}/> Verano</label>
                <label><input className={style.inputRadio} type="radio" value="Otoño" name="season" onChange={(e) => handleCheck(e)}/> Otoño</label>
                <label><input className={style.inputRadio} type="radio" value="Invierno" name="season" onChange={(e) => handleCheck(e)}/> Invierno</label>
                <label><input className={style.inputRadio} type="radio" value="Primavera" name="season" onChange={(e) => handleCheck(e)}/> Primavera</label>
              </div>
            </div>
            
            <div className={style.contInputs}>
              <div className={style.nameError}>
                <label >Countries:</label>
                {errors.countries && <p className={style.error}>{errors.countries}</p>}
              </div>
              <div className={style.contSelect}>
                <select className={style.select} onChange={(e) => {handleSelect(e)}}>
                <option>Select countries</option>
                {
                  countriesOrdered.map((el) => {
                    return (
                      <option key={el.id} value={el.id} name={el.name}>{el.name}</option>
                    )
                  })
                }
                </select>
                <div className={style.contCountries}>
                  {
                    arrayCountries.map( el => {
                      const flag = countries.find((country) => country.id === el)
                      return (
                        <div key={el} className={style.contCountry}>
                          <img className={style.flag} src={flag.flagImg} key={el} alt="flag" onClick={() => handleDelete(el)}/>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </form>
          </div>
          <div className={style.contButtons}>
            {
              <button className={style.button} type="submit" disabled={errors.name || errors.difficulty || errors.duration || errors.season || errors.countries ? true : ''} onClick={(e) => handleSubmit(e)}>Agregar</button>
            }
            <Link to="/home"><button className={style.button}>Home</button></Link>              
          </div>
        </div>
      </div>
  )
}