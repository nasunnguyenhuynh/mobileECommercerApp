import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView, FlatList, useWindowDimensions } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"

import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer } from '@react-navigation/native';
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


    const data_desc =
    {
        "info":
        {
            "description": "<p>BLUETOOTH 5.2</p>\r\n\r\n<p>- Để tăng trải nghiệm kh&ocirc;ng d&acirc;y ho&agrave;n to&agrave;ntr&ecirc;n Headphone Bluetooth, ONEODIO đ&atilde; trang bị Bluetooth 5.2 hiện đại cho d&ograve;ng sản phẩm tai nghe Headphone Bluetooth OneOdio A70, đem lại 1 trải nghiệm kết nối nhanh, ổn định hơn với khoảng c&aacute;ch kết nối xa hơn.</p>\r\n\r\n<p>&nbsp;M&Agrave;NG LOA RỘNG 40MM - THIẾT KẾ OVER-EAR</p>\r\n\r\n<p>- ONEODIO A70 trang bị Driver40mm c&ugrave;ng thiết kế Over-Ear cho khả năng chống ồn thụ động tốt khi bao k&iacute;n được tai của người sử dụng.</p>\r\n\r\n<p>- Với m&agrave;ng loa rộng 40mm, A70 mang đến chất lượng sống động v&agrave; ch&acirc;n thực. &Acirc;mtrầm mạnh mẽ, giọng h&aacute;t r&otilde; r&agrave;ng v&agrave; &acirc;m cao sắc n&eacute;t tạo th&agrave;nh &acirc;mthanh c&acirc;n bằng ho&agrave;n hảo, n&acirc;ng cao trải nghiệm &acirc;m nhạc của người d&ugrave;ng.</p>\r\n\r\n"
        },
    }

    const name = "React Native: Correct scrolling in horizontal FlatList with Item Separator";
    // const productName = data.item.url.length > 50 ? data.item.url.substring(0, 50) + '...' : data.item.url;


    return (
        <ScrollView>
            <Carousel />
            <View style={styles.container}>
                <View style={{ marginVertical: 0 }}>
                    {/*price_name_rating_sold*/}
                    <PriceNameRatingSold />

                    {/*delivery*/}
                    <Delivery />

                    {/*shop*/}
                    <Shop />

                    {/*voucher*/}

                    {/* <ProductInfo/> */}
                    <Info />

                    {/*description*/}
                    <Description
                        data={data_desc.info.description}
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
        // backgroundColor: "#F5F5F5",
        backgroundColor: "gray",
        // flex: 1,
        // alignItems: "center",
    },

    // Component SlideVoucher
    //Flatlist


    //ScrollTopbutton

})