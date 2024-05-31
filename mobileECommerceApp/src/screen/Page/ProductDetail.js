import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView, FlatList, useWindowDimensions } from "react-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"

import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Badge } from "react-native-elements";

import api, { enpoints } from "../../utils/api";
import AddToCart from "../../components/ProductDetail/AddToCart"
import Carousel from "../../components/ProductDetail/Carousel"
import PriceNameRatingSold from "../../components/ProductDetail/PriceNameRatingSold"
import Delivery from "../../components/ProductDetail/Delivery"
import Shop from "../../components/ProductDetail/Shop"
import Description from "../../components/ProductDetail/Description"
import Info from "../../components/ProductDetail/Info"
import CommentsRatings from "../../components/ProductDetail/CommentsRatings"
import COLORS from "../../components/COLORS";
import FormatCurrency from "../../components/FormatCurrency";
import useModal from "../../components/useModal"

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
    const route = useRoute();  // to get field from JSON
    // const fromHome = route.params?.fromHome || false;
    // console.log('data', route.params.data)
    const { id: productId, name: productName, price, images,
        info: { origin, material, description, manufacture },
        colors,
        sell: { rating, sold_quantity, delivery_price }, // getTotalRatingProduct
        shop: { img, name: shopName, rated },
        category: { id: categoryId },
    } = route.params.data;
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);
    const scrollViewRef = useRef(null);

    const handleScroll = (event) => {
        const yOffset = event.nativeEvent.contentOffset.y;
        setShowScrollTopButton(yOffset > 300);
    };

    const scrollToTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ yOffset: 0, animated: true });
        }
    };

    const { isModalVisible, openModal, closeModal } = useModal();

    return (
        <>
            <ScrollView
                ref={scrollViewRef}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <Carousel imgList={images} />
                <View style={styles.container}>
                    <View style={{ marginVertical: 0 }}>
                        {/*price_name_rating_sold*/}
                        <PriceNameRatingSold
                            productId={productId}
                            categoryId={categoryId}
                            price={FormatCurrency(price)}
                            name={productName}
                            rating={rating}
                            sold={sold_quantity}
                        />

                        {/*delivery*/}
                        <Delivery delivery_price={FormatCurrency(delivery_price)} />

                        {/*shop*/}
                        <Shop name={shopName} logo={img} rating={rated} />

                        {/*voucher*/}

                        {/* <ProductInfo/> */}
                        <Info origin={origin} material={material} manufacture={manufacture} />

                        {/*description*/}
                        <Description
                            description={description}
                        />

                        {/*comments */}
                        <CommentsRatings
                            product_id={productId}
                            averageStarProductRating={rating}
                            averageStarShopRating={rated} />

                        {/* <AddToCart/> */}
                        {isModalVisible && (
                            <AddToCart
                                visible={isModalVisible}
                                closeModal={closeModal}
                                colors={colors}
                                productPrice={price}
                                shopName={shopName}
                                productName={productName}
                                deliveryPrice={delivery_price}
                                productId={productId}
                            />
                        )}
                    </View>
                </View>
            </ScrollView >
            {showScrollTopButton && (
                <TouchableOpacity style={styles.scrollTopButton} onPress={scrollToTop}>
                    <AntDesign name="arrowup" size={24} color="white" />
                </TouchableOpacity>
            )}
            <View style={styles.footerProductDetail}>
                <View style={styles.wrapBtnChatCart}>
                    <TouchableOpacity style={styles.wrapIcon}>
                        <Ionicons
                            name={"chatbubbles-outline"}
                            size={30}
                            color={"black"}
                        />
                    </TouchableOpacity>
                    <Text style={{ borderWidth: 0.2, borderColor: COLORS.lightGray, }}></Text>
                    <TouchableOpacity style={styles.wrapIcon} onPress={openModal}>
                        <FontAwesome5
                            name={"cart-plus"}
                            size={30}
                            color={"black"}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.wrapBtnBuy} onPress={openModal}>
                    <Text>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ProductDetail;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
    },

    // Component SlideVoucher
    //Flatlist
    footerProductDetail: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        height: 50,
    },
    wrapBtnChatCart: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        height: "100%",
        backgroundColor: COLORS.blueSky,
    },
    wrapIcon: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    wrapBtnBuy: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        height: "100%",
        backgroundColor: "tomato",
    },
    //ScrollTopbutton
    scrollTopButton: {
        position: 'absolute',
        bottom: 60,
        right: 20,
        backgroundColor: 'gray',
        width: 40,
        height: 40,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },

})