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
import PaymentMethod from "../navigations/PaymentMethod"

const Stack = createStackNavigator();

function NavPayment({ navigation }) {
    console.log('NavPayment')
    const route = useRoute();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Payment"
                component={Payment}
                initialParams={{
                    productId: route.params.productId,
                    productName: route.params.productName,
                    productImg: route.params.productImg,
                    productPrice: route.params.productPrice,
                    quantity: route.params.quantity,
                    colorId: route.params.colorId,
                    colorName: route.params.colorName,
                    shopName: route.params.shopName,
                    deliveryPrice: route.params.deliveryPrice,
                }} // pass initialParams to Payment
            />
            {/* Method: VNPAY */}
            <Stack.Screen
                name="PaymentMethod"
                component={PaymentMethod}
                initialParams={{ url: route.params.url }} // pass initialParams to VNPAY
                options={{}}
            />

        </Stack.Navigator>
    );
}

export default NavPayment;

const styles = StyleSheet.create({})