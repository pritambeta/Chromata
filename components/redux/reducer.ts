import {ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, SET_DATA} from './constants';

const initialState = [];

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case ADD_TO_WISHLIST:
            return [...state, action.data];
        case REMOVE_FROM_WISHLIST:
            return state.filter(item => item !== action.data);

        case SET_DATA:
            return action.data;

        default:
            return state;
    }
}
