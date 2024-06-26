import { COLORS, FONTS } from "../constants";
import { Image, Text, View } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import React from "react";

const TabIcon = ({ focused, icon, iconStyle, label, isTrade }) => {
  if (isTrade) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 70,
          height: 70,
          borderRadius: 50,
          backgroundColor: COLORS.black,
        }}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor:COLORS.white ,
            ...iconStyle,
          }}
        />
        <Text
          style={{
            color:  Colors.white ,
            ...FONTS.h4,
          }}
        >
          {label}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: focused ? COLORS.white : COLORS.secondary,
            ...iconStyle,
          }}
        />
        <Text
          style={{
            color: focused ? COLORS.white : COLORS.secondary,
            ...FONTS.h4,
          }}
        >
          {label}
        </Text>
      </View>
    );
  }
};

export default TabIcon;
