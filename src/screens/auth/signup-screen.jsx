import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";

//Navigation handler
import { useNavigation } from "@react-navigation/native";

//Store user data handler
import * as SecureStore from "expo-secure-store";

//Importing the DropDownPicker component from the react-native-dropdown-picker library
import DropDownPicker from "react-native-dropdown-picker";

//Importing the DateTimePicker component from the @react-native-community/datetimepicker library
import DateTimePicker from "@react-native-community/datetimepicker";

//Importing the Snackbar component from the react-native-paper library
import { Snackbar } from "react-native-paper";

//Importing form validator
import { signupValidator } from "../../utils/scripts/form-validate";

//Importing genders data
import { genders } from "../../utils/data/gender";

// Importing  function from the user API file
import { saveUser } from "../../utils/api/user";

//Importing app color palate
import { colorPalate } from "../../utils/ui/colors";

// Importing uuid module from react-native-uuid
import uuid from "react-native-uuid";

//Custom components
import RegularButton from "../../components/buttons/regular-button/regular-button";
import RegularText from "../../components/texts/regular-text/regular-text";
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import CustomTextInput from "../../components/inputs/custom-text-input/custom-text-input";
import PasswordInput from "../../components/inputs/password-input/password-input";
import BigTextBold from "../../components/texts/big-text/big-text-bold";

//Check the mobile device os
const isIos = Platform.OS === "ios";

const SignupScreen = () => {
  //Navigation handler
  const navigation = useNavigation();

  // State for managing the visibility of gender selection
  const [openGender, setOpenGender] = useState(false);

  // State for managing the visibility of the date picker
  const [showDatePicker, setShowDatePicker] = useState(false);

  //State to show the button loading
  const [buttonLoading, setButtonLoading] = useState(false);

  // State for managing the snackbar: storing text content to be displayed and controlling visibility
  const [snackBarText, setSnackBarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  //Width for the form
  const formWidth = 290;

  // State object to manage user data
  const [userData, setUserData] = useState({
    id: uuid.v4().toString(),
    firstName: "",
    lastName: "",
    gender: "",
    birthday: new Date(),
    email: "",
    password: "",
    confirm: "",
    type: "",
  });

  // Check if the app runs on iPhone
  useEffect(() => {
    // If the app runs on iPhone, show the date picker
    if (isIos) {
      setShowDatePicker(true);
    }
  }, []);

  // Function to handle date selection
  const handleDateSelection = (event, selectedDate) => {
    // If the app doesn't run on iPhone, hide the date picker
    if (!isIos) {
      setShowDatePicker(false);
    }
    // Get the selected date or use the current user's birthday
    const currentDate = selectedDate || userData.birthday;
    // Update the user data with the selected date
    setUserData({ ...userData, birthday: currentDate });
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    // Validate the user data using signupValidator
    const formCheck = signupValidator(userData);

    // If the form validation fails
    if (formCheck.isValid === false) {
      //Open and Set snackbar text to display the error message
      setSnackBarText(formCheck.errorMessage);
      setSnackbarOpen(true);
      // Close the snackbar after 3 seconds
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000);
      return;
    } else setButtonLoading(true);

    //Api call to signup the user into db
    const token = await saveUser(userData);
    setButtonLoading(false);
    if (token) {
      SecureStore.setItem("token", token);
      SecureStore.setItem("id", userData.id);
      navigation.navigate("image");
    } else {
      // Set snackbar text to display the error message
      setSnackBarText("שגיאה בהרשמה");
      // Open the snackbar
      setSnackbarOpen(true);
      setButtonLoading(false);

      // Close the snackbar after 3 seconds
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000);
      return;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={{ alignItems: "flex-end" }}>
        <GoBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.header}>
          <BigTextBold text={"הצטרפו לחוויה שלנו"} />
          <RegularText text={"* כל השדות הם שדות חובה"} />
        </View>

        <View style={styles.formBody}>
          <CustomTextInput
            value={userData.firstName}
            placeholder="שם פרטי"
            style={styles.input}
            width={formWidth}
            onChangeText={(value) => {
              setUserData({ ...userData, firstName: value });
            }}
          />
          <CustomTextInput
            value={userData.lastName}
            placeholder="שם משפחה"
            style={styles.input}
            width={formWidth}
            onChangeText={(value) => {
              setUserData({ ...userData, lastName: value });
            }}
          />

          <CustomTextInput
            value={userData.email}
            placeholder="איימל"
            style={styles.input}
            width={formWidth}
            onChangeText={(value) => {
              setUserData({ ...userData, email: value });
            }}
          />

          <PasswordInput
            value={userData.password}
            placeholder="סיסמא"
            style={styles.input}
            width={formWidth}
            onChangeText={(value) => {
              setUserData({ ...userData, password: value });
            }}
          />

          <PasswordInput
            value={userData.confirm}
            placeholder="אימות סיסמא"
            style={styles.input}
            width={formWidth}
            onChangeText={(value) => {
              setUserData({ ...userData, confirm: value });
            }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          {isIos ? null : (
            <TouchableOpacity
              onPress={() => {
                setShowDatePicker(true);
              }}
            >
              <RegularText
                text={`${userData.birthday.getUTCFullYear()}-${
                  userData.birthday.getMonth() + 1
                }-${userData.birthday.getDate()}`}
              />
            </TouchableOpacity>
          )}

          {showDatePicker && (
            <DateTimePicker
              value={userData.birthday}
              onChange={handleDateSelection}
            />
          )}

          <View style={styles.input}>
            <DropDownPicker
              rtl={true}
              style={styles.picker}
              open={openGender}
              value={userData.gender}
              items={genders}
              setOpen={setOpenGender}
              onSelectItem={(value) => {
                setUserData({ ...userData, gender: value.value });
              }}
              placeholder="בחרו מגדר"
              dropDownDirection="BOTTOM"
              dropDownContainerStyle={colorPalate.white}
            />
          </View>
          <View style={{ marginTop: 165, width: 300 }}>
            <RegularButton
              loading={buttonLoading}
              text={"הרשמה"}
              onPress={handleSubmit}
              color={colorPalate.primary}
            />
          </View>
        </View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    flexDirection: "column",
  },
  dropDownLabel: {
    textAlign: "left",
    fontSize: 16,
  },
  formBody: {
    alignItems: "center",
    paddingBottom: 10,
  },
  header: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    direction: "rtl",
    textAlign: "left",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  input: {
    padding: 10,
    width: 300,
    textAlign: "left",
  },
  dropDownContainer: {
    backgroundColor: "red",
  },
  picker: {
    flex: 1,
  },
});

export default SignupScreen;
