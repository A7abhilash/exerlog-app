import { useMutation } from "@apollo/client";
import React, { useLayoutEffect, useState } from "react";
import { Alert, View } from "react-native";
import WorkoutsForTheDay from "../components/logs/WorkoutsForTheDay";
import AddNewWorkout from "../components/logs/AddNewWorkout";
import { useAuth } from "../contexts/AuthContext";
import {
  deleteLogMutation,
  getUserLogsQuery,
  updateLogMutation,
} from "../queries";
import { globalColors, globalStyles } from "../styles/globalStyles";
import { Button } from "react-native-paper";
import { useMsg } from "../contexts/MsgContext";

export default function Logs({ navigation, route }) {
  const [currentLog, setCurrentLog] = useState(null);
  const { user } = useAuth();
  const { setToast } = useMsg();
  const [allLogs, setAllLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateLog] = useMutation(updateLogMutation);
  const [deleteLog] = useMutation(deleteLogMutation);

  useLayoutEffect(() => {
    const { item } = route.params;
    navigation.setOptions({
      title: item.date,
    });
    setCurrentLog(item);
    setAllLogs(
      item.logs?.map(({ exercise, workout }) => ({ exercise, workout })) || []
    );
  }, [navigation, route]);

  const addNewWorkoutForTheDay = (newLog) => {
    let tempLogs = allLogs.filter((item) => item.exercise === newLog.exercise);
    let tempWorkout = tempLogs.filter(
      (item) => item.workout === newLog.workout
    );
    if (!tempWorkout.length) {
      setAllLogs([...allLogs, newLog]);
    } else {
      setToast("Workout already exists for the day!!!");
    }
  };

  const deleteOneLog = (index) => {
    setAllLogs(allLogs.filter((_, i) => i !== index));
  };

  const handleDeleteLog = async () => {
    Alert.alert("Confirm", "Are you sure to delete this log?", [
      { text: "Cancel" },
      {
        text: "Yes",
        onPress: async () => {
          setIsLoading(true);
          let res = await deleteLog({
            variables: { id: currentLog.id },
            refetchQueries: [
              { query: getUserLogsQuery, variables: { id: user._id } },
            ],
          });
          if (res.data.deleteLog.id === currentLog.id) {
            setToast("Log deleted successfully");
            navigation.goBack();
          }
          setIsLoading(false);
        },
      },
    ]);
  };

  const saveLog = async () => {
    setIsLoading(true);
    let log = {
      id: currentLog.id,
      logs: allLogs,
    };
    // console.log(allLogs);
    let res = await updateLog({
      variables: log,
      refetchQueries: [
        { query: getUserLogsQuery, variables: { id: user._id } },
      ],
    });
    // console.log(res);
    if (res.data.updateLog.id === currentLog.id) {
      setToast("Log saved successfully");
    }
    setIsLoading(false);
  };

  return (
    <View style={globalStyles.component}>
      <AddNewWorkout addNewWorkoutForTheDay={addNewWorkoutForTheDay} />
      {allLogs && (
        <WorkoutsForTheDay logs={allLogs} deleteOneLog={deleteOneLog} />
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: -10,
          marginTop: 5,
        }}
      >
        <Button
          mode="contained"
          color={globalColors.Danger}
          onPress={handleDeleteLog}
          disabled={isLoading}
        >
          Delete
        </Button>
        <Button
          mode="contained"
          color={globalColors.Success}
          onPress={saveLog}
          disabled={isLoading}
        >
          Save
        </Button>
      </View>
    </View>
  );
}
