import { COLORS, FONTS, SIZES, dummyData, icons } from "../constants";
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { HeaderBar } from "../components";
import { MainLayout } from "./";
import React from "react";
import { useState } from "react";

const SectionTitle = ({ title }) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
      }}
    >
      <Text
        style={{
          color: COLORS.lightGray,
          ...FONTS.h4,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const Setting = ({ title, value, type, onPress }) => {
  if (type == "button") {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
        }}
        onPress={onPress}
      >
        <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h3 }}>
          {title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.lightGray3,
              ...FONTS.h3,
              marginRight: SIZES.radius,
            }}
          >
            {value}
          </Text>
          <Image
            source={icons.rightArrow}
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.white,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            flex: 1,
            color: COLORS.white,
            ...FONTS.h3,
          }}
        >
          {title}
        </Text>
        <Switch value={value} onValueChange={(value) => onPress(value)} />
      </View>
    );
  }
};

const Profile = () => {

  const [FaceId, setFaceId] = useState(true);

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.black,
        }}
      >
        <HeaderBar title="Profile" />

        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.radius,
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                }}
              >
                {dummyData.profile.email}
              </Text>
              <Text
                style={{
                  color: COLORS.lightGray3,
                  ...FONTS.body4,
                }}
              >
                {dummyData.profile.id}
              </Text>
            </View>
            <Image
              source={icons.verified}
              style={{
                height: 25,
                width: 25,
              }}
            />
            <Text
              style={{
                marginLeft: SIZES.base,
                color: COLORS.lightGreen,
                ...FONTS.body4,
              }}
            >
              Verified
            </Text>
          </View>
          <SectionTitle title="App" />
          <Setting
            title="Launch Screen"
            value="Home"
            type="button"
            onPress={() => console.log("Press")}
          />
          <Setting
            title="Apperance"
            value="Dark"
            type="button"
            onPress={() => console.log("Press")}
          />
          <SectionTitle title="Account" />

          <Setting
            title="Payment Currency "
            value="USD"
            type="button"
            onPress={() => console.log("Press")}
          />
          <Setting
            title="Language"
            value="English"
            type="button"
            onPress={() => console.log("Press")}
          />
          <SectionTitle title="Security" />
          <Setting
            title="Face ID"
            value={FaceId}
            type="switch"
            onPress={(value) => setFaceId(value)}
          />
          <Setting
            title="Password"
            value=""
            type="button"
            onPress={() => console.log("Press")}
          />
          <Setting
            title="Change Password"
            value=""
            type="button"
            onPress={() => console.log("Press")}
          />
           <Setting
            title="Two-Factor Authentication"
            value=""
            type="button"
            onPress={() => console.log("Press")}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default Profile;
