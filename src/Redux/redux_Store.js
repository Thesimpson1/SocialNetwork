import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import reducerApp from "./Reducer_App";
import reducerAuth from "./Reducer_Auth";
import reducerDialogs from "./Reducer_Dialogs";
import reducerProfile from "./Reducer_Profile";
import reducerUsers from "./Reducer_Users";
import { composeWithDevTools } from 'redux-devtools-extension';

let reducers = combineReducers({
    profile: reducerProfile,
    dialogs: reducerDialogs,
    users: reducerUsers,
    auth: reducerAuth,
    app: reducerApp,
});
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));
const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;