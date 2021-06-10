import React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { Caption, Headline, Title } from "react-native-paper";
import { globalColors } from "../../styles/globalStyles";

export default function AllLogs({ list, navigateToLogScreen }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        marginVertical: 7,
        marginHorizontal: 5,
        backgroundColor: globalColors.Light,
        borderRadius: 10,
        padding: 10,
        elevation: 1,
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
      {list?.length ? (
        <FlatList
          data={list}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Caption>No logs added...</Caption>
      )}
    </View>
  );
}
