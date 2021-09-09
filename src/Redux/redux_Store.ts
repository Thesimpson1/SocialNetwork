import { applyMiddleware, combineReducers, createStore } from "redux"
import thunkMiddleware from "redux-thunk"
import reducerApp from "./Reducer_App"
import reducerAuth from "./Reducer_Auth"
import reducerDialogs from "./Reducer_Dialogs"
import reducerProfile from "./Reducer_Profile"
import reducerUsers from "./Reducer_Users"
import { composeWithDevTools } from 'redux-devtools-extension'

export const reducers = combineReducers({
    profile: reducerProfile,
    dialogs: reducerDialogs,
    users: reducerUsers,
    auth: reducerAuth,
    app: reducerApp,
})

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunkMiddleware)))
//@ts-ignore
window.store = store

export default store