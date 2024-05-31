import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ProductComparision from "../navigations/ProductComparision"
import ProductFilter from "../../components/Home/ProductFilter";
import useModal from "../../components/useModal";
import api, { authAPI, endpoints } from "../../utils/api";
const Stack = createStackNavigator();


function NavProduct({ navigation, route }) {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Compare Product"
                component={ProductComparision}
                initialParams={{
                    productId: route.params.productId,
                    categoryId: route.params.categoryId,

                }} // pass initialParams to SearchProduct
                options={{
                }}
            />
        </Stack.Navigator>

    );
}


export default NavProduct;

const styles = StyleSheet.create({})