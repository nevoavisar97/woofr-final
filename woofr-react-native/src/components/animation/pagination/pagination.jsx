import React from "react";
import { StyleSheet, Animated, View, Dimensions } from "react-native";

// Destructuring 'width' from Dimensions
const { width } = Dimensions.get("screen");

const Pagination = ({ data, scrollX, dotColor }) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: "clamp",
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ["#ccc", dotColor, "#ccc"],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[styles.dot, { width: dotWidth, backgroundColor }]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 35,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    height: 12,
    borderRadius: 6,
    marginHorizontal: 3,
  },
});
