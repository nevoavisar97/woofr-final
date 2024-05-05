import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

const LottieAnimation = ({ lottieSource, width = 200, height = 200 }) => {
  const animation = useRef(null);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: width,
          height: height,
        }}
        source={lottieSource}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});

export default LottieAnimation;
