import persistedDefinitionsReducer from './persistedDefinitionsReducer';
import referencesReducer from './referencesReducer';
import homeReducer from './homeReducer';
import searchReducer from './searchReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    home: homeReducer,
    search: searchReducer,
    definitions: persistedDefinitionsReducer,
    references: referencesReducer
});
