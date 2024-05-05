import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Assistant_400Regular } from "@expo-google-fonts/assistant";

// App color palate
import { colorPalate } from "../../../utils/ui/colors";

const RegularButtonAdj = ({width, text, onPress, color, iconName, loading = false }) => {
  // Load the Assistant font
  const [fontsLoaded] = useFonts({
    Assistant_400Regular,
  });

  if (!fontsLoaded) {
    return null; // or any loading indicator while fonts are loading
  }

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color,width:width }]}
      onPress={onPress}
    >
      {!loading ? (
        <>
          <Text style={styles.text}>{text}</Text>
          {iconName && <Ionicons name={iconName} size={20} color="white" />}
        </>
      ) : (
        <ActivityIndicator color={colorPalate.white} size={32} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 7,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    flexDirection: "row",
    borderBottomWidth: 5,
    borderBottomColor: colorPalate.primary,
    gap: 5,
  },
  text: {
    fontSize: 21,
    textAlign: "left",
    padding: 4,
    fontFamily: "Assistant_400Regular", // Use Assistant regular font
    color: colorPalate.white,
  },
});

export default RegularButtonAdj;
