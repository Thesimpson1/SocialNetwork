import React from 'react';
import s from './Post.module.css';


const Post = (props) => {
  
  return (
    <div>
      <div className = {s.post}>
        <img src="https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg" alt="post" />
        {props.post}
      </div>
      <div>Like{props.like}</div>
    </div>
  );
}


export default Post;
