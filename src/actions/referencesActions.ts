import { DefinitionStore, DefinitionResponse } from '../models';
import {
    REFERENCES_INIT,
    REFERENCES_FINISHED
} from './types';

import _ from 'lodash';

export const parseReferences = (referenceList: string[], definitionsStore: DefinitionStore) => {

    return async (dispatch: Function) => {
        dispatch({ type: REFERENCES_INIT });

        try {

            const parsed: DefinitionResponse[] = referenceList.map((id: string, index: number, array: string[]) => {
                return definitionsStore[id]
            })

            dispatch({
                type: REFERENCES_FINISHED,
                payload: parsed.filter(Boolean)
            });

        } catch (e) {
            console.warn(e);

            dispatch({ type: REFERENCES_FINISHED, payload: [] });
            return null;
        }

    };
}