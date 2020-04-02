import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";

import SearchBar from "../../styles/SearchBar";
import CoutriesList from "../../styles/CoutriesList";
import styled from "./styled";

const Home = () => {
  return (
    <SafeAreaView style={styled.container}>
      <View style={styled.marginHorizontal}>
        <SearchBar />
        <CoutriesList />
      </View>
    </SafeAreaView>
  );
};

export default Home;
