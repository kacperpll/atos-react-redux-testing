import React, {useCallback} from 'react'

const range = (max) =>
  [...Array(max)].map((_, idx) => idx + 1)

export const Pagination = ({
  currentPage, pageCount, displayArrows, onChange
}) => {
  const pageNumbers = range(5)
    .map(p => p - 3 + currentPage)
    .filter(p => p >= 1 && p <= pageCount)

    const onChangeHandler = useCallback((page) => {
      if (currentPage !== page && page > 0 && page <= pageCount) {
        onChange(page)
      }
    }, [currentPage])
  
  return <div>

  {displayArrows && <>
    <span className="page"
      disabled={currentPage === 1}
      onClick={ () => onChangeHandler(1) }
    > {"<<"} </span>

    <span className="page"
      disabled={currentPage === 1}
      onClick={ () => onChangeHandler(currentPage - 1) }
    > &lt; </span>
  </>}
  {pageNumbers.map(n => {
    const classes = 'page' + ((n === currentPage) ? ' selected' : '')
    return <span key={n} className={classes}
      onClick={ () => onChangeHandler(n) }
    >{ n }</span>
  }
  )}
  {displayArrows && <>
    <span className="page"
      disabled={currentPage === pageCount}
      onClick={ () => onChangeHandler(currentPage + 1) }
    > &gt; </span>

    <span className="page"
      disabled={currentPage === pageCount}
      onClick={ () => onChangeHandler(pageCount) }
    > {">>"} </span>
  </>}

  </div>
}