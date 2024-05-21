import { StyleSheet, Button, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Payment from "../navigations/Payment"

const Stack = createStackNavigator();

function NavPayment({ navigation }) {
    console.log('NavPayment')
    const route = useRoute();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Payment"
                component={Payment}
                initialParams={{
                    price: route.params.price,
                    quantity: route.params.quantity,
                    color: route.params.color,
                }} // pass initialParams to Payment
                options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                            <AntDesign name="arrowleft" size={30} color="black" />
                        </TouchableOpacity>
                    ),
                    headerTitle: 'Payment',
                }}
            />
        </Stack.Navigator>
    );
}

export default NavPayment;

const styles = StyleSheet.create({})