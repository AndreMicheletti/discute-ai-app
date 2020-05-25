import React from "react";
import { TouchableNativeFeedback, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import * as Permissions from 'expo-permissions';

const ClockButton = ({ size = 32, ...props }) => {
    return (
        <TouchableNativeFeedback onPress={() => askAndOpenClock()}>
            <View style={{ padding: 8, ...props.style }}>
                <Ionicons name="md-clock" size={size} color="white" />
            </View>
        </TouchableNativeFeedback>
    )
}

async function askAndOpenClock() {
    const result = await Permissions.getAsync(Permissions.REMINDERS);
    console.log(result)
}

export default ClockButton;
