import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  Easing,
  ActivityIndicator
} from "react-native";
import { AreaChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { AntDesign } from "@expo/vector-icons";

import styled from "./styled";
import colors from "../../constants/colors";
import DataContext from "../../Provider/dataContext";

export default function ListCountries() {
  const {
    newData,
    countries,
    onRefresh,
    refreshing,
    particularData
  } = useContext(DataContext);

  return (
    <>
      <FlatList
        data={newData}
        renderItem={({ item, index }) => {
          return countries.data.result.map(val => {
            if (val.name == item.country_name) {
              return renderItem(item, index, val.code);
            }
          });
        }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.8}
        initialNumToRender={4}
        maxToRenderPerBatch={1}
        removeClippedSubviews={true}
        keyExtractor={(item, index) => JSON.stringify(index)}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}

const renderItem = (data, index, code) => {
  return (
    <View key={index} style={styled.container}>
      <Panel data={data} code={code} />
    </View>
  );
};

function Panel({ data, code }) {
  const [heightAnimation] = useState(new Animated.Value(0)); // Initial value for opacity: 0
  const [color, setColor] = useState("#fff");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expanded)
      Animated.timing(heightAnimation, {
        toValue: 0,
        duration: 2000,
        easing: Easing.back()
      }).start();
    setColor("#fff");
    setExpanded(false);
  }, [data]);

  const toogle = () => {
    if (expanded) {
      Animated.timing(heightAnimation, {
        toValue: 0,
        duration: 2000,
        easing: Easing.back()
      }).start();
      setColor("#fff");
      setExpanded(false);
    } else {
      Animated.timing(heightAnimation, {
        toValue: 30,
        duration: 2000,
        easing: Easing.elastic()
      }).start();
      setColor(colors.primaryRed);
      setExpanded(true);
    }
    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  return (
    <>
      <View style={styled.cardContainer}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styled.flag}
            source={{
              uri: `https://www.countryflags.io/${code}/flat/64.png`
            }}
            resizeMode={"cover"}
          />
          <View style={styled.alignColumn}>
            <Text style={styled.country_name}>
              {JSON.stringify(data.country_name).length >> 16
                ? data.country_name.slice(0, 16).concat("...")
                : data.country_name}
            </Text>
            <Text style={styled.code}>{code}</Text>
          </View>
        </View>
        <LineChartCountryData countryName={data.country_name} />
        <TouchableOpacity
          style={styled.buttonExpansible}
          onPress={() => {
            setLoading(true);
            return toogle();
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color={colors.primaryRed} />
          ) : (
            <AntDesign
              size={32}
              color={colors.lightRed}
              name={expanded ? "up" : "down"}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styled.panelColumn}>
        {Object.entries(data).map((val, index2) => {
          if (
            val[0] == "region" ||
            val[0] == "country_name" ||
            val[0] == "total_cases_per_1m_population"
          )
            return;

          return (
            <Animated.View
              style={[styled.panelRow, { height: heightAnimation }]}
              key={index2}
            >
              <Text style={[styled.textInfoName, { color }]}>
                {val[0].replace(/_/gi, " ")}
              </Text>
              <Text
                style={[
                  styled.textInfo,
                  {
                    color
                  }
                ]}
              >
                {val[1]}
              </Text>
            </Animated.View>
          );
        })}
      </View>
    </>
  );
}

import dataByParticularCountry from "../../data/dataByParticularCountry";

const LineChartCountryData = ({ countryName }) => {
  const [particularData, setParticularData] = useState([]);

  useEffect(() => {
    getDataByParticularCountry();
  }, []);

  const getDataByParticularCountry = async () => {
    let data = await dataByParticularCountry(countryName);
    data = data.data.stat_by_country.map(val => {
      return Number(val.active_cases.replace(",", "."));
    });
    setParticularData([...new Set(data)]);
  };
  return (
    <AreaChart
      style={{
        height: 50,
        width: 50,
        alignSelf: "center"
      }}
      data={particularData}
      curve={shape.curveNatural}
      svg={{ fill: colors.lightRed }}
    ></AreaChart>
  );
};
