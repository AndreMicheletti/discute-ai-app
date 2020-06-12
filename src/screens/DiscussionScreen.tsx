import React from 'react'
import { 
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    Dimensions,
    Image
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import * as colors from '../colors'


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


const WhiteHeading = (props: any) => {
    return (
        <Text style={[{
                color: 'white',
                fontSize: 25,
                fontWeight: props.bold ? 'bold' : '400'
            }, props.style]}
        >
            {props.children}
        </Text>
    )
}

const WhiteText = (props: any) => {
    return (
        <Text style={[{
                color: 'white',
                fontSize: props.size ? props.size : 16,
                fontWeight: props.bold ? 'bold' : '400'
            }, props.style]}
        >
            {props.children}
        </Text>
    )
}

const FirstPage = () => {
    return (
        <View style={styles.page}>

            <View style={styles.container}>
                <View style={styles.headContainer}>
                    <WhiteHeading bold>
                        O que é debate?
                    </WhiteHeading>
                </View>
                <View style={styles.textContainer}>
                    <WhiteText>

                        <WhiteText>
                            Uma boa discussão, ao contrário do que a maior parte das pessoas pensa, não serve para a disputa - e, sim, para a 
                        </WhiteText>

                        <WhiteText bold> construção do conhecimento. </WhiteText>

                        <WhiteText>
                            Nesse sentido, saber sustentar uma boa 
                            <WhiteText bold> argumentação </WhiteText>
                            é fundamental. {"\n\n"}
                        </WhiteText>

                        <WhiteText>
                            Debater 
                            <WhiteText bold> não é brigar. {"\n"}</WhiteText>
                            Não devemos ver críticas como inveja, falta de amizade, falta de amor ou ataque pessoal.
                        </WhiteText>
                        
                    </WhiteText>
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.headContainer}>
                    <WhiteHeading bold>
                        Para que debater?
                    </WhiteHeading>
                </View>
                <View style={styles.textContainer}>
                    <WhiteText>

                        Pq é bom
                        
                    </WhiteText>
                </View>
            </View>
            
            <View style={{
                width: WIDTH,
                alignItems: 'center',
                position: 'absolute',
                bottom: 75,
                flexDirection: 'row'
            }}>
                <View style={styles.swipe}>
                </View>
                <View style={styles.swipe}>
                    <WhiteText size={17}>Argumentação</WhiteText>
                    <MaterialCommunityIcons name='chevron-right' size={40} color='white' />
                </View>
            </View>
        </View>
    )
}

const SecondPage = () => {
    return (
        <View style={styles.page}>

            <View style={{
                width: WIDTH,
                alignItems: 'center',
                position: 'absolute',
                bottom: 75,
                flexDirection: 'row'
            }}>
                <View style={[styles.swipe, { justifyContent: 'flex-start' }]}>
                    <MaterialCommunityIcons name='chevron-left' size={40} color='white' />
                    <WhiteText size={17}>Debate</WhiteText>
                </View>
                <View style={[styles.swipe, { justifyContent: 'flex-end' }]}>
                    <WhiteText size={17}>Falácias</WhiteText>
                    <MaterialCommunityIcons name='chevron-right' size={40} color='white' />
                </View>
            </View>

        </View>
    )
}

const ThirdPage = () => {
    return (
        <View style={styles.page}>

            <View style={{
                width: WIDTH,
                alignItems: 'center',
                position: 'absolute',
                bottom: 75,
                flexDirection: 'row'
            }}>
                <View style={[styles.swipe, { justifyContent: 'flex-start' }]}>
                    <MaterialCommunityIcons name='chevron-left' size={40} color='white' />
                    <WhiteText size={17}>Argumentação</WhiteText>
                </View>
                <View style={[styles.swipe, { justifyContent: 'flex-end' }]}>
                </View>
            </View>

        </View>
    )
}
const DiscussionScreen = () => {

    return (
        <View style={styles.screenContainer}>
            <ScrollView horizontal pagingEnabled>
                <FirstPage />
                <SecondPage />
                <ThirdPage />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: colors.primaryColor,
        paddingTop: StatusBar.currentHeight,
    },
    page: {
        width: WIDTH,
        height: HEIGHT,
        paddingHorizontal: 20,
    },
    container: {
        paddingTop: 15,
    },
    headContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    textContainer: {
        marginTop: 10,
    },
    swipe: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
})


export default DiscussionScreen
