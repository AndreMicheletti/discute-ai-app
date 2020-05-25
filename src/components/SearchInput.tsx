import React, { useState } from 'react';
import { View, StyleSheet, TextInput} from 'react-native';

const SearchInput = () => {

    const [text, setText] = useState("")

    return (
        <View style={styles.containerStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={text => setText(text)}
              placeholder={"Procurar..."}
              value={text}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        width: 300,
        height: 44,
    },
    inputStyle: {
        flex: 1,
        padding: 14,
        color: '#333',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "lightgray",
        fontSize: 15
    }
})

export default SearchInput;
