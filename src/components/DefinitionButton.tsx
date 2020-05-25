import React from 'react';
import { TouchableNativeFeedback, View, Image, Text, StyleSheet } from 'react-native';

import { DefinitionResponse } from '../models'

type Props = {
    definition: DefinitionResponse,
    style: Object,
    onPress: Function
}

class DefinitionButton extends React.PureComponent<Props> {

    static defaultProps: Props = {
        definition: {
            _index: "",
            _type: "",
            _id: "1",
            _score: 0,
            _source: {
                references: [],
                text: "",
                imageUrl: "",
                tags: [],
                faq: [],
                title: "",
                color: "",
                likes: 0,
                dislikes: 0,
                featured: false
            }
        },
        style: {},
        onPress: () => console.warn("NO ON PRESS DEFINED")
    };

    render () {

        const { definition, onPress, style } = this.props;
        const { imageUrl, title, color, featured } = definition._source;

        const extraStyle = {
            ...style,
            backgroundColor: color,
            width: featured ? 310 : 145,
            height: featured ? 165 : 145,
        };

        return (
            <TouchableNativeFeedback onPress={() => onPress()}>
                <View style={[styles.outerContainer, extraStyle]}>
                    { 
                    imageUrl  ? 
                    <Image
                        resizeMode={"cover"}
                        source={{ uri: imageUrl }}
                        style={{ 
                            width: extraStyle.width,
                            height: extraStyle.height,
                            borderRadius: styles.outerContainer.borderRadius,
                        }}
                    />  : null}
                    <Text
                        numberOfLines={1}
                        style={[styles.textStyle, { fontSize: featured ? 24 : 18 }]}
                        adjustsFontSizeToFit
                    >
                        {title}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        width: 145,
        height: 145,
        borderRadius: 10,
        marginTop: 5,
        marginRight: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        position: 'absolute',
        color: 'white',
        fontWeight: 'bold'
    }
})

export default DefinitionButton;
