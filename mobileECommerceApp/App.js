import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import Login from "./src/screen/Auth/Login"
import LoginWithSms from "./src/screen/Auth/LoginWithSms"
import Signup from "./src/screen/Auth/Signup"
import NavPage from "./src/screen/navigations/NavPage";
import VerifyOTP from "./src/screen/Auth/VerifyOTP";
import BasicSetupProfile from "./src/screen/Auth/BasicSetupProfile";
import ProductDetail from "./src/screen/Page/ProductDetail";
import ProductList from "./src/components/Home/ProductList";
import ModalExample from "./src/screen/test/ModalExample"

const Stack = createStackNavigator();
export default function App() {

  return (
    <SafeAreaProvider>
      {/*Only 1 NavContainer*/}
      <NavigationContainer>
        {/* <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login"> */}
        <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName="NavPage">
          <Stack.Screen name="Login" component={Login} options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forHorizontalIOS,
          }}
          />
          <Stack.Screen name="NavPage" component={NavPage} options={{}}
          />
          <Stack.Screen name="ProductDetail" component={ProductDetail} options={{}}
          />
          <Stack.Screen name="LoginWithSms" component={LoginWithSms} options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forHorizontalIOS,
          }}
          />
          <Stack.Screen name="VerifyOTP" component={VerifyOTP} options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forHorizontalIOS,
          }}
          />
          <Stack.Screen name="Signup" component={Signup} options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forHorizontalIOS,
          }}
          />
          <Stack.Screen name="BasicSetupProfile" component={BasicSetupProfile} options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forHorizontalIOS,
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider >
    // <ModalExample />
    // <ProductDetail />

  )
}
const styles = StyleSheet.create({})

