import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useFonts, Rubik_400Regular } from "@expo-google-fonts/rubik";
import { Ionicons } from "@expo/vector-icons";

// App color palate
import { colorPalate } from "../../../utils/ui/colors";

const RegularButtonFullW = ({ text, textColor,onPress, color, iconName,loading = false }) => {
  // Load the Assistant font
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      {!loading ? (
        <>
          <Text style={[styles.text, { color: textColor }]}>{text}</Text>
          {iconName && <Ionicons name={iconName} size={18} color={textColor} />}

        </>
      ) : (
        <ActivityIndicator color={colorPalate.white} size={32} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius:8,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    gap: 5,
  },
  text: {
    fontSize: 18,
    textAlign: "left",
    margin:5,
    fontFamily: "Rubik_400Regular", // Use Assistant regular font
  },
});

export default RegularButtonFullW;
