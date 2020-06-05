import React from 'react';
import { TouchableNativeFeedback, View, Image, Text, StyleSheet } from 'react-native';

import { DefinitionResponse } from '../models'

type Props = {
    definition: DefinitionResponse,
    style: Object,
    line: boolean,
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
                featured: false,
                source: ''
            }
        },
        line: false,
        style: {},
        onPress: () => console.warn("NO ON PRESS DEFINED")
    };


    renderText () {
        const { definition } = this.props;
        const { title, tags, imageUrl } = definition._source;

        const bigText = title.length > 24

        if (imageUrl !== "") {
            return (
                <View style={styles.textShadowContainer}>
                    <Text
                        numberOfLines={bigText ? 4 : 3}
                        style={[styles.featuredTextStyle, { fontSize: bigText ? 12 : 18 }]}
                        adjustsFontSizeToFit
                    >
                        {title}
                    </Text>
                </View>
            )
        }

        const len = tags.length

        const tagJSX = tags.map((tag, index) => {
            return (
                <Text key={tag} style={{ color: 'white', marginRight: 5 }}>
                    {tag}
                    {index == len - 1 ? '' : ','}
                </Text>
            )
        })

        return (
            <React.Fragment>
                <Text numberOfLines={2} adjustsFontSizeToFit
                    style={[styles.textStyle, { fontSize: 18 }]}
                >
                    {title}
                </Text>
                <View style={styles.tagTextStyle}>
                    {tagJSX}
                </View>
            </React.Fragment>
        )
    }

    render () {

        const { line, definition, onPress, style } = this.props;
        const { imageUrl } = definition._source;

        const extraStyle = {
            ...style,
            backgroundColor: "#2765cf",
            flex: line ? 1 : undefined,
            width: line ? undefined : 145,
            height: line ? 100 : 145,
            borderRadius: line ? 3 : 10
        };

        const imageStyle = line ? {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        } : {
            width: extraStyle.width,
            height: extraStyle.height,
            borderRadius: styles.outerContainer.borderRadius,
        }

        return (
            <TouchableNativeFeedback onPress={() => onPress()}>
                <View style={[styles.outerContainer, extraStyle]}>
                    { 
                    imageUrl  ? 
                        <Image resizeMode={"cover"} source={{ uri: imageUrl }} style={imageStyle} /> 
                    : null}
                    {this.renderText()}
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        position: 'relative',
        width: 145,
        height: 145,
        borderRadius: 10,
        marginTop: 5,
        marginHorizontal: 5,
        paddingHorizontal: 5,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    featuredTextStyle: {
        position: 'relative',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tagTextStyle: {
        position: 'absolute',
        bottom: 15,
        flex: 1,
        flexDirection: 'row',
    },
    textStyle: {
        position: 'absolute',
        top: 10,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textShadowContainer: {
        position: 'absolute',
        right: 5,
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 2,
        bottom: 10,
        backgroundColor: "#000000CC"
    }
})

export default DefinitionButton;
