import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { colorPalate } from "../../../utils/ui/colors";

import IconButton from "../../buttons/icon-button/icon-button";

const PasswordInput = ({ placeholder, onChangeText, value, width }) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <View style={styles.container}>
      <View style={[styles.row, { width: width }]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={showPassword}
        />
        <View style={styles.iconContainer}>
          <IconButton
            iconSize={20}
            iconName={showPassword ? "eye-outline" : "eye-off-outline"}
            color={colorPalate.primary}
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 3,
  },

  row: {
    flexDirection: "row",
  },
  input: {
    justifyContent:"flex-start",
    textAlign:"right",
    borderWidth: 1,
    borderColor: colorPalate.grey,
    borderRadius: 5,
    padding: 14,
    width: "100%",
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: 7,
  },
});

export default PasswordInput;
