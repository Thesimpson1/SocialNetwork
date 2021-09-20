import React, { FC } from 'react'
import s from './FormHelpers.module.css'
import { Field, FieldRenderProps, SupportedInputs } from 'react-final-form'
import { FieldValidator } from 'final-form'


type MetaType  = {
  error: string
  touched: boolean
}
type PropsTypeArea = {
  input: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
  meta: MetaType
}
type PropsTypeInput = {
  input:  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  meta: MetaType
}
type ComponentFormType =  SupportedInputs | React.ComponentType<FieldRenderProps<string, HTMLElement>> | undefined
 

export const Input: FC<FieldRenderProps<string, HTMLElement>> = ({ input, meta, ...props }) => {
  return (
    <div className={(meta.error && meta.touched) ? s.textarea : undefined}>
      <input {...input} {...props} />
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
  )
}
export const Textarea: FC<FieldRenderProps<string, HTMLElement>> = ({ input, meta, ...props }) => {
  return (
    <div className={(meta.error && meta.touched) ? s.textarea : undefined}>
      <textarea {...input} {...props} />
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
  )
}



export function createField<NameType extends string> (name: NameType, component: ComponentFormType,  placeholder: string|null, validate: FieldValidator<string> | undefined, labelName: string|null, props = {}){
  return <div>
    <label><b>{labelName}</b></label>
    <Field name={name} component={component} placeholder={placeholder} validate = {validate} {...props}/>
  </div>
}


