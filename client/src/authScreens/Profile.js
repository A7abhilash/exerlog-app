import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Headline, Subheading } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { globalColors, globalStyles } from "../styles/globalStyles";

export default function Profile() {
  const { user, setIsAuthenticated } = useAuth();

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <Image
          source={{ uri: user?.image }}
          style={{
            height: 130,
            width: 130,
            borderRadius: 130,
            marginVertical: 10,
          }}
        />
        <Headline>{user?.displayName}</Headline>
        <TouchableOpacity onPress={logOut} style={styles.button}>
          <Image
            source={require("./../../assets/icons/logout.png")}
            style={{
              width: 24,
              height: 24,
              resizeMode: "center",
              marginRight: 10,
            }}
          />
          <Subheading>Logout</Subheading>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: globalColors.Light,
    elevation: 5,
    width: "100%",
    paddingVertical: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: globalColors.Danger,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
  },
});
