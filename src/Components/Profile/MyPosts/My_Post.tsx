import React from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../../Types_For_TypeScript/Main_App_Types'
import s from './My_Post.module.css'
import Post from './Post/Post'


const MyPost: React.FC = (props) => {

  const post = useSelector((state: AppStateType) => state.profile.dataPost)
  const postMap = post.map(i => <Post post={i.post} like={i.like} key={i.id} />)
  
  return (
    <div className={s.my_post}>
      {postMap}
    </div>
  )
}


export default MyPost
