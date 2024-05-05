import React from "react";
import { StyleSheet, Text } from "react-native";

//Import fonts
import { useFonts, Assistant_400Regular } from "@expo-google-fonts/assistant";

const BigText = ({ text, english = false }) => {
  const textAlign = english ? "right" : "left";

  const [fontsLoaded] = useFonts({
    Assistant_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Text
      style={[styles.text, { textAlign, fontFamily: "Assistant_400Regular" }]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 27,
    padding: 3,
  },
});

export default BigText;
