import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

//Import icons
import { Ionicons } from "@expo/vector-icons";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

//Importing function from the API file
import { getHomePagePosts } from "../../utils/api/posts";
import { getProsForHomePage } from "../../utils/api/pro";

//Import app logo
import LogoImage from "../../../assets/logo-wofer2.png";
import headingImage from "../../utils/images/semi-heading.png";

//Custom Component
import PostSlider from "../../components/scroll/posts-slider/post-slider";
import AddPost from "../../components/buttons/add-post/add-post";
import ExploreSlider from "../../components/scroll/explore-slider/explore-slider";
import { getUserPets } from "../../utils/api/pet";
import { colorPalate } from "../../utils/ui/colors";

const HomeScreen = () => {
  //Navigation handler
  const navigation = useNavigation();

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  // State to control refreshing
  const [refreshing, setRefreshing] = useState(false);

  // Initialize state for storing the user's posts
  const [posts, setPosts] = useState([]);
  // Initialize state for storing the user's pets
  const [myPets, setMyPets] = useState([]);
    // Retrieve user pets and set the values

  // Initialize state for storing the pros
  const [pros, setPros] = useState([]);

  //fetch posts to display on homepage
  const fetchPosts = async () => {
    
    const res = await getHomePagePosts(myUser.id);
    setPosts(res);
  };

  //fetch posts to display on homepage
  const fetchPro = async () => {
    const res = await getProsForHomePage();
    setPros(res);
  };
const fetchPets = async () =>{
  const pets = await getUserPets(myUser.id);
    setMyPets(pets);
}

  // Function to handle refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPosts([]);
    fetchPosts();
    fetchPro();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Function to navigate to either the "home-profile" or "profile-stack" screen based on the provided ID
  const moveToProfile = (id) => {
    if (myUser.id !== id) {
      navigation.navigate("home-profile", { id: id });
    } else {
      navigation.navigate("profile-stack");
    }
  };

  //Function to navigate to processionals screen
  const moveToProfessionals = () => {
    navigation.navigate("home-professionals");
  };

  // useEffect hook to fetch posts when the refreshing state changes
  useEffect(() => {
    fetchPets();
    fetchPosts();
    fetchPro();
  }, [refreshing]);

  // useFocusEffect hook to fetch posts when the component gains focus
  useFocusEffect(
    useCallback(() => {
      fetchPosts();
      fetchPro();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image source={LogoImage} style={styles.logo} />
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={moveToProfessionals}
        >
          <Image source={headingImage} style={styles.heading} />
          <Ionicons name="caret-back-outline" size={24} color={"black"} />
        </TouchableOpacity>

        <ExploreSlider arr={pros} onPress={moveToProfile}  />

        <View
          style={styles.touchableContainer}
          onPress={moveToProfessionals}
        ></View>
        <AddPost
          onPress={() => {
            navigation.navigate("home-post",{myPets});
          }}
        />
        <View style={styles.postsArea}>
          {posts.length > 0 && (
            <PostSlider
              arr={posts}
              onImgPress={moveToProfile}
              setRender={onRefresh}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  postsArea: {
    width: "100%",
    backgroundColor: colorPalate.lightGrey,
  },
  heading: {
    marginLeft: 10,
    width: 220,
    height: 70,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 8,
    width: "100%",
    backgroundColor: "white",
  },
  logo: {
    width: 120,
    height: 60,
    resizeMode: "contain",
    marginLeft: 10,
  },
  touchableContainer: {
    justifyContent: "end",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    gap: 12,
    padding: 4,
  },
});

export default HomeScreen;
