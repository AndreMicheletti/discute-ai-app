import React from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import axios from 'axios'

import { DefinitionResponse } from '../models'

import { BACKEND_URL } from '../consts'
import * as colors from '../colors'

import VerticalSection from '../components/VerticalSection'

type RouteParams = {
    params: {
        category: {
            tag: string,
            title: string
        },
        [key: string]: any
    },
    [key: string]: any
}

type Props = {
    route: RouteParams,
    navigation: any
}

type State = {
    loading: boolean,
    error: boolean,
    data: []
}


class CategoryScreen extends React.Component<Props> {

    state: State = {
        loading: false,
        error: false,
        data: []
    }

    componentDidMount() {
        this.fetchData()
    }

    async fetchData () {
        const { tag } = this.props.route.params.category;
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
        const { loading, error, data } = this.state
        const { navigation } = this.props

        if (loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color={colors.primaryColor} size={35} />
                </View>
            )
        }

        if (error) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>
                        Ocorreu um erro...
                    </Text>
                </View>
            )
        }


        return (
            <View>
                <VerticalSection navigation={navigation} data={data} />
            </View>
        )
    }
}

export default CategoryScreen;
