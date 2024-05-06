import React from "react";
import { StyleSheet, View } from "react-native";

//Import app color palate
import { colorPalate } from "../../../utils/ui/colors";

// Import Checkbox component for user interaction with checkboxes
import Checkbox from "expo-checkbox";

//Custom components
import SmallText from "../../texts/small-text/small-text";

const ProfessionalCheckbox = ({ availability, sells, toHome }) => {
  return (
    <View style={styles.row}>
      <View style={styles.col}>
        <SmallText text={"זמינות 24/7"} />
        <Checkbox value={availability} color={colorPalate.primary} />
      </View>

      <View style={styles.col}>
        <SmallText text={"מכירת מוצרים"} />
        <Checkbox value={sells} color={colorPalate.primary} />
      </View>
      <View style={styles.col}>
        <SmallText text={"שירות ביקורי בית"} />
        <Checkbox value={toHome} color={colorPalate.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    marginTop: 5,
    padding: 6,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  col: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
});

export default ProfessionalCheckbox;
