import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#8e0000",

    height: Constants.statusBarHeight
  }
});

export default () => <View style={styles.statusBar} />;
