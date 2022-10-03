import image from '../assets/earth_error.png'
import style from './Error.module.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setFlag } from '../actions';

export default function Error({msg}) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFlag(true))
  })
  return (
    <div className={style.container}>
      <h1 className={style.h1}>{msg}</h1>
      <img className={style.image} src={image} alt="error"/>
    </div>
  )
}