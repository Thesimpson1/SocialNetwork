import React from 'react'
import s from  './Message.module.css'

type PropsType = {messages: string}
const Messages: React.FC<PropsType> = (props) =>{
    return (
      <div className = {s.messages}>
         {props.messages}
     
      </div>
    )
  }
  export default Messages