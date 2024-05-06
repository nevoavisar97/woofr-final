import React, { useState,useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";

// Custom components
import EmptyCard from "../../cards/empty-card/empty-card";
import PetCard from "../../cards/pet-card/pet-card";

const PetSlider = ({ arr, onPress, setRender }) => {
  const [clickedPetId, setClickedPetId] = useState(null);
  

  const handlePetPress = (petId,data) => {
    if (petId === clickedPetId) {
      setClickedPetId(null); // Clicking again on the same pet card removes the border and deselects the pet
      // Call the onPress function with "none" as the pet ID to indicate deselection
      onPress("none");
    } else {
      setClickedPetId(petId); // Clicking on a different pet card sets it as clicked
      // Call the onPress function with the pet ID
      onPress(petId,data);
    }
  };
  const renderPetItem = ({ item }) => {
    return (
      <PetCard
        key={item.id}
        data={item}
        onPress={() => handlePetPress(item.id,item)}
        setRender={setRender}
        isClicked={item.id === clickedPetId} // Pass whether this pet is clicked
      />
    );
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.container}>
        {arr.length > 0 ? (
          <FlatList
            horizontal={true} // Set horizontal prop to true
            keyExtractor={(item) => item.id}
            data={arr}
            renderItem={({ item }) => renderPetItem({ item })}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <EmptyCard text={"אין ביקורות שניתן להציג כרגע..."} iconName="bug" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 0,
    width: "100%",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PetSlider;
