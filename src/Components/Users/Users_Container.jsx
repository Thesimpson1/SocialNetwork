import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentPageAC, getUsersThunk, getCurrentPageThunk, unfollowThunk, followThunk } from '../../Redux/Reducer_Users';
import { getCurrentPage, getIsFetching, getPageSize, getTotalCount, requestUsers, getFollowingUser } from '../../Redux/Selectors_users';
import Preloader from '../../Common/Preload/Preloader';
import User from './User/User';
import s from './UserApi.module.css';
import Pagination from '../../Common/Pagination/Pagination';

const UsersContainer = (props) => {

  
  const users = useSelector(state => requestUsers(state) );
  const totalCount = useSelector(state => getTotalCount(state));
  const pageSize = useSelector(state => getPageSize(state));
  const currentPage = useSelector(state => getCurrentPage(state));
  const isFetching = useSelector(state => getIsFetching(state));
  const followingUser = useSelector(state => getFollowingUser(state));
  const dispatch = useDispatch();
  React.useEffect(() => dispatch(getUsersThunk()), []);

  const showUsers = users.map(i => <User status={i.status} key = {i.id} id={i.id} name={i.name} 
    photos={i.photos.small ?? 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png'} followed={i.followed} unfollowThunk = {(id) => dispatch(unfollowThunk(id))} 
      followThunk = {(id) => dispatch(followThunk(id))}  followingUser = {followingUser} />)

  const setCurrentPage = (page) =>{
    dispatch(currentPageAC(page));
    dispatch(getCurrentPageThunk(currentPage));    
  };

  return (
    <div >
      <div>
        {isFetching && <Preloader/>}
      </div>
      <div className = {s.pages}>
        <Pagination totalCount = {totalCount} pageSize = {pageSize} sizePortion = {10} currentPage = {currentPage} setCurrentPage = {setCurrentPage} />
      </div>
      <div>
        {showUsers}
      </div>
    </div>
  )
};

export default UsersContainer;
