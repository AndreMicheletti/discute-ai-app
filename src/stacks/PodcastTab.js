import React from 'react'
import { View, Text } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'

const Podcast = createStackNavigator()

const PodcastScreen = () => {
  return (
    <View>
      <Text>Olá</Text>
    </View>
  )
}

const PodcastStack = () => {
    return (
        <Podcast.Navigator>
            <Podcast.Screen
                name="Home"
                component={PodcastScreen}
            />
        </Podcast.Navigator>
    )
}

export default PodcastStack
