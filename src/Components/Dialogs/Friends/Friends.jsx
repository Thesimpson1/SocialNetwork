import React from 'react';
import { NavLink} from 'react-router-dom';
import s from  './Friends.module.css';
const Friends = (props) =>{
    let userId = '/dialogs/' + props.id;
    return (
      <div className = {s.friends}>
        <NavLink to = {userId} activeClassName = {s.active}>{props.name}</NavLink>
      </div>
    )
  };

  export default Friends;