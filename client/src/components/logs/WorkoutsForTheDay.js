import React from "react";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";
import { Caption, Subheading, Title } from "react-native-paper";
import { globalColors } from "../../styles/globalStyles";

export default function WorkoutsForTheDay({ logs, deleteOneLog }) {
  const renderItem = ({ item, index }) => (
    <View
      style={{
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: globalColors.Light,
        borderRadius: 10,
        paddingVertical: 7,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        elevation: 1,
      }}
    >
      <View>
        <Subheading style={{ marginBottom: 0, fontSize: 18 }}>
          {item.workout}
        </Subheading>
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
    <View style={{ flex: 1 }}>
      <Title>Workouts for the day</Title>
      {logs?.length ? (
        <FlatList
          data={logs}
          keyExtractor={(item, index) => `${item.workout + index}`}
          renderItem={renderItem}
        />
      ) : (
        <Caption>No logs found on this day...</Caption>
      )}
    </View>
  );
}
