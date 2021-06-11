import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { View, FlatList } from "react-native";
import { Button, Caption, Divider } from "react-native-paper";
import { useAuth } from "../../contexts/AuthContext";
import { getUserExercises } from "../../queries";
import SelectCard from "./SelectCard";
import Loading from "../../containers/Loading";
import Error_ from "../../containers/Error_";

export default function AddNewWorkout({ addNewWorkoutForTheDay }) {
  const { user } = useAuth();
  const { data, loading, error } = useQuery(getUserExercises, {
    variables: { id: user._id },
  });

  const [exercise, setExercise] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [workout, setWorkout] = useState("");

  useEffect(() => {
    setSelectedExercise(
      data?.user.exercises.find((item) => item.name === exercise)
    );
    setWorkout("");
  }, [exercise]);

  const handleSubmit = () => {
    addNewWorkoutForTheDay({ exercise, workout });
    setExercise("");
    setWorkout("");
  };

  return (
    <>
      {loading && <Loading />}
      {error && <Error_ />}
      {data && (
        <View
          style={{
            marginVertical: 10,
            padding: 5,
            borderColor: "#eee",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          {data?.user.exercises.length ? (
            <Caption>Select Exercise</Caption>
          ) : (
            <Caption>You have no exercise added yet...</Caption>
          )}
          <FlatList
            data={data?.user.exercises}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <SelectCard
                isSelected={item.name === exercise}
                name={item.name}
                handleSelect={setExercise}
              />
            )}
            horizontal
          />

          {selectedExercise && (
            <>
              {selectedExercise?.workouts.length ? (
                <Caption>Select Workout</Caption>
              ) : (
                <Caption>No workouts found in this exercise...</Caption>
              )}
              <FlatList
                data={selectedExercise?.workouts}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => (
                  <SelectCard
                    isSelected={item === workout}
                    name={item}
                    handleSelect={setWorkout}
                  />
                )}
                horizontal
              />
            </>
          )}

          <Button
            mode="contained"
            style={{
              marginVertical: 10,
            }}
            onPress={handleSubmit}
            disabled={exercise === "" || workout === ""}
          >
            Add Workout
          </Button>
          <Divider />
        </View>
      )}
    </>
  );
}
