import React from "react";
import { StyleSheet, Text } from "react-native";

//Import fonts
import {
  useFonts,
  Rubik_400Regular,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik";

const RegularText1 = ({ text, english = false, color, onPress }) => {
  const textAlign = "center";

  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Text
      onPress={onPress}
      style={[
        styles.text,
        {
          color: color,
          textAlign: textAlign,
          fontFamily: "Rubik_400Regular",
        },
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    padding: 4,
  },
});

export default RegularText1;
