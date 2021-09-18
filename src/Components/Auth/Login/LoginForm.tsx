import React from 'react'
import { Form } from 'react-final-form'
import s from './LoginForm.module.css'
import {Input, createField} from '../../../Common/Form/FormHelpers'
import { useDispatch, useSelector } from 'react-redux'
import { getLoginThunk, loginValuesType } from '../../../Redux/Reducer_Auth'
import { AppStateType } from '../../../Types_For_TypeScript/Main_App_Types'

export type ValidateType = (value: string) => undefined | 'required'
type NameType = Extract<keyof loginValuesType, string>
const LoginForm: React.FC = (props) => {

  const required: ValidateType = (value) =>{
    return value ? undefined: 'required'
  }
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captcha)
  const dispatch = useDispatch()
  
  return(
    
    <Form onSubmit={(values: loginValuesType) => dispatch(getLoginThunk(values)) }  render={({ handleSubmit, submitError }) => (
      
      <form onSubmit={handleSubmit}>
        {createField<NameType>('email', Input, 'email', required, 'First Name' )}
        {createField<NameType>('password', Input, 'password', required, 'Password', {type: 'password'} )}
        {createField<NameType>('rememberMe', Input, null, undefined, 'Remember me', {type: 'checkBox'} )}
        {captchaUrl && <img src = {captchaUrl} />}
        {captchaUrl && createField<NameType>('captcha', Input, 'captcha', required, 'Anti Bot Symbols', {type: 'text'} )}
        {submitError && <div className = {s.submitError}>{submitError}</div>}
        <button type="submit">Submit</button>
      </form>
    )} />
  
 )
}

export default LoginForm
