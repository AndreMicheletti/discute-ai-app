import React, { useEffect } from "react";
import { 
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableNativeFeedback,
  Linking
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { MarkdownView } from 'react-native-markdown-view';

import HorizontalSection from '../components/HorizontalSection';

import { DefinitionResponse, DefinitionStore } from '../models';

import { connect } from 'react-redux';
import { parseReferences } from '../actions'


type RouteParams = {
  params: {
    id: string,
    [key: string]: any
  },
  [key: string]: any
}

type Props = {
  route: RouteParams,
  definitionStore: DefinitionStore,
  parseReferences: Function,
  loading: boolean,
  parsedReferences: any,
  navigation: any,
}


class DefinitionScreen extends React.Component<Props> {

  _unsubscribeFocus: Function = () => {}

  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {

    this.screenFocused()
    this._unsubscribeFocus = this.props.navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      this.screenFocused()
    });
  }

  componentWillUnmount () {
    this._unsubscribeFocus();
  }

  screenFocused () {
    const { route, definitionStore } = this.props;
    const { references } = route.params.definition._source;

    this.props.parseReferences(references, definitionStore)
  }

  renderReferences() {

    const { loading, parsedReferences, navigation } = this.props;

    if (!parsedReferences || parsedReferences.length <= 0) {
      return
    }

    const title = (
      <View>
        <Text style={{ fontSize: 24, marginLeft: 20 }}>Referencias</Text>
      </View>
    )

    if (loading) {
      return (
        <React.Fragment>
          {title}
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <ActivityIndicator size={40} color={"blue"} />
          </View>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        {title}
        <View style={styles.referencesContainer}>
          <HorizontalSection navigation={navigation} data={parsedReferences} />
        </View>
      </React.Fragment>
    )
  }

  async openLink (url: string) {
    if (url.includes('https') || url.includes('http')) {
      try {
        await Linking.openURL(url)
      } catch (e) {
        console.warn('An error occurred: ', e)
      }
    }
  }

  render() {

    const { definition } = this.props.route.params;

    const { imageUrl, color, text, faq, likes, dislikes } = definition._source;

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          <View style={[styles.imageStyle, { backgroundColor: color }]}>
            {imageUrl ? 
            (
              <Image
                style={styles.imageStyle}
                source={{ uri: imageUrl }}
                resizeMode="cover"
              />
            ) : null}
          </View>
        </View>
        <View style={styles.likeContainer}>

          <TouchableNativeFeedback>
            <View style={[styles.likeButton, { marginRight: 10 }]}>
              <Text style={styles.likeButtonText}>
                {likes}
              </Text>
              <Ionicons name="md-thumbs-up" color="white" size={20} />
            </View>
          </TouchableNativeFeedback>
          
          <TouchableNativeFeedback>
            <View style={[styles.likeButton, { marginLeft: 10 }]}>
              <Text style={styles.likeButtonText}>
                {dislikes}
              </Text>
              <Ionicons name="md-thumbs-down" color="white" size={20} />
            </View>
          </TouchableNativeFeedback>
        </View>

        {/* Markdown Text */}
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            Definição
          </Text>
          <MarkdownView
            style={styles.textArea}
            onLinkPress={(url: string) => { this.openLink(url) }}
          >
            {text}
          </MarkdownView>
        </View>

        {/* References */}
        {this.renderReferences()}

        {/* Source */}
        <View style={styles.sourceContainer}>
          <Text style={styles.titleText}>
            Fonte
          </Text>

          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1 }}>
              <Image
                source={{ uri: "https://www.politize.com.br/wp-content/uploads/2018/01/header-home-politize.png" }}
                resizeMode="cover"
                style={{ flex: 1, height: 100 }}
              />
            </View>

            <View style={{ paddingLeft: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 18, color: "#555", alignItems: 'center', justifyContent: 'center' }}>
                Politize!
              </Text>
              <TouchableNativeFeedback>
                <View style={{ width: 80, padding: 8, backgroundColor: "#2765cf", alignItems: 'center' }}>
                  <Text style={styles.likeButtonText}>
                    visitar
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>

        </View>

        <View style={{ height: 20 }}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    width: 310,
    height: 180,
    borderRadius: 10,
  },
  textContainer: {
    padding: 20,
  },
  sourceContainer: {
    padding: 20,
  },
  likeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButton: {
    width: 80,
    flexDirection: 'row',
    paddingHorizontal: 13,
    paddingVertical: 10,
    backgroundColor: '#2765cf',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 2,
  },
  likeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
  titleText: {
    color: "#000",
    fontSize: 20,
    paddingBottom: 5,
  },
  textArea: {
    color: "#555",
    fontSize: 14,
  },
  referencesContainer: {
    flex: 1,
  }
});

const mapStateToProps = (state: any) => {
  return {
    loading: state.references.loading,
    parsedReferences: state.references.parsedReferences,
    definitionStore: state.definitions
  }
}

const mapActionsToProps = (dispatch: Function) => {
  return {
    parseReferences: (refs: string[], defs: DefinitionStore) => { dispatch(parseReferences(refs, defs)) }
  }
}

export default connect(mapStateToProps, mapActionsToProps)(DefinitionScreen);
