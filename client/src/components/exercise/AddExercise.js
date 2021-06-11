import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { View, Text, StyleSheet, Image, Modal, Keyboard } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { addNewExerciseMutation, getUserExercises } from "../../queries";
import { globalColors } from "../../styles/globalStyles";
import { useAuth } from "../../contexts/AuthContext";
import { useMsg } from "../../contexts/MsgContext";

export default function AddExercise({ isModalOpen, setIsModalOpen }) {
  const { user } = useAuth();
  const { setToast } = useMsg();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addNewExercise] = useMutation(addNewExerciseMutation);

  const handleSubmit = async () => {
    if (name) {
      Keyboard.dismiss();
      setIsLoading(true);
      let exercise = {
        name,
        userId: user._id,
      };
      let res = await addNewExercise({
        variables: exercise,
        refetchQueries: [
          { query: getUserExercises, variables: { id: user._id } },
        ],
      });
      if (res) {
        setToast(
          `New exercise: ${res.data.addNewExercise.name} added successfully!!!`
        );
        setIsLoading(false);
      }
      setIsModalOpen(false);
      setName("");
    }
  };

  return (
    <Modal visible={isModalOpen} animationType="fade" transparent>
      <View style={styles.centeredView}>
        <View style={styles.innerView}>
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Exercise Name"
            value={name}
            onChangeText={setName}
            autoFocus
          />
          <Button
            mode="contained"
            color={globalColors.Success}
            style={{ marginHorizontal: 20 }}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            Add
          </Button>
          <Button
            color={globalColors.Danger}
            onPress={() => setIsModalOpen(false)}
            style={{ marginVertical: 10 }}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </View>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(238, 238, 238, 0.685)",
  },
  innerView: {
    marginHorizontal: 15,
    borderRadius: 20,
    backgroundColor: globalColors.Light,
    elevation: 5,
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  input: {
    marginBottom: 10,
    marginHorizontal: 20,
    height: 55,
  },
});
