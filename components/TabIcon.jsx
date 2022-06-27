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
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: COLORS.black,
        }}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: focused ? COLORS.white : Colors.secondary,
            ...iconStyle,
          }}
        />
        <Text
          style={{
            color: focused ? Colors.white : Colors.secondary,
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
            tintColor: focused ? COLORS.white : Colors.secondary,
            ...iconStyle,
          }}
        />
        <Text
          style={{
            color: focused ? Colors.white : Colors.secondary,
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
