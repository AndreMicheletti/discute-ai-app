import React from "react";
import { View, ScrollView } from "react-native";

import DefinitionButton from './DefinitionButton';
import { defined } from "react-native-reanimated";

class ListHorizontalDefinitions extends React.PureComponent {

    static defaultProps = {
        definitions: [
            {
                title: "Tema 1",
                backgroundColor: "red",
            },
            {
                title: "Tema 2",
                backgroundColor: "purple",
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
        ]
    };

    render () {

        return (
            <View>
                <ScrollView horizontal={true} contentContainerStyle={styles.horizontalScroll}>
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
                    onPress={() => navigation.replace("Definition", {definition: definitionProps})}
                    definition={definitionProps}
                    style={{ marginRight: 10}}
                />
            )
        })
    }
}

const styles = {
    horizontalScroll: {
        paddingLeft: 25,
        paddingRight: 25,
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'nowrap'
    }
};

export default ListHorizontalDefinitions;
