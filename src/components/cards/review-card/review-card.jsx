import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Alert } from "react-native";

//Redux handler state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../../redux/authSlice";

//Import api calls
import { GetUserInfo } from "../../../utils/api/user";
import { AntDesign } from "@expo/vector-icons";

// Import the time handlers
import { calculateTimeAgo } from "../../../utils/scripts/time-handler";

//
import { deleteReview } from "../../../utils/api/review";

//Custom Components
import RegularTextBold from "../../texts/regular-text/regular-text-bold";
import RegularText from "../../texts/regular-text/regular-text";
import RatingBar from "../rating-bar/rating-bar";
import SmallText from "../../texts/small-text/small-text";

const ReviewCard = ({ data, onImgPress, setRender }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    profilePictureUrl: null,
  });
  const [timeStr, setTimeStr] = useState("");
  const [isMyReview, setIsMyReview] = useState();

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  const deleteReviewById = async (review_id) => {
    const res = await deleteReview(review_id);
    if (res) {
      setRender();
    } else {
      Alert.alert("משהו השתבש", "הייתה בעיה למחוק את הביקורת", [
        {
          text: "שחרר",
          style: "cancel",
        },
      ]);
    }
  };

  const fetchUserInfo = async () => {
    setIsMyReview(data.userId === (myUser && myUser.id));
    if (!isMyReview) {
      const res = await GetUserInfo(data.userId);
      setUserData([]);
      setUserData(res);
    } else {
      setUserData(myUser);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    var str = calculateTimeAgo(data.datePosted);
    setTimeStr(str);
  }, []);

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
        <View style={styles.userInfo}>
          <RegularTextBold
            text={`${userData.firstName} ${userData.lastName}`}
            style={styles.username}
          />
          <SmallText text={timeStr} style={styles.infoText} />
        </View>

        {isMyReview && (
          <View style={styles.deleteIcon}>
            <TouchableOpacity onPress={() => deleteReviewById(data.id)}>
              <AntDesign name="delete" size={22} color="lightgrey" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.input}>
        <RegularText text={data.reviewText} />
        <RatingBar rating={data.rating} disabled={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: "flex-start",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    padding: 8,
    padding: 20,
    marginBottom: 15,
  },
  deleteIcon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  header: {
    padding: 6,
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
});

export default ReviewCard;
