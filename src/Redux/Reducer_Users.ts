import { copyAndMap } from "../Common/Helper/copyAndMap"
import { usersApi } from "../Dal/Api"
import { photosType } from "./Reducer_Profile"
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './../Types_For_TypeScript/Main_App_Types'
import { Dispatch } from "react"

const FOLLOW = 'USERS/FOLLOW'
const UNFOLLOW = 'USERS/UNFOLLOW'
const GET_USERS = 'USERS/GET_USERS'
const TOTAL_COUNT = 'USERS/TOTAL_COUNT'
const CURRENT_PAGE = 'USERS/CURRENT_PAGE'
const IS_FETCHING = 'USERS/IS_FETCHING'
const CHANGE_FOLLOW_PROGRESS = 'USERS/CHANGE_FOLLOW_PROGRESS'

type initialStateType = {
    users: Array<usersType>
    totalCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingUser: Array<number>
}
const initial: initialStateType = {
    users: [],
    totalCount: 0,
    pageSize: 10,
    currentPage: 4,
    isFetching: false,
    followingUser: []
}
const reducerUsers = (state = initial, action: MainAuthActionType): initialStateType => {

    switch (action.type) {
        case UNFOLLOW:
            return {
                ...state, users: copyAndMap(state.users, action.userId, 'id', {followed : false})
            }
        case FOLLOW:
            return {
                ...state, users: copyAndMap(state.users, action.userId, 'id', {followed : true})
            }
        case GET_USERS:

            return {
                ...state, users: action.users
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
                ...state, followingUser: action.isFollowingProgress ? [...state.followingUser, action.userId] : state.followingUser.filter(id => id !== action.userId)
            }

        default:
            return state
    }
}

type unfollowACType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowAC = (userId: number): unfollowACType => {
    return { type: UNFOLLOW, userId }
}

type followACType = {
    type: typeof FOLLOW
    userId: number
}
export const followAC = (userId: number): followACType => {
    return { type: FOLLOW, userId }
}

export type usersType = {
    id: number
    name: string
    status: string
    photos: null | photosType
    followed: boolean
}
type getUsersACType = {
    type: typeof GET_USERS
    users: usersType[]
}
export const getUsersAC = (users: usersType[]): getUsersACType => {
    return { type: GET_USERS, users }
}

type getTotalCountACType = {
    type: typeof TOTAL_COUNT
    totalCount: number
}
export const getTotalCountAC = (totalCount: number): getTotalCountACType => {
    return { type: TOTAL_COUNT, totalCount }
}

type currentPageACType = {
    type: typeof CURRENT_PAGE
    currentPage: number
}
export const currentPageAC = (currentPage: number): currentPageACType => {
    return { type: CURRENT_PAGE, currentPage }
}

type isFetchingACType = {
    type: typeof IS_FETCHING
    isFetching: boolean
}
export const isFetchingAC = (isFetching: boolean): isFetchingACType => {
    return { type: IS_FETCHING, isFetching }
}

type changeFollowProgressACType = {
    type: typeof CHANGE_FOLLOW_PROGRESS
    isFollowingProgress: boolean 
    userId: number
}
export const changeFollowProgressAC = (isFollowingProgress: boolean, userId: number): changeFollowProgressACType => {
    return { type: CHANGE_FOLLOW_PROGRESS, isFollowingProgress, userId }
}
type followUnfollowHelpFunctionType = (apiMethod: any, 
        actionCreator: (userId:number) => unfollowACType|followACType, 
            dispatch: Dispatch<unfollowACType|followACType|changeFollowProgressACType>, 
                userId: number) => void

const followUnfollowHelpFunction: followUnfollowHelpFunctionType = async (apiMethod, actionCreator, dispatch, userId) => {
    dispatch(changeFollowProgressAC(true, userId))
        let response = await apiMethod(userId)
        if (response.data.resultCode === 0) {
            dispatch(actionCreator(userId))
            dispatch(changeFollowProgressAC(false, userId))
        }
}

type MainAuthActionType = unfollowACType|followACType|getTotalCountACType|currentPageACType|isFetchingACType|changeFollowProgressACType|getUsersACType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, MainAuthActionType>

export const getUsersThunk = (): ThunkType => {
    return async (dispatch) => {

        dispatch(isFetchingAC(true))
        let response = await usersApi.getAllUsers()
        dispatch(isFetchingAC(false))
        dispatch(getUsersAC(response.data.items))
        dispatch(getTotalCountAC(response.data.totalCount))
    } 
}
export const getCurrentPageThunk = (currentPageFromState: number): ThunkType => {
    return async (dispatch) => {

        dispatch(isFetchingAC(true))
        let response = await usersApi.setPage(currentPageFromState)    
        dispatch(isFetchingAC(false))
        dispatch(getUsersAC(response.data.items))
            
    }
}
export const unfollowThunk = (userId: number): ThunkType => {
    return async (dispatch) => {
       return  followUnfollowHelpFunction(usersApi.deleteUser, unfollowAC, dispatch, userId)
    }
} 
export const followThunk = (userId: number): ThunkType => {
    return async (dispatch) => {
        return followUnfollowHelpFunction(usersApi.postUser, followAC, dispatch, userId)
    } 
} 

export default reducerUsers

