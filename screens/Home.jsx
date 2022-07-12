import { COLORS, FONTS, SIZES, dummyData, icons } from "../constants";
import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { getCoinMarket, getHoldings } from "../stores/market/marketActions";

import {BalanceInfo} from '../components'
import { MainLayout } from "./";
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {
  useFocusEffect(
    useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
      getCoinMarket();
    }, [])
  );

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
          displayAmount="45,000"
          changePct = {2.30}
          containerStyle={{
            marginTop:18
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
        {/* header wallet info */}
        {renderWalletInfoSection()}

        {/* chart  */}

        {/* top currency  */}
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
