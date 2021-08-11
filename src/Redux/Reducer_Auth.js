
import { authApi } from '../Dal/Api';
import { FORM_ERROR } from 'final-form';

const GET_AUTH = 'AUTH/GET_AUTH';
const GET_ERROR = 'AUTH/GET_ERROR';
const GET_CAPTCHA_URL = 'AUTH/GET_CAPTCHA_URL'

let initial = {
    dataAuth: [],
    isAuth: false,
    captcha: null,
    errorAuth: null,
};

let reducerAuth = (state = initial, action) => {

    switch (action.type) {
        case GET_AUTH:
            return { ...state, dataAuth: action.dataAuth, isAuth: action.isAuth };
        case GET_ERROR:
            return { ...state, errorAuth: action.error };
        case GET_CAPTCHA_URL:
            return { ...state, captcha: action.captcha };
        default:
            return state;
    }
};

export const getAuthAC = (dataAuth = [], isAuth) => {
    return { type: GET_AUTH, dataAuth, isAuth }
};
export const getErrorAC = (error) => {
    return { type: GET_ERROR, error }
};
export const getCaptchaUrlAC = (captcha) => {
    return { type: GET_CAPTCHA_URL, captcha }
};
export const getCaptchaUrlThunk = () => {
    return async (dispatch) => {

        const response =  await authApi.getCaptcha();
        dispatch(getCaptchaUrlAC(response.data.url)); 
    };
};
export const getAuthThunk = () => {
    return async (dispatch) => {
        try {
            let response =  await authApi.authMe();
            if (response.data.resultCode === 0) {
                dispatch(getAuthAC(response.data.data, true));
            };  
        } catch (error) {
            dispatch(getErrorAC(error.message));
        }
        
         
    };
}; 
export const getLoginThunk = (values) => {
    
        return async (dispatch) => {

            const response =  await authApi.login(values.email, values.password, values.rememberMe, values.captcha);
            if (response.data.resultCode === 0) {
                dispatch(getAuthThunk());
            }else{
                if(response.data.resultCode === 10){
                    dispatch(getCaptchaUrlThunk())
                }
                return { [FORM_ERROR]: response.data.messages }; 
            }
        };

};
export const logoutThunk = () => {
    return async (dispatch) => {

        let response = await authApi.logout();
            if (response.data.resultCode === 0) {
                let response = await authApi.authMe();
                    if (response.data.resultCode === 1) {
                        dispatch(getAuthAC(response.data.data, false));
                    };
                
            };
        
    };
};

export default reducerAuth;

