import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
} from "react-native";

//Import image picker
import * as ImagePicker from "expo-image-picker";

//Store user data handler
import * as SecureStore from "expo-secure-store";

//Importing app color palate
import { colorPalate } from "../../utils/ui/colors";

//Redux handler state management
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

//Snack bar to show user information
import { Snackbar } from "react-native-paper";

//Importing function from the user API file
import { uploadImageURL } from "../../utils/api/user";
import { uploadImage } from "../../utils/api/image";

//Custom components
import SmallTextBold from "../../components/texts/small-text/small-text-bold";
import RegularText from "../../components/texts/regular-text/regular-text";
import RegularTextBold from "../../components/texts/regular-text/regular-text-bold";
import BigTextBold from "../../components/texts/big-text/big-text-bold";
import RegularButton from "../../components/buttons/regular-button/regular-button";

const ImageScreen = ({}) => {
  //State to save the image
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  //State to show the button loading
  const [buttonLoading, setButtonLoading] = useState(false);

  // State for storing text to be displayed in the and visibility of the snackbar
  const [snackBarText, setSnackBarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Function to handle Snackbar
  const showSnackbar = (message, duration) => {
    setSnackBarText(message);
    setSnackbarOpen(true);

    // Close the snackbar after the specified duration
    setTimeout(() => {
      setSnackbarOpen(false);
    }, duration);
  };

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

  const addImage = async () => {
    if (image) {
      setButtonLoading(true);
      const id = SecureStore.getItem("id");

      // Get the download URL of the uploaded image
      const downloadURL = await uploadImage(image, `profile/${id}`);

      if (downloadURL) {
        const updatedProfile = await uploadImageURL(id, downloadURL);
        if (updatedProfile) {
          SecureStore.deleteItemAsync("id");
          setButtonLoading(false);
          dispatch(login(JSON.stringify(updatedProfile)));
        } else {
          showSnackbar("הייתה בעיה לעלות את התמונה", 3000);
        }
      }
    } else {
      showSnackbar("בחר תמונה שתרצה לעלות בבקשה", 3000);
    }
  };

  // Function to skip image upload for a user
  const skipImageUpload = async () => {
    // Retrieve and delete user ID from SecureStore
    const id = SecureStore.getItem("id");

    // Default image URL in case of skipping image upload
    const noImage =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

    // Upload default image URL to update user's profile
    const updatedProfile = await uploadImageURL(id, noImage);

    //Remove user id from secure store
    SecureStore.deleteItemAsync("id");

    // Check if profile update was successful
    if (updatedProfile) {
      // Update user state in Redux
      dispatch(login(JSON.stringify(updatedProfile)));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.header}>
          <BigTextBold text={"תמונה שווה אלף מילים"} />
          <RegularText text={"לבנות רושם ראשוני חזק עם תמונת פרופיל נהדרת"} />
        </View>

        {image ? (
          <TouchableOpacity onPress={pickImage}>
            <Image source={{ uri: image }} style={styles.imagePreview} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.circle} onPress={pickImage}>
            <RegularTextBold text={"בחר תמונה"} />
          </TouchableOpacity>
        )}

        <View style={styles.buttonContainer}>
          <RegularButton
            loading={buttonLoading}
            color={colorPalate.primary}
            text={"הוסף"}
            onPress={addImage}
          />

          <TouchableOpacity onPress={skipImageUpload} style={styles.skip}>
            <SmallTextBold text={"דלג"} />
          </TouchableOpacity>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
  header: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    direction: "rtl",
    textAlign: "left",
    paddingHorizontal: 20,
    marginBottom: 55,
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colorPalate.white,
    borderColor: colorPalate.primary,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 55,
  },
  imagePreview: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: colorPalate.primary,
    borderWidth: 1,
    borderWidth: 4,

    marginBottom: 55,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
  },
  skip: {
    marginVertical: 13,
  },
});

export default ImageScreen;
