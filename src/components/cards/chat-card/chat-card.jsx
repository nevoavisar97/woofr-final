import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";

//import expo icons
import { Ionicons } from "@expo/vector-icons";

//Redux handler state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../../redux/authSlice";

//Import app color palate
import { colorPalate } from "../../../utils/ui/colors";

//Import api calls
import { GetUserInfo } from "../../../utils/api/user";

//Custom components
import RegularText from "../../texts/regular-text/regular-text";
import SmallText from "../../texts/small-text/small-text";

const ChatCard = ({ onClick, chat }) => {
  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  // Stores information about the other user
  const [otherUser, setOtherUser] = useState(null);

  // Tracks the number of unread messages
  const [unread, setUnread] = useState(0);

  // Function to fetch other user data
  const fetchUserData = async (id) => {
    const response = await GetUserInfo(id);
    setOtherUser(response);
  };

  // Side effect to set unread count and fetch other user data on initial render
  useEffect(() => {
    // Determine the ID of the other participant in the chat
    const otherId =
      chat.participant1ID === myUser.id
        ? chat.participant2ID
        : chat.participant1ID;

    // Determine the unread message count for the current user
    const unreadCount =
      myUser.id === chat.participant1ID
        ? chat.participant1UnreadCount
        : chat.participant2UnreadCount;

    // Update unread message count state
    setUnread(unreadCount);

    // Fetch data of the other user in the chat
    fetchUserData(otherId);
  }, []);

  return otherUser ? (
    <TouchableOpacity onPress={() => onClick(chat)}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.imgContainer}>
            <Image
              source={{ uri: otherUser.profilePictureUrl }}
              style={styles.img}
            />
          </View>
          <View style={styles.infoContainer}>
            <RegularText
              text={`${otherUser.firstName} ${otherUser.lastName}`}
            />
            <SmallText
              text={
                chat.lastMessage.length > 19
                  ? chat.lastMessage.substring(0, 19) + ".."
                  : chat.lastMessage
              }
            />
          </View>
        </View>

        <View style={styles.edge}>
          {unread > 0 && (
            <View style={styles.newMessage}>
              <Text style={styles.notificationText}>{unread.toString()}</Text>
            </View>
          )}

          <View style={styles.iconContainer}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  ) : null;
};
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    justifyContent: "flex-start",
    padding: 6,
    alignItems: "flex-start",
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  img: {
    width: 65,
    height: 65,
    borderRadius: 40,
  },
  edge: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  newMessage: {
    padding: 4,
    backgroundColor: colorPalate.secondary,
    height: 40,
    width: 40,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: colorPalate.white,
  },
});

export default ChatCard;
