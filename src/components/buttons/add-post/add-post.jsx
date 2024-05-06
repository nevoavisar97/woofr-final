import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

// Import fonts and icons
import { useFonts, Rubik_400Regular } from "@expo-google-fonts/rubik";
import { FontAwesome5 } from "@expo/vector-icons";

// Import Lodash utility library for functional programming helpers
import lodash from "lodash";

//Import app color palate
import { colorPalate } from "../../../utils/ui/colors";

const AddPost = ({ onPress }) => {
  const texts = [
    "שתף את המחשבות שלך",
    "אל תהיו כלבים, שתפו משהו!",
    "שתף פוסט!",
    "שתף משהו... לפני שהכלב יאכל אותו!",
  ];

  // Generate random text by selecting a random element from the 'texts' array using Lodash's sample function
  const getRandomText = () => lodash.sample(texts);

  // Load the Assistant font
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.row}>
          <FontAwesome5 name="paw" size={24} color="white" />
          <Text style={[styles.text, { fontFamily: "Rubik_400Regular" }]}>
            {getRandomText()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    borderTopColor: colorPalate.lightGrey,
    borderTopWidth: 1,
    paddingTop: 28,
  },
  button: {
    backgroundColor: colorPalate.primary,
    padding: 6,
    borderRadius: 10,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 19,
    padding: 8,
  },
});

export default AddPost;
