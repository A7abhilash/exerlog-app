import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Modal } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { globalColors } from "../../styles/globalStyles";

export default function AddExercise({ editExercise, setEditExercise }) {
  const [name, setName] = useState(editExercise.name);
  return (
    <Modal
      visible={editExercise !== null ? true : false}
      animationType="fade"
      transparent
    >
      <View style={styles.centeredView}>
        <View style={styles.innerView}>
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Exercise Name"
            value={name}
            onChangeText={setName}
          />
          <Button
            mode="contained"
            color={globalColors.Success}
            style={{ marginHorizontal: 20 }}
            // onPress={handleCreate}
          >
            Save
          </Button>
          <Button
            color={globalColors.Secondary}
            onPress={() => setEditExercise(null)}
            style={styles.cancelBtn}
          >
            <Image
              source={require("../../../assets/icons/remove.png")}
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
              }}
            />
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
    paddingVertical: 15,
  },
  input: {
    marginBottom: 10,
    marginHorizontal: 20,
    height: 55,
  },
  cancelBtn: {
    position: "absolute",
    right: -20,
    top: -20,
    backgroundColor: globalColors.Light,
  },
});
