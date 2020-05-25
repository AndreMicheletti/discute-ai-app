import {
    FIREBASE_DEFINITIONS_SUCCESS,
    FIREBASE_DEFINITIONS_REQUEST,
    FIREBASE_DEFINITIONS_ERROR
} from '../actions/types';

import { DefinitionStore } from '../models';

type Action = {
    type: string,
    payload: DefinitionStore
}

const INITIAL_STATE = {}

const persistedDefinitionsReducer = (state = INITIAL_STATE, action: Action) => {
    console.log(action)

    switch (action.type) {
        case FIREBASE_DEFINITIONS_REQUEST:
            return new Object();
        case FIREBASE_DEFINITIONS_SUCCESS:
            return action.payload;
        case FIREBASE_DEFINITIONS_ERROR:
            return new Object();
        default:
            return state;
    }
}

export default persistedDefinitionsReducer;
