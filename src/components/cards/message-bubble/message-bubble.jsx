import React from "react";
import { StyleSheet, View, Text } from "react-native";

//Import app color palate
import { colorPalate } from "../../../utils/ui/colors";

const MessageBubble = ({ message, myUser }) => {
  // Check if the current message belongs to the logged-in user
  const isMyMessage = message.senderId === (myUser && myUser.id);

  return (
    <View
      style={
        isMyMessage ? styles.myMessageContainer : styles.otherMessageContainer
      }
    >
      <Text style={isMyMessage ? styles.textSelf : styles.text}>
        {message.messageText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  myMessageContainer: {
    backgroundColor: colorPalate.lightGrey,
    borderRadius: 15,
    padding: 12,
    margin: 8,
    alignSelf: "flex-start",
  },
  otherMessageContainer: {
    backgroundColor: colorPalate.primaryLight,
    borderRadius: 15,
    padding: 12,
    margin: 8,
    alignSelf: "flex-end",
  },
  text: {
    fontSize: 16,
    color: colorPalate.white,
  },
  textSelf: {
    fontSize: 16,
    color: colorPalate.black,
  },
});

export default MessageBubble;
