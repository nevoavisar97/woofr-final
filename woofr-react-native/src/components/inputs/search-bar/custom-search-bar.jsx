import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";

//Color palate for the app
import { colorPalate } from "../../../utils/ui/colors";
import { FontAwesome5 } from '@expo/vector-icons';

//Custom components
import IconButton from "../../buttons/icon-button/icon-button";

const CustomSearchBar = ({ onPressSearch }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value !== "") handleSearch();
    else onPressSearch("");
  }, [value]);

  const handleSearch = () => {
    onPressSearch(value); // Pass the search query value to the onPressSearch function
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          value={value}
          onChangeText={(newValue) => {
            if (newValue !== value) {
              setValue(newValue);
            }
          }}
          style={styles.input}
          placeholder="חיפוש"
          placeholderTextColor="#A9A9A9"
        />
        <View style={styles.button}>
          <TouchableOpacity
          >
            <FontAwesome5 name="search" size={21} color={'#A9A9A9'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "white",
    marginBottom: 3,
    flexDirection: "row",
    alignItems: "center",
    margin: 3,
    paddingHorizontal: 20,
  },
  searchBar: {
    borderRadius: 10,

    backgroundColor: colorPalate.lightGrey,
    width: "100%",
    flexDirection: "row"
  },
  input: {
    flex: 1,
    fontSize: 16,
    textAlign: "right",
    padding: 14,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default CustomSearchBar;
