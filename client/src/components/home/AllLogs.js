import React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { Headline, Title } from "react-native-paper";
import { globalColors } from "../../styles/globalStyles";

export default function AllLogs({ list, navigateToLogScreen }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        marginVertical: 7,
        backgroundColor: globalColors.Light,
        borderRadius: 10,
        padding: 10,
      }}
      onPress={() => navigateToLogScreen(item)}
    >
      <Title>{item.date}</Title>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        marginVertical: 10,
        paddingTop: 5,
        borderTopColor: globalColors.Info,
        borderTopWidth: 1,
      }}
    >
      <Headline>Your Logs</Headline>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
