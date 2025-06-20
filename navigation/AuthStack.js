import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginSignupScreen from "../screens/LoginSignupScreen";
import LoginSignupScreen from "../screens/auth/LoginSignupScreen";
// import CustomerHomeScreen from "../screens/CustomerHomeScreen";
import CustomerHomeScreen from "../screens/customer/CustomerHomeScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={LoginSignupScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="CustomerHome"
        component={CustomerHomeScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="CustomerHome"
        component={CustomerHomeScreen}
        // options={{ headerShown: true, title: "SkilledLabour" }} // Show header
        options={{
          headerShown: false,
          title: "SkilledLabour",
          headerStyle: { backgroundColor: "#fff" },
          headerTitleStyle: { color: "#FF7A00", fontWeight: "bold" },
        }}
      />
    </Stack.Navigator>
  );
}
