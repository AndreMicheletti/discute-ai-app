import { BACKEND_URL } from '../consts';
import axios, { AxiosResponse } from 'axios';
import {
    FIREBASE_DEFINITIONS_ERROR,
    FIREBASE_DEFINITIONS_REQUEST,
    FIREBASE_DEFINITIONS_SUCCESS,
} from './types';

import _ from 'lodash';


export const definitionsFetch = () => {

    return async (dispatch: Function) => {
        dispatch({ type: FIREBASE_DEFINITIONS_REQUEST });

        try {

            const response = await axios.get(`${BACKEND_URL}/definitions`)

            console.log(response.data)

            dispatch({
              type: FIREBASE_DEFINITIONS_SUCCESS,
              payload: []
            });

        } catch (e) {
            console.warn(e);

            dispatch({ type: FIREBASE_DEFINITIONS_ERROR });
            return null;
        }
    };
}
