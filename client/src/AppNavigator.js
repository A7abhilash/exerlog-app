import React from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, Image } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "./contexts/AuthContext";
import Loading from "./containers/Loading";
import Login from "./guestScreens/Login";
import Profile from "./authScreens/Profile";
import { globalColors } from "./styles/globalStyles";
import Home from "./authScreens/Home";
import Logs from "./authScreens/Logs";
import Exercises from "./authScreens/Exercises";

export default function AppNavigator() {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <Loading />;
  }

  const Stack = createStackNavigator();

  return (
    isAuthenticated !== null && (
      <NavigationContainer>
        <StatusBar
          style="auto"
          backgroundColor="blue"
          barStyle={globalColors.Info}
        />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: globalColors.Info },
            headerTintColor: globalColors.Light,
          }}
        >
          {isAuthenticated && user !== null ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerTitleStyle: {
                    fontSize: 26,
                    fontWeight: "500",
                  },
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Exercises"
                component={Exercises}
                options={{
                  headerTitle: "Your Exercises & Workouts",
                }}
              />
              <Stack.Screen name="Logs" component={Logs} />
              <Stack.Screen name="Profile" component={Profile} />
            </>
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
}
