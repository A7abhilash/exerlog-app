import React from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { Caption, Title, Subheading } from "react-native-paper";
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
        elevation: 2,
      }}
      onPress={() => navigateToLogScreen(item)}
    >
      <Title>{item.date}</Title>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        paddingTop: 10,
        paddingBottom: 40,
      }}
    >
      <Subheading
        style={{
          color: globalColors.Info,
        }}
      >
        Your Logs
      </Subheading>
      {list?.length ? (
        <FlatList
          data={list}
          keyExtractor={(item, index) => (item.id + index).toString()}
          renderItem={renderItem}
        />
      ) : (
        <Caption>No logs added...</Caption>
      )}
    </View>
  );
}
