import { Animated, View } from "react-native";
import { COLORS, SIZES, icons } from "../constants";
import React, { useEffect, useRef } from "react";

import { IconTextButton } from "../components";
import { connect } from "react-redux";

const MainLayout = ({ children, isTradeModalVisible }) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;


  // For Animation
  useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isTradeModalVisible]);

  // For Animation
  const modalY= modalAnimatedValue.interpolate({
    inputRange:[0,1],
    outputRange:[SIZES.height,SIZES.height-250]
  })

  return (
    <View style={{ flex: 1 }}>

      {children}

      {isTradeModalVisible && 
       
       <Animated.View 
          
          style={{
            position:'absolute',
            top:0,
            left:0,
            right:0,
            bottom:0,
            backgroundColor:COLORS.transparentBlack
          }}

          opacity ={modalAnimatedValue}

       />


      }

      <Animated.View
        style={{
          position:"absolute",
          left: 0,
          top:modalY,
          width: "100%",
          padding: SIZES.padding,
          backgroundColor: COLORS.primary,
        }}
      >
        <IconTextButton
          label="Transfer"
          icon={icons.send}
          onPress={() => console.log("transfer")}
        />
        <IconTextButton
          label="Withdraw"
          icon={icons.withdraw}
          containerStyle={{
            marginTop: SIZES.base,
          }}
          onPress={() => console.log("Withdraw")}
        />
      </Animated.View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    isTradeModalVisible: state.tabReducer.isTradeModalVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
