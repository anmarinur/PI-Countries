export default function Card({name, continent, flagImg}) {
  return (
    <div>
      <img src={flagImg} alt="flag" width="250px"/>
      <h3>{name}</h3>
      <h4>{continent}</h4>
    </div>
  )
}