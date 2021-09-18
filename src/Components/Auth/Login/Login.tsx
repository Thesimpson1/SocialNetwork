import React from 'react'
import s from './Login.module.css'
import LoginForm from './LoginForm'
import { Redirect } from 'react-router'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../Types_For_TypeScript/Main_App_Types'

type PropsType = {}
const Login: React.FC<PropsType> = (props) => {

  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const errorAuth = useSelector((state: AppStateType) => state.auth.errorAuth)

  if(isAuth){
    return  <Redirect to='/profile'/>
  }
  if(errorAuth){
    return <div>{errorAuth}</div>
  }
  
  return (
    <div className = {s.login}>
      <div className={s.loginText}>
        Hello new User. Please Auth.
      </div>
      <div className={s.loginForm}>
        <LoginForm/>
      </div>
      
    </div>
  )
}

export default Login
