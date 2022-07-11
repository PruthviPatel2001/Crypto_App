import { COLORS, icons } from "../constants";
import { Home, Market, Portfolio, Profile } from "../screens";

import React from "react";
import { TabIcon } from "../components";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { setTradeModelVisibilty } from "../stores/tab/tabActions";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

const Tabs = ({ setTradeModelVisibilty, isTradeModalVisible }) => {
  function tradeTabButtonClickHandler() {
    setTradeModelVisibilty(!isTradeModalVisible);
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 100,
          backgroundColor: COLORS.primary,
          borderTopColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon focused={focused} icon={icons.home} label="Home" />
              );
            }
          },
        }}
        listeners={{
          tabPress:e=>{
            if (isTradeModalVisible) {
              e.preventDefault()
            }
          }
        }}
      />

      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.briefcase}
                  label="Portfolio"
                />
              );
            }
          },
        }}
        listeners={{
          tabPress:e=>{
            if (isTradeModalVisible) {
              e.preventDefault()
            }
          }
        }}
      />

      <Tab.Screen
        name="Trade"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                icon={isTradeModalVisible? icons.close : icons.trade}
                iconStyle={isTradeModalVisible ? {
                  height: 15,
                  with:15
                }:null}
                label="Trade"
                isTrade={true}
              />
            );
          },
          tabBarButton: (props) => (
            <TabBarCustomButton
              {...props}
              onPress={() => tradeTabButtonClickHandler()}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon focused={focused} icon={icons.market} label="Market" />
              );
            }
          },
        }}
        listeners={{
          tabPress:e=>{
            if (isTradeModalVisible) {
              e.preventDefault()
            }
          }
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.profile}
                  label="Profile"
                />
              );
            }
          },
        }}
        listeners={{
          tabPress:e=>{
            if (isTradeModalVisible) {
              e.preventDefault()
            }
          }
        }}
      />
    </Tab.Navigator>
  );
};

function mapStateToProps(state) {
  return {
    isTradeModalVisible: state.tabReducer.isTradeModalVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTradeModelVisibilty: (isVisible) => {
      return dispatch(setTradeModelVisibilty(isVisible));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
