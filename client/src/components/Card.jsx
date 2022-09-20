export default function Card({name, continent, flagImg}) {
  return (
    <div>
      <h3>{name}</h3>
      <h4>{continent}</h4>
      <img src={flagImg} alt="flag" width="250px"/>
    </div>
  )
}