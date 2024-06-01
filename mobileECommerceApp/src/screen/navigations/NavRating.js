import { StyleSheet, Button, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Rating from "../navigations/Rating"
import FormRating from "./FormRating";

const Stack = createStackNavigator();

function NavRating({ navigation }) {
    const route = useRoute();
    return (
        <Stack.Navigator>
            {
                route.params.fromCommentsRatings ?
                    <Stack.Screen
                        name="Rating"
                        component={Rating}
                        initialParams={{
                            fromCommentsRatings: route.params.fromCommentsRatings,
                            id: route.params.id,
                            data: route.params.data,
                            productRating: route.params.productRating,
                            shopRating: route.params.shopRating
                        }} // pass initialParams to Rating
                        options={{
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                                    <AntDesign name="arrowleft" size={30} color="black" />
                                </TouchableOpacity>
                            ),
                            headerTitle: 'Ratings and Comments',
                        }}
                    /> :
                    <>
                        <Stack.Screen
                            name="FormRating"
                            component={FormRating}
                            initialParams={{
                                order: route.params.order
                            }} // pass initialParams to FormRating
                            options={{
                                headerLeft: () => (
                                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                                        <AntDesign name="arrowleft" size={30} color="black" />
                                    </TouchableOpacity>
                                ),
                                headerTitle: 'Form Rating',
                            }}
                        />
                    </>
            }
        </Stack.Navigator>
    );
}

export default NavRating;

const styles = StyleSheet.create({})