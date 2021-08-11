export let requestUsers = (state) =>{
    return state.users.users;
};
export let getTotalCount = (state) =>{
    return state.users.totalCount;
};
export let getPageSize = (state) =>{
    return state.users.pageSize;
};
export let getCurrentPage = (state) =>{
    return state.users.currentPage;
};
export let getIsFetching = (state) =>{
    return state.users.isFetching;
};
export let getFollowingUser = (state) =>{
    return state.users.followingUser;
};