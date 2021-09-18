import { AppStateType } from './../Types_For_TypeScript/Main_App_Types'

export let requestUsers = (state: AppStateType) =>{
    return state.users.users
}
export let getTotalCount = (state: AppStateType) =>{
    return state.users.totalCount
}
export let getPageSize = (state: AppStateType) =>{
    return state.users.pageSize
}
export let getCurrentPage = (state: AppStateType) =>{
    return state.users.currentPage
}
export let getIsFetching = (state: AppStateType) =>{
    return state.users.isFetching
}
export let getFollowingUser = (state: AppStateType) =>{
    return state.users.followingUser
}