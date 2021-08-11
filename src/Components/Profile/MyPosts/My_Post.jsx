import React from 'react';
import { useSelector } from 'react-redux';
import s from './My_Post.module.css';
import Post from './Post/Post';


const MyPost = (props) => {

  const post = useSelector(state => state.profile.dataPost)
  const postMap = post.map(i => <Post post={i.post} like={i.like} key={i.id} />)
  
  return (
    <div className={s.my_post}>
      {postMap}
    </div>
  );
}


export default MyPost;
