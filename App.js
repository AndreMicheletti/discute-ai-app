import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }; if (!global.atob) { global.atob = decode }

import React from "react";
import "./firebaseConn";
import * as colors from './src/colors'

import HomeScreen from './src/screens/HomeScreen';
import DefinitionScreen from './src/screens/DefinitionScreen';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import { PersistGate } from 'redux-persist/integration/react'
// import { store, persistor } from './src/store';
import { Provider } from 'react-redux';
import { store } from './src/store';

const Stack = createStackNavigator();

function App() {

  return (
    <Provider store={store}>
      <NavigationContainer theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.backgroundColor
        },
      }}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.backgroundColor,
              elevation: 0,
              shadowOpacity: 0,
              shadowOffset: {
                height: 0,
              },
              shadowRadius: 0,
              height: 80,
            },
            headerTintColor: colors.fontColor,
            headerTitleStyle: {
              fontWeight: 'normal',
              fontSize: 26,
              paddingLeft: 10,
            }
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Definition"
            component={DefinitionScreen}
            options={({ route }) => ({
              title: route.params.definition.title,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
