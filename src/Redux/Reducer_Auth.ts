import { authApi } from '../Dal/Api'
import { FORM_ERROR } from 'final-form'

const GET_AUTH = 'AUTH/GET_AUTH'
const GET_ERROR = 'AUTH/GET_ERROR'
const GET_CAPTCHA_URL = 'AUTH/GET_CAPTCHA_URL'

const initial = {
    dataAuth: [],
    isAuth: false,
    captcha: null,
    errorAuth: null,
}
type initialStateType = typeof initial 

const reducerAuth = (state = initial, action: any): initialStateType => {

    switch (action.type) {
        case GET_AUTH:
            return { ...state, dataAuth: action.dataAuth, isAuth: action.isAuth }
        case GET_ERROR:
            return { ...state, errorAuth: action.error }
        case GET_CAPTCHA_URL:
            return { ...state, captcha: action.captcha }
        default:
            return state
    }
};
type dataAuthType = {
    id: number
    email: string
    login: string
}
type getAuthACType = {
    type: typeof GET_AUTH
    dataAuth: dataAuthType
    isAuth: boolean
}
// can be error because dataAuth was equel array

export const getAuthAC = (dataAuth: dataAuthType, isAuth: boolean): getAuthACType => {
    return { type: GET_AUTH, dataAuth, isAuth }
}
type errorType = {
    message: string
}
type getErrorACType = {
    type: typeof GET_ERROR
    error: errorType
}

export const getErrorAC = (error: errorType): getErrorACType => {
    return { type: GET_ERROR, error }
}

type getCaptchaUrlACType = {
    type: typeof GET_CAPTCHA_URL
    captcha: string
}
export const getCaptchaUrlAC = (captcha: string): getCaptchaUrlACType => {
    return { type: GET_CAPTCHA_URL, captcha }
}

export const getCaptchaUrlThunk = () => {
    return async (dispatch: any) => {

        const response =  await authApi.getCaptcha();
        dispatch(getCaptchaUrlAC(response.data.url)); 
    }
}

export const getAuthThunk = () => {
    return async (dispatch: any) => {
        try {
            let response =  await authApi.authMe();
            if (response.data.resultCode === 0) {
                dispatch(getAuthAC(response.data.data, true));
            }  
        } catch (error: any) {
            dispatch(getErrorAC(error.message));
        } 
    }
} 

type loginValuesType = {
    email: string
    password: number
    rememberMe: boolean
    captcha: string
}
export const getLoginThunk = (values: loginValuesType) => {
    
        return async (dispatch: any) => {

            const response =  await authApi.login(values.email, values.password, values.rememberMe, values.captcha);
            if (response.data.resultCode === 0) {
                dispatch(getAuthThunk());
            }else{
                if(response.data.resultCode === 10){
                    dispatch(getCaptchaUrlThunk())
                }
                return { [FORM_ERROR]: response.data.messages }
            }
        }
}
export const logoutThunk = () => {
    return async (dispatch:any) => {

        let response = await authApi.logout();
            if (response.data.resultCode === 0) {
                let response = await authApi.authMe();
                    if (response.data.resultCode === 1) {
                        dispatch(getAuthAC(response.data.data, false));
                    }
            }
    }
}

export default reducerAuth

