import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { globalColors, globalStyles } from "../styles/globalStyles";
import { useMutation, useQuery } from "@apollo/client";
import { useAuth } from "../contexts/AuthContext";
import { addNewLogMutation, getUserLogsQuery } from "../queries/";
import Loading from "../containers/Loading";
import AllLogs from "../components/home/AllLogs";

export default function Home({ navigation }) {
  const { user } = useAuth();
  const [list, setList] = useState([]);
  const { data, loading, error } = useQuery(getUserLogsQuery, {
    variables: { id: user._id },
  });

  useEffect(() => {
    setList(data?.user?.logs);
  }, [data]);

  return (
    <View style={globalStyles.component}>
      <Text>Home</Text>
      {loading && <Loading />}
      {error && <Text style={{ color: globalColors.Danger }}>Error...</Text>}
      {data && (
        <AllLogs
          list={list}
          navigateToLogScreen={(item) => navigation.navigate("Logs", { item })}
        />
      )}
    </View>
  );
}
