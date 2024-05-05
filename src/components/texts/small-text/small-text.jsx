import React from "react";
import { StyleSheet, Text } from "react-native";

//Import fonts
import { useFonts, Assistant_400Regular } from "@expo-google-fonts/assistant";

const SmallText = ({ color, text, english = false }) => {
  const textAlign = !english ? "left" : "right";
  const t_color = !color ? "grey" : color;
  const [fontsLoaded] = useFonts({
    Assistant_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Text
      style={[
        styles.text,
        { color: t_color, textAlign, fontFamily: "Assistant_400Regular" },
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
