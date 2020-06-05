import React from "react";
import { Feather } from '@expo/vector-icons';
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
  homeTags: {
    title: string,
    tag: string
  }[],
  search: {
    searchQuery: string,
    loading: boolean,
    error: boolean,
    hasSearchResults: boolean,
    searchResult: DefinitionResponse[]
  },
  navigation: any,
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

  renderSections() {

    const { loading, error, navigation, homeTags } = this.props;

    console.log('home tagss')
    console.log(homeTags)

    if (loading)
      return this.renderLoading();

    if (error)
      return this.renderError();

    return (
      <FlatList
        contentContainerStyle={{ paddingBottom: 8 }}
        data={homeTags}
        renderItem={({ item }) => {
          const { title, tag } = item;
          return (
              <View style={{ marginTop: 10, marginBottom: 25 }}>
                <TouchableNativeFeedback
                  onPress={() => { navigation.push('Category', { category: item }) }}
                >
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center' }}>
                    <Text style={{ paddingBottom: 5, fontSize: 22, fontWeight: "800" }}>
                      {title}
                    </Text>
                    <Feather color="black" name="arrow-right" size={26} />
                  </View>
                </TouchableNativeFeedback>
                <HorizontalSection navigation={navigation} tag={tag} />
              </View>
          )
        }}
        keyExtractor={item => item.tag}
      />
    )
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
    homeTags: state.home.tags,
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
