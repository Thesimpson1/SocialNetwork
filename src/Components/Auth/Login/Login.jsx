import React from 'react';
import s from './Login.module.css';
import LoginForm from './LoginForm';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';


const Login = (props) => {

  const isAuth = useSelector(state => state.auth.isAuth);
  const errorAuth = useSelector(state => state.auth.errorAuth);
  if(isAuth){
    return  <Redirect to='/profile'/>;
  }
  if(errorAuth){
    return <div>{errorAuth}</div>;
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
};

export default Login;
