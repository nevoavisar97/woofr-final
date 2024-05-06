import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//Redux state management
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login, selectAuth, logout } from "../../redux/authSlice";

//Snack bar to show user information
import { Snackbar } from "react-native-paper";

//Import app color palate
import { colorPalate } from "../../utils/ui/colors";

//Store user data handler
import * as SecureStore from "expo-secure-store";

//Import image picker
import * as ImagePicker from "expo-image-picker";

//Custom components
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import CustomTextInput from "../../components/inputs/custom-text-input/custom-text-input";
import PasswordInput from "../../components/inputs/password-input/password-input";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import RegularButtonSmall from "../../components/buttons/regular-button/regular-button-small";
import RegularText from "../../components/texts/regular-text/regular-text";
import LoadingIndicator from "../../components/animation/loading-indicator/loading-indicator";

//Importing function from the API file
import {
  editProfile,
  GetUserData,
  uploadImageURL,
  deleteProfile,
} from "../../utils/api/user";
import { uploadImage } from "../../utils/api/image";
import BigTextBold from "../../components/texts/big-text/big-text-bold";

const EditInformation = () => {
  //Set state to store image
  const [image, setImage] = useState(null);

  // State for storing text to be displayed in the and visibility of the snackbar
  const [snackBarText, setSnackBarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  //State to show loading screen when action occur
  const [loading, setLoading] = useState(false);

  // Importing the useNavigation hook from React Navigation to access navigation prop
  const navigation = useNavigation();

  //Width for the form
  const formWidth = 290;

  // Use useSelector to access the Redux store state
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);
  const [userData, setUserData] = useState({
    firstName: myUser.firstName,
    lastName: myUser.lastName,
    password: myUser.password,
    profileImage: myUser.profileImage,
  });

  const pickImage = async () => {
    // Launch the image library and await the result
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Check if the user canceled the image selection
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to move back using navigation.goBack()
  const moveBack = () => {
    navigation.goBack();
  };

  // Function to handle Snackbar
  const showSnackbar = (message, duration) => {
    setSnackBarText(message);
    setSnackbarOpen(true);

    // Close the snackbar after the specified duration
    setTimeout(() => {
      setSnackbarOpen(false);
    }, duration);
  };

  const handelUpdate = async () => {
    setLoading(true);
    let updatedUser = {
      id: myUser.id,
      email: myUser.email,
      password: userData.password,
      gender: myUser.gender,
      profilePictureUrl: myUser.profilePictureUrl,
      birthday: myUser.birthday,
      firstName: userData.firstName,
      lastName: userData.lastName,
      token: myUser.token,
      type: "",
    };

    if (image) {
      const url = await uploadImage(image, `profile/${myUser.id}`);
      const imageUpdate = await uploadImageURL(myUser.id, url);

      if (!imageUpdate) {
        // If authentication fails, display a snackbar with an error message
        setLoading(false);
        showSnackbar("הייתה בעיה להעלות את התמונה", 3000);
        return;
      }

      // Update profilePictureUrl in updatedUser with the newly uploaded image URL
      updatedUser.profilePictureUrl = url;
    }

    const editRes = await editProfile(updatedUser);

    if (editRes) {
      const user = await GetUserData(SecureStore.getItem("token"));

      if (user) {
        dispatch(login(JSON.stringify(user)));
        moveBack();
      }
    } else {
      // If authentication fails, display a snackbar with an error message
      setLoading(false);
      showSnackbar("הייתה בעיה לעדכן את הפרופיל", 3000);
    }
  };

  const deleteUser = async () => {
    setLoading(true);

    try {
      const res = await deleteProfile(myUser.token);
      // Delete the authentication token from SecureStore

      if (res) {
        await SecureStore.deleteItemAsync("token");
        // Dispatch the logout action to the Redux store
        dispatch(logout());
      } else {
        setLoading(false);
        showSnackbar("הייתה בעיה למחוק את הפרופיל", 3000);
      }
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error("Error deleting token:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1 }}>
        {!loading ? (
          <ScrollView>
            <KeyboardAvoidingView style={styles.container}>
              <View style={styles.header}>
                <GoBackButton onPress={moveBack} />
                <View>
                  <BigTextBold text={"עדכן את הפרטים שלך"} />
                </View>
              </View>
              <View style={styles.formScroll}>
                <View style={styles.circleContainer}>
                  {image ? (
                    <TouchableOpacity onPress={pickImage}>
                      <Image
                        source={{ uri: image }}
                        style={styles.imagePreview}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.circle} onPress={pickImage}>
                      <RegularText text={"בחר תמונה"} />
                    </TouchableOpacity>
                  )}
                </View>
                <CustomTextInput
                  value={userData.firstName}
                  placeholder="שם פרטי"
                  width={formWidth}
                  onChangeText={(value) => {
                    setUserData({ ...userData, firstName: value });
                  }}
                />
                <CustomTextInput
                  value={userData.lastName}
                  placeholder="שם משפחה"
                  width={formWidth}
                  onChangeText={(value) => {
                    setUserData({ ...userData, lastName: value });
                  }}
                />

                <PasswordInput
                  value={userData.password}
                  placeholder="סיסמא"
                  width={formWidth}
                  onChangeText={(value) => {
                    setUserData({ ...userData, password: value });
                  }}
                />
              </View>
              <View style={styles.buttonContainer}>
                <RegularButton
                  text={"עדכן"}
                  color={colorPalate.primaryLight}
                  onPress={handelUpdate}
                />
              </View>

              <View
                style={[styles.buttonContainer, { width: 200, marginTop: 90 }]}
              >
                <RegularButtonSmall
                  text={
                    myUser.type === "user"
                      ? "הפוך לפרופיל עסקי"
                      : "עדכן את העסק"
                  }
                  style={styles.button}
                  color={colorPalate.primaryLight}
                  onPress={() => {
                    navigation.navigate("profile-professionals-registration");
                  }}
                />
              </View>

              <View style={[styles.buttonContainer, { width: 200 }]}>
                <RegularButtonSmall
                  text={"מחיקת משתמש"}
                  color={colorPalate.lightGrey}
                  onPress={deleteUser}
                />
              </View>

              <Snackbar
                visible={snackbarOpen}
                onDismiss={() => {}}
                action={{
                  label: "סגור",
                  onPress: () => {
                    setSnackbarOpen(false);
                  },
                }}
              >
                {snackBarText}
              </Snackbar>
            </KeyboardAvoidingView>
          </ScrollView>
        ) : (
          <LoadingIndicator />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  formScroll: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    padding: 8,
  },
  circleContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    marginTop: 32,
    marginBottom: 12,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: colorPalate.white,
    borderColor: colorPalate.primary,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: colorPalate.primary,
    borderWidth: 2,
  },
  buttonContainer: {
    marginTop: 10,
    width: 288,
  },
});

export default EditInformation;
