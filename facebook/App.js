import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { publicRoutes } from "./src/routes";
import { AuthProvider } from "./src/contexts/AuthContext";
import { Provider } from 'react-redux';
import store from './src/redux/store';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'

library.add(fab, faSquareCheck)


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider  store={store}>
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
      </Provider>
    </NavigationContainer>
  );
}