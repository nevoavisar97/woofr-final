import React, { useState, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import RegularText from "../../texts/regular-text/regular-text";
import { colorPalate } from "../../../utils/ui/colors";

const PetCard = ({ data, onPress, setRender, isClicked }) => {
  const [selected, setSelected] = useState(false);

  const handlePetPress = (petId) => {
    // Toggle the selected state if the same card is clicked again
    setSelected(selected ? false : true);
    // Call the onPress function with the pet ID
    onPress(petId,data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => handlePetPress(data.id)}
        >
          <Image
            source={{ uri: data.imageUrl }}
            style={[styles.avatar, (isClicked) && styles.clickedAvatar]}
          />
          <RegularText text={`${data.name}`} style={styles.username} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    padding: 8,
  },
  header: {
    padding: 6,
    flexDirection: "row",
  },
  avatarContainer: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  clickedAvatar: {
    borderColor: colorPalate.primary,
    borderWidth: 5,
  },
  username: {
    marginBottom: 3,
  },
});

export default PetCard;
