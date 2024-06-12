import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SearchProduct from "../navigations/SearchProduct"
import ProductFilter from "../../components/Home/ProductFilter";
import useModal from "../../components/useModal";
import api, { authAPI, endpoints } from "../../utils/api";
const Stack = createStackNavigator();


function NavSearch({ navigation, route }) {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SearchProduct"
                component={SearchProduct}
                initialParams={{
                    search: route.params.search,

                }} // pass initialParams to SearchProduct
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>

    );
}


export default NavSearch;

const styles = StyleSheet.create({
    wrapHeaderHompage: {
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
    },
    inputContainer: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        borderRadius: 20,
        elevation: 10,
        alignItems: "center",
        height: "100%",
        marginLeft: 10,
        width: '70%',
    },
    inputIcon: {
        marginLeft: 15,
        marginRight: 5,
    },
    textInput: {
        flex: 1,
        marginRight: 15,
    },
    wrapFilter: {
        marginLeft: 10,
        height: 30,
        flexDirection: "row",
        alignItems: "center",
    }
})