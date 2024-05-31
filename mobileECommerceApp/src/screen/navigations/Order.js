import { StyleSheet, Button, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import OrderConfirming from "../navigations/OrderConfirming"
import OrderPacking from "../navigations/OrderPacking"
import OrderDelivering from "../navigations/OrderDelivering"
import OrderDelivered from "../navigations/OrderDelivered"
import OrderCanceled from "../navigations/OrderCanceled"
import OrderReturned from "../navigations/OrderReturned"

const Tab = createMaterialTopTabNavigator();

function Order({ navigation, route }) {
    // console.log('Order')

    return (
        <Tab.Navigator
            initialRouteName="OrderConfirming"
            screenOptions={{
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                tabBarLabelStyle: { fontSize: 12, fontWeight: "400", "textTransform": "capitalize", },
                // tabBarStyle: { backgroundColor: 'powderblue', },
                tabBarIndicatorStyle: { backgroundColor: 'tomato' },
                swipeEnabled: true,
                tabBarScrollEnabled: true,
            }}
        >
            <Tab.Screen
                name="OrderConfirming"
                component={OrderConfirming}
                initialParams={{
                    userData: route.params.userData,
                    orderConfirming: route.params.orderConfirming
                }} // pass initialParams to OrderConfirming
                options={{
                    tabBarLabel: 'Confirming',
                }}
            />
            <Tab.Screen
                name="OrderPacking"
                component={OrderPacking}
                initialParams={{
                    orderPacking: route.params.orderPacking,
                }} // pass initialParams to OrderPacking
                options={{
                    tabBarLabel: 'Packing',
                }}
            />
            <Tab.Screen
                name="OrderDelivering"
                component={OrderDelivering}
                initialParams={{
                    orderDelivering: route.params.orderDelivering,
                }} // pass initialParams to OrderDelivering
                options={{
                    tabBarLabel: 'Delivering',
                }}
            />
            <Tab.Screen
                name="OrderDelivered"
                component={OrderDelivered}
                initialParams={{
                    userData: route.params.userData,
                    orderDelivered: route.params.orderDelivered,
                }} // pass initialParams to OrderDelivered
                options={{
                    tabBarLabel: 'Delivered',
                }}
            />
            <Tab.Screen
                name="OrderCanceled"
                component={OrderCanceled}
                initialParams={{
                    orderCanceled: route.params.orderCanceled,
                }} // pass initialParams to OrderCanceled
                options={{
                    tabBarLabel: 'Canceled',
                }}
            />
            <Tab.Screen
                name="OrderReturned"
                component={OrderReturned}
                initialParams={{
                    orderReturned: route.params.orderReturned,
                }} // pass initialParams to OrderReturned
                options={{
                    tabBarLabel: 'Returned',
                }}
            />


        </Tab.Navigator>
    );
}

export default Order;

const styles = StyleSheet.create({})