import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { DefinitionResponse } from '../models';

import DefinitionButton from './DefinitionButton';


type Props = {
    references: DefinitionResponse[],
    navigation: any
}


class ReferencesList extends React.PureComponent<Props> {

    static defaultProps: Props = {
        references: [],
        navigation: undefined
    };

    render () {

        return (
            <View>
                <ScrollView horizontal={true} contentContainerStyle={styles.horizontalScroll}>
                    {this.renderReferences()}
                </ScrollView>
            </View>
        );
    }

    renderReferences () {
        const { references, navigation } = this.props;

        return references.map((reference, index) => {
            return (
                <DefinitionButton
                    key={index}
                    onPress={() => navigation.push("Definition", {definition: reference})}
                    definition={reference}
                    style={{ marginRight: 10}}
                />
            )
        })
    }
}

const styles = StyleSheet.create({
    horizontalScroll: {
        paddingLeft: 25,
        paddingRight: 25,
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'nowrap'
    }
});

export default ReferencesList;
