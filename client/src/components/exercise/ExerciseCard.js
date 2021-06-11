import { useMutation } from "@apollo/client";
import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Caption, Subheading } from "react-native-paper";
import { useAuth } from "../../contexts/AuthContext";
import { useMsg } from "../../contexts/MsgContext";
import { deleteExerciseMutation, getUserExercises } from "../../queries";
import { globalColors } from "../../styles/globalStyles";

export default function ExerciseCard({ exercise, setEditExercise }) {
  const { user } = useAuth();
  const { setToast } = useMsg();
  const [deleteExercise] = useMutation(deleteExerciseMutation);

  const handleDeleteExercise = async (id) => {
    let res = await deleteExercise({
      variables: { id },
      refetchQueries: [
        { query: getUserExercises, variables: { id: user._id } },
      ],
    });
    if (res.data.deleteExercise.id === id) {
      setToast("Exercise deleted successfully");
    }
  };

  const handleDelete = (id) => {
    Alert.alert("Confirm", "Are you sure to delete this exercise?", [
      {
        text: "Cancel",
      },
      {
        text: "Yes",
        onPress: () => handleDeleteExercise(id),
      },
    ]);
  };

  return (
    <TouchableOpacity
      style={{
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: globalColors.Light,
        borderRadius: 10,
        paddingVertical: 7,
        paddingHorizontal: 10,
        elevation: 1,
      }}
      onPress={() => setEditExercise(exercise)}
      onLongPress={() => handleDelete(exercise.id)}
    >
      <Subheading style={{ marginBottom: 0, fontSize: 18 }}>
        {exercise.name}
      </Subheading>
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
