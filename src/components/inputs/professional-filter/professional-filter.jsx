import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import DropDownPicker from "react-native-dropdown-picker";

import { colorPalate } from "../../../utils/ui/colors";

import { types } from "../../../utils/data/types";

// Custom components
import SmallText from "../../texts/small-text/small-text";
import Checkbox from "expo-checkbox";
import CustomTextInput from "../../inputs/custom-text-input/custom-text-input";
import RatingBar from "../../cards/rating-bar/rating-bar";

const ProfessionalFilter = ({ data, setData }) => {
  // State for managing the visibility of the dropdown
  const [openDropdown, setOpenDropdown] = useState(false);

  // Width for the form
  const formWidth = 130;

  // Update the data object with the new property and value
  const handleCheckBox = (prop, value) => {
    setData({ ...data, [prop]: value });
  };

  return (
    <View style={[styles.container, { flex: openDropdown ? 1.3 : 0 }]}>
      <View style={styles.row}>
        <View style={styles.col}>
          <SmallText text={"זמינות 24/7"} />
          <Checkbox
            value={data.availability24_7 || false}
            color={colorPalate.primary}
            onValueChange={(value) => {
              handleCheckBox("availability24_7", value);
            }}
          />
        </View>

        <View style={styles.col}>
          <SmallText text={"מכירת מוצרים"} />
          <Checkbox
            value={data.sellsProducts || false}
            color={colorPalate.primary}
            onValueChange={(value) => {
              handleCheckBox("sellsProducts", value);
            }}
          />
        </View>
        <View style={styles.col}>
          <SmallText text={"עד בית הלקוח"} />
          <Checkbox
            value={data.toHome || false}
            color={colorPalate.primary}
            onValueChange={(value) => {
              handleCheckBox("toHome", value);
            }}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.selectRow}>
          <CustomTextInput
            height={48}
            value={data.city}
            placeholder="עיר "
            style={styles.input}
            width={formWidth}
            onChangeText={(value) => {
              setData({ ...data, city: value });
            }}
          />
          <View>
            <DropDownPicker
              open={openDropdown}
              value={data.type ? data.type : null}
              items={types}
              setOpen={setOpenDropdown}
              placeholder="בחר מקצוע"
              style={[styles.dropdown, { borderColor: colorPalate.grey, borderWidth: 1}]}
              containerStyle={styles.dropdownContainerStyle}
              dropDownDirection="BOTTOM"
              listMode="SCROLLVIEW"
              textStyle={{ textAlign: 'left' }}
              dropDownContainerStyle={{ borderColor: colorPalate.grey, borderWidth: 1}}
              onSelectItem={(item) => {
                setData({ ...data, type: item.value });
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    padding: 6,
  },
  row: {
    marginTop: 5,
    padding: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  col: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  selectRow: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  dropdown: {
    zIndex: 999,
  },
  dropdownContainerStyle: {
    borderRadius: 10,
    width: 200,
    zIndex:10000,
  },
});

export default ProfessionalFilter;
