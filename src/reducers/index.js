import persistedDefinitionsReducer from './persistedDefinitionsReducer';
import referencesReducer from './referencesReducer';
import homeReducer from './homeReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    home: homeReducer,
    definitions: persistedDefinitionsReducer,
    references: referencesReducer
});
