import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import MyProfileScreen from "../screens/app/my-profile-screen";
import EditInformation from "../screens/app/edit-information";
import NewPostScreen from "../screens/app/new-post-screen";
import ProfessionalsRegistrationScreen from "../screens/app/professionals-registration-screen";
import FollowsScreen from "../screens/app/follows-screen";
import OtherProfileScreen from "../screens/app/other-profile-screen";
import RatingScreen from "../screens/app/rating-screen";


const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile-index"
        component={MyProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile-edit"
        component={EditInformation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile-post"
        component={NewPostScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile-other"
        component={OtherProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile-professionals-registration"
        component={ProfessionalsRegistrationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile-follows"
        component={FollowsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile-rating"
        component={RatingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
