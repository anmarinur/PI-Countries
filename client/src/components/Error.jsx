import image from '../assets/earth_error.png'
import style from './Error.module.css'

export default function Error({msg}) {
  return (
    <div className={style.container}>
      <h1 className={style.h1}>{msg}</h1>
      <img className={style.image} src={image} alt="error"/>
    </div>
  )
}