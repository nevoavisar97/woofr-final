import React from "react";
import { StyleSheet, Text } from "react-native";

//Import fonts
import {
  useFonts,
  Assistant_400Regular,
  Assistant_700Bold,
} from "@expo-google-fonts/assistant";

const BigTextBold = ({ text, english = false }) => {
  const textAlign = english ? "right" : "left";

  const [fontsLoaded] = useFonts({
    Assistant_400Regular,
    Assistant_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // or any loading indicator
  }

  return (
    <Text style={[styles.text, { textAlign, fontFamily: "Assistant_700Bold" }]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 3,
  },
});

export default BigTextBold;
