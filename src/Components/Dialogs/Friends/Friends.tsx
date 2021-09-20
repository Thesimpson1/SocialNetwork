import React from 'react'
import { NavLink} from 'react-router-dom'
import s from  './Friends.module.css'

type PropsType = {name: string, id: number}
const Friends: React.FC<PropsType> = (props) =>{
    const userId = '/dialogs/' + props.id
    return (
      <div className = {s.friends}>
        <NavLink to = {userId} activeClassName = {s.active}>{props.name}</NavLink>
      </div>
    )
  }

  export default Friends