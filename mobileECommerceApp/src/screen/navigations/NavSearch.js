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

const Stack = createStackNavigator();


function NavSearch({ navigation, route }) {
    const [search, setSearch] = useState(route.params.search || '');
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SearchProduct"
                component={SearchProduct}
                initialParams={{
                    search: route.params.search,
                }} // pass initialParams to SearchProduct
                options={{
                    headerTitle: () => {
                        return (
                            <View style={styles.wrapHeaderHompage}>
                                <View style={styles.inputContainer} >
                                    <Feather
                                        name={"search"}
                                        size={20}
                                        color={"#9A9A9A"}
                                        style={styles.inputIcon}
                                    />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Search"
                                        value={search}
                                        onChangeText={text => setSearch(text)}
                                    />
                                </View>
                                {/* Filter */}
                                <TouchableOpacity style={styles.wrapFilter}>
                                    <AntDesign
                                        name={"filter"}
                                        size={30}
                                        color={"#000"}
                                        style={{}}
                                    />
                                    <View style={{ height: "100%", justifyContent: "flex-end" }}>
                                        <Text style={{ fontSize: 8 }}>
                                            Filter
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                }}
            />
        </Stack.Navigator>

    );
}


export default NavSearch;

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