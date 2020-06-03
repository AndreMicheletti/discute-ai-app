import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as colors from '../colors'

import DefinitionTab from './DefinitionTab'
import SettingsTab from './SettingsTab'

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
                    iconName = 'thought-bubble'
                    break
                // case 'Profile':
                //     iconName = 'account'
                //     size = 29
                //     break
                case 'About':
                    iconName = 'information'
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
      <Tab.Screen name="Discussion" options={{ title: 'Discussão' }} component={SettingsTab} />
      {/* <Tab.Screen name="Profile" options={{ title: 'Conta' }} component={SettingsTab} /> */}
      <Tab.Screen name="About" options={{ title: 'Sobre' }} component={SettingsTab} />
    </Tab.Navigator>
  )
}

export default TabStack;
