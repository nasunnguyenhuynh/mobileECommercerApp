import { StyleSheet, Button, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Extension from "../navigations/Extension"

const Stack = createStackNavigator();

function NavExtension({ navigation }) {
    const route = useRoute();
    const { userId, statusId } = route.params;

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Extension"
                component={Extension}
                initialParams={{ userId: userId, statusId: statusId }}
                options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                            <AntDesign name="arrowleft" size={30} color="black" />
                        </TouchableOpacity>
                    ),
                    headerTitle: 'Extension',
                }}
            />
        </Stack.Navigator>
    );
}

export default NavExtension;

const styles = StyleSheet.create({})