import React from 'react'
import { Form } from 'react-final-form'
import { useDispatch } from 'react-redux'
import {createField, Textarea} from '../../Common/Form/FormHelpers'
import { addMessageAC, textMessage } from '../../Redux/Reducer_Dialogs'



const DialogsForm: React.FC = (props) => {

  const dispatch = useDispatch()
  const onSubmit = (formData: textMessage) => {
    dispatch(addMessageAC(formData))
  }

  return (
    <Form onSubmit={onSubmit} render={({ handleSubmit, form }) => (
      <form onSubmit={handleSubmit}>
        {createField('areaPost', Textarea, 'Your Post', undefined, null )}
        <button type="submit">New Message</button>
        <button type = 'button' onClick = {() => form.reset()}>reset</button>
      </form>
    )} />
  )
}

export default DialogsForm
