import { DefinitionResponse } from '../models';
import {
    REFERENCES_FINISHED,
    REFERENCES_INIT
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    parsedReferences: []
}

type Action = {
    type: string,
    payload: DefinitionResponse[]
}

const referencesReducer = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case REFERENCES_INIT:
            return {
                parsedReferences: [],
                loading: true,
            };
        case REFERENCES_FINISHED:
            return {
                parsedReferences: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

export default referencesReducer;
