import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

//Custom Components
import RegularText from "../../texts/regular-text/regular-text";
import SmallText from "../../texts/small-text/small-text";
import RatingBar from "../rating-bar/rating-bar";

const ProfessionalCard = ({ data, onCardPress, onRatingPress }) => {
  const [proData, setProData] = useState({
    id: "string",
    displayName: "string",
    address: "string",
    phone: "string",
    profileImage: "string",
    description: "string",
    type: "string",
    ratingScore: 0,
    availability24_7: true,
    sellsProducts: true,
    toHome: true,
    notes: "string",
    verificationStatus: "string",
    activeWoofr: true,
    city: "string",
    userId: "string",
  });

  //Function to fetch the professional information
  const fetchProInfo = async () => {
    setProData(data);
  };

  // Fetch professional information on component mount
  useEffect(() => {
    fetchProInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => {
            onCardPress(data.userId);
          }}
        >
          <Image
            source={{
              uri: proData.profileImage,
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <RegularText
            text={`${proData.displayName}`}
            style={styles.username}
          />
          <RegularText text={`${proData.type}`} style={styles.bottomText} />
          <SmallText
            text={`${proData.city}, ${proData.address} ${proData.phone}`}
            style={styles.infoText}
          />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <SmallText text={proData.description} style={styles.descriptionText} />
      </View>
      <TouchableOpacity
        onPress={() => {
          onRatingPress(proData);
        }}
      >
        <RatingBar disabled={true} rating={proData.ratingScore} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 25,
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
    marginBottom: 5,
  },
  descriptionText: {
    marginBottom: 10,
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

export default ProfessionalCard;
