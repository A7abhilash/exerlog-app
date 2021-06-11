import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { globalColors } from "../../styles/globalStyles";

export default function SelectCard({ isSelected, name, handleSelect }) {
  return (
    <TouchableOpacity
      onPress={() => handleSelect(name)}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: isSelected ? globalColors.Info : globalColors.Light,
        borderColor: globalColors.Info,
        borderWidth: 1,
        margin: 5,
      }}
    >
      <Text>{name}</Text>
    </TouchableOpacity>
  );
}
