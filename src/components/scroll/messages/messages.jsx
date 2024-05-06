import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

//Custom components
import MessageBubble from "../../cards/message-bubble/message-bubble";

const Messages = ({ arr, myUser }) => {
  //Function to render message bubble
  const renderMessageItem = ({ item }) => {
    return (
      <MessageBubble key={item.messageId} message={item} myUser={myUser} />
    );
  };

  return (
    <View style={styles.container}>
      {arr.length > 0 ? (
        <FlatList
          data={arr}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.messageId}
          inverted
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
  },
});

export default Messages;
