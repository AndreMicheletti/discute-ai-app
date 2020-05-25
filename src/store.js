import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from "redux-persist";

import createSecureStore from "redux-persist-expo-securestore";
// import AsyncStorage from "redux-persist/lib/storage";
// import AsyncStorage from '@react-native-community/async-storage';
// import { AsyncStorage } from 'react-native';

import thunk from 'redux-thunk';

import rootReducer from './reducers';

// Secure storage
const storage = createSecureStore();

const persistConfig = {
  key: 'offlineData',
  version: 0,
  storage
}

// const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(rootReducer, applyMiddleware(thunk))
// let persistor = persistStore(store)

export { store };
