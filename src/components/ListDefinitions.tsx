import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import DefinitionButton from './DefinitionButton';

import { DefinitionStore, DefinitionResponse } from '../models'

import _ from 'lodash';


type Props = {
    definitionStore: DefinitionStore,
    navigation: any
}

class ListDefinitions extends React.PureComponent<Props> {

    static defaultProps: Props = {
        definitionStore: {},
        navigation: undefined
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
        const { definitionStore, navigation } = this.props;

        const definitions: DefinitionResponse[] = _.values(definitionStore)

        return definitions.map((definitionResp: DefinitionResponse) => {
            return (
                <DefinitionButton
                    key={definitionResp._id}
                    onPress={() => navigation.push("Definition", {definition: definitionResp})}
                    definition={definitionResp}
                />
            )
        })
    }
}

const styles = StyleSheet.create({
    twoPerLine: {
        paddingLeft: 25,
        paddingRight: 25,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    }
});

export default ListDefinitions;
