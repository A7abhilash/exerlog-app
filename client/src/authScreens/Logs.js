import { useMutation } from "@apollo/client";
import React, { useLayoutEffect, useState } from "react";
import { View, Text } from "react-native";
import WorkoutsForTheDay from "../components/logs/WorkoutsForTheDay";
import AddNewWorkout from "../components/logs/AddNewWorkout";
import { useAuth } from "../contexts/AuthContext";
import { deleteLogMutation, updateLogMutation } from "../queries";
import { globalStyles } from "../styles/globalStyles";

export default function Logs({ navigation, route }) {
  const [currentLog, setCurrentLog] = useState(null);
  const { user } = useAuth();
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
      item.logs?.map(({ exercise, workout }) => ({ exercise, workout }))
    );
  }, [navigation, route]);

  const addNewWorkoutForTheDay = (newLog) => {
    setAllLogs([...allLogs, newLog]);
  };

  const deleteOneLog = (index) => {
    setAllLogs(allLogs.filter((_, i) => i !== index));
  };

  const saveLog = async () => {
    setIsLoading(true);
    let log = {
      id: selectedLog.id,
      logs: allLogs,
    };
    // console.log(allLogs);
    let res = await updateLog({
      variables: log,
    });
    // console.log(res);
    if (res.data.updateLog.id === selectedLog.id) {
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
    </View>
  );
}
