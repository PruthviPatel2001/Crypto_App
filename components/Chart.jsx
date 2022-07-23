import { COLORS, FONTS, SIZES } from "../constants";
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
} from "@rainbow-me/animated-charts";
import { Text, View } from "react-native";

import React from "react";
import moment from "moment";

const Chart = ({ containerStyle, chartPrices }) => {
  let StartUnixTimeStamp = moment().subtract(7, "day").unix();
  let data = chartPrices
    ? chartPrices?.map((item, i) => {
        return {
          x: StartUnixTimeStamp + (i + 1) * 3600,
          y: item,
        };
      })
    : [];

  let points = monotoneCubicInterpolation({ data, range: 40 });

  const formatUSD = (value) => {
    "worklet";

    if (value === "") {
    }

    return `$${Number(value).toFixed(2)}`;
  };

  const formatDateTime = (value) => {
    "worklet";

    if (value === "") {
    }

    var selectedDate = new Date(value * 1000);

    let date = `0${selectedDate.getDate()}`.slice(-2);
    let month = `0${selectedDate.getMonth()}`.slice(-2);

    return `${date}/${month}`;
  };

  const formatNumber = (value, roundingPoint) => {
    if (value > 1e9) {
      return `${(value / 1e9).toFixed(roundingPoint)}B`;
    } else if (value > 1e6) {
      return `${(value / 1e6).toFixed(roundingPoint)}M`;
    } else if (value > 1e3) {
      return `${(value / 1e3).toFixed(roundingPoint)}K`;
    } else {
      return value.toFixed(roundingPoint);
    }
  };

  const getYAxisLabelValues = () => {
    if (chartPrices != undefined) {
      let minValue = Math.min(...chartPrices);
      let maxValue = Math.max(...chartPrices);

      let midValue = (minValue + maxValue) / 2;

      let higherMidValue = (maxValue + midValue) / 2;

      let lowerMidValue = (minValue + midValue) / 2;

      let roundingPoint = 2;

      return [
        formatNumber(maxValue, roundingPoint),
        formatNumber(higherMidValue, roundingPoint),
        formatNumber(lowerMidValue, roundingPoint),
        formatNumber(minValue, roundingPoint),
      ];
    } else {
      return [];
    }
  };

  return (
    <View style={{ ...containerStyle }}>
      {/* <Text style={{ color: COLORS.white }}>Chart</Text> */}
      {/* Y axis label */}

      <View
        style={{
          position: "absolute",
          left: SIZES.padding /2,
          top: 0,
          bottom: 0,
          justifyContent: "space-between",
        }}
      >
        {getYAxisLabelValues().map((item, i) => {
          return (
            <Text
              key={i}
              style={{
                color: COLORS.lightGray3,
                ...FONTS.h4,
              }}
            >
              {item}
            </Text>
          );
        })}
      </View>

      {/* chart  */}
      {data.length > 0 && (
        <ChartPathProvider
          data={{
            points,
            smoothingStrategy: "bezier",
          }}
        >
          <ChartPath
            height={150}
            width={SIZES.width}
            stroke={COLORS.lightGreen}
            strokeWidth={2}
          />

          <ChartDot>
            <View
              style={{
                position: "absolute",
                left: -35,
                width: 80,
                alignItems: "center",
                // backgroundColor: COLORS.transparentBlack,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 25,
                  height: 25,
                  backgroundColor: COLORS.white,
                  borderRadius: SIZES.radius,
                }}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: COLORS.lightGreen,
                    borderRadius: SIZES.radius,
                  }}
                ></View>
              </View>

              <ChartYLabel
                format={formatUSD}
                style={{
                  color: COLORS.white,
                  ...FONTS.body5,
                }}
              />

              <ChartXLabel
                format={formatDateTime}
                style={{
                  marginTop: 3,
                  color: COLORS.lightGray3,
                  ...FONTS.body5,
                  lineHeight: 15,
                }}
              />
            </View>
          </ChartDot>
        </ChartPathProvider>
      )}
    </View>
  );
};

export default Chart;
