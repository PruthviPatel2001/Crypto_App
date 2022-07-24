import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  dummyData,
  icons,
} from "../constants";
import { HeaderBar, TextButton } from "../components";
import React, { useCallback, useRef, useState } from "react";

import { FlatList } from "react-native-gesture-handler";
import { LineChart } from "react-native-chart-kit";
import { MainLayout } from "./";
import { connect } from "react-redux";
import { getCoinMarket } from "../stores/market/marketActions";
import { measure } from "react-native-reanimated";
import { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

const marketTabs = constants.marketTabs.map((marketTabs) => ({
  ...marketTabs,
  ref: React.createRef(),
}));

const TabIndicator = ({ MeasureLayout, scrollX }) => {
  const inputRange = marketTabs.map((_, i) => i * SIZES.width);

  const translateX = scrollX.inpterPolate({
    inputRange,
    outputRange: MeasureLayout.map((measure) => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        height: "100%",
        width: (SIZES.width - Animated(SIZES.radius * 2)) / 2,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const Tabs = ({ onMarketTabPress,scrollX }) => {
  const [MeasureLayout, SetMeasureLayout] = useState([]);

  const containerRef = useRef();

  useEffect(() => {
    let ml = [];
    marketTabs.forEach((marketTabs) => {
      marketTabs?.ref?.current?.MeasureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({
            x,
            y,
            width,
            height,
          });

          if (ml.length === marketTabs.length) {
            SetMeasureLayout(ml);
          }
        }
      );
    });
  }, [containerRef.current]);

  return (
    <View
      ref={containerRef}
      style={{
        flexDirection: "row",
      }}
    >
      {/* Tab indicator */}

      {MeasureLayout.length > 0 && (
        <TabIndicator MeasureLayout={MeasureLayout} scrollX={scrollX} />
      )}

      {marketTabs.map((item, i) => {
        return (
          <TouchableOpacity
            key={`MarketTab-${i}`}
            style={{
              flex: 1,
            }}
            onPress={()=>onMarketTabPress(index)}
          >
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 15,
                alignItems: "center",
                justifyContent: "center",
                height: 40,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                }}
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Market = ({ getCoinMarket, coins }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const marketTabScrollViewRef = useRef();

  const onMarketTabPress = useCallback(marketTabsIndex =>{
    marketTabScrollViewRef?.current?.scrollToOffset({
      offSet:marketTabsIndex * SIZES.width
    })
  })

  useEffect(() => {
    getCoinMarket();
  }, []);

  const renderTabBar = () => {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray,
        }}
      >
        <Tabs 
         scrollX={scrollX}
         onMarketTabPress={onMarketTabPress}
         />
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
        }}
      >
        <TextButton label="USD" />
        <TextButton
          label="%(7d)"
          containerStyle={{
            marginLeft: SIZES.base,
          }}
        />
        <TextButton
          label="Top"
          containerStyle={{
            marginLeft: SIZES.base,
          }}
        />
      </View>
    );
  };

  const renderList = () => {
    return (
      <Animated.FlatList
        ref={marketTabScrollViewRef}
        data={marketTabs}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        renderItem={({ item, i }) => {
          return (
            <View
              style={{
                flex: 1,
                width: SIZES.width,
              }}
            >
              <FlatList
                data={coins}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  let priceColor =
                    item.price_change_percentage_7d_in_currency == 0
                      ? COLORS.lightGray3
                      : item.price_change_percentage_7d_in_currency > 0
                      ? COLORS.lightGreen
                      : COLORS.red;

                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: SIZES.padding,
                        marginBottom: SIZES.radius,
                      }}
                    >
                      {/* coins */}
                      <View
                        style={{
                          flex: 1.5,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={{
                            height: 20,
                            width: 20,
                          }}
                        />
                        <Text
                          style={{
                            marginLeft: SIZES.radius,
                            color: COLORS.white,
                            ...FONTS.h3,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>

                      {/* chart */}
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                        }}
                      >
                        <LineChart
                          withHorizontalLabels={false}
                          withVerticalLabels={false}
                          withDots={false}
                          withInnerLines={false}
                          withVerticalLines={false}
                          withOuterLines={false}
                          data={{
                            datasets: [
                              {
                                data: item.sparkline_in_7d.price,
                              },
                            ],
                          }}
                          width={100}
                          height={60}
                          chartConfig={{
                            color: () => priceColor,
                          }}
                          bezier
                          style={{
                            paddingRight: 0,
                          }}
                        />
                      </View>

                      {/* price */}
                      <View
                        style={{
                          flex: 1,
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "right",
                            color: COLORS.white,
                            ...FONTS.h4,
                            lineHeight: 15,
                          }}
                        >
                          ${item.current_price.toLocaleString()}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          {item.price_change_percentage_7d_in_currency != 0 && (
                            <Image
                              source={icons.upArrow}
                              style={{
                                height: 10,
                                width: 10,
                                tintColor: priceColor,
                                transform:
                                  item.price_change_percentage_7d_in_currency >
                                  0
                                    ? [{ rotate: "45deg" }]
                                    : [{ rotate: "12deg" }],
                              }}
                            />
                          )}
                          <Text
                            style={{
                              marginLeft: 5,
                              color: priceColor,
                              ...FONTS.body5,
                              lineHeight: 15,
                            }}
                          >
                            {item.price_change_percentage_7d_in_currency.toFixed(
                              2
                            )}
                            %
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    );
  };

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        <HeaderBar title="Market" />

        {renderTabBar()}

        {renderButtons()}

        {renderList()}
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // For coins
    getCoinMarket: (
      currency,
      sparkline,
      coinList,
      orderBy,
      priceChangePer,
      perPage,
      page
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          sparkline,
          coinList,
          orderBy,
          priceChangePer,
          perPage,
          page
        )
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Market);
