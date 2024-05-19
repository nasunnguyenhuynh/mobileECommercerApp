import { StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductRating from "../Page/ProductRating";
import ShopRating from "../Page/ShopRating";
import Comment from "../Page/Comment";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();
function Rating({ navigation }) {
    // Them navigatioin, route dc tao moi
    const route = useRoute();
    // const { id, fromCommentsRatings, data, productRating, shopRating } = route.params;
    // console.log('fromCommentsRatings_Rating:', fromCommentsRatings);
    // console.log('data_Rating:', data);

    return (
        <Tab.Navigator
            initialRouteName="ProductRating"
            screenOptions={{
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                tabBarLabelStyle: { fontSize: 14, fontWeight: "400", "textTransform": "capitalize", },
                // tabBarStyle: { backgroundColor: 'powderblue', },
                tabBarIndicatorStyle: { backgroundColor: 'tomato' },
            }}
        >
            <Tab.Screen
                name="ProductRating"
                component={ProductRating}
                initialParams={{
                    fromCommentsRatings: route.params.fromCommentsRatings,
                    data: route.params.data,
                    productRating: route.params.productRating
                }} // pass initialParams to ProductRating
                options={{
                    tabBarLabel: 'Product Ratings',
                }}
            />
            <Tab.Screen
                name="ShopRating"
                component={ShopRating}
                initialParams={{
                    fromCommentsRatings: route.params.fromCommentsRatings,
                    data: route.params.data,
                    shopRating: route.params.shopRating
                }} // pass initialParams to ProductRating
                options={{
                    tabBarLabel: 'Shop Ratings',
                }}
            />
            <Tab.Screen
                name="Comment"
                component={Comment}
                initialParams={{
                    fromCommentsRatings: route.params.fromCommentsRatings,
                    productId: route.params.id
                }} // pass initialParams to Comment
                options={{
                    tabBarLabel: 'Comment',
                }}
            />
        </Tab.Navigator>
    )
}

export default Rating;

const styles = StyleSheet.create({})