import { BalanceInfo, Chart } from "../components";
import { COLORS, FONTS, SIZES, dummyData, icons } from "../constants";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";

import { MainLayout } from "./";
import { connect } from "react-redux";
import { getHoldings } from "../stores/market/marketActions";
import { useFocusEffect } from "@react-navigation/native";

const Portfolio = ({ getHoldings, myHoldings }) => {

  const [SelectedCoin, setSelectedCoin] = useState(null);

  const handleSelectedCoin = (item) => {
    setSelectedCoin(item);
  };


  useFocusEffect(
    useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
    }, [])
  );


  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);

  let valueChagne = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );

  let perChange = (valueChagne / (totalWallet - valueChagne)) * 100;

  function renderCurrentBalanceSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        <Text
          style={{
            marginTop: 50,
            color: COLORS.white,
            ...FONTS.largeTitle,
          }}
        >
          Portfolio
        </Text>
        <BalanceInfo
          title="Current holding"
          displayAmount={totalWallet}
          changePct={perChange}
          containerStyle={{
            marginTop: SIZES.radius,
            marginBottom: SIZES.padding,
          }}
        />
      </View>
    );
  }

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {/* current balance*/}

        {renderCurrentBalanceSection()}

        {/* Chart */}
        <Chart
          containerStyle={{
            marginTop: SIZES.radius + 2,
          }}
          chartPrices={
            SelectedCoin
              ? SelectedCoin?.sparkline_in_7d.value
              : myHoldings[0]?.sparkline_in_7d?.value
          }
        />

        {/* myholding */}

        <FlatList
          data={myHoldings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding / 2,
          }}
          ListHeaderComponent={
            <View style={{ marginBottom: SIZES.radius }}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h2,
                }}
              >
                Present Holdings
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.radius,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                  }}
                >
                  Assest
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: "right",
                  }}
                >
                  Price
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: "right",
                  }}
                >
                  Holdings
                </Text>
              </View>
            </View>
          }
          renderItem={({ item }) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency == 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;

            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  height: 55,
                }}
                onPress={()=>handleSelectedCoin(item)}
              >
                <View
                  style={{
                    flex: 1,
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
                      color: COLORS.white,
                      ...FONTS.h3,
                      marginLeft: SIZES.radius,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
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
                            item.price_change_percentage_7d_in_currency > 0
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
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'right',
                      color:COLORS.white,
                      ...FONTS.h4,
                    }}
                  >
                    ${item.total.toLocaleString()}
                  </Text>

                  <Text
                   style={{
                    textAlign: 'right',
                      color:COLORS.lightGray3,
                      ...FONTS.body5,
                   }}
                  >
                 {item.qty} {item.symbol.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePer,
      perPage,
      page
    ) => {
      return dispatch(
        getHoldings(
          holdings,
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePer,
          perPage,
          page
        )
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
