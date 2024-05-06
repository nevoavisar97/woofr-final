import React from "react";
import { StyleSheet, FlatList, View } from "react-native";

// Custom components
import EmptyCard from "../../cards/empty-card/empty-card";
import ReviewCard from "../../cards/review-card/review-card";
import { colorPalate } from "../../../utils/ui/colors";

const ReviewSlider = ({ arr, onImgPress, setRender }) => {
  //Function to render review
  const renderReviewItem = ({ item }) => {
    return (
      <ReviewCard
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
            renderItem={({ item, index }) => renderReviewItem({ item, index })}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <EmptyCard text={"אין ביקורות שניתן להציג כרגע..."} iconName="bug" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 66,
    paddingVertical: 15,
    flex: 1,
    paddingHorizontal: 0,
    width: "100%" ,
    backgroundColor: colorPalate.lightGrey,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ReviewSlider;
