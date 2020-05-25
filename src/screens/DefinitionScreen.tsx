import React, { useState } from "react";
import { Text, View, Image, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { DefinitionResponse, DefinitionStore } from '../models';

import ReferencesList from '../components/ReferencesList';

import { connect } from 'react-redux';
import { parseReferences } from '../actions'


type RouteParams = {
  params: {
    definition: DefinitionResponse,
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

  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {

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
          <ReferencesList navigation={navigation} references={parsedReferences} />
        </View>
      </React.Fragment>
    )
  }

  render() {

    const { route, navigation } = this.props;

    const { imageUrl, title, color, featured, faq, likes, dislikes } = route.params.definition._source;

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          <View style={[styles.imageStyle, { backgroundColor: color }]}>
            <Image source={{ uri: imageUrl}} resizeMode="cover" />
          </View>
        </View>
        <View style={styles.textContainer}>
            <Text>
              asdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasda
            </Text>
        </View>
        {this.renderReferences()}
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
