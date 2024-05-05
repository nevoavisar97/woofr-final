import React from "react";
import { StyleSheet, View, useWindowDimensions, Image } from "react-native";

//Import custom components
import RegularText from "../../texts/regular-text/regular-text";
import BigTextBold from "../../texts/big-text/big-text-bold";

const FeatureCard = ({ feature }) => {
  // Get the width of the device screen using the useWindowDimensions hook
  const windowWidth = useWindowDimensions().width;

  return (
    <View style={[styles.cardContainer, { width: windowWidth - 20 }]}>
      <View style={styles.textContainer}>
        <View style={styles.header}>
          <Image source={{ uri: feature.image }} style={styles.image} />
          <BigTextBold text={feature.name} />
          <RegularText text={feature.description} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    elevation: 3,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    objectFit: "contain",
    alignSelf: "center",
  },
  header: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    direction: "rtl",
    textAlign: "right",
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
});

export default FeatureCard;
