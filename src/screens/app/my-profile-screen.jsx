import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import PetSlider from "../../components/scroll/pets-slider/pet-slider";
import { getUserPets } from "../../utils/api/pet";
import AddPet from "../../components/cards/pet-card/pet-insert";
//Store user data handler
import * as SecureStore from "expo-secure-store";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

//Importing function from the API file
import { getUserFollowers, getUserFollowings } from "../../utils/api/user";
import { getPetPosts, getUserPosts } from "../../utils/api/posts";

//App color palate
import { colorPalate } from "../../utils/ui/colors";
import { getProById } from "../../utils/api/pro";
import ProfessionalProfile from "../../components/cards/professional-profile/professional-profile"
//Custom components
import RegularButtonSmall from "../../components/buttons/regular-button/regular-button-small";
import EmptyCard from "../../components/cards/empty-card/empty-card";
import PostSlider from "../../components//scroll/posts-slider/post-slider";
import AddPost from "../../components/buttons/add-post/add-post";
import RegularTextBold from "../../components/texts/regular-text/regular-text-bold";
import RegularText from "../../components/texts/regular-text/regular-text";
import PetHeading from "../../components/texts/pet-heading/pet-heading";
import AddPetButton from "../../components/buttons/regular-button/add-pet-button";
const ProfileScreen = () => {
  //Navigation handler
  const navigation = useNavigation();

  // Use useSelector to access the Redux store state
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  // Initialize state variables for following and followers
  const [following, setFollowing] = useState([]);
  const [followers, setFollower] = useState([]);

  const [addPetPressed, setAddPetPressed] = useState(false);

  // Initialize state for storing the user's posts
  const [myPosts, setMyPosts] = useState([]);

  const [proData, setProData] = useState([]);
  // Initialize state for storing the user's pets
  const [myPets, setMyPets] = useState([]);
  const [selectedPetData, setSelectedPetData] = useState(null);

  const [icon, setIcon] = useState("caret-down-outline");

  // Initialize state for handling the refreshing state of the posts (e.g., when pulling down to refresh)
  const [refreshing, setRefreshing] = useState(false);

  // Function to logout the user
  const logoutUser = () => {
    // Delete the authentication token from SecureStore
    SecureStore.deleteItemAsync("token");
    // Dispatch the logout action to the Redux store
    dispatch(logout());
  };

  const fetchUserData = async () => {
    // Retrieve user posts and set the values
    const posts = await getUserPosts(myUser.id);
    setMyPosts(posts);

    // Retrieve user pets and set the values
    const pets = await getUserPets(myUser.id);
    setMyPets(pets);

    // Retrieve user following data and set the values
    const fetchFollowings = await getUserFollowings(myUser.id);
    setFollowing(fetchFollowings);

    // Retrieve user follower data and set the values
    const fetchFollowers = await getUserFollowers(myUser.id);
    setFollower(fetchFollowers);

    const proData = await getProById(myUser.id);
    setProData(proData);
  };

  // Execute the provided callback when the component gains focus
  useFocusEffect(
    useCallback(() => {
      setSelectedPetData(null);
      setAddPetPressed(false);
      setMyPosts([]);
      fetchUserData();
    }, [refreshing])
  );

  const moveToRating = (id) => {
    navigation.navigate("home-rating", { data: proData });
  };
  const handleAddPet = async () => {
    if (addPetPressed) {
      setAddPetPressed(false);
      setIcon("caret-down-outline");
    }
    else {
      setAddPetPressed(true);
      setIcon("caret-up-outline");
    }
  }
  // Function to handle the refresh action
  const onRefresh = () => {
    // Set refreshing to true immediately
    setSelectedPetData(null);
    setMyPets([]);
    setMyPosts([]);
    setRefreshing(true);
  };

  //Function to move to follow screen
  const moveToFollows = (arr, title) => {
    navigation.navigate("profile-follows", { arr: arr, title: title });
  };

  useEffect(() => {
    setSelectedPetData(null);
    // Fetch user data when the refreshing state changes
    if (refreshing) {
      fetchUserData().then(() => {
        // After fetching data, set refreshing to false
        setRefreshing(false);
      });
    }
  }, [refreshing]);
  // Function to handle filter selection
  const handlePetFilter = async (petId, data) => {
    if (petId == "none") {
      setSelectedPetData(null);
      const res = await getUserPosts(myUser.id);
      if (res) {
        setMyPosts([]);
        setMyPosts(res);
      }
    }
    else {
      // Calculate age based on BirthYear
      console.log(data);
      const currentYear = new Date().getFullYear();
      let age = currentYear - parseInt(data.birthYear);
      if (age == 0) age = 0.5;
      // Format the data for display
      const formattedData = ` גיל: ${age} | ${data.breed}\n━━━━━\n${data.bio}`;
      setSelectedPetData(formattedData);
      const res = await getPetPosts(petId);
      if (res) {
        setMyPosts([]);
        setMyPosts(res);
      }
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaView>
        <StatusBar backgroundColor={"black"} />
      </SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colorPalate.primary]}
          />
        }
      >
        {myUser ? (
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={{ alignItems: "center", marginTop: 5 }}>
                <Image
                  source={{ uri: myUser.profilePictureUrl }}
                  style={styles.profileImage}
                />
                <View>
                  <RegularTextBold
                    text={`${myUser.firstName} ${myUser.lastName}`}
                  />
                </View>
              </View>
              <View style={styles.followingContainer}>
                <TouchableOpacity
                  style={{ flexDirection: "column", alignItems: "center" }}
                  onPress={() => {
                    moveToFollows(followers, "העוקבים שלי");
                  }}
                >
                  <RegularTextBold text={`${followers.length}`} />
                  <RegularText text={`עוקבים`} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    moveToFollows(following, "הנעקבים שלי");
                  }}
                  style={{ flexDirection: "column", alignItems: "center" }}
                >
                  <RegularTextBold text={`${following.length}`} />
                  <RegularText text={`במעקב`} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonView}>
                <RegularButtonSmall
                  text={"עריכת פרופיל"}
                  color={"#e6e6e6"}
                  iconName={"create-outline"}
                  onPress={() => {
                    navigation.navigate("profile-edit");
                  }}
                />
              </View>
              <View style={styles.buttonView}>
                <RegularButtonSmall
                  text={`התנתק`}
                  color={"#e6e6e6"}
                  iconName={"log-out-outline"}
                  onPress={() => logoutUser()}
                />
              </View>
            </View>
            <View style={{ marginBottom: 20, marginHorizontal: 35 }}>
              <AddPetButton
                onPress={handleAddPet}
                iconName={icon}
                color={colorPalate.lightGrey}
                text={"הוספת חיית מחמד"} />
              {addPetPressed &&
                <AddPet
                  setRender={onRefresh}
                  showRegister={setAddPetPressed}
                />}
            </View>

            {proData && (
              <ProfessionalProfile
                data={proData}
                onRatingPress={moveToRating}
              />)}
            {myPets.length > 0 && (
              <View>
                <PetHeading />
                <PetSlider
                  arr={myPets}
                  onPress={handlePetFilter}
                  setRender={onRefresh}
                />
                {selectedPetData &&
                  <View style={styles.selectedPet}>
                    <RegularText text={selectedPetData} />
                  </View>
                }
              </View>
            )}
            <AddPost

              onPress={() => {
                navigation.navigate("profile-post", { myPets });
              }}
            />
            <View style={styles.postsArea}>

              <PostSlider
                arr={myPosts}
                onImgPress={() => { }}
                setRender={onRefresh}
              />
            </View>
          </View>
        ) : (
          <EmptyCard
            text={"הייתה בעיה למצוא את הפרופיל לצערנו"}
            iconName={"sad-outline"}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectedPet: {
    borderRadius: 15, marginBottom: 20, padding: 10, marginHorizontal: 20, borderWidth: 2, backgroundColor: colorPalate.primaryLightx, borderColor: colorPalate.primary, alignItems: "center"
  },
  container: {
    marginTop: 1,
    flex: 1,
  },
  heading: {

    width: 150,
    height: 70,
    resizeMode: "contain",
  },
  postsArea: {
    width: "100%",
    backgroundColor: colorPalate.lightGrey,
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  followingContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "flex-end",
    paddingBottom: 20,
    gap: 30,
  },
  profileImage: {
    width: 78,
    height: 78,
    resizeMode: "cover",
    borderRadius: 80,
    marginBottom: 3,
    marginTop: 3,
    borderWidth:0.1,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 15,
    paddingHorizontal: 29,
  },
  buttonView: {
    flex: 1,
    padding: 8,
  },
  buttonItem: {
    flex: 1,
    alignItems: "center",
  },
});

export default ProfileScreen;
