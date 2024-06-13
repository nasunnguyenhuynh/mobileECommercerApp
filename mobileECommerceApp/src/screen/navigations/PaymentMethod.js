import { StyleSheet, Button, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React from "react";
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import VNPAY from "./VNPAY";

const Stack = createStackNavigator();

function PaymentMethod({ navigation }) {
    //console.log('PaymentMethod')
    const route = useRoute();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="VNPAY"
                component={VNPAY}
                initialParams={{ url: route.params.url }} // pass initialParams to VNPAY
                options={{}}
            />
        </Stack.Navigator>
    );
}

export default PaymentMethod;

const styles = StyleSheet.create({})