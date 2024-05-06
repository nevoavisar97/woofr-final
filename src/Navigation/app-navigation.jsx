//Navigation handlers
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import icons from Expo
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Stack navigation
import HomeStack from "./home-stack";
import chatStack from "./chat-stack";
import ProfileStack from "./profile-stack";
import SearchStack from "./search-stack";
import { colorPalate } from "../utils/ui/colors";

//Create Bottom tab navigation
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const iconSize = 26;
  return (
    <Tab.Navigator
      initialRouteName="home-stack"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Hide labels for all screens
        tabBarActiveTintColor: colorPalate.primary, // Change active color
      }}
    >
      <Tab.Screen
        name="home-stack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={iconSize} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="chat-stack"
        component={chatStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="message"
              size={iconSize}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="search-stack"
        component={SearchStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="magnify"
              size={iconSize}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="profile-stack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
