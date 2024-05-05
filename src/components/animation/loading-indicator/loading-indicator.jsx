import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

const LoadingIndicator = () => {
  return (
    <View style={[styles.container, styles.loadingContainer]}>
      <ActivityIndicator size="large" color="#565AC8" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingIndicator;
