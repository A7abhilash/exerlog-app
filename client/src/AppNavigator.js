import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "./contexts/AuthContext";
import Loading from "./containers/Loading";
import Login from "./guestScreens/Login";
import Profile from "./authScreens/Profile";
import { globalColors } from "./styles/globalStyles";
import Home from "./authScreens/Home";

export default function AppNavigator() {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <Loading />;
  }

  const Stack = createStackNavigator();

  return (
    isAuthenticated !== null && (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: globalColors.Info },
            headerTintColor: globalColors.Light,
            headerTitleStyle: {
              fontSize: 26,
              fontWeight: "500",
            },
          }}
        >
          {isAuthenticated && user !== null ? (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerTitle: "ExerLog",
                  headerRight: () => <NavigateToProfile />,
                }}
              />
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

const NavigateToProfile = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Profile")}
      style={{ marginRight: 10 }}
    >
      <Image
        source={require("./../assets/icons/user.png")}
        style={{
          width: 24,
          height: 24,
          resizeMode: "center",
          tintColor: globalColors.Light,
          marginRight: 10,
        }}
      />
    </TouchableOpacity>
  );
};
