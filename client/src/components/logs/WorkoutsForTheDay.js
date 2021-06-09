import React from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { Caption, Subheading, Title } from "react-native-paper";
import { globalColors } from "../../styles/globalStyles";

export default function WorkoutsForTheDay({ logs }) {
  const renderItem = ({ item }) => (
    <View
      style={{
        marginVertical: 5,
        backgroundColor: globalColors.Light,
        padding: 5,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <View>
        <Subheading style={{ marginBottom: 0 }}>{item.workout}</Subheading>
        <Caption style={{ marginTop: 0 }}>{item.exercise}</Caption>
      </View>
      <TouchableOpacity
      //   onPress={deleteOneLog}
      >
        <Image
          source={require("../../../assets/icons/delete.png")}
          style={{
            width: 20,
            height: 20,
            marginRight: 5,
          }}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <Title>Workouts for the day</Title>
      <FlatList
        data={logs}
        keyExtractor={(item) => `${item.workout + item.exercise}`}
        renderItem={renderItem}
      />
    </View>
  );
}
