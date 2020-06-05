import axios from 'axios'
import { BACKEND_URL } from '../consts'
import { DefinitionStore, DefinitionResponse } from '../models'
import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
    SEARCH_RESET,
    SEARCH_CHANGE_TEXT
} from './types';


export const submitSearch = (searchQuery: string) => {
    return async (dispatch: Function) => {
        dispatch({ type: SEARCH_REQUEST })

        try {
            
            const response = await axios.get(`${BACKEND_URL}/definitions/search/${encodeURI(searchQuery)}`)

            dispatch({
              type: SEARCH_SUCCESS,
              payload: response.data.map((def: DefinitionResponse) => {
                  return {
                      ...def,
                      _source: {
                          ...def._source,
                          featured: false
                      }
                  }
              })
            });

        } catch (e) {
            console.warn(e)

            dispatch({ type: SEARCH_ERROR })
            return
        }
    }
}


export const changeSearchText = (text: string) => {
    return {
        type: SEARCH_CHANGE_TEXT,
        payload: text
    }
}


export const resetSearch = () => {
    return {
        type: SEARCH_RESET
    }
}
