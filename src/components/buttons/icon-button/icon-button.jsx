import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

//Import icons
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ onPress, color, iconName, iconSize }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color, width: iconSize * 2 }]}
      onPress={onPress}
    >
      <Ionicons
        name={iconName}
        size={iconSize}
        color="white"
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 6,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    flexDirection: "row",
    gap: 5,
  },
});

export default IconButton;
