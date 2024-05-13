import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView, FlatList, useWindowDimensions } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"

import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Badge } from "react-native-elements";

import api, { enpoints } from "../../utils/api";
import Carousel from "../../components/ProductDetail/Carousel"
import PriceNameRatingSold from "../../components/ProductDetail/PriceNameRatingSold"
import Delivery from "../../components/ProductDetail/Delivery"
import Shop from "../../components/ProductDetail/Shop"
import Description from "../../components/ProductDetail/Description"
import Info from "../../components/ProductDetail/Info"
import CommentsRatings from "../../components/ProductDetail/CommentsRatings"
import COLORS from "../../components/COLORS";


// User choose a product -> Get product by id --> ProductDetail.js
// --> GET: assign arg ->
// 1> Carousel 
// 2> PriceNameRatingSold 
// 3> Shop
// 4> Info
// 5> Description
// 6> CommentsRatings

//Check nav from Hompage, Shop, Cart
const ProductDetail = () => {
    const route = useRoute();
    const fromHome = route.params?.fromHome || false;
    const { name: productName, price,
        info: { origin, material, description, manufacture },
        sell: { rating, sold_quantity, delivery_price },
        shop: { img, name: nameShop, rated },
        images } = route.params.data;

    console.log('images', images)
    return (
        <ScrollView>
            <Carousel imgList={images} />
            <View style={styles.container}>
                <View style={{ marginVertical: 0 }}>
                    {/*price_name_rating_sold*/}
                    <PriceNameRatingSold
                        price={price}
                        name={productName}
                        rating={rating}
                        sold={sold_quantity}
                    />

                    {/*delivery*/}
                    <Delivery delivery_price={delivery_price} />

                    {/*shop*/}
                    <Shop name={nameShop} logo={img} rating={rated} />

                    {/*voucher*/}

                    {/* <ProductInfo/> */}
                    <Info origin={origin} material={material} manufacture={manufacture} />

                    {/*description*/}
                    <Description
                        description={description}
                    />


                    {/*comments*/}
                    <CommentsRatings />
                </View>
            </View>
        </ScrollView >
    )
}

export default ProductDetail;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
    },

    // Component SlideVoucher
    //Flatlist


    //ScrollTopbutton
})