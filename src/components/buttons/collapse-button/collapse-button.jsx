import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

// Import icons
import { Ionicons } from "@expo/vector-icons";

//Import app color palate
import { colorPalate } from "../../../utils/ui/colors";

//Custom components
import SmallText from "../../texts/small-text/small-text";

const CollapseButton = ({ text, value, setValue }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setValue(!value);
      }}
    >
      <View style={styles.col}>
        <SmallText color={"white"} text={text} />
        <Ionicons
          size={20}
          color={colorPalate.grey}
          name={value ? "chevron-up-outline" : "chevron-down-outline"}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  col: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: colorPalate.primary,
  },
});

export default CollapseButton;
