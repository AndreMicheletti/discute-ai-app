import React from 'react'
import { View, Text } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'

const Settings = createStackNavigator()

const SettingsScreen = () => {
  return (
    <View>
      <Text>Olá</Text>
    </View>
  )
}

const SettingsStack = () => {
    return (
        <Settings.Navigator>
            <Settings.Screen
                name="Home"
                component={SettingsScreen}
            />
        </Settings.Navigator>
    )
}

export default SettingsStack
