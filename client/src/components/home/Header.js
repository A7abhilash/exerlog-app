import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Headline } from "react-native-paper";
import { globalColors } from "../../styles/globalStyles";
import AddNewLog from "./AddNewLog";

export default function Header({ user, navigationToProfile, newLog }) {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 20,
          marginRight: 20,
        }}
      >
        <TouchableOpacity onPress={navigationToProfile}>
          <Image
            source={require("../../../assets/icons/user.png")}
            style={{
              width: 24,
              height: 24,
              resizeMode: "center",
              tintColor: globalColors.Light,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 15 }}>
        <Headline>Welcome,</Headline>
        <Headline style={{ fontSize: 32 }}>{user?.firstName}</Headline>
      </View>
      <AddNewLog addNewLog={newLog} />
    </View>
  );
}
