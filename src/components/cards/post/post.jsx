import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Alert } from "react-native";

//Redux handler state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../../redux/authSlice";

//Import app color palate
import { colorPalate } from "../../../utils/ui/colors";

//Import api calls
import { GetUserInfo } from "../../../utils/api/user";
import { deletePost, getPostLikes, likePost } from "../../../utils/api/posts";

//Import the time handlers
import { calculateTimeAgo } from "../../../utils/scripts/time-handler";

//Import icons
import { AntDesign } from "@expo/vector-icons";

//Custom Components
import SmallText from "../../texts/small-text/small-text";
import RegularText from "../../texts/regular-text/regular-text";
import RegularTextBold from "../../texts/regular-text/regular-text-bold";
import IconButton from "../../buttons/icon-button/icon-button";

const Post = ({ data, onImgPress, setRender }) => {
  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  //State to save post user data
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    profilePictureUrl: null,
  });

  // Stores the formatted time string
  const [timeStr, setTimeStr] = useState("");

  // Tracks whether the current user authored this post
  const [isMyPost, setIsMyPost] = useState();

  // An array containing users who liked the post
  const [likes, setLikes] = useState([]);

  const [maxH, setMaxH] = useState(290);

  const [readMore, setReadMore] = useState("");

  // Indicates whether the current user has liked the post
  const [likeThis, setLikeThis] = useState(false);

  // Function to handle liking a post
  const likeHandle = async (post_id, user_id) => {
    const res = await likePost(post_id, user_id);

    if (res === 1) {
      setLikeThis(true);
    } else {
      setLikeThis(false);
    }
  };

  // Function to handle getting  likes on each post
  const getLikes = async () => {
    const res = await getPostLikes(data.id);
    setLikes(res);

    res.forEach((user) => {
      if (user.id === myUser.id) {
        setLikeThis(true);
      }
    });
  };

  const setMaxHeight = () => {
    if (maxH === 290) {
      setMaxH("100%");
      setReadMore("צמצום");
    }
    else {
      setMaxH(290);
      setReadMore("קרא/י עוד");
    }
  }

  // Function to handle deleting a post
  const deletePostById = async (post_id) => {
    const res = await deletePost(post_id);
    if (res) {
      setRender();
    } else {
      Alert.alert("משהו השתבש", "הייתה בעיה למחוק את הפוסט", [
        {
          text: "שחרר",
          style: "cancel",
        },
      ]);
    }
  };

  // Function to handle fetching user data for the post
  const fetchUserInfo = async () => {
    setIsMyPost(data.userId === (myUser && myUser.id));
    if (!isMyPost) {
      const res = await GetUserInfo(data.userId);
      setUserData(res);
    } else {
      setUserData(myUser);
    }
  };

  // Side effect to update component state after changes
  useEffect(() => {
    // Fetch user information on initial render and whenever likeThis changes
    fetchUserInfo();
    setMaxH(290);

    // Calculate and set the formatted time string on initial render or data change
    if (data) {
      var str = calculateTimeAgo(data.createdAt);
      setTimeStr(str);
      if (data.content.length > 450) setReadMore("קרא/י עוד");
    }

    // Fetch likes on initial render and whenever data is available
    if (data) getLikes();
  }, [likeThis]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => onImgPress(userData.id)}
        >
          <Image
            source={{
              uri: userData.profilePictureUrl,
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onImgPress(userData.id)}
        >
          <View style={styles.userInfo}>
            <RegularTextBold
              text={`${userData.firstName} ${userData.lastName}`}
              style={styles.username}
            />
            <SmallText text={timeStr} style={styles.infoText} />
          </View>
        </TouchableOpacity>
        {isMyPost && (
          <View style={styles.deleteIcon}>
            <TouchableOpacity onPress={() => deletePostById(data.id)}>
              <AntDesign name="delete" size={22} color={colorPalate.lightGrey} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={[styles.input, { maxHeight: maxH }]}>
        <RegularText text={data.content} />
      </View>
      {readMore != "" &&
        <TouchableOpacity onPress={setMaxHeight} style={styles.readMoreButton}>
          <SmallText text={readMore} />
        </TouchableOpacity>}
      {data.mediaUrl != "null" && (
        <View style={styles.postImageContainer}>
          <Image source={{ uri: data.mediaUrl }} style={styles.postImage} />
        </View>
      )}

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <IconButton
            iconName={!likeThis ? "heart" : "heart-dislike"}
            color={!likeThis ? colorPalate.primary : colorPalate.grey}
            iconSize={22}
            onPress={() => likeHandle(data.id, myUser.id)}
          />
        </View>
        <View style={[styles.buttonContainer, { marginRight: 20 }]}>
          <SmallText text={`${likes.length} ` + "לייקים"} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 20,
    alignItems: "flex-start",
    overflow: 'scroll',

  },
  readMoreButton: {
    margin: 8, marginRight: 15, borderTopWidth: 0.5, borderTopColor: colorPalate.lightGrey, paddingTop: 8, alignItems: "flex-end",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    padding: 8,
    paddingBottom: 25,
    marginBottom: 15,
  },
  deleteIcon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  header: {
    padding: 6,
    marginBottom: 10,
    flexDirection: "row",
  },
  avatarContainer: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 35,
  },
  postImageContainer: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 8,
    alignItems: "center",
    padding: 8,
  },
  postImage: {
    width: 380,
    height: 380,
    resizeMode: "cover",
  },
  userInfo: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginRight: 12,
  },
  username: {
    marginBottom: 3,
  },
  infoText: {
    color: "#888",
    fontSize: 12,
    marginRight: 3,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Post;
