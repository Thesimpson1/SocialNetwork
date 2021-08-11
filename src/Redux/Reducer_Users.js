import { copyAndMap } from "../Common/Helper/copyAndMap";
import { usersApi } from "../Dal/Api";

const FOLLOW = 'USERS/FOLLOW';
const UNFOLLOW = 'USERS/UNFOLLOW';
const GET_USERS = 'USERS/GET_USERS';
const TOTAL_COUNT = 'USERS/TOTAL_COUNT';
const CURRENT_PAGE = 'USERS/CURRENT_PAGE';
const IS_FETCHING = 'USERS/IS_FETCHING';
const CHANGE_FOLLOW_PROGRESS = 'USERS/CHANGE_FOLLOW_PROGRESS';

let initial = {
    users: [],
    totalCount: 0,
    pageSize: 10,
    currentPage: 4,
    isFetching: false,
    followingUser: []
};

let reducerUsers = (state = initial, action) => {

    switch (action.type) {
        case UNFOLLOW:
            return {
                ...state, users: copyAndMap(state.users, action.userId, 'id', {followed : false})
            }
        case FOLLOW:
            // return {
            //     ...state, users: state.users.map(i => {
            //         if (i.id === action.userId) {
            //             return { ...i, followed: true }
            //         }
            //         return i;
            //     })
            // }
            return {
                ...state, users: copyAndMap(state.users, action.userId, 'id', {followed : true})
            }
        case GET_USERS:
            return {
                ...state, users: [...action.users]
            }
        case TOTAL_COUNT:
            return {
                ...state, totalCount: action.totalCount
            }
        case CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case CHANGE_FOLLOW_PROGRESS:

            return {
                ...state,
                followingUser: action.isFollowingProgress ? [...state.followingUser, action.userId] : state.followingUser.filter(id => id !== action.userId)
            }

        default:
            return state;
    }
};


export const unfollowAC = (userId) => {
    return { type: UNFOLLOW, userId }
};
export const followAC = (userId) => {
    return { type: FOLLOW, userId }
};
export const getUsersAC = (users) => {
    return { type: GET_USERS, users }
};
export const getTotalCountAC = (totalCount) => {
    return { type: TOTAL_COUNT, totalCount }
};
export const currentPageAC = (currentPage) => {
    return { type: CURRENT_PAGE, currentPage }
};
export const isFetchingAC = (isFetching) => {
    return { type: IS_FETCHING, isFetching }
};
export const changeFollowProgressAC = (isFollowingProgress, userId) => {
    return { type: CHANGE_FOLLOW_PROGRESS, isFollowingProgress, userId }
};

const followUnfollowHelpFunction = async (apiMethod, actionCreator, dispatch, userId) => {
    dispatch(changeFollowProgressAC(true, userId));
        let response = await apiMethod(userId);
        if (response.data.resultCode === 0) {
            dispatch(actionCreator(userId));
            dispatch(changeFollowProgressAC(false, userId));
        }
};
export const getUsersThunk = () => {
    return async (dispatch) => {

        dispatch(isFetchingAC(true));
        let response = await usersApi.getAllUsers();
        dispatch(isFetchingAC(false));
        dispatch(getUsersAC(response.data.items));
        dispatch(getTotalCountAC(response.data.totalCount));
    }; 
};
export const getCurrentPageThunk = (currentPageFromState) => {
    return async (dispatch) => {

        dispatch(isFetchingAC(true));
        let response = await usersApi.setPage(currentPageFromState);    
        dispatch(isFetchingAC(false));
        dispatch(getUsersAC(response.data.items));
            
    };
};
export const unfollowThunk = (userId) => {
    return async (dispatch) => {
       return  followUnfollowHelpFunction(usersApi.deleteUser, unfollowAC, dispatch, userId);
    };
}; 
export const followThunk = (userId) => {
    return async (dispatch) => {
        return followUnfollowHelpFunction(usersApi.postUser, followAC, dispatch, userId);
    }; 
}; 

export default reducerUsers;

