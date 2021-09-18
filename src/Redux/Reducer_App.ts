import { AppStateType } from './../Types_For_TypeScript/Main_App_Types';
import { ThunkAction } from 'redux-thunk'
import { getAuthThunk } from './Reducer_Auth'

const SET_INITIALIZED = 'REDUCER_APP/SET_INITIALIZED'

export type actionType = {
    type: typeof SET_INITIALIZED,
    isInitialized: boolean,
}
type setInitializedType = {
    type: typeof SET_INITIALIZED
    isInitialized: boolean
}

const initial = {
    isInitialized: false,
}

export type initialStateType = typeof initial

const reducerApp = (state = initial, action: actionType): initialStateType => {

    switch (action.type) {
        case SET_INITIALIZED:
            return { ...state, isInitialized: action.isInitialized }
        default:
            return state
    }
}

export const setInitialized = (isInitialized: boolean): setInitializedType => {
    return { type: SET_INITIALIZED, isInitialized }
}
// this was await
export const initializedThunk = (): ThunkAction<Promise<void>, AppStateType, unknown, actionType> => async (dispatch) => {
    dispatch(getAuthThunk())
    dispatch(setInitialized(true))    
}

export default reducerApp

