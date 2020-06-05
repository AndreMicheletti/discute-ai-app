import React from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'

import * as colors from '../colors'

const DiscussionScreen = () => {


    return (
        <View style={styles.container}>
            <Text>DiscussionScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryColor,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 10,
    }
})


export default DiscussionScreen
