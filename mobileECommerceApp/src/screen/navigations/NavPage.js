import { StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React, { useEffect } from 'react';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, } from '@react-navigation/native';
import Home from "../Page/Home";
import Profile from "../Page/Profile";
import ProductDetail from "../Page/ProductDetail";
// import AsyncStorage from '@react-native-async-storage/async-storage';


const NavPage = ({ navigation }) => {
    //     const authenticateUser = async () => {
    //         try {
    //             const access_token = await AsyncStorage.getItem('access_token');
    //             if (access_token) {
    //                 console.log('User authenticated with access token:', access_token);
    //             } else {
    //                 // Người dùng chưa đăng nhập, chuyển hướng họ đến màn hình đăng nhập
    //                 console.log('User not authenticated, redirecting to login screen');
    //                 navigation.navigate('Login');
    //             }
    //         } catch (error) {
    //             console.error('Error authenticating user:', error);
    //         }
    //     };


    //     useEffect(() => {
    //         authenticateUser();
    //     }, []);

    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
            initialRouteName="Home"
        >
            <Tab.Screen
                name="Home"
                component={Home}
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
                component={Profile}
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

export default NavPage;

const styles = StyleSheet.create({})