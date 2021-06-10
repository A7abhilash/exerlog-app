import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { getUserExercises } from "../queries";
import { globalStyles } from "../styles/globalStyles";
import Loading from "../containers/Loading";
import Error_ from "../containers/Error_";
import { Caption } from "react-native-paper";
import ExerciseCard from "../components/exercise/ExerciseCard";
import EditExercise from "../components/exercise/EditExercise";

export default function Exercises() {
  const { user } = useAuth();
  const { data, loading, error } = useQuery(getUserExercises, {
    variables: { id: user._id },
  });
  const [editExercise, setEditExercise] = useState(null);

  return (
    <View style={globalStyles.component}>
      {loading && <Loading />}
      {error && <Error_ />}
      {data &&
        (data.user.exercises.length ? (
          <FlatList
            data={data.user.exercises}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ExerciseCard exercise={item} setEditExercise={setEditExercise} />
            )}
          />
        ) : (
          <Caption>No exercises added...</Caption>
        ))}
      {editExercise !== null && (
        <EditExercise
          editExercise={editExercise}
          setEditExercise={setEditExercise}
        />
      )}
    </View>
  );
}
