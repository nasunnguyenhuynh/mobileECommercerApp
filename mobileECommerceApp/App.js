import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import Login from "./src/screen/Auth/Login"
import LoginWithSms from "./src/screen/Auth/LoginWithSms"
import Signup from "./src/screen/Auth/Signup"
import HomePage from "./src/screen/Home/HomePage";
import VerifyOTP from "./src/screen/Auth/VerifyOTP";
import BasicSetupProfile from "./src/screen/Auth/BasicSetupProfile";

const Stack = createStackNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login"> */}
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomePage">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{}}
          />
          <Stack.Screen
            name="LoginWithSms"
            component={LoginWithSms}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="VerifyOTP"
            component={VerifyOTP}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="BasicSetupProfile"
            component={BasicSetupProfile}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

  )
}
const styles = StyleSheet.create({})





