import React from "react";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";
import { Subheading, Title } from "react-native-paper";
import { globalColors } from "../../styles/globalStyles";

export default function WorkoutsForTheDay({ logs, deleteOneLog }) {
  const renderItem = ({ item, index }) => (
    <View
      style={{
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: globalColors.Light,
        borderRadius: 10,
        padding: 5,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        elevation: 1,
      }}
    >
      <View>
        <Subheading style={{ marginBottom: 0 }}>{item.workout}</Subheading>
        <Text
          style={{
            marginTop: 0,
            color: globalColors.Primary,
          }}
        >
          {item.exercise}
        </Text>
      </View>
      <TouchableOpacity onPress={() => deleteOneLog(index)}>
        <Image
          source={require("../../../assets/icons/remove.png")}
          style={{
            width: 15,
            height: 15,
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
