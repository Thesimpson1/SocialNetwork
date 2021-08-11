import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './User.module.css';

const User = (props) => {

  return (
    <div className={s.user}>
      <div className={s.userFirst}>
        <NavLink to={'/profile/' + props.id}>
          <div className={s.userFirstImg} >
            <img src={props.photos} alt="user" />
          </div>
        </NavLink>
        <div className={s.userFirstButton}> {props.followed
          ? <button disabled={props.followingUser.some(id => id === props.id)} onClick={() => {
            props.unfollowThunk(props.id);
          }}>Unfollow</button>
          : <button disabled={props.followingUser.some(id => id === props.id)} onClick={() => {
            props.followThunk(props.id);
          }}>Follow</button>}
        </div>
      </div>
      <div className={s.userSecond}>
        <NavLink to={'/profile/' + props.id} ><div>{props.name}</div></NavLink>
        <div>{props.status}</div>
      </div>
    </div>
  )
};

export default User;
