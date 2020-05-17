import React from "react";
import { View, TextInput } from "react-native";

import ListDefinitions from '../components/ListDefinitions';

function HomeScreen(props) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInputStyle}
            onChangeText={text => console.log('')}
            value={'procurar...'}
          />
      </View>
      <ListDefinitions {...props} />
    </View>
  );
}

const styles = {
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
}

export default HomeScreen;
