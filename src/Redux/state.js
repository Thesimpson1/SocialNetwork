import React from 'react';
import '../index.css';
import reducerDialogs from './Reducer_Dialogs';
import reducerProfile from './Reducer_Profile';

const store = {
    state: {
        profile: {
            dataPost: [
                { post: 'Hey word', id: '1', like: '1' },
                { post: 'Hey word', id: '2', like: '3' },
                { post: 'Hey word', id: '3', like: '2' },
                { post: 'Hey word', id: '4', like: '5' }
            ],
            dataArea: 'Hello'
        },
        dialogs: {
            dataAreaMessage: 'Hello',
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
    },
    renderTree (){
        console.log('hello');
    },
    subscriber (newRender){
        this.renderTree = newRender;
    },
    dispatch(action){
        this.state.profile = reducerProfile(this.state.profile, action);
        this.state.dialogs = reducerDialogs(this.state.dialogs, action);
        this.renderTree();
    }
}


export default store;


