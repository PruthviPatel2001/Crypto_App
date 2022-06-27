import { COLORS, SIZES, icons } from "../constants";

import React from "react";
import { View } from "react-native";

const MainLayout = ({ children }) => {
  return <View style={{ flex: 1 }}>{children}</View>;
};

export default MainLayout;
