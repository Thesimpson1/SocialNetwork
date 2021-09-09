const ADD_MESSAGE =  'DIALOG/ADD_MESSAGE'

const initial = {
    
        dataFriends: [
            { name: 'Ivan', id: '1' },
            { name: 'Ira', id: '2' },
            { name: 'Petr', id: '3' },
            { name: 'Valera', id: '4' },
            { name: 'Alla', id: '5' },
            { name: 'Sergo', id: '6' }
        ],
        dataMessages: [
            { id: '1', messages: 'Hello, how are you' },
            { id: '2', messages: 'Hello, how are you' },
            { id: '3', messages: 'Hello, how are you' },
            { id: '4', messages: 'Hello, how are you' },
            { id: '5', messages: 'Hello, how are you' },
            { id: '6', messages: 'Hello, how are you' }
        ]
}

export type initialStateType = typeof initial
const reducerDialogs = (state = initial, action: any): initialStateType =>{

    switch (action.type) {
        case ADD_MESSAGE:
            return{...state, dataMessages: [...state.dataMessages, { id: '7', messages: action.textMessage.areaPost }]}
        default:
            return state
    }
} 

type addMessageACType = {
    type: typeof ADD_MESSAGE
    textMessage: string
}
export const addMessageAC = (textMessage:string): addMessageACType => {
    return {type: ADD_MESSAGE, textMessage}
}

export default reducerDialogs