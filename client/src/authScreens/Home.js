import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { globalColors, globalStyles } from "../styles/globalStyles";
import { useMutation, useQuery } from "@apollo/client";
import { useAuth } from "../contexts/AuthContext";
import { addNewLogMutation, getUserLogsQuery } from "../queries/";
import Loading from "../containers/Loading";
import AllLogs from "../components/home/AllLogs";
import Error_ from "../containers/Error_";

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
      {error && <Error_ />}
      {data && (
        <AllLogs
          list={list}
          navigateToLogScreen={(item) => navigation.navigate("Logs", { item })}
        />
      )}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          margin: 15,
        }}
      >
        <TouchableOpacity
          style={{
            width: 55,
            height: 55,
            borderRadius: 55,
            backgroundColor: globalColors.Light,
            elevation: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("Exercises")}
        >
          <Image
            source={require("../../assets/icons/exercise-list.png")}
            style={{
              height: 30,
              width: 30,
              tintColor: globalColors.Primary,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
