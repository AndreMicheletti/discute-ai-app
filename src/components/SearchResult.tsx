import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";

import DefinitionButton from './DefinitionButton';
import VerticalSection from './VerticalSection';

import { DefinitionResponse } from '../models'

import _ from 'lodash';


type Props = {
    data: DefinitionResponse[],
    navigation: any
}

class SearchResult extends React.PureComponent<Props> {

    static defaultProps: Props = {
        data: [],
        navigation: undefined
    };

    render () {

        if (this.props.data.length <= 0) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ marginTop: 50, fontSize: 20 }}>
                        Nada foi encontrado
                    </Text>
                </View>
            );
        }

        return (
            <View style={{ paddingBottom: 80 }}>
                <VerticalSection data={this.props.data} navigation={this.props.navigation} />
            </View>
        );
    }

    renderDefinitions () {
        const { data, navigation } = this.props;

        return data.map((definitionResp: DefinitionResponse) => {
            return (
                <DefinitionButton
                    key={definitionResp._id}
                    line
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
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
});

export default SearchResult;
