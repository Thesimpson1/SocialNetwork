import { getAuthThunk } from './Reducer_Auth'

const SET_INITIALIZED = 'REDUCER_APP/SET_INITIALIZED'

export type actionType = {
    type: typeof SET_INITIALIZED,
    isInitialized: boolean,
}

const initial = {
    isInitialized: false,
};

export type initialStateType = typeof initial

const reducerApp = (state = initial, action: actionType): initialStateType => {

    switch (action.type) {
        case SET_INITIALIZED:
            return { ...state, isInitialized: action.isInitialized }
        default:
            return state;
    }
};


type setInitializedType = {
    type: typeof SET_INITIALIZED
    isInitialized: boolean
}
export const setInitialized = (isInitialized: boolean): setInitializedType => {
    return { type: SET_INITIALIZED, isInitialized }
};

export const initializedThunk = () => async (dispatch: any) => {
    
    dispatch(getAuthThunk())
    await dispatch(setInitialized(true))    
};

export default reducerApp;

