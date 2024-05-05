import React from "react";
import { View, StyleSheet } from "react-native";

//Import AirbnbRating component for displaying Airbnb interactive stars ratings
import { AirbnbRating } from "react-native-ratings";

const RatingBar = ({ rating, disabled, onFinishRating }) => {
  return (
    <View style={styles.container}>
      <AirbnbRating
        isDisabled={disabled}
        count={5}
        reviews={[]}
        defaultRating={rating}
        size={22}
        onFinishRating={onFinishRating}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RatingBar;
