import React from "react";
import { StyleSheet, FlatList, View } from "react-native";

// Custom components
import Post from "../../cards/post/post";
import EmptyCard from "../../cards/empty-card/empty-card";

const PostSlider = ({ arr, onImgPress, setRender }) => {
  //Function to render post
  const renderPostItem = ({ item }) => {
    return (
      <Post
        key={item.id}
        data={item}
        onImgPress={onImgPress}
        setRender={setRender}
      />
    );
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.container}>
        {arr.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            data={arr}
            renderItem={({ item, index }) => renderPostItem({ item, index })}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <EmptyCard text={"אין פוסטים שניתן להציג כרגע..."} iconName="sad-outline" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: "100%",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostSlider;
