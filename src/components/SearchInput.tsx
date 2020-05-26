import React, { useState } from 'react';
import { View, StyleSheet, TextInput} from 'react-native';


type Props = {
    onChangeText: Function,
    onFocus: Function,
    value: string,
    placeholder: string
}

const defaultProps: Props = {
    onChangeText: () => {},
    onFocus: () => {},
    value: "",
    placeholder: "Procurar..."
}


const SearchInput = (props: Props = defaultProps) => {
    return (
        <View style={styles.containerStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={text => props.onChangeText(text)}
              onFocus={() => props.onFocus()}
              placeholder={props.placeholder}
              value={props.value}
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
