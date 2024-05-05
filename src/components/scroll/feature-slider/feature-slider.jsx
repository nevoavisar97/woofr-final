import { Animated, FlatList, View } from "react-native";
import React, { useRef } from "react";

//Import custom component
import FeatureCard from "../../cards/feature-card/feature-card";

//Import data for the list view
import { features } from "../../../utils/data/features";

const FeatureSlider = ({ setIndex, scrollX }) => {
  // Animate the scrollX value based on the content offset
  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  // Function to handle changes in viewable items
  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    setIndex(viewableItems[0].index);
  }).current;

  // Configuration for determining viewability
  const viewAbilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={{ flex: 0.8 }}>
      <FlatList
        data={features}
        renderItem={({ item }) => <FeatureCard feature={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewAbilityConfig}
      />
    </View>
  );
};

export default FeatureSlider;
