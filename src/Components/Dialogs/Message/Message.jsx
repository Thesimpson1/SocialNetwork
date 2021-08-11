import React from 'react';
import s from  './Message.module.css';
const Messages = (props) =>{
    return (
      <div className = {s.messages}>
         {props.messages}
     
      </div>
    )
  };
  export default Messages;