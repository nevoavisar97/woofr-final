import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

//Import icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Import app color palate
import { colorPalate } from "../../../utils/ui/colors";

const ChatInput = ({ value, setValue, onClick, loading }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={(event) => {
          setValue(event);
        }}
        style={styles.input}
        placeholder="כתוב פה את ההודעה שלך..."
        placeholderTextColor="#A9A9A9"
      />
      <TouchableOpacity style={{ margin: 3 }} onPress={onClick}>
        {loading ? (
          <ActivityIndicator color={colorPalate.white} />
        ) : (
          <MaterialCommunityIcons
            name="send-circle"
            size={40}
            color={colorPalate.primary}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    margin: 15,
    borderRadius: 22,
    borderColor: colorPalate.lightGrey,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    textAlign: "right",
    padding: 14,
  },
});

export default ChatInput;
