import React from 'react'
import { View, Text } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'

const FakeNews = createStackNavigator()

const FakeNewsScreen = () => {
  return (
    <View>
      <Text>Olá</Text>
    </View>
  )
}

const FakeNewsStack = () => {
    return (
        <FakeNews.Navigator>
            <FakeNews.Screen
                name="Home"
                component={FakeNewsScreen}
            />
        </FakeNews.Navigator>
    )
}

export default FakeNewsStack
