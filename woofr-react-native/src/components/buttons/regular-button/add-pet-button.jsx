import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Rubik_700Bold } from "@expo-google-fonts/rubik";

// App color palate
import { colorPalate } from "../../../utils/ui/colors";

const AddPetButton = ({
  textColor,
  text,
  onPress,
  color,
  iconName,
  loading = false,
}) => {
  // Load the Assistant bold font
  const [fontsLoaded] = useFonts({
    Rubik_700Bold,
  });

  if (!fontsLoaded) {
    return null; // or any loading indicator while fonts are loading
  }

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      {!loading ? (
        <>
          <Text style={[styles.text, { color: textColor }]}>{text}</Text>
          {iconName && <Ionicons name={iconName} size={24} color={textColor} />}
        </>
      ) : (
        <ActivityIndicator color={colorPalate.white} size={32} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    elevation: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    flexDirection: "row",
    gap: 5,
  },
  text: {
    fontSize: 16,
    textAlign: "left",
    padding: 4,
    fontFamily: "Rubik_700Bold", // Use Assistant bold font
  },
});

export default AddPetButton;
