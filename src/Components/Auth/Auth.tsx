import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logoutThunk } from '../../Redux/Reducer_Auth'
import { AppStateType } from '../../Types_For_TypeScript/Main_App_Types'
import s from './Auth.module.css'

type PropsType = {}
const Auth: React.FC<PropsType> = (props) => {
  
  const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)
  const dataAuth = useSelector((state:AppStateType) => state.auth.dataAuth)
  const dispatch = useDispatch()
  

  if(!isAuth){
    return <NavLink to = '/login'>Login</NavLink>
  }

  return (
    <div className={s.auth}>
      
      {dataAuth.login}
      <div><button onClick = {()=>dispatch(logoutThunk())} >Logout</button></div>
      
    </div>
  )
}

export default Auth
