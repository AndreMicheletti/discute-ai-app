import axios from 'axios';
import { BACKEND_URL } from '../consts';
import { DefinitionResponse, DefinitionStore, FirebaseData, FirebaseDefinition } from '../models';
import {
    FIREBASE_DEFINITIONS_ERROR,
    FIREBASE_DEFINITIONS_REQUEST,
    FIREBASE_DEFINITIONS_SUCCESS,
    FIREBASE_HOME_TAGS_SUCCESS
} from './types';
import { db } from '../../firebaseConn'

import _ from 'lodash';


export const definitionsFetch = () => {

    return async (dispatch: Function) => {
        dispatch({ type: FIREBASE_DEFINITIONS_REQUEST });

        try {

            // GET TAGS FOR HOME SCREEN
            const responseTags = await axios.get(`${BACKEND_URL}/definitions/tags`)
            const resultTags = responseTags.data

            dispatch({
                type: FIREBASE_HOME_TAGS_SUCCESS,
                payload: resultTags
            })

            // GET ALL DEFINITIONS DATA
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


export const firebaseDefinitionsFetch = () => {

    return async (dispatch: Function) => {
        dispatch({ type: FIREBASE_DEFINITIONS_REQUEST });

        try {
            const snapshot = await db.collection("definitions").get()

            let payload: any[] = []

            snapshot.forEach(doc => {
                payload.push({
                    id: doc.id,
                    ...doc.data()
                })
            })

            const sortedPayload: FirebaseDefinition[] = payload.sort((a: FirebaseDefinition, b: FirebaseDefinition) => {
                if (a.featured && !b.featured) {
                    return -1;
                }
                if (b.featured && !a.featured) {
                    return 1;
                }
                if (a.likes && b.likes) {
                    return a.likes >= b.likes ? -1 : 1;
                }
                return 1;
            })

            dispatch({
              type: FIREBASE_DEFINITIONS_SUCCESS,
              payload: _.keyBy(sortedPayload, o => o.id)
            });

        } catch (e) {
            console.warn(e);

            dispatch({ type: FIREBASE_DEFINITIONS_ERROR });
            return null;
        }
    };
}