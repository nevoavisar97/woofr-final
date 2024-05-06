import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";

//Import navigation handler
import { useNavigation } from "@react-navigation/native";

//Redux state management
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

// Importing the getVets function from the API utilities
import { getPros } from "../../utils/api/pro";

// Importing the colorPalate from the UI utilities
import { colorPalate } from "../../utils/ui/colors";

//Custom components
import ProfessionalSlider from "../../components/scroll/professional-slider/professional-slider";
import GoBackButton from "../../components/buttons/go-back/go-back-button";
import ProfessionalFilter from "../../components/inputs/professional-filter/professional-filter";
import CollapseButton from "../../components/buttons/collapse-button/collapse-button";
import RegularTextBold from "../../components/texts/regular-text/regular-text-bold";
import RegularButtonFullW from "../../components/buttons/regular-button/regular-button-full";

const ProfessionalsScreen = () => {
  //Navigation handler
  const navigation = useNavigation();

  // Use useSelector to access the Redux store state
  const auth = useSelector(selectAuth);
  const myUser = JSON.parse(auth.user);

  // Initialize state for storing the user's posts
  const [pros, setPros] = useState([]);

  //Show filter state
  const [showFilters, setShowFilters] = useState(false);

  // State for filtering results based on various criteria
  const [resultsFilter, setResultsFilter] = useState({
    id: "string",
    userId: "string",
    displayName: "string",
    address: "string",
    phone: "string",
    profileImage: "string",
    description: "string",
    type: null,
    ratingScore: 0,
    availability24_7: null,
    sellsProducts: null,
    toHome: null,
    notes: "string",
    verificationStatus: "string",
    activeWoofr: true,
    city: null,
  });

  //fetch posts to display on homepage
  const fetchPros = async () => {
    const res = await getPros(resultsFilter);
    setPros(res);
  };

  //Function to move to profile
  const moveToProfile = (id) => {
    if (myUser.id !== id) {
      navigation.navigate("home-profile", { id: id });
    } else {
      navigation.navigate("profile-stack");
    }
  };

  //Function to move to profile
  const moveToRating = (data) => {
    navigation.navigate("home-rating", { data: data });
  };

  // useEffect hook to fetch posts when the refreshing state changes
  useEffect(() => {
    fetchPros();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <GoBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View>
          <RegularTextBold text={"woofr Pros - התחברו למומחים"} />
        </View>
      </View>

      {showFilters && (
        <>
          <>
            <ProfessionalFilter data={resultsFilter} setData={setResultsFilter} />
          </>
          <View style={styles.buttonContainer}>
            <RegularButtonFullW
              text={"סינון תוצאות"}
              iconName={"search-outline"}
              color={colorPalate.lightGrey}
              onPress={fetchPros}
            />
          </View>
        </>
      )}

      <CollapseButton
        value={showFilters}
        setValue={setShowFilters}
        text={showFilters ? "הסתר פילטרים" : "סינון תוצאות"}
      />

      <ScrollView nestedScrollEnabled={true} style={styles.container}>
        {pros.length > 0 && (
          <ProfessionalSlider
            arr={pros}
            onCardPress={moveToProfile}
            onRatingPress={moveToRating}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colorPalate.lightGrey,
  },
  buttonContainer: {
    zIndex: 500,
    marginTop: 50,
    padding: 4,
    margin: 4,
  },
});

export default ProfessionalsScreen;
