import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }; if (!global.atob) { global.atob = decode }

import React, { useEffect } from "react"
import { FontDisplay, loadAsync } from 'expo-font'
import "./firebaseConn"
import * as colors from './src/colors'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import AppStack from './src/stacks'

// import { PersistGate } from 'redux-persist/integration/react'
// import { store, persistor } from './src/store'
import { Provider } from 'react-redux'
import { store } from './src/store'


function App() {

  useEffect(async () => {
    const res = await loadAsync({
      'Roboto': {
        uri: require('./src/fonts/Roboto-Black.ttf'),
        fontDisplay: FontDisplay.FALLBACK
      }
    })
    console.log(res)
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.backgroundColor
        },
      }}>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App
