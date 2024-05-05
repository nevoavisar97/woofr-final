// Navigation handlers
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import WelcomeScreen from "../screens/auth/welcome-screen";
import SigninScreen from "../screens/auth/signin-screen";
import SignupScreen from "../screens/auth/signup-screen";
import ImageScreen from "../screens/auth/image-screen";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={"welcome"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="signin" component={SigninScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="image" component={ImageScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
