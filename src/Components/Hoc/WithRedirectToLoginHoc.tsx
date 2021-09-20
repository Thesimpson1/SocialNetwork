import {  useSelector } from "react-redux"
import { Redirect } from "react-router"
import React, { Component } from 'react'
import { AppStateType } from "../../Types_For_TypeScript/Main_App_Types"

type withRedirectToLoginHocType = (Component:React.FC) => React.FC
export const withRedirectToLoginHoc:withRedirectToLoginHocType = (Component) => {

  const RedirectToLogin: React.FC = (props) => {

    const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)
    if (!isAuth) {
      return <Redirect to='/login'></Redirect>
    }

    return <Component {...props}/>
  }

  return RedirectToLogin
}