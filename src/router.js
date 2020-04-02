import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./pages/home";

export default function Router({ data }) {
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );
}
