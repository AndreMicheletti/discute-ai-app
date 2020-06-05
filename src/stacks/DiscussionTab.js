import React from 'react'
import * as colors from '../colors'

import HomeScreen from '../screens/HomeScreen'
import DiscussionScreen from '../screens/DiscussionScreen'

import { createStackNavigator } from '@react-navigation/stack'

const Definition = createStackNavigator()

const DiscussionStack = () => {
    return (
        <Definition.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.backgroundColor,
              elevation: 3,
              shadowOpacity: 0.3,
              shadowOffset: {
                height: 1,
              },
              shadowRadius: 0,
              height: 85,
            },
            headerTintColor: colors.fontColor,
            headerTitleStyle: {
              fontWeight: 'normal',
              fontSize: 26,
              paddingLeft: 10,
            }
          }}
        >
          <Definition.Screen
            name="Home"
            component={DiscussionScreen}
            options={{ headerShown: false }}
          />
        </Definition.Navigator>
    )
}

export default DiscussionStack
