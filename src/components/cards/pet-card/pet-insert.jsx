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
  Alert,
} from "react-native";

// Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../../redux/authSlice";

// Snackbar to show user information
import { Snackbar } from "react-native-paper";

// Import app color palate
import { colorPalate } from "../../../utils/ui/colors";
import uuid from "react-native-uuid";

// Import image picker
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../../utils/api/image";

// Custom components
import CustomTextInput from "../../../components/inputs/custom-text-input/custom-text-input";
import RegularButton from "../../../components/buttons/regular-button/regular-button";
import RegularText from "../../../components/texts/regular-text/regular-text";
import LoadingIndicator from "../../../components/animation/loading-indicator/loading-indicator";

// Importing function from the API file
import { insertPet } from "../../../utils/api/pet";

const AddPet = ({ showRegister, setRender }) => {

  // State for storing text to be displayed in the snackbar and visibility of the snackbar
  const [snackBarText, setSnackBarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // State to show loading screen when action occurs
  const [loading, setLoading] = useState(false);

  // Width for the form
  const formWidth = 290;

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  // Set state to store image
  const [image, setImage] = useState(null);

  const [petData, setPetData] = useState({
    id: uuid.v4(),
    userId: myUser.id,
    name: "",
    birthYear: 2024,
    breed: "",
    bio: "",
    imageUrl: image,
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("יש לאפשר גישה לגלריה כדי לבחור תמונות.");
      return;
    }
    Alert.alert(
      "בחר מקור תמונה",
      "אנא בחר מקור תמונה:",
      [
        {
          text: "צלם תמונה",
          onPress: () => takePhoto(),
        },
        {
          text: "בחר מגלריה",
          onPress: () => launchImageLibrary(),
        },
        {
          text: "ביטול",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const takePhoto = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus !== 'granted') {
      alert('יש לאפשר גישה למצלמה כדי לצלם תמונות.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const launchImageLibrary = async () => {
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

  // Function to handle Snackbar
  const showSnackbar = (message, duration) => {
    setSnackBarText(message);
    setSnackbarOpen(true);

    // Close the snackbar after the specified duration
    setTimeout(() => {
      setSnackbarOpen(false);
    }, duration);
  };

  const handleAddPet = async () => {
    setLoading(true);
    let url = "null";
    if (image) {
      url = await uploadImage(image, `petByProfile/${petData.id}`);
      // Update profilePictureUrl in updatedUser with the newly uploaded image URL
    }
    const newPet = {
      id: petData.id,
      userId: myUser.id,
      name: petData.name,
      birthYear: 2024,
      breed: petData.breed,
      bio: petData.bio,
      imageUrl: url,
    }
    const res = await insertPet(newPet);
    if (res) {
      showRegister(false);
      setRender();
    } else {
      setLoading(false);
      // If authentication fails, display a snackbar with an error message
      showSnackbar("הייתה בעיה לרשום את הפרופיל", 3000);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
      >
        {!loading ? (
          <View style={{ alignItems: "center" }}>
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
              value={petData.name}
              placeholder="שם"
              width={formWidth}
              onChangeText={(value) => {
                setPetData({ ...petData, name: value });
              }}
            />
            {/* <CustomTextInput
              value={petData.birthYear.toString()}
              placeholder="שנת לידה"
              width={formWidth}
              onChangeText={(value) => {
                // Ensure that the input is numeric before updating state
                if (/^\d+$/.test(value) || value === "") {
                  setPetData({ ...petData, birthYear: value });
                }
              }}
            /> */}
            <CustomTextInput
              value={petData.breed}
              placeholder="גזע"
              width={formWidth}
              onChangeText={(value) => {
                setPetData({ ...petData, breed: value });
              }}
            />

            <CustomTextInput
              value={petData.bio}
              placeholder="ביו"
              width={formWidth}
              height={100}
              multiline={true} // Enable multiline
              numberOfLines={4}
              onChangeText={(value) => {
                setPetData({ ...petData, bio: value });
              }}
            />
            <View style={styles.buttonContainer}>
              <RegularButton
                text={"הוספה"}
                color={colorPalate.primaryLight}
                onPress={handleAddPet}
              />
            </View>

            <Snackbar
              visible={snackbarOpen}
              onDismiss={() => { }}
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
        ) : (
          <LoadingIndicator />
        )}
      </KeyboardAvoidingView>

    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 8,
    marginBottom: 50,
    paddingBottom: 35,
    borderBottomLeftRadius: 25,
    borderColor: colorPalate.lightGrey,
    borderWidth: 2,
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

export default AddPet;
