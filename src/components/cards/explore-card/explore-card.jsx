import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import {
  Rubik_400Regular,
} from "@expo-google-fonts/rubik";
//Import types data
import { types } from "../../../utils/data/types";

// Import app colors palate
import { colorPalate } from "../../../utils/ui/colors";
import RegularText from "../../texts/regular-text/regular-text";
import RegularTextBold from "../../texts/regular-text/regular-text-bold";

const ExploreCard = ({ data, onPress }) => {
  // Get the width of the device screen using the useWindowDimensions hook
  const screenWidth = Dimensions.get("window").width;

  // Find the corresponding type object from the types array
  const selectedType = types.find((item) => item.label === data.type);

  // Extract color from the selected type object or use a default color
  const color = selectedType ? selectedType.color : colorPalate.primary;

  return (
    <TouchableOpacity
      style={[styles.container, { width: screenWidth }]}
      onPress={() => {
        onPress(data.userId);
      }}
    >
      <View style={styles.cardBackground}>
        <ImageBackground
          source={{
            uri: data.profileImage,
          }}
          style={styles.img}
        />

        <View style={[styles.header, { backgroundColor: color }]}>
          <RegularText style={styles.title} color={"white"} text={data.type} />
        </View>

        <View style={styles.textContainer}>
          <RegularTextBold style={styles.title} color={"white"} text={data.displayName} />
          <Text style={styles.desc}>
            {data.description.length > 80
              ? data.description.slice(0, 80) + "..."
              : data.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardBackground: {
    borderRadius: 20, // This borderRadius applies to the entire card
    alignItems: "center",
    elevation: 3,
    overflow: "hidden", // Ensure that the borderRadius is visible
  },
  img: {
    width: 320,
    height: 320,
    resizeMode: "cover",
    borderRadius: 20, // This borderRadius applies to the image inside the card
  },
  header: {
    position: "absolute",
    left: 0,
    top: 30,
    backgroundColor: colorPalate.primary,
    padding: 3,
    paddingLeft:10,
    paddingRight: 10,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    color: colorPalate.primary,
  },
  textContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 18,
    width: 320,
  },
  title: {
    color: colorPalate.white,
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 3,
    textAlign: "left",
  },
  desc: {
    color: colorPalate.white,
    fontSize: 15,
    padding: 4,
    fontFamily: "Rubik_400Regular",
    textAlign: "left",
  },
});


export default ExploreCard;
