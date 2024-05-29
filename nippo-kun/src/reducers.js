import { combineReducers } from 'redux';
import { SET_TODO } from './actions';

const initialState = {
    todo: 'AtCoder',
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODO:
            return {
                ...state,
                todo: action.payload,
            };
        default:
            return state;
    }
};

export default combineReducers({
    todo: todoReducer,
});
