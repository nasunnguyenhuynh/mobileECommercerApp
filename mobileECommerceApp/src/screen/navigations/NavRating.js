import { StyleSheet, Button, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import CommentsRatings from "../../components/ProductDetail/CommentsRatings";
// import ProductRating from "../Page/ProductRating";
// import ShopRating from "../Page/ShopRating";
import Rating from "../navigations/Rating"

const Stack = createStackNavigator();

function NavRating({ navigation }) {
    const route = useRoute();
    // const { id, fromCommentsRatings, data, productRating, shopRating } = route.params;
    // console.log('fromCommentsRatings_NavRating:', fromCommentsRatings);
    // console.log('data_NavRating:', data);
    // console.log('id_NavRating:', id);

    return (
        <Stack.Navigator>
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
            />
        </Stack.Navigator>
    );
}

export default NavRating;

const styles = StyleSheet.create({})