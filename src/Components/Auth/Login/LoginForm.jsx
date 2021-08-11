import React from 'react';
import { Form } from 'react-final-form'
import s from './LoginForm.module.css';
import {Input, createField} from '../../../Common/Form/FormHelpers'
import { useDispatch, useSelector } from 'react-redux';
import { getLoginThunk } from '../../../Redux/Reducer_Auth';

const LoginForm = (props) => {

  const required = (value) =>{
    return value ? undefined: 'required';
  }
  const captchaUrl = useSelector(state => state.auth.captcha);
  const dispatch = useDispatch();
  
  return(
    
    <Form onSubmit={(values) => dispatch(getLoginThunk(values))}  render={({ handleSubmit, submitError }) => (
      <form onSubmit={handleSubmit}>
        {createField('email', Input, 'email', required, 'First Name' )}
        {createField('password', Input, 'password', required, 'Password', {type: 'password'} )}
        {createField('rememberMe', Input, null, null, 'Remember me', {type: 'checkBox'} )}
        {captchaUrl && <img src = {captchaUrl} />}
        {captchaUrl && createField('captcha', Input, 'captcha', required, 'Anti Bot Symbols', {type: 'text'} )}
        {submitError && <div className = {s.submitError}>{submitError}</div>}
        <button type="submit">Submit</button>
      </form>
    )} />
  
 )
};

export default LoginForm;
