import React from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import AppNavigator from "./src/AppNavigator";
import { MsgProvider } from "./src/contexts/MsgContext";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

//apollo client setup
const client = new ApolloClient({
  uri: "http://10.0.2.2:7781/graphiql",
  cache: new InMemoryCache({
    typePolicies: {
      UserType: {
        merge: true,
      },
      LogType: {
        merge: true,
      },
      ExerciseType: {
        merge: true,
      },
    },
  }),
});

export default function App() {
  return (
    <MsgProvider>
      <AuthProvider>
        <ApolloProvider client={client}>
          <AppNavigator />
        </ApolloProvider>
      </AuthProvider>
    </MsgProvider>
  );
}
