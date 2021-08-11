import { profileInfoApi } from "../Dal/Api";
import { FORM_ERROR } from 'final-form';

const ADD_POST = 'PROFILE/ADD_POST';
const GET_PROFILE_USER = 'PROFILE/GET_PROFILE_USER';
const GET_USER_STATUS = 'PROFILE/GET_USER_STATUS';
const GET_OWNER_PHOTO = 'PROFILE/GET_OWNER_PHOTO';
const SET_EDIT_MODE = 'PROFILE/SET_EDIT_MODE';


let initial = {

    dataPost: [
        { post: 'Hey word', id: '1', like: '1' },
        { post: 'Hey word', id: '2', like: '3' },
        { post: 'Hey word', id: '3', like: '2' },
        { post: 'Heys word', id: '4', like: '5' }
    ],
    profileUser: [],
    isFetching: false,
    userStatus: '',
    editMode: false,
    
};

let reducerProfile = (state = initial, action) => {

    switch (action.type) {
        case ADD_POST:

            return { ...state, dataPost: [...state.dataPost, { post: action.newText.areaPost, id: '1', like: '1' }] };

        case SET_EDIT_MODE:

            return { ...state, editMode: true };

        case GET_PROFILE_USER:
            return {
                ...state, profileUser: action.profileUser,
                isFetching: true,
                editMode: false,
            };
        case GET_USER_STATUS:
            return {
                ...state, userStatus: action.userStatus,
            };
        case GET_OWNER_PHOTO:
            return {
                ...state, profileUser: {...state.profileUser, photos: action.ownerPhoto},
            };

        default:
            return state;
    }
};


export const addPostAC = (newText) => {
    return { type: ADD_POST, newText }
};
export const setEditModeAC = () => {
    return { type: SET_EDIT_MODE}
};
export const getProfileUserAC = (profileUser) => {
    return { type: GET_PROFILE_USER, profileUser }
};
export const getUserStatusAC = (userStatus) => {
    return { type: GET_USER_STATUS, userStatus }
};
export const getOwnerPhotoAC = (ownerPhoto) => {
    return { type: GET_OWNER_PHOTO, ownerPhoto }
};


export const getProfileUserThunk = (useUserId) => {
    return async (dispatch) => {

        let response = await profileInfoApi.getProfInfo(useUserId);
        dispatch(getProfileUserAC(response.data));

    };
};
export const getUserStatusThunk = (useUserId) => {
    return async (dispatch) => {

        let response = await profileInfoApi.getStatus(useUserId);
        console.log(response.data);
        dispatch(getUserStatusAC(response.data));

    };
};
export const updateUserStatusThunk = (status) => {
    return async (dispatch, getState) => {

        let response = await profileInfoApi.updateStatus(status);

        if (response.data.resultCode === 0) {
            const MY_ID = getState().auth.dataAuth.id;
            dispatch(getUserStatusThunk(MY_ID));
        }

    };
};
export const savePhotoThunk = (photo) => {
    return async (dispatch) => {

        let response = await profileInfoApi.savePhoto(photo);

        if (response.data.resultCode === 0) {
            dispatch(getOwnerPhotoAC(response.data.data.photos));
            
        }

    };
};
export const saveProfileInfoThunk = (formData) => {
    return async (dispatch, getState) => {
        
        const response = await profileInfoApi.saveProfileInfo(formData);

        if (response.data.resultCode === 0) {
            
            const MY_ID = getState().auth.dataAuth.id;
            
            dispatch(getProfileUserThunk(MY_ID));
        }
        
        return { [FORM_ERROR]: response.data.messages };
        
    };
};

export default reducerProfile;
