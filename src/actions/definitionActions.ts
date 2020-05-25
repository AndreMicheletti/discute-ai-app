import axios from 'axios';
import { BACKEND_URL } from '../consts';
import { DefinitionResponse, DefinitionStore } from '../models';
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

            const sortedData = response.data.sort(sortByFeatured)

            let payload: DefinitionStore = {}

            sortedData.forEach((definitionResp: DefinitionResponse) => {
                payload[definitionResp._id] = definitionResp
            })

            dispatch({
              type: FIREBASE_DEFINITIONS_SUCCESS,
              payload
            });

        } catch (e) {
            console.warn(e);

            dispatch({ type: FIREBASE_DEFINITIONS_ERROR });
            return null;
        }
    };
}

function sortByFeatured (a: DefinitionResponse, b: DefinitionResponse) {
    if (a._source.featured && !b._source.featured) {
        return -1
    } else if (b._source.featured && !a._source.featured) {
        return 1
    }
    return -1
}
