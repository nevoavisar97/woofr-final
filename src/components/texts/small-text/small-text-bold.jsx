import React from "react";
import { StyleSheet, Text } from "react-native";

//Import fonts
import {
  useFonts,
  Assistant_400Regular,
  Assistant_700Bold,
} from "@expo-google-fonts/assistant";

const SmallTextBold = ({fSize, color ,text, align }) => {
  const textAlign = !align ? "left" : align;
  const size = !fSize? 18 : fSize;
  const [fontsLoaded] = useFonts({
    Assistant_400Regular,
    Assistant_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Text style={[styles.text, { fontSize:size, color: color,textAlign:textAlign, fontFamily: "Assistant_700Bold" }]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "normal",
  },
});

export default SmallTextBold;
