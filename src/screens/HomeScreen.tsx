import React, { useEffect } from "react";
import { 
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Keyboard,
  FlatList,
  TouchableNativeFeedback
} from "react-native";
import { DefinitionStore, DefinitionResponse } from '../models';

import { connect } from 'react-redux';
import { definitionsFetch, submitSearch, resetSearch, changeSearchText } from '../actions';

import VerticalSection from '../components/VerticalSection';
import HorizontalSection from '../components/HorizontalSection';
import SearchResult from '../components/SearchResult';

import _ from 'lodash'


type Props = {
  definitions: DefinitionStore,
  loading: boolean,
  error: boolean,
  searchQuery: string,
  definitionsFetch: Function,
  submitSearch: Function,
  resetSearch: Function,
  changeSearchText: Function,
  search: {
    searchQuery: string,
    loading: boolean,
    error: boolean,
    hasSearchResults: boolean,
    searchResult: DefinitionResponse[]
  },
  navigation: any,
}

type HomeSectionProps = {
  title: string,
  data: DefinitionResponse[],
  horizontal: boolean,
  navigation: any,
}


const HomeSection = (props: HomeSectionProps) => {
  return (
    <View style={{ marginTop: 10, marginBottom: 25 }}>
      <Text style={{ paddingHorizontal: 15, fontSize: 22, fontWeight: "800" }}>
        {props.title}
      </Text>
      {props.horizontal ? (
        <HorizontalSection data={props.data} navigation={props.navigation} />
      ) : (
        <VerticalSection data={props.data} navigation={props.navigation} />
      )}
      
    </View>
  )
}

type State = {
  keyboard: boolean
}


class HomeScreen extends React.Component<Props> {

  state: State = {
    keyboard: false,
  }

  keyboardDidShowListener: any = null
  keyboardDidHideListener: any = null

  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    console.log('calling definitionsFetch')
    this.props.definitionsFetch()
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide.bind(this),
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    this.setState({ keyboard: true })
  }

  _keyboardDidHide() {
    this.setState({ keyboard: false })
  }

  onSubmit () {
    const { searchQuery } = this.props.search
    if (!searchQuery)
      this.props.resetSearch()
    else
      this.props.submitSearch(searchQuery)
  }

  resetSearch () {
    this.props.resetSearch()
    this.setState({ searchQuery: "" })
  }

  render () {
    
    const { keyboard } = this.state;

    const { hasSearchResults, loading, searchQuery } = this.props.search;

    const shouldRenderSearch = hasSearchResults || loading || keyboard

    return (
      <View style={styles.outerContainer}>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchContainerStyle}>
            <TextInput
              style={styles.searchInputStyle}
              value={searchQuery}
              onSubmitEditing={() => { this.onSubmit() }}
              onChangeText={(text: string) => { this.props.changeSearchText(text) }}
              placeholder={"Procurar..."}
            />
            {(searchQuery !== "" || hasSearchResults) && (
              <TouchableNativeFeedback onPress={() => { this.resetSearch() }}>
                <View style={styles.searchResetButton}>
                  <Text>X</Text>
                </View>
              </TouchableNativeFeedback>
            )}
          </View>
        </View>
        {shouldRenderSearch ? this.renderSearch() : this.renderSections()}
      </View>
    );
  }

  renderSearch () {
    const { navigation } = this.props;
    const { loading, error, searchResult, hasSearchResults } = this.props.search;

    if (loading)
      return this.renderLoading();

    if (error)
      return this.renderError();

    if (!hasSearchResults)
      return

    return (
      <View style={{ marginTop: 10 }}>
        <SearchResult data={searchResult} navigation={navigation} />
      </View>
    )
  }

  homeSections () {
    return [
      { id: 'featured', horizontal: true, title: "Em Alta", data: this.featuredData() },
      { id: 'normal', horizontal: false, title: "Definições", data: this.notFeaturedData() },
    ]
  }

  renderSections() {

    const { loading, error, definitions, navigation } = this.props;

    if (loading)
      return this.renderLoading();

    if (error)
      return this.renderError();

    return (
      <FlatList
        contentContainerStyle={{ paddingBottom: 8 }}
        data={this.homeSections()}
        renderItem={({ item }) => {
          const { data, title, horizontal } = item;
          return (
            <HomeSection horizontal={horizontal} title={title} data={data} navigation={navigation}/>
          )
        }}
        keyExtractor={item => item.id}
      />
    )
  }

  featuredData(): DefinitionResponse[] {
    return _.values(this.props.definitions).filter(def => def._source.featured);
  }

  notFeaturedData(): DefinitionResponse[] {
    return _.values(this.props.definitions).filter(def => !def._source.featured);
  }

  renderLoading () {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginTop: 40 }}>
        <ActivityIndicator color={"#56c7c7"} size={60} />
      </View>
    );
  }

  renderError () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: "red", fontSize: 30 }}>
          An error ocurred...
        </Text>
      </View>
    );
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
  searchContainerStyle: {
    width: 300,
    height: 44,
  },
  searchInputStyle: {
    flex: 1,
    padding: 14,
    color: '#333',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightgray",
    fontSize: 15
  },
  searchResetButton: {
    position: 'absolute',
    height: 34,
    width: 34,
    margin: 5,
    right: 0,
    justifyContent: "center",
    alignItems: 'center'
  }
});

const mapStateToProps = (state: any) => {
  return {
    loading: state.home.loading,
    error: state.home.error,
    definitions: state.definitions,
    search: {
      ...state.search
    }
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    definitionsFetch: () => {
      dispatch(definitionsFetch())
    },
    submitSearch: (search: string) => {
      dispatch(submitSearch(search))
    },
    resetSearch: () => { dispatch(resetSearch()) },
    changeSearchText: (text: string) => { dispatch(changeSearchText(text)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
