import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePhotoThunk, setEditModeAC } from '../../../Redux/Reducer_Profile';
import s from './Profile_info.module.css';
import ProfileInfoForm from './Profile_info_Form';
import ProfileInfoStatus from './Status/Profile_info_status';

const ProfileInfo = (props) => {

  const profileUser = useSelector(state => state.profile.profileUser);
  const dispatch = useDispatch();
  const editMode = useSelector(state => state.profile.editMode);

  const {fullName, aboutMe, lookingForAJob, lookingForAJobDescription, contacts} = profileUser;
  const photos = profileUser.photos.large ?? 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png';
  
  
  const ownerPhoto = React.useRef();
  const setMainPhoto = (e) => {
    dispatch(savePhotoThunk(ownerPhoto.current.files[0]));
  };
  
  const contactKeys = Object.keys(contacts);
  const contactElement = contactKeys.map(keys => (contacts[keys] !== null) && <div key={keys}> Network: <span style = {{marginLeft: '160px'}} className = {s.profileInfoData}>{`${contacts[keys]}`}</span></div>);

  return (
    <div className={s.profileInfo}>

      <div className = {s.photoConteiner}>
        <img src={photos} alt=" " />
        {props.isOwner && <div className={s.changePhoto}>
          <input className={s.inputFile} type="file" accept=".jpg, .jpeg, .png" name="file" id="file" ref={ownerPhoto} onChange={setMainPhoto} />
          <label htmlFor="file" className={classNames(s.btn, s.btnTertiary, s.jsLabelFile)}>
            <span >Change photo</span>
          </label>
        </div>
        }
      </div>

      {editMode ? <ProfileInfoForm />
        : <div className = {s.ownInfoContainer}>
            <div className = {s.owninfo}>
              <div><b>{` ${fullName}`}</b></div>
              <ProfileInfoStatus /><hr></hr>
              <div className = {s.profileInfoDataConteiner}>About Me: <span className = {s.profileInfoData}>{` ${aboutMe}`}</span></div>
              <div className = {s.profileInfoDataConteiner}>Looking For A Job: <span  style = {{marginLeft: '105px'}} className = {s.profileInfoData}>{` ${lookingForAJob ? "yes" : "no"}`}</span></div>
              <div className = {s.profileInfoDataConteiner}>Job Description: <span style = {{marginLeft: '120px'}} className = {s.profileInfoData}>{` ${lookingForAJobDescription}`}</span></div>
              <div className = {s.profileInfoDataConteiner}> {contactElement}</div>
              <div>
                {props.isOwner && <button onClick={() => dispatch(setEditModeAC())}>Change my information</button>}
              </div>
            </div>
        </div>}

    </div>
  )

}

export default ProfileInfo;
