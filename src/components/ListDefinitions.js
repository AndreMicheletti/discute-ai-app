import React from "react";
import { View, ScrollView } from "react-native";

import DefinitionButton from './DefinitionButton';
import { defined } from "react-native-reanimated";

class ListDefinitions extends React.PureComponent {

    static defaultProps = {
        definitions: [
            {
                title: "Tema 1",
                backgroundColor: "red",
                featured: true
            },
            {
                title: "Tema 2",
                backgroundColor: "purple",
                featured: true
            },
            {
                title: "Tema 3",
                backgroundColor: "blue"
            },
            {
                title: "Tema 2",
                backgroundColor: "purple"
            },
            {
                title: "Tema 2",
                backgroundColor: "purple"
            },
            {
                title: "Tema 2",
                backgroundColor: "purple"
            },
            {
                title: "Tema 2", 
                backgroundColor: "purple"
            },
            {
                title: "Tema 2",
                backgroundColor: "purple"
            },
            {
                title: "Tema 2",
                backgroundColor: "purple"
            },
            {
                title: "Tema 2",
                backgroundColor: "purple"
            }
        ]
    };

    render () {

        return (
            <View>
                <ScrollView contentContainerStyle={styles.twoPerLine}>
                    {this.renderDefinitions()}
                </ScrollView>
            </View>
        );
    }

    renderDefinitions () {
        const { definitions, navigation } = this.props;
        return definitions.map((definitionProps, index) => {
            return (
                <DefinitionButton
                    key={index}
                    onPress={() => navigation.push("Definition", {definition: definitionProps})}
                    definition={definitionProps}
                />
            )
        })
    }
}

const styles = {
    twoPerLine: {
        paddingLeft: 25,
        paddingRight: 25,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    }
};

export default ListDefinitions;
