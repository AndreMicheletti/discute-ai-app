import React from 'react'
import * as colors from '../colors'

import HomeScreen from '../screens/HomeScreen'
import DefinitionScreen from '../screens/DefinitionScreen'
import CategoryScreen from '../screens/CategoryScreen'

import { createStackNavigator } from '@react-navigation/stack'

const Definition = createStackNavigator()

const DefinitionStack = () => {
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
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Definition.Screen
            name="Definition"
            component={DefinitionScreen}
            options={({ route }) => ({
              title: route.params.definition._source.title,
            })}
          />
          <Definition.Screen
            name="Category"
            component={CategoryScreen}
            options={({ route }) => ({
              title: route.params.category.title,
            })}
          />
        </Definition.Navigator>
    )
}

export default DefinitionStack
