import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Caption, Subheading } from "react-native-paper";
import { globalColors } from "../../styles/globalStyles";

export default function ExerciseCard({ exercise, setEditExercise }) {
  return (
    <TouchableOpacity
      style={{
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: globalColors.Light,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        elevation: 1,
      }}
      onPress={() => setEditExercise(exercise)}
    >
      <Subheading style={{ marginBottom: 0 }}>{exercise.name}</Subheading>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {exercise.workouts.length ? (
          exercise.workouts.map((workout, index) => (
            <Text
              key={`${workout}-${index}`}
              style={{
                marginTop: 0,
                marginRight: 5,
                color: globalColors.Primary,
              }}
            >
              {workout} {index !== exercise.workouts.length - 1 && "|"}
            </Text>
          ))
        ) : (
          <Caption>No workouts in this list...</Caption>
        )}
      </View>
    </TouchableOpacity>
  );
}
