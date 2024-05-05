import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

//Custom components
import ExploreCard from "../../cards/explore-card/explore-card";

const ExploreSlider = ({ arr, onPress }) => {
  //Function to render explore item
  const renderExploreItem = ({ item }) => {
    return <ExploreCard key={item.messageId} data={item} onPress={onPress} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        data={arr}
        renderItem={({ item, index }) => renderExploreItem({ item, index })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export default ExploreSlider;
