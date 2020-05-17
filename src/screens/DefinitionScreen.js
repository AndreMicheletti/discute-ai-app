import React from "react";
import { Text, View, Image, ScrollView } from "react-native";

import ListHorizontalDefinitions from '../components/ListHorizontalDefinitions';

function DefinitionScreen({ route, navigation }) {

  const { imgSrc, title, backgroundColor, featured } = route.params.definition;

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <View style={[styles.imageStyle, { backgroundColor }]}>
          <Image src={imgSrc} resizeMode="cover" />
        </View>
      </View>
      <View style={styles.textContainer}>
          <Text>
            asdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasdaasda
          </Text>
      </View>
      <View>
        <Text style={{ fontSize: 24, marginLeft: 20 }}>Referencias</Text>
      </View>
      <View style={styles.referencesContainer}>
        <ListHorizontalDefinitions navigation={navigation} />
      </View>
      <View style={{ height: 20 }}></View>
    </ScrollView>
  );
}

const styles = {
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
}

export default DefinitionScreen;
