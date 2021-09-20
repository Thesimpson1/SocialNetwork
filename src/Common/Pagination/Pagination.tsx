import classNames from 'classnames'
import React from 'react'
import s from './Pagination.module.css'

type PropsType = {
  totalCount: number
  pageSize: number 
  sizePortion: number 
  setCurrentPage: (props: number) => void 
  currentPage: number
}

const Pagination: React.FC<PropsType> = (props) => {

  const{totalCount, pageSize, sizePortion, setCurrentPage, currentPage} = props
  const pageCount = Math.ceil(totalCount / pageSize)
  const page = []
  for (let i = 1; i <= pageCount; i++) {
    page.push(i)
  }

  const portionPage = Math.ceil(pageCount / sizePortion)
  const [portionNumber, setPortionNumber] = React.useState(1)
  const leftBorderPortion = (portionNumber - 1) * sizePortion + 1
  const rightBorderPortion = portionNumber * sizePortion

  return <>
    <div>
      {page.filter(i => i >= leftBorderPortion && i <= rightBorderPortion)
        .map((i) => { return <span key={i} onClick={() => { setCurrentPage(i) }} className={classNames(s.page, { [s.users]: currentPage === i })}>{i}</span> })}
    </div>
    <div className={s.buttons}>
      {portionNumber > 1 && <button onClick={() => { setPortionNumber(portionNumber - 1) }}>prev</button>}
      {portionNumber < portionPage && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>next</button>}
    </div>
  </>
}

export default Pagination