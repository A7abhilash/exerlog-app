import React, { useLayoutEffect, useState } from "react";
import { View, Text } from "react-native";
import WorkoutsForTheDay from "../components/logs/WorkoutsForTheDay";
import { globalStyles } from "../styles/globalStyles";

export default function Logs({ navigation, route }) {
  const [log, setLog] = useState(null);
  const [allLogs, setAllLogs] = useState(null);

  useLayoutEffect(() => {
    const { item } = route.params;
    navigation.setOptions({
      title: item.date,
    });
    setLog(item);
    setAllLogs(
      item.logs?.map(({ exercise, workout }) => ({ exercise, workout }))
    );
  }, [navigation, route]);

  const deleteOneLog = (index) => {
    setAllLogs(allLogs.filter((_, i) => i !== index));
  };

  return (
    <View style={globalStyles.component}>
      {allLogs && (
        <WorkoutsForTheDay logs={allLogs} deleteOneLog={deleteOneLog} />
      )}
    </View>
  );
}
