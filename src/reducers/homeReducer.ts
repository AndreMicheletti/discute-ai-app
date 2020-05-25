import {
    FIREBASE_DEFINITIONS_SUCCESS,
    FIREBASE_DEFINITIONS_REQUEST,
    FIREBASE_DEFINITIONS_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    error: false
}

type Action = { type: string }

const homeReducer = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case FIREBASE_DEFINITIONS_REQUEST:
            return {
                loading: true,
                error: false
            };
        case FIREBASE_DEFINITIONS_SUCCESS:
            return {
                loading: false,
                error: false
            };
        case FIREBASE_DEFINITIONS_ERROR:
            return {
                loading: false,
                error: true
            };
        default:
            return state;
    }
}

export default homeReducer;
