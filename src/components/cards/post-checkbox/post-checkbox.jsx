import React from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox } from "expo-checkbox";

import { colorPalate } from "../../../utils/ui/colors";

// Custom components
import RegularText from "../../texts/regular-text/regular-text";

const PostCheckbox = ({ data, selectedPets, setSelectedPets }) => {
  return (
    <View style={styles.row}>
      <View style={styles.col}>
        <RegularText text={data.name} />
        <Checkbox
          value={selectedPets.includes(data.id)}
          onValueChange={(newValue) => {
            setSelectedPets((prevPets) =>
              newValue
                ? [...prevPets, data.id]
                : prevPets.filter((id) => id !== data.id)
            );
          }}
          color={colorPalate.primary}
        />
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
});

export default PostCheckbox;
