import React from "react";
import "./firebaseConn";
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

import HomeScreen from './src/screens/HomeScreen';
import DefinitionScreen from './src/screens/DefinitionScreen';

import ClockButton from './src/components/ClockButton';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react'
// import { store, persistor } from './src/store';
import { store } from './src/store';

const Stack = createStackNavigator();

function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#56c7c7',
              height: 100,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'normal',
              fontSize: 28,
              paddingLeft: 10,
            }
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation, route }) => ({
              title: 'Discute ai',
              headerRight: () => <ClockButton navigation={navigation} size={36} style={{ marginRight: 35, marginTop: 5 }} />,
            })}
            
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
