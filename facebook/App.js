import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { publicRoutes } from "./src/routes";
import { AuthProvider } from "./src/contexts/AuthContext";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'

library.add(fab, faSquareCheck)


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator
          // initialRouteName="Home"
          initialRouteName="Login" 
          screenOptions={{ headerShown: false }}
        >
          {publicRoutes.map((route, index) => (
            <Stack.Screen
              key={index}
              name={route.name}
              component={route.component}
            />
          ))}
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}