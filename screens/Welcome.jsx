import { COLORS, FONTS, SIZES, icons } from "../constants";
import { Image, Text, TouchableOpacity, View } from "react-native";

import React from "react";

const Welcome = ({navigation}) => {


    const handelPress = () =>{

        navigation.navigate("MainLayout")
    }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.black,
      }}
    >
      <Image source={icons.logo} />
      <Text
        style={{
          ...FONTS.body2,
          marginTop: SIZES.padding / 2,
          color: COLORS.white,
        }}
      >
        GoCrypto
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.btn,
          borderRadius: SIZES.radius+10,
          marginTop: SIZES.padding + 24,
          padding:SIZES.padding - 14,
          paddingRight: SIZES.padding + 14,
          paddingLeft: SIZES.padding + 14,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handelPress}
      >
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.white,
          }}
        >
          Start
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
