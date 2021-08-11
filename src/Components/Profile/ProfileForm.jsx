import React from 'react';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { createField, Textarea } from '../../Common/Form/FormHelpers';
import { addPostAC } from '../../Redux/Reducer_Profile';
import s from './MyPosts/My_Post.module.css';

const ProfileForm = (props) => {

  const dispatch = useDispatch(); 
  const onSubmit = (formData) => {
    dispatch(addPostAC(formData));
  }

  return (

    <Form onSubmit={onSubmit} render={({ handleSubmit, form }) => (
      <form onSubmit={handleSubmit}>
        {createField('areaPost', Textarea, 'Your Post', null, null )}
        <button type='submit'>New Post</button>
        <button className = {s.layout} type = 'button' onClick = {form.reset}>reset</button>
      </form>
    )} />
  );
};

export default ProfileForm;
