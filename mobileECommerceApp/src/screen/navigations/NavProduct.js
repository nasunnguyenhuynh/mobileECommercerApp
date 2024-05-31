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
                    // headerTitle: () => {
                    //     return (
                    //         <View style={styles.wrapHeaderHompage}>
                    //             <TouchableOpacity onPress={() => navigation.goBack()}>
                    //                 <AntDesign name="arrowleft" size={30} color="black" />
                    //             </TouchableOpacity>
                    //         </View>

                    //     )
                    // }
                }}
            />
        </Stack.Navigator>

    );
}


export default NavProduct;

const styles = StyleSheet.create({
    wrapHeaderHompage: {
        // backgroundColor: "yellow",
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
        // backgroundColor: "tomato",
        height: 30,
        flexDirection: "row",
        alignItems: "center",
    }
})