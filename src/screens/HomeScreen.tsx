import React from "react";
import { 
  View,
  TextInput,
  ActivityIndicator,
  Text,
  StyleSheet
} from "react-native";
import { DefinitionStore } from '../models';

import { connect } from 'react-redux';
import { definitionsFetch } from '../actions';

import ListDefinitions from '../components/ListDefinitions';


type Props = {
  definitions: DefinitionStore,
  loading: boolean,
  error: boolean,
  definitionsFetch: Function,
  navigation: any,
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
            <TextInput
              style={styles.searchInputStyle}
              onChangeText={text => console.log('')}
              value={'procurar...'}
            />
        </View>
        {this.renderContent()}
      </View>
    );
  }

  renderContent() {

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
      <ListDefinitions definitionStore={definitions} navigation={navigation} />
    )

  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  searchInputStyle: {
    width: 300,
    height: 30,
    padding: 5,
    borderRadius: 5,
    borderColor: '#45a1a1',
    color: 'gray',
    borderWidth: 1
  },
  searchBarContainer: {
    padding: 20,
    paddingBottom: 10,
    height: 50,
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
