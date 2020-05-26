import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    SEARCH_RESET,
    SEARCH_CHANGE_TEXT,
} from '../actions/types';


const INITIAL_STATE = {
    searchQuery: "",
    hasSearchResults: false,
    loading: false,
    error: false,
    searchResult: null
}

type Action = {
    type: string,
    payload: any
}

const searchReducer = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case SEARCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                hasSearchResults: false,
                searchResult: null
            }
        case SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                hasSearchResults: true,
                searchResult: action.payload
            }
        case SEARCH_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                hasSearchResults: false,
                searchResult: null
            }
        case SEARCH_CHANGE_TEXT:
            return {
                ...state,
                searchQuery: action.payload
            }
        case SEARCH_RESET:
            return {...INITIAL_STATE};
        default:
            return {...state};
    }
}

export default searchReducer;
