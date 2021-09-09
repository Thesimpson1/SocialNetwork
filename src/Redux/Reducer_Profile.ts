import { profileInfoApi } from "../Dal/Api"
import { FORM_ERROR } from 'final-form'

const ADD_POST = 'PROFILE/ADD_POST'
const GET_PROFILE_USER = 'PROFILE/GET_PROFILE_USER'
const GET_USER_STATUS = 'PROFILE/GET_USER_STATUS'
const GET_OWNER_PHOTO = 'PROFILE/GET_OWNER_PHOTO'
const SET_EDIT_MODE = 'PROFILE/SET_EDIT_MODE'

const initial = {
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
    photos: null,  
}
type initialStateType = typeof initial
const reducerProfile = (state = initial, action: any):initialStateType => {

    switch (action.type) {
        case ADD_POST:

            return { ...state, dataPost: [...state.dataPost, { post: action.newText.areaPost, id: '1', like: '1' }] }

        case SET_EDIT_MODE:

            return { ...state, editMode: true }

        case GET_PROFILE_USER:
            return {
                ...state, profileUser: action.profileUser,
                isFetching: true,
                editMode: false,
            }
        case GET_USER_STATUS:
            return {
                ...state, userStatus: action.userStatus,
            }
            // may be error
        case GET_OWNER_PHOTO:
            return {
                ...state, profileUser: {...state.profileUser}, photos: action.ownerPhoto,
            }

        default:
            return state
    }
}

type addPostACType = {
    type: typeof ADD_POST
    newText: string
}
export const addPostAC = (newText: string): addPostACType => {
    return { type: ADD_POST, newText }
}

type setEditModeACType = {
    type: typeof SET_EDIT_MODE
}
export const setEditModeAC = (): setEditModeACType => {
    return { type: SET_EDIT_MODE}
}

type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string 
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type photosType = {
    small: string
    large: string
}
type profileUserType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos: photosType
}
type getProfileUserACType = {
    type: typeof GET_PROFILE_USER
    profileUser: profileUserType
}
export const getProfileUserAC = (profileUser: profileUserType): getProfileUserACType => {
    return { type: GET_PROFILE_USER, profileUser }
}

type getUserStatusACType = {
    type: typeof GET_USER_STATUS
    userStatus: string
}
export const getUserStatusAC = (userStatus: string): getUserStatusACType => {
    return { type: GET_USER_STATUS, userStatus }
}

// may be error in ownerType
type getOwnerPhotoACType = {
    type: typeof GET_OWNER_PHOTO
    ownerPhoto: photosType
}
export const getOwnerPhotoAC = (ownerPhoto: photosType): getOwnerPhotoACType => {
    return { type: GET_OWNER_PHOTO, ownerPhoto }
}
export const getProfileUserThunk = (useUserId: number) => {
    return async (dispatch: any) => {

        let response = await profileInfoApi.getProfInfo(useUserId)
        dispatch(getProfileUserAC(response.data))

    }
}

export const getUserStatusThunk = (useUserId: number) => {
    return async (dispatch: any) => {

        let response = await profileInfoApi.getStatus(useUserId)
        dispatch(getUserStatusAC(response.data))

    }
}

export const updateUserStatusThunk = (status: string) => {
    return async (dispatch: any, getState: any) => {

        let response = await profileInfoApi.updateStatus(status)

        if (response.data.resultCode === 0) {
            const MY_ID = getState().auth.dataAuth.id
            dispatch(getUserStatusThunk(MY_ID))
        }
    }
}
export const savePhotoThunk = (photo: File) => {
    return async (dispatch: any) => {

        let response = await profileInfoApi.savePhoto(photo)

        if (response.data.resultCode === 0) {
            dispatch(getOwnerPhotoAC(response.data.data.photos))
            
        }
    }
}

export const saveProfileInfoThunk = (formData: profileUserType) => {
    return async (dispatch: any, getState: any) => {
        
        const response = await profileInfoApi.saveProfileInfo(formData)

        if (response.data.resultCode === 0) {
            
            const MY_ID = getState().auth.dataAuth.id
            
            dispatch(getProfileUserThunk(MY_ID))
        }
        return { [FORM_ERROR]: response.data.messages }
    }
}

export default reducerProfile