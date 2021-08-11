import React from 'react';
import reducerProfile, { addPostAC } from './Reducer_Profile';


it('post must be add', () => {
    // data
    let initial = {

        dataPost: [
            { post: 'Hey word', id: '1', like: '1' },
            { post: 'Hey word', id: '2', like: '3' },
            { post: 'Hey word', id: '3', like: '2' },
            { post: 'Hey word', id: '4', like: '5' }
        ],
        profileUser: [],
        isFetching: false,
        userStatus: ''
    };
    let action = addPostAC('hello word');

    // action
    let profileTest = reducerProfile(initial, action);

    expect(profileTest.dataPost.length).toBe(5);

});