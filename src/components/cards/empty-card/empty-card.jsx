import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Custom components
import BigText from "../../texts/big-text/big-text";
import RegularText from "../../texts/regular-text/regular-text";

const EmptyCard = ({ text, iconName }) => {
  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={32} color="black" />
      <RegularText text={text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    width:"100%",
    
  },
});

export default EmptyCard;
