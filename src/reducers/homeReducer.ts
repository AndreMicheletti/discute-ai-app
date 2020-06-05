import {
    FIREBASE_DEFINITIONS_SUCCESS,
    FIREBASE_DEFINITIONS_REQUEST,
    FIREBASE_DEFINITIONS_ERROR,
    FIREBASE_HOME_TAGS_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    error: false,
    tags: [
        {tag: "featured", title: "Em Alta"}
    ]
}

type Action = { type: string, payload: any[] }

const homeReducer = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case FIREBASE_DEFINITIONS_REQUEST:
            return {
                loading: true,
                error: false,
                tags: state.tags
            };
        case FIREBASE_HOME_TAGS_SUCCESS:
            return {
                ...state,
                tags: [
                    { tag: 'featured', title: 'Em Alta' },
                    ...action.payload
                ]
            }
        case FIREBASE_DEFINITIONS_SUCCESS:
            return {
                loading: false,
                error: false,
                tags: state.tags
            };
        case FIREBASE_DEFINITIONS_ERROR:
            return {
                loading: false,
                error: true,
                tags: state.tags
            };
        default:
            return state;
    }
}

export default homeReducer;
