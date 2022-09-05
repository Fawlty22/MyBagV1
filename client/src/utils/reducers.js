import { useReducer } from 'react';

//import actions
import { UPDATE_USER } from './actions'

export const reducer = (state, action) => {
    switch(action.type) {
        case UPDATE_USER: 
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.token
        };
    }
}

export function useUserReducer(initialState) {
    return useReducer(reducer, initialState);
}
