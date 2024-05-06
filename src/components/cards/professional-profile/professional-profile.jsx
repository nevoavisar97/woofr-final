import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

// Import Ionicons from Expo vector icons
import { Ionicons } from "@expo/vector-icons";

// Import colorPalate from utils/ui/colors
import { colorPalate } from "../../../utils/ui/colors";
import { Linking } from "react-native";

//Custom Components
import RegularText from "../../texts/regular-text/regular-text";
import SmallText from "../../texts/small-text/small-text";
import RatingBar from "../rating-bar/rating-bar";
import ProfessionalCheckbox from "../professional-checkbox/professional-checkbox";
import RegularTextBold from "../../texts/regular-text/regular-text-bold";
import RegularText1 from "../../texts/regular-text/regular-text1";
import RegularButtonFullW from "../../buttons/regular-button/regular-button-full";
import RegularButton from "../../buttons/regular-button/regular-button";

const ProfessionalProfile = ({ data, onRatingPress }) => {
  const [proData, setProData] = useState(data);

  const fetchProInfo = async () => {
    setProData(data);
  };

  useEffect(() => {
    fetchProInfo();
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={{
        borderBottomWidth:1,borderBottomColor:colorPalate.lightGrey
        ,backgroundColor: colorPalate.primaryLightx,padding:10, borderTopLeftRadius: 20,borderTopRightRadius:20}}>
        <RegularTextBold
          text={`${proData.displayName} | ${proData.type}`}
          style={styles.username}
        />
      </View>
      <View style={styles.infoContainer}>

        <View style={styles.infoRow}>
          <Ionicons name="home-outline" color={colorPalate.primary} size={18} />
          <RegularText text={`${proData.city}, ${proData.address}`} />
        </View>
        <RegularButton
          color={colorPalate.primary}
          text={`${proData.phone}`}
          iconName={"call-outline"}
          onPress={() => {
            Linking.openURL(`tel:${proData.phone}`);
          }} />
        <ProfessionalCheckbox
          availability={proData.availability24_7}
          sells={proData.sellsProducts}
          toHome={proData.toHome}
        />
        <RegularText text={``} style={styles.bottomText} />
        <View style={{ marginBottom: 15 }}>
          <RegularText1
            text={proData.description}
            style={styles.descriptionText}
          />
        </View>
        <View style={styles.bottomContainer}>
          <SmallText
            text={proData.notes}
            style={styles.descriptionText}
          />
        </View>

        <TouchableOpacity
        style={{marginBottom:20}}
          onPress={() => {
            onRatingPress(data);
          }}
        >
          <RatingBar disabled={true} rating={proData.ratingScore} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "93%",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colorPalate.primaryLight,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 0,
  },
  userInfo: {
    flex: 1,
  },
  username: {

    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
    color: "#888",
  },
  infoRow: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  infoRow1: {
    flexDirection: "row",
  },

  bottomContainer: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 8,
  },
  bottomText: {
    marginBottom: 5,
  },
});

export default ProfessionalProfile;
