import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Button, Caption, TextInput } from "react-native-paper";
import { globalColors } from "../../styles/globalStyles";

export default function EditExercise({ editExercise, setEditExercise }) {
  const [name, setName] = useState(editExercise.name);

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
      <TouchableOpacity
      //   onPress={() => deleteOneLog(index)}
      >
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
        {editExercise?.workouts.length ? (
          <FlatList
            data={editExercise.workouts}
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
          // onPress={handleCreate}
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
