import { reducers } from './../Redux/redux_Store';


type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>