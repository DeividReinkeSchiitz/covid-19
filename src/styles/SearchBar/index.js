import React, { useState, useContext } from "react";

import colors from "../../constants/colors";
import SearchBar from "react-native-dynamic-search-bar";

import DataContext from "../../Provider/dataContext";

export default function App() {
  const { setData, dataSource } = useContext(DataContext);

  const filterList = text => {
    const data = dataSource.filter(item => {
      const itemData = item.country_name.toLowerCase();
      const textData = text.toLowerCase();

      return itemData.indexOf(textData) > -1;
    });
    setData(data);
  };

  return (
    <SearchBar
      onPressToFocus
      autoFocus={false}
      fontSize={20}
      fontColor="#c6c6c6"
      iconColor="#c6c6c6"
      shadowColor="#282828"
      cancelIconColor="#c6c6c6"
      backgroundColor={colors.primaryRed}
      placeholder="Search your country here"
      onChangeText={text => {
        filterList(text);
      }}
      onPressCancel={() => {
        filterList("");
      }}
      onPress={() => alert("onPress")}
    />
  );
}
