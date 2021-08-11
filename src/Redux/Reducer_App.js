import { getAuthThunk } from './Reducer_Auth';

const SET_INITIALIZED = 'REDUCER_APP/SET_INITIALIZED';

let initial = {
    isInitialized: false,
};

let reducerApp = (state = initial, action) => {

    switch (action.type) {
        case SET_INITIALIZED:
            return { ...state, isInitialized: action.isInitialized };
        default:
            return state;
    }
};

export const setInitialized = (isInitialized) => {
    return { type: SET_INITIALIZED, isInitialized }
};

export const initializedThunk = () => async (dispatch) => {

    // let promise = dispatch(getAuthThunk());
    // Promise.all([promise]).then(() => dispatch(setInitialized(true)));
    
    dispatch(getAuthThunk());
    await dispatch(setInitialized(true));
    
};

export default reducerApp;

