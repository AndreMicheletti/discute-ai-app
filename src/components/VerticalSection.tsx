import React from "react";
import {
    SafeAreaView,
    FlatList
} from "react-native";
import { DefinitionResponse } from '../models';

import DefinitionButton from './DefinitionButton';


type Props = {
    data: DefinitionResponse[],
    navigation: any
}


class VerticalSection extends React.PureComponent<Props> {

    static defaultProps: Props = {
        data: [],
        navigation: undefined
    };

    render () {

        return (
            <SafeAreaView style={{ paddingHorizontal: 15 }}>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 8 }}
                    data={this.props.data}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={item => item._id}
                />
            </SafeAreaView>
        );
    }

    renderItem (item: DefinitionResponse) {
        const { navigation } = this.props;

        return (
            <DefinitionButton
                onPress={() => navigation.push("Definition", {definition: item})}
                definition={item}
                line
            />
        )
    }
}

export default VerticalSection;
