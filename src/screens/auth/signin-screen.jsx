import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View,TouchableWithoutFeedback,Keyboard } from "react-native";

//Navigation handler
import { useNavigation } from "@react-navigation/native";

//Store package for react native expo
import * as SecureStore from "expo-secure-store";

// Importing the Snackbar component from the react-native-paper library
import { Snackbar } from "react-native-paper";

//Redux handler state management
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

//Importing functions from the user API file
import { loginUser, GetUserData } from "../../utils/api/user";

//Importing app color palate
import { colorPalate } from "../../utils/ui/colors";

//Custom components
import RegularText from "../../components/texts/regular-text/regular-text";
import BigTextBold from "../../components/texts/big-text/big-text-bold";
import CustomTextInput from "../../components/inputs/custom-text-input/custom-text-input";
import PasswordInput from "../../components/inputs/password-input/password-input";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import Logo from "../../components/image/logo/logo";

const SigninScreen = () => {
  // Importing the useNavigation hook from React Navigation to access navigation prop
  const navigation = useNavigation();

  // Importing the useDispatch hook from react-redux to dispatch actions
  const dispatch = useDispatch();

  //State to show the button loading
  const [buttonLoading, setButtonLoading] = useState(false);

  //State to store the login data
  const [loginData, setLoginData] = useState({
    email: "noam@gmail.com",
    password: "noam456pass",
  });

  // State for managing the snackbar: storing text content to be displayed and controlling visibility
  const [snackBarText, setSnackBarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  //Width for the form
  const formWidth = 290;

  // Function to handle the login event
  const handleLoginEvent = async () => {
    try {
      setButtonLoading(true);
      // Attempt to authenticate the user and retrieve a token
      const token = await loginUser(loginData);
      if (token) {
        // If a token is received, store it securely
        SecureStore.setItem("token", token);

        // Retrieve user data using the token and dispatch login action
        const userData = await GetUserData(token);
        setButtonLoading(false);
        dispatch(login(JSON.stringify(userData)));
      } else {
        setButtonLoading(false);
        // If authentication fails, display a snackbar with an error message
        setSnackbarOpen(true);
        setSnackBarText("סיסמא או איימל לא נכונים");

        // Close the snackbar after 3 seconds
        setTimeout(() => {
          setSnackbarOpen(false);
        }, 3000);
      }
    } catch (error) {
      // Log any errors that occur during the process
      console.error("Error saving token:", error);
    }
  };

  // Function to navigate to the Signup screen
  const moveToSignup = () => {
    navigation.navigate("signup");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Logo />

          <View style={styles.header}>
            <BigTextBold text={"כיף לראות אותך שוב!"} />
            <RegularText text={"התחברו עכשיו"} />
          </View>

          <View>
            <CustomTextInput
              value={loginData.email}
              placeholder="איימל"
              style={styles.input}
              english={true}
              onChangeText={(value) => {
                setLoginData({ ...loginData, email: value });
              }}
            />
            <PasswordInput
              value={loginData.password}
              placeholder="סיסמא"
              style={[styles.input, { textAlign: "right" }]}
              width={formWidth}
              onChangeText={(value) => {
                setLoginData({ ...loginData, password: value });
              }}
            />
          </View>

          <View>
            <View style={{ alignItems: "center", width: 200, marginTop: 55 }}>
              <RegularButton
                loading={buttonLoading}
                text={"התחבר"}
                onPress={handleLoginEvent}
                color={colorPalate.primary}
                iconName={"log-in-outline"}
              />
            </View>
            <View style={styles.divider}></View>
          </View>

          <View style={{ alignItems: "center", width: 250 }}>
            <RegularText
              text={"עדיין לא ב woofr? להרשמה"}
              onPress={moveToSignup}
              color={colorPalate.primary}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
  header: {
    alignItems: "center",
    direction: "rtl",
    paddingHorizontal: 20,
    marginTop: 85,
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,

    marginVertical: 5,
    width: 300,
  },
  divider: {
    backgroundColor: colorPalate.grey,
    height: 1,
    marginVertical: 10,
  },
});

export default SigninScreen;
