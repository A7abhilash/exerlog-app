import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function Home({ navigation }) {
  return (
    <View style={globalStyles.component}>
      <Text>Home</Text>
    </View>
  );
}
