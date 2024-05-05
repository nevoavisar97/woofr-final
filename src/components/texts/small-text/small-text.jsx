import React from "react";
import { StyleSheet, Text } from "react-native";

//Import fonts
import { useFonts, Rubik_400Regular } from "@expo-google-fonts/rubik";

const SmallText = ({ color, text, english = false }) => {
  const textAlign = !english ? "left" : "right";
  const t_color = !color ? "grey" : color;
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Text
      style={[
        styles.text,
        { color: t_color, textAlign, fontFamily: "Rubik_400Regular" },
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: "normal",
    textAlign: "left",
  },
});

export default SmallText;
