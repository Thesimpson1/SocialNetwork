import React from 'react';
import { NavLink } from 'react-router-dom';
import s from  './Nav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,  faEnvelope, faUsers, faWindowMaximize, faMusic, faCogs } from '@fortawesome/free-solid-svg-icons'

const Nav = (props) =>{
  return (
    <div className = {s.nav}>
      <div className = {s.nav_wrap}>
        <div><NavLink to = '/profile' activeClassName = {s.active}><FontAwesomeIcon icon={faUserCircle} style = {{color: '#468cd1', marginRight: '10px'}}/>Profile</NavLink></div>
        <div><NavLink to = '/dialogs' activeClassName = {s.active}><FontAwesomeIcon icon={faEnvelope} style = {{color: '#468cd1', marginRight: '10px'}}/>Messages</NavLink></div>
        <div><NavLink to = '/users' activeClassName = {s.active}><FontAwesomeIcon icon={faUsers} style = {{color: '#468cd1', marginRight: '10px'}}/>Users</NavLink></div>
        <div><NavLink to = '/news' activeClassName = {s.active}><FontAwesomeIcon icon={faWindowMaximize} style = {{color: '#468cd1', marginRight: '10px'}}/>News</NavLink></div>
        <div><NavLink to = '/music' activeClassName = {s.active}><FontAwesomeIcon icon={faMusic} style = {{color: '#468cd1', marginRight: '10px'}}/>Music</NavLink></div>
        <div><NavLink to = '/settings' activeClassName = {s.active}><FontAwesomeIcon icon={faCogs} style = {{color: '#468cd1', marginRight: '10px'}}/>Settings</NavLink></div>
      </div>
    </div>
  );
}


export default Nav;
