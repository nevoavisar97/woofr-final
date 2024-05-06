import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
//Importing function from the API file
import { SearchUser } from "../../utils/api/user";

//Navigation handler
import { useNavigation } from "@react-navigation/native";
//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";
//Custom components
import CustomSearchBar from "../../components/inputs/search-bar/custom-search-bar";
import SearchList from "../../components/scroll/search-list/search-list";
import { getTips } from "../../utils/api/chat";
import { colorPalate } from "../../utils/ui/colors";
import RegularTextBold from "../../components/texts/regular-text/regular-text-bold";

const SearchScreen = () => {
  // Define state variable 'users' using the 'useState' hook, initialized as an empty array
  const [users, setUsers] = useState([]);

  //fetch google gemini tip to display on screen when search is disabled
  const [tips, setTips] = useState(null);

  const auth = useSelector(selectAuth);
  const myUser = auth.user ? JSON.parse(auth.user) : null;

  //Importing the useNavigation hook from React Navigation to access navigation prop
  const navigation = useNavigation();

  // Asynchronously fetches search results based on the provided 'text'.
  const fetchSearchResult = async (text) => {
    if (text === "") {
      // If the text is empty, reset the 'users' state to an empty array.
      setUsers([]);
      getTip();
    } else {
      // Otherwise, call the 'SearchUser' function with the provided text and update the 'users' state with the result.
      const res = await SearchUser(text);
      setUsers(res);
    }
  };



  // Navigates to the user profile screen with the specified 'id'.
  const moveToUserProfile = (id) => {
    if (id === myUser.id) {
      navigation.navigate("profile-index");
    }
    else navigation.navigate("search-profile", { id: id });
  };

  const getTip = async () => {
    setTips(null);
    const tip = await getTips();
    setTips(tip);
  };
useEffect(() => {
  getTip()
}, [third])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

      <SafeAreaView style={{ flex: 1 }}>
        <CustomSearchBar onPressSearch={fetchSearchResult} />
        <KeyboardAvoidingView style={styles.container}>
          {users.length <= 0 ? (

            <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 50 }}>
              {tips &&
                <View style={{ alignItems: "flex-start", gap: 15 }}>
                  <MaterialCommunityIcons name="lightbulb-on-outline" size={50} color={colorPalate.primary} />
                  <RegularTextBold color={colorPalate.primary} text={tips} />
                </View>}
            </View>
          ) : (
            <SearchList users={users} onClick={moveToUserProfile} />
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }

});

export default SearchScreen;
