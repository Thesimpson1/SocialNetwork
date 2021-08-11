import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStatusThunk } from '../../../../Redux/Reducer_Profile';
import s from './Profile_info_status.module.css';

const ProfileInfoStatus = (props) => {
  

  const userStatus = useSelector(state => state.profile.userStatus);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [newUserStatus, setUserStatus] = useState(userStatus);

  const onEditMode = () => {
    setEditMode(true);
  };
  const offEditMode = () => {
    setEditMode(false);
    dispatch(updateUserStatusThunk(newUserStatus));
  };

  const setNewUserStatus = (e) => {
    setUserStatus(e.currentTarget.value)
  };

  if (!editMode) {
    if (!userStatus) {
      return <div onClick={() => { onEditMode() }}>Hello my friend</div>;
    }
    return <div onClick={() => { onEditMode() }}>{` ${userStatus || '-----'}`}</div>;

  };

  return (
    <div className={s.profileInfoStatus}>
      <div><input onChange={(e) => { setNewUserStatus(e) }} autoFocus={true} value={newUserStatus} onBlur={() => { offEditMode() }} /></div>
    </div>
  );

};

export default ProfileInfoStatus;
