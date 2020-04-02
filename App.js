import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  UIManager,
  Platform,
  LayoutAnimation
} from "react-native";
import Router from "./src/router";
import StatusBar from "./src/styles/StatusBar";
import ErrorBoundary from "./src/styles/Error";
import response from "./src/data/CasesByCountry";
import Countries from "./src/data/Countries";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
var countries;
import { DataProvider } from "./src/Provider/dataContext";
import { SplashScreen } from "expo";

export default function app() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHide();
    (async () => {
      await getCountry();
      await getData();
      setLoading(false);
      SplashScreen.hide();
    })();
  }, []);

  onRefresh = () => {
    setData([]);
    getData();
    setRefreshing(false);
  };

  const getCountry = async () => (countries = await Countries);

  const getData = async () => {
    const res = await response;
    setDataSource(res.data["countries_stat"]);
    setNewData(res.data["countries_stat"]);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
  };

  const setData = newData => {
    setNewData(newData);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
  };

  try {
    if (loading) return null;
    return (
      <DataProvider
        value={{
          setData,
          newData,
          countries,
          dataSource,
          onRefresh,
          refreshing
        }}
      >
        <ErrorBoundary>
          <StatusBar />
          <Router />
        </ErrorBoundary>
      </DataProvider>
    );
  } catch (error) {
    return <View />;
  }
}
