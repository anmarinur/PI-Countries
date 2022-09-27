import style from './Paginado.module.css'

export default function Paginado({countriesPerPage, allCountries, paginado}) {
  const pageNumbers = [];

  if (countriesPerPage === 'one') {
    pageNumbers.push(1);
  } else {
    for (let i = 1; i <= Math.ceil(((allCountries - 9)/10)+1); i++) {
      pageNumbers.push(i);
    }
  }

  

  return (
    <nav>
      <ul>
        { pageNumbers && pageNumbers.map(number => {
          return (
          <button className={style.button} key={number} onClick={() => paginado(number)}>{number}</button>
          )
        })}
      </ul>
    </nav>
  )
}