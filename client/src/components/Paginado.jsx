import style from './Paginado.module.css'

export default function Paginado({statusPages, allCountries, paginado}) {
  const pageNumbers = [];
  const countriesPageOne = 9;
  const countriesPerPage = 10;

  if (statusPages === 'one') {
    pageNumbers.push(1);
  } else {
    for (let i = 1; i <= Math.ceil(((allCountries - countriesPageOne)/countriesPerPage)+1); i++) {
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