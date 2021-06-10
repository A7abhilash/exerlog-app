import React from "react";
import { View, Text, Image } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function Error_() {
  return (
    <View style={globalStyles.container}>
      <Image
        source={require("../../assets/icons/error.png")}
        style={{
          width: 150,
          height: 150,
        }}
      />
    </View>
  );
}
