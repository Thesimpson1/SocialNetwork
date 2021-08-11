import {  useSelector } from "react-redux";
import { Redirect } from "react-router";
import React from 'react';

export const withRedirectToLoginHoc = (Component) => {

  const RedirectToLogin = (props) => {

    const isAuth = useSelector(state => state.auth.isAuth);
    if (!isAuth) {
      return <Redirect to='/login'></Redirect>;
    }

    return <Component {...props}/>
  }

  return RedirectToLogin;
}