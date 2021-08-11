import React from 'react';
import { withRedirectToLoginHoc } from '../Hoc/WithRedirectToLoginHoc';
import MyPost from './MyPosts/My_Post';
import s from './Profile.module.css';
import ProfileForm from './ProfileForm';
import ProfileInfoContainer from './Profile_info/Profile_info_Container_widthHook';

const Profile = (props) => {
  
  return (

    <div className={s.profile}>
      <div><ProfileInfoContainer/></div>
      
      <div className={s.profile_post}>
        <ProfileForm/>
        <MyPost/>
      </div>
    </div>
  )
};

const ProfileWithRedirect = withRedirectToLoginHoc(Profile) 

export default ProfileWithRedirect;
