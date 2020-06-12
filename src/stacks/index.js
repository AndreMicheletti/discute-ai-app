import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as colors from '../colors'

import DefinitionTab from './DefinitionTab'
import DiscussionTab from './DiscussionTab'
import FakeNewsTab from './FakeNewsTab'
import PodcastTab from './PodcastTab'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
            let iconName;
            let size = 23

            switch (route.name) {
                case 'Definition':
                    iconName = 'book'
                    break
                case 'Discussion':
                    size = 26
                    iconName = 'chat-processing' // 'thought-bubble'
                    break
                // case 'Profile':
                //     iconName = 'account'
                //     size = 29
                //     break
                case 'Fakenews':
                    iconName = 'shield-alert'
                    break
                case 'Podcast':
                    iconName = 'headphones'
                    break
                default:
                    iconName = ''
                    break
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
        })}
        tabBarOptions={{
            allowFontScaling: true,
            activeTintColor: colors.primaryColor,
            inactiveTintColor: 'gray',
            labelStyle: {
                fontSize: 12,
                fontWeight: '700',
                marginBottom: 2,
                fontFamily: "Roboto"
            }
        }}
    >
      <Tab.Screen name="Definition" options={{ title: 'Definições' }} component={DefinitionTab} />
      <Tab.Screen name="Discussion" options={{ title: 'Debate' }} component={DiscussionTab} />
      <Tab.Screen name="Fakenews" options={{ title: 'Fake News' }} component={FakeNewsTab} />
      <Tab.Screen name="Podcast" options={{ title: 'Podcast' }} component={PodcastTab} />
    </Tab.Navigator>
  )
}

export default TabStack;
