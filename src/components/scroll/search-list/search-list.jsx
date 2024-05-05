import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

//Custom components
import UserCard from "../../cards/user-card/user-card";

const SearchList = ({ users, onClick, disable = false }) => {
  if (users == null) return null;

  //Function to render user card
  const renderUserItem = ({ item, index }) => (
    <UserCard key={index} data={item} onClick={onClick} disable={disable} />
  );

  return users.length > 0 ? (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={true}
        keyExtractor={(item) => item.id.toString()}
        data={users}
        renderItem={({ item, index }) => renderUserItem({ item, index })}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 20,
  },
});

export default SearchList;
