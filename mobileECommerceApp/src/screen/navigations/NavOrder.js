import { StyleSheet, Button, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Order from "./Order";


const Stack = createStackNavigator();

function NavOrder({ navigation, route }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Order"
                component={Order}
                initialParams={{
                    userData: route.params.userData,
                    orderConfirming: route.params.orderConfirming,
                    orderPacking: route.params.orderPacking,
                    orderDelivering: route.params.orderDelivering,
                    orderDelivered: route.params.orderDelivered,
                    orderCanceled: route.params.orderCanceled,
                    orderReturned: route.params.orderReturned,
                }}
                options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                            <AntDesign name="arrowleft" size={30} color="black" />
                        </TouchableOpacity>
                    ),
                    headerTitle: 'Orders',
                }}
            />
        </Stack.Navigator>
    );
}

export default NavOrder;

const styles = StyleSheet.create({})