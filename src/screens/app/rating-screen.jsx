import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { reviewValidate } from "../../utils/scripts/review-validate";

//App color palate
import { colorPalate } from "../../utils/ui/colors";

// Import necessary hooks from React Navigation
import { useNavigation, useRoute } from "@react-navigation/native";
import uuid from "react-native-uuid";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

//Api handler from different files
import { getProReviews, insertReview } from "../../utils/api/review";

//Snack bar to show user information
import { Snackbar } from "react-native-paper";

//Custom Components
import RegularTextBold from "../../components/texts/regular-text/regular-text-bold";
import RatingBar from "../../components/cards/rating-bar/rating-bar";
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import ReviewSlider from "../../components/scroll/review-slider/review-slider";
import RegularText from "../../components/texts/regular-text/regular-text";
import AddReview from "../../components/buttons/add-review/add-review";


const RatingScreen = () => {
  //Importing the useNavigation hook from React Navigation to access navigation prop
  const navigation = useNavigation();

  // Extracts the 'id' parameter from the current route.
  const route = useRoute();
  const { data } = route.params;

  //Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  // State for storing text to be displayed in the and visibility of the snackbar
  const [snackBarText, setSnackBarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);

  // Function to handle Snackbar
  const showSnackbar = (message, duration) => {
    setSnackBarText(message);
    setSnackbarOpen(true);

    // Close the snackbar after the specified duration
    setTimeout(() => {
      setSnackbarOpen(false);
    }, duration);
  };

  //State to hold reviews
  const [prosReviews, setProsReviews] = useState([]);

  const setRender = () => {
    setProsReviews([]);
    fetchProsReviews();
  };

  //State to store the review data
  const [review, setReview] = useState({
    id: uuid.v4().toString(),
    userId: myUser.id,
    proUserId: data.userId,
    reviewText: "",
    rating: 0,
    datePosted: new Date(),
  });

  //Function to handel new review rating
  const handleRating = (value) => {
    // Update the rating when it changes
    setReview({ ...review, rating: value });
  };

  //Fetch reviews base pro id
  const fetchProsReviews = async () => {
    const res = await getProReviews(data.userId);
    setProsReviews(res);
  };

  //Function to upload review
  const uploadReview = async () => {
    //API post method to upload the image
    const reviewCheck = reviewValidate(review.reviewText);
    if (reviewCheck.isValid) {
      const res = await insertReview(review);
      setReview({ ...review, reviewText: "" })
      if (res) {
        fetchProsReviews();

      }else {
        showSnackbar("כבר כתבת ביקורת עבור עסק זה", 3000);
        return;
      }
    } 
    else{
      setSnackBarText(reviewCheck.errorMessage);
      setSnackbarOpen(true);
      // Close the snackbar after 3 seconds
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000);
      return;
    }
  };

  useEffect(() => {

    if (data.userId === myUser.id) setIsMyProfile(true);
    fetchProsReviews();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <GoBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View>
          <RegularTextBold text={`${data.displayName}`} />
        </View>
      </View>

      <ScrollView style={styles.container} nestedScrollEnabled={true}>
        {!isMyProfile &&
          <View
            style={{
              alignItems: "center",
              paddingVertical: 30,
              backgroundColor: colorPalate.primary,
            }}
          >
            <RegularText
              color={"white"}
              text={`דרגו את ${data.displayName} (1 לא מומלץ - 5 מצוין)`}
            />
            <TouchableOpacity style={styles.avatarContainer}>
              <Image
                source={{
                  uri: data.profileImage !== '' ? data.profileImage : 'defaultImageUri',
                }}
                style={styles.avatar}
              />
            </TouchableOpacity>

            <View style={{ paddingBottom: 20 }}>
              <RatingBar
                disabled={false}
                rating={1}
                onFinishRating={handleRating}
              />
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                multiline
                placeholder="הזינו כאן את הביקורת שלכם"
                value={review.reviewText}
                onChangeText={(value) =>
                  setReview({ ...review, reviewText: value })
                }
              />
            </View>
            <AddReview onPress={uploadReview} />
          </View>}
        {prosReviews.length > 0 ? (
          <ReviewSlider arr={prosReviews} setRender={setRender} onImgPress={() => { }} />
        ) : (
          <View style={{ alignItems: "center", marginTop: 25 }}>
            <RegularText text={"אין עדיין ביקורות"} />
          </View>
        )}
      </ScrollView>
      <View style={styles.snackbar}>
        <Snackbar
          visible={snackbarOpen}
          onDismiss={() => setSnackbarOpen(false)}
          action={{
            label: "סגור",
            onPress: () => {
              setSnackbarOpen(false);
            },
          }}
        >
          {snackBarText}
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 0.8,

    borderBottomColor: colorPalate.lightGrey,
  },
  textInputContainer: {
    backgroundColor: "white",
    borderColor: "#e8e8e8",
    borderRadius: 5,
    borderWidth: 2,
    width: "85%",
    padding: 12,
  },
  textInput: {
    height: 80,
    textAlign: "right",
    padding: 3,
    fontSize: 16,
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  snackbar: {
    position: "relative",
    bottom: 100,
    right: 0,
    zIndex: 10,
  },
});

export default RatingScreen;
