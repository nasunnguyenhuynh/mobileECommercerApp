import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView, FlatList, } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Searchbar } from 'react-native-paper';
import api, { enpoints } from "../../utils/api";
// import styles from "../../styles/Auth/styles";

const DATA = [
    {
        id: "1",
        title: "RUSTY DRIVE",
        image:
            "https://res.cloudinary.com/demo/image/upload/w_260,h_200,c_crop,g_north/sample.jpg",
        ratings: 4.7,
        price: 247.878,
        sold: 1.6
    },
    {
        id: "2",
        title: "SABOR MORENO",
        image:
            "https://res.cloudinary.com/demo/image/upload/w_260,h_200,c_crop,g_north/sample.jpg",
        ratings: 4.7,
        price: 247.878,
        sold: 1.6
    },
    {
        id: "3",
        title: "0 MESTRE PUB",
        image:
            "https://res.cloudinary.com/demo/image/upload/w_260,h_200,c_crop,g_north/sample.jpg",
        ratings: 4.7,
        price: 247.878,
        sold: 1.6
    },
    {
        id: "4",
        title: "GRILL 54 CHEF",
        image:
            "https://res.cloudinary.com/demo/image/upload/w_260,h_200,c_crop,g_north/sample.jpg",
        ratings: 4.7,
        price: 247.878,
        sold: 1.6
    },
    {
        id: "5",
        title: "RUSTY DRIVE",
        image:
            "https://res.cloudinary.com/demo/image/upload/w_260,h_200,c_crop,g_north/sample.jpg",
        ratings: 4.7,
        price: 247.878,
        sold: 1.6
    },
    {
        id: "6",
        title: "SABOR MORENO",
        image:
            "https://res.cloudinary.com/demo/image/upload/w_260,h_200,c_crop,g_north/sample.jpg",
        ratings: 4.7,
        price: 247.878,
        sold: 1.6
    },
    {
        id: "7",
        title: "0 MESTRE PUB",
        image:
            "https://res.cloudinary.com/demo/image/upload/w_260,h_200,c_crop,g_north/sample.jpg",
        ratings: 4.7,
        price: 247.878,
        sold: 1.6
    },
    {
        id: "8",
        title: "GRILL 54 CHEF",
        image:
            "https://res.cloudinary.com/demo/image/upload/w_260,h_200,c_crop,g_north/sample.jpg",
        ratings: 4.7,
        price: 247.878,
        sold: 1.6
    }
];


const HomePage = () => {
    // const [categories, setCategories] = useState(null)

    // useEffect(() => {
    //     const loadCategories = async () => {
    //         try {
    //             let res = await api.get(enpoints['categories'])
    //             setCategories(res.data)
    //         }
    //         catch (ex) {
    //             console.error(ex)
    //         }
    //     }

    //     loadCategories()
    // }, [])



    function HomeScreen() {
        return (
            <View style={styles.container}>
                <View style={{ marginHorizontal: 10, marginTop: 40 }}>
                    {/* Wrap_Top_Hompage */}
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {/* Search */}
                        <View style={styles.inputContainer} >
                            <Feather
                                name={"search"}
                                size={24}
                                color={"#9A9A9A"}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Search"
                            // onChangeText={setPhone}
                            // value={phone}
                            // onFocus={() => handleFieldFocus('phone')}
                            // onBlur={() => setFocusField('')}
                            />
                        </View>

                        {/* Cart_Chat */}
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            flex: 1,
                            justifyContent: "space-around",
                        }}>
                            <View>
                                <Feather
                                    name={"shopping-cart"}
                                    size={30}
                                    color={"black"}
                                    style={styles.socialIcon}
                                />
                            </View>
                            <View>
                                <Ionicons
                                    name={"chatbubbles-outline"}
                                    size={30}
                                    color={"black"}
                                    style={styles.socialIcon}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                {/* Wrap_Products */}
                <ProductCard />
            </View>
        );
    }

    function ProfileScreen() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Profile!</Text>
            </View>
        );
    }

    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={{
                activeTintColor: 'red',
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign
                            name={"home"}
                            size={size}
                            color={color}
                            style={styles.socialIcon}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign
                            name={"user"}
                            size={size}
                            color={color}
                            style={styles.socialIcon}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        // backgroundColor: "gray",
        flex: 1,
    },
    inputContainer: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        borderRadius: 20,
        elevation: 10,
        alignItems: "center",
        height: 46,
        marginVertical: 14,
        width: 246,
    },
    inputIcon: {
        marginLeft: 15,
        marginRight: 5,
    },
    textInput: {
        flex: 1,
    },
})
{/* <ScrollView>
                    {categories === null ? <ActivityIndicator /> : <>
                        {categories.map(c => (
                            <View key={c.id}>
                                <TouchableOpacity>
                                    <Text>{c.name}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </>}
                </ScrollView> */}