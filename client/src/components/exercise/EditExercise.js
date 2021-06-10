import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import { Button, Caption, Divider, TextInput, Title } from "react-native-paper";
import { useAuth } from "../../contexts/AuthContext";
import { useMsg } from "../../contexts/MsgContext";
import { getUserExercises, updateExerciseMutation } from "../../queries";
import { globalColors } from "../../styles/globalStyles";

export default function EditExercise({ editExercise, setEditExercise }) {
  const { user } = useAuth();
  const { setToast } = useMsg();
  const [name, setName] = useState(editExercise?.name);
  const [workout, setWorkout] = useState("");
  const [exerciseWorkouts, setExerciseWorkouts] = useState(
    editExercise?.workouts
  );
  const [updateExercise] = useMutation(updateExerciseMutation);

  const deleteThisWorkout = (index) => {
    setExerciseWorkouts(exerciseWorkouts.filter((_, i) => i !== index));
  };

  const addNewWorkout = () => {
    if (workout) {
      setExerciseWorkouts([...exerciseWorkouts, workout]);
      setWorkout("");
      Keyboard.dismiss();
    }
  };

  const handleSaveExercise = async () => {
    let exercise = {
      id: editExercise.id,
      name,
      workouts: exerciseWorkouts,
    };
    // console.log(exercise);
    const res = await updateExercise({
      variables: exercise,
      refetchQueries: [
        { query: getUserExercises, variables: { id: user._id } },
      ],
    });
    if (res) {
      setToast("Exercise saved...");
    }
  };

  const renderItem = ({ item, index }) => (
    <View
      style={{
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: globalColors.Light,
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        elevation: 1,
      }}
    >
      <View>
        <Text
          style={{
            marginTop: 0,
            color: globalColors.Primary,
          }}
        >
          {item}
        </Text>
      </View>
      <TouchableOpacity onPress={() => deleteThisWorkout(index)}>
        <Image
          source={require("../../../assets/icons/remove.png")}
          style={{
            width: 12,
            height: 12,
            marginRight: 5,
          }}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal visible={editExercise !== null ? true : false} animationType="slide">
      <TouchableOpacity
        onPress={() => setEditExercise(null)}
        style={styles.cancelBtn}
      >
        <Image
          source={require("../../../assets/icons/chevron-arrow-down.png")}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
      <View style={styles.innerView}>
        <TextInput
          mode="outlined"
          style={styles.input}
          label="Exercise Name"
          value={name}
          onChangeText={setName}
        />
        <Divider />
        <View style={styles.horizontalView}>
          <TextInput
            mode="outlined"
            style={{
              width: "80%",
              height: 50,
            }}
            label="New Workout"
            value={workout}
            onChangeText={setWorkout}
          />
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={addNewWorkout}
          >
            <Image
              source={require("../../../assets/icons/add.png")}
              style={{ width: 45, height: 45 }}
            />
          </TouchableOpacity>
        </View>
        {exerciseWorkouts?.length ? (
          <FlatList
            data={exerciseWorkouts}
            keyExtractor={(item, index) => `${item + index}`}
            renderItem={renderItem}
          />
        ) : (
          <Caption>No workouts in this exercise...</Caption>
        )}
        <Button
          mode="contained"
          color={globalColors.Success}
          style={{ marginVertical: 10 }}
          onPress={handleSaveExercise}
        >
          Save
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: globalColors.Light,
    elevation: 5,
    bottom: 15,
    right: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  innerView: {
    marginVertical: 15,
    marginHorizontal: 20,
  },
  horizontalView: {
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "space-around",
  },
  input: {
    marginBottom: 10,
    height: 55,
  },
  cancelBtn: {
    backgroundColor: globalColors.Info,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
