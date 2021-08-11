import React from 'react';
import Auth from '../Auth/Auth';
import s from  './Header.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'


const Header = (props) =>{
  return (
    <div className = {s.header}>
      <div className = {s.leftSideContainer}>

        <div className = {s.leftSide}><FontAwesomeIcon icon={faGlobeAmericas} style = {{color: '#468cd1', marginRight: '10px'}}/></div>
        <div className = {s.logoText}>MySocialNetwork</div>
      </div>
      <div className = {s.auth}><Auth/></div>
    </div>
  );
}


export default Header;
