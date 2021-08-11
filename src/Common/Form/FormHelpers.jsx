import React from 'react';
import s from './FormHelpers.module.css';
import { Field } from 'react-final-form';

export const Input = ({ input, meta, ...props }) => {
  return (
    <div className={(meta.error && meta.touched) ? s.textarea : undefined}>
      <input {...input} {...props} />
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
  )
};
export const Textarea = ({ input, meta, ...props }) => {
  return (
    <div className={(meta.error && meta.touched) ? s.textarea : undefined}>
      <textarea {...input} {...props} />
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
  )
};
export  const createField = (name, component,  placeholder, validate, labelName, props = {}) =>{
  return <div>
    <label><b>{labelName}</b></label>
    <Field name={name} component={component} placeholder={placeholder} validate = {validate} {...props}/>
  </div>
};


