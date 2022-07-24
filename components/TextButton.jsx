import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  dummyData,
  icons,
} from "../constants";
import { Text, TouchableOpacity, View } from "react-native";

import React from "react";

const TextButton = ({ label, containerStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 3,
        paddingHorizontal: 18,
        borderRadius: 15,
        backgroundColor:COLORS.gray1,
        ...containerStyle
      }}
    >

    <Text
    style={{
        color:COLORS.white,
        ...FONTS.h3
    }}
    >
        {label}
    </Text>

    </TouchableOpacity>
  );
};

export default TextButton;
