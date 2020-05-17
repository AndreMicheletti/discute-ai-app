import React from "react";
import { TouchableNativeFeedback, View, Image, Text } from "react-native";

class DefinitionButton extends React.PureComponent {

    static defaultProps = {
        definition: {
            imgSrc: "",
            title: "Desconhecido",
            backgroundColor: "red",
            featured: false,
        },
        style: {},
        onPress: () => console.warn("NO ON PRESS DEFINED")
    };

    render () {

        const { definition, onPress, style } = this.props;
        const { imgSrc, title, backgroundColor, featured } = definition;

        const extraStyle = {
            ...style,
            backgroundColor,
            width: featured ? 310 : 145,
        };

        return (
            <TouchableNativeFeedback onPress={() => onPress()}>
                <View style={[styles.outerContainer, extraStyle]}>
                    { 
                    imgSrc  ? 
                    <Image src={imgSrc} /> 
                    : 
                    <Text style={styles.textStyle}>
                        {title}
                    </Text> }
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = {
    outerContainer: {
        width: 145,
        height: 145,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold'
    }
};

export default DefinitionButton;
