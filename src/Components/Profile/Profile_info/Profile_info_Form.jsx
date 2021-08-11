import React from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import {Input, createField, Textarea} from '../../../Common/Form/FormHelpers';
import { saveProfileInfoThunk } from '../../../Redux/Reducer_Profile';
import s from './../../Auth/Login/LoginForm.module.css';

const ProfileInfoForm = (props) => {

  const profileUser = useSelector(state => state.profile.profileUser);
  const dispatch = useDispatch();

  const profileInfoInputforContact = Object.keys(profileUser.contacts).map(keys => <div key = {keys}>
      {createField(`contacts.${keys}`, Input, keys, null, `${keys}: ` )}
    </div>)
  
  return (

    <Form onSubmit={(values) => dispatch(saveProfileInfoThunk(values))} initialValues={profileUser} render={({ handleSubmit, submitError}) => (
      <form onSubmit={handleSubmit}  >
        {createField('fullName', Input, 'fullName', null, 'fullName:')}
        {createField('aboutMe', Textarea, 'aboutMe', null, 'aboutMe:')}
        {createField('lookingForAJob', Input, 'lookingForAJob', null,'lookingForAJob:', {type: 'checkbox'})}
        {createField('lookingForAJobDescription', Textarea, 'lookingForAJobDescription', null, 'lookingForAJobDescription:')}
        {profileInfoInputforContact}
        {submitError && <div className = {s.submitError}>{submitError}</div>}
        <button type='submit'>Save</button>
      </form>
    )} />
  );
};

export default ProfileInfoForm;