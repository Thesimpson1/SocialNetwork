import classNames from 'classnames'
import React from 'react'
import s from './Pagination.module.css'


  
  const Pagination = (props) => {
    
    const pageCount = Math.ceil( props.totalCount / props.pageSize)
    const page = []
    for (let i = 1; i <= pageCount; i++) {
      page.push(i)
    }

    const portionPage = Math.ceil( pageCount / props.sizePortion)
    const [portionNumber, setPortionNumber] = React.useState(1)
    const leftBorderPortion = (portionNumber - 1) * props.sizePortion + 1 
    const rightBorderPortion = portionNumber * props.sizePortion
     
    return <>
      <div>
        {page.filter(i => i >= leftBorderPortion && i <= rightBorderPortion)
        .map((i) => { return <span key = {i} onClick = {()=>{props.setCurrentPage(i)}} className = {classNames(s.page, {[s.users] : props.currentPage === i })}>{i}</span> })}
      </div>
      <div className = {s.buttons}>
        {portionNumber > 1 && <button onClick = {() => {setPortionNumber(portionNumber - 1)}}>prev</button>}
        {portionNumber < portionPage && <button onClick = {() => {setPortionNumber(portionNumber + 1)}}>next</button>}
      </div>
    </>
  }

  export default Pagination