import { BalanceInfo, Chart, IconTextButton } from "../components";
import { COLORS, FONTS, SIZES, dummyData, icons } from "../constants";
import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { getCoinMarket, getHoldings } from "../stores/market/marketActions";

import { FlatList } from "react-native-gesture-handler";
import { MainLayout } from "./";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {
  const [SelectedCoin, setSelectedCoin] = useState(null);

  const handleSelectedCoin = (item) => {
    setSelectedCoin(item);
  };

  useFocusEffect(
    useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
      getCoinMarket();
    }, [])
  );

  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);

  let valueChagne = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );

  let perChange = (valueChagne / (totalWallet - valueChagne)) * 100;

  function renderWalletInfoSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        {/* Balance info */}
        <BalanceInfo
          title="Your Wallet"
          displayAmount={totalWallet}
          changePct={perChange}
          containerStyle={{
            marginTop: 45,
          }}
        />
        {/* Buttons  */}

        <View
          style={{
            flexDirection: "row",
            marginTop: 25,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <IconTextButton
            label="Transfer"
            icon={icons.send}
            containerStyle={{ flex: 1, height: 40, marginRight: SIZES.radius }}
            onPress={() => console.log("transfer")}
          />

          <IconTextButton
            label="Withdraw"
            icon={icons.withdraw}
            containerStyle={{ flex: 1, height: 40, marginRight: SIZES.radius }}
            onPress={() => console.log("Withdraw")}
          />
        </View>
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
        {/* header wallet info */}
        {renderWalletInfoSection()}

        {/* chart  */}
        <Chart
          containerStyle={{
            marginTop: SIZES.padding * 2,
            marginBottom: SIZES.padding + 4,
          }}
          chartPrices={
            SelectedCoin
              ? SelectedCoin?.sparkline_in_7d.price
              : coins[0]?.sparkline_in_7d.price
          }
        />

        {/* top currency  */}
        <FlatList
          data={coins}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding / 2,
          }}
          ListHeaderComponent={
            <View style={{ marginBottom: SIZES.radius }}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                  fontSize: 18,
                }}
              >
                Top Cryptocurrency
              </Text>
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
                  height: 55,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => handleSelectedCoin(item)}
              >
                <View style={{ width: 35 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                </View>

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
                    {item.name}
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}
                  >
                    ${item.current_price}
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
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={
            <View
              style={{
                marginBottom: 50,
              }}
            />
          }
        />
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// export default Home;
