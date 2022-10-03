import style from './Card.module.css'

export default function Card({name, continent, flagImg}) {
  return (
    <div className={style.card}>
      <div className={style.contImg}>
        <img className={style.flag} src={flagImg} alt="flag"/>
      </div>
      <h3 className={style.h3}>{name}</h3>
      <h4 className={style.h4}>{continent}</h4>
    </div>
  )
}