import React from "react";
import { 
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView
} from "react-native";
import { DefinitionStore, DefinitionResponse } from '../models';

import { connect } from 'react-redux';
import { definitionsFetch } from '../actions';

import HorizontalSection from '../components/HorizontalSection';
import SearchInput from '../components/SearchInput';

import _ from 'lodash'


type Props = {
  definitions: DefinitionStore,
  loading: boolean,
  error: boolean,
  definitionsFetch: Function,
  navigation: any,
}

type HomeSectionProps = {
  title: string,
  data: DefinitionResponse[],
  navigation: any
}


const HomeSection = (props: HomeSectionProps) => {
  return (
    <View style={{ marginTop: 10, marginBottom: 25 }}>
      <Text style={{ paddingHorizontal: 15, fontSize: 22, fontWeight: "800" }}>
        {props.title}
      </Text>
      <HorizontalSection data={props.data} navigation={props.navigation} />
    </View>
  )
}


class HomeScreen extends React.Component<Props> {

  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    console.log('calling definitionsFetch')
    this.props.definitionsFetch()
  }

  render () {

    return (
      <View style={styles.outerContainer}>
        <View style={styles.searchBarContainer}>
            <SearchInput />
        </View>
        {this.renderSections()}
      </View>
    );
  }

  renderSections() {

    const { loading, error, definitions, navigation } = this.props;

    if (loading) {
      return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginTop: 40 }}>
          <ActivityIndicator color={"#56c7c7"} size={60} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: "red", fontSize: 30 }}>
            An error ocurred...
          </Text>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 15 }}>
        <HomeSection title="Em alta" data={this.featuredData()} navigation={navigation}/>
        <HomeSection title="Definições" data={this.notFeaturedData()} navigation={navigation}/>
      </ScrollView>
    )
  }

  featuredData(): DefinitionResponse[] {
    return _.values(this.props.definitions).filter(def => def._source.featured);
  }

  notFeaturedData(): DefinitionResponse[] {
    return _.values(this.props.definitions).filter(def => !def._source.featured);
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
  },
  searchBarContainer: {
    padding: 25,
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

const mapStateToProps = (state: any) => {
  return {
    loading: state.home.loading,
    error: state.home.error,
    definitions: state.definitions
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    definitionsFetch: () => {
      dispatch(definitionsFetch())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
