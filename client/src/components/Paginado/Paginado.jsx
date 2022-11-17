import style from './Paginado.module.css'

export default function Paginado({statusPages, paginado, lastPage, currentPage}) {
  const pageNumbers = [];

  if (statusPages === 'one') {
    pageNumbers.push(1);
  } else {
    for (let i = 1; i <= lastPage; i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <nav>
      <ul>
        <button className={style.button} onClick={() => paginado('prev')}>Prev</button>
        { 
          pageNumbers && pageNumbers.map(number => {
            return (
            <button className={number === currentPage ? style.buttonSelected : style.button} key={number} onClick={() => paginado(number)}>{number}</button>
            )
          })
        }
        <button className={style.button} onClick={() => paginado('next')}>Next</button>
      </ul>
    </nav>
  )
}