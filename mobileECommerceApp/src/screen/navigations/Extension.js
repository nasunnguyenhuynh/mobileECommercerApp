import { StyleSheet, Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React, { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductRating from "../Page/ProductRating";
import ShopRating from "../Page/ShopRating";
import CreateStore from "../Page/CreateStore";
import MyStore from "../Page/MyStore";
import EditStore from "../Page/EditStore";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();
function Extension({ route }) {
    // const { userId } = route.params;
    // console.log('userId:', userId);
    const { userId, statusId } = route.params;

    const [activeTab, setActiveTab] = useState('CreateStore');

    return (
        <Tab.Navigator
            initialRouteName="CreateStore"
            screenOptions={{
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                tabBarLabelStyle: { fontSize: 14, fontWeight: "400", "textTransform": "capitalize", },
                // tabBarStyle: { backgroundColor: 'powderblue', },
                tabBarIndicatorStyle: { backgroundColor: 'tomato' },

            }}
        >
            {statusId === 1 ? (
                <Tab.Screen
                    name="MyStore"
                    component={MyStore}
                    initialParams={{ userId: userId }}
                    options={{ tabBarLabel: 'My Store' }}
                />
            )  : statusId === 3 ? (
                <Tab.Screen
                    name="EditStore"
                    component={EditStore}
                    initialParams={{ userId: userId }}
                    options={{ tabBarLabel: 'Edit Store' }}
                />

            ) : statusId === 4 ? (<Text>Confirming</Text>) :  (

                <Tab.Screen
                    name="CreateStore"
                    component={CreateStore}
                    initialParams={{ userId: userId }}
                    options={{ tabBarLabel: 'Create Store' }}
                />

            )}
        </Tab.Navigator>
    )
}

export default Extension;

const styles = StyleSheet.create({})