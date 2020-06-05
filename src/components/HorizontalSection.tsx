import React from "react";
import axios from 'axios';
import {
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    Text
} from "react-native";

import { BACKEND_URL } from '../consts'
import * as colors from '../colors'

import { DefinitionResponse } from '../models';

import DefinitionButton from './DefinitionButton';


type Props = {
    tag: string,
    navigation: any
}

type State = {
    loading: boolean,
    error: boolean,
    data: DefinitionResponse[]
}


class HorizontalSection extends React.PureComponent<Props> {

    state: State = {
        loading: false,
        error: false,
        data: []
    }

    static defaultProps: Props = {
        tag: "featured",
        navigation: undefined
    };

    componentDidMount() {
        this.fetchData()
    }

    async fetchData () {
        const { tag } = this.props;
        this.setState({ loading: true, data: [], error: false })

        try {
            const url = tag === 'featured' ? `${BACKEND_URL}/definitions/featured` : `${BACKEND_URL}/definitions/tag/${tag}`
            const response = await axios.get(url)

            let payload: DefinitionResponse[] = response.data

            this.setState({
                loading: false,
                error: false,
                data: payload
            })
        } catch (e) {
            console.warn(e)
            this.setState({
                loading: false,
                error: true,
                data: []
            })
        }
    }

    render () {

        const { data, loading, error } = this.state;

        if (loading === true) {
            return (
                <SafeAreaView style={{ paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={30} color={colors.primaryColor} />
                </SafeAreaView>
            )
        }

        if (error === true) {
            return (
                <SafeAreaView style={{ paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>
                        Ocorreu um erro...
                    </Text>
                </SafeAreaView>
            )
        }

        return (
            <SafeAreaView style={{ paddingHorizontal: 15 }}>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 8 }}
                    horizontal
                    data={data}
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
            />
        )
    }
}

// const styles = StyleSheet.create({
//     horizontalScroll: {
//         paddingLeft: 25,
//         paddingRight: 25,
//         alignItems: 'center',
//         flexDirection: 'row',
//         flexWrap: 'nowrap'
//     }
// });

export default HorizontalSection;
