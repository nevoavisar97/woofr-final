import React from "react";
import { Image,View } from "react-native";
import RegularText from "../regular-text/regular-text";
import { colorPalate } from "../../../utils/ui/colors";
import headingPet from "../../../utils/images/mypets.png"
import { StyleSheet } from "react-native";


const PetHeading = () => {

  return (
    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
      <RegularText color={colorPalate.primary} text={"━━━━━━━━━"} />
      <Image source={headingPet} style={styles.heading} />
      <RegularText color={colorPalate.primary} text={"━━━━━━━━━"} />
    </View>
  );
};
const styles = StyleSheet.create({

  heading: {

    width: 150,
    height: 70,
    resizeMode: "contain",
  },
});


export default PetHeading;
