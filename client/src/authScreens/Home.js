import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { globalColors, globalStyles } from "../styles/globalStyles";
import { useMutation, useQuery } from "@apollo/client";
import { useAuth } from "../contexts/AuthContext";
import { addNewLogMutation, getUserLogsQuery } from "../queries/";
import Loading from "../containers/Loading";
import AllLogs from "../components/home/AllLogs";
import AddNewLog from "../components/home/AddNewLog";
import Error_ from "../containers/Error_";
import { useMsg } from "../contexts/MsgContext";

export default function Home({ navigation }) {
  const { user } = useAuth();
  const { setToast, setAlert } = useMsg();
  const [list, setList] = useState([]);
  const { data, loading, error } = useQuery(getUserLogsQuery, {
    variables: { id: user._id },
  });
  const [addNewLog] = useMutation(addNewLogMutation);

  const newLog = async (date) => {
    if (new Date(date).getTime().toString() > new Date().getTime().toString()) {
      setAlert({
        title: "Invalid",
        msg: "Selected date is not before today!!!",
        text: "Understood",
      });
      return;
    }
    if (!list.find((item) => item.date === date)) {
      let log = {
        date,
        userId: user._id,
      };
      let res = await addNewLog({
        variables: log,
        refetchQueries: [
          { query: getUserLogsQuery, variables: { id: user._id } },
        ],
      });
      if (res) {
        setToast(
          `New log on date: ${res.data.addNewLog.date} added successfully!!!`
        );
        // setSelectedLog(res.data.addNewLog);
        navigation.navigate("Logs", { item: res.data.addNewLog });
      }
    } else {
      setAlert({
        title: "Invalid",
        msg: "Log for the specified day exists...",
        text: "Understood",
      });
    }
  };

  useEffect(() => {
    if (data) {
      setList(
        [...data?.user?.logs].sort(
          (a, b) =>
            new Date(a.date).getTime().toString() <
            new Date(b.date).getTime().toString()
        )
      );
    }
  }, [data]);

  return (
    <View style={globalStyles.component}>
      <AddNewLog addNewLog={newLog} />
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
