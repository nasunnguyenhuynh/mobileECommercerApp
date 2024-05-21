import { StyleSheet, Button, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React, { useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Address from "../navigations/Address"

const Stack = createStackNavigator();


function NavAddress({ navigation }) {
    const route = useRoute();
    useEffect(() => {
        console.log('NavAddress params:', route.params);
    }, [route.params]);  //navigation

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Address"
                component={Address}
                initialParams={{
                    id: route.params.id,
                    username: route.params.username,
                    firstName: route.params.firstName,
                    lastName: route.params.lastName,
                    address: route.params.addresses,
                    phone: route.params.phone,

                    price: route.params.price,
                    quantity: route.params.quantity,
                    color: route.params.color,
                }} // pass initialParams to Address
                options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                            <AntDesign name="arrowleft" size={30} color="black" />
                        </TouchableOpacity>
                    ),
                    headerTitle: 'Select the address',
                }}
            />
        </Stack.Navigator>

    );
}

export default NavAddress;

const styles = StyleSheet.create({})