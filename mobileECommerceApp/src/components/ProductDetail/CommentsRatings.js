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
import COLORS from "../../components/COLORS";

const CommentsRatings = () => {
    const ratingProuct = 4.6;
    const totalRatingProduct = 892;
    const username = "tranlong123";
    const userRating = 5;
    const userComment = "safasdfasdfsdfasafasdfasdfsdfasafasdfasdfsdfasafasdfasdfsdfasafasdfasdfsdfasafasdfasdfsdfa";
    const productType = "Colors Size"

    const stars = Array.from({ length: userRating }, (_, index) => index + 1);
    // stars is instance Array
    // { length: userRating }: init number e of stars
    // (_, index) => index + 1: 1st arg not be used, return for key of FontAwesome start from 1
    return (
        // <Text>Com fefee</Text>
        //        <View style={styles.containerCommentsRatings}></View>
        // style={{ backgroundColor: "yellow" }}
        //Kiem tra mua hang + dang nhap -> Danh gia/Comment Sanpham/Shop

        //Comment + Rating > Rating > Comment/
        //GET: comment+rating of product by id product

        <View style={styles.containerCommentsRatings}>
            <View style={styles.wrapCommentsRatingsHeader}>
                <View>
                    <View style={styles.commentsRatingsTitle}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "500",
                            textTransform: 'capitalize',
                        }}>Rating Products</Text>
                    </View>
                    <View style={styles.commentsRatingsTitleDetail}>
                        <View style={styles.wrapProductRating}>
                            <FontAwesome
                                name={"star"}
                                size={10}
                                color={COLORS.darkOrange}
                            />
                            <Text style={{ fontSize: 10, marginLeft: 5, color: COLORS.darkRed }}>{ratingProuct}/5</Text>
                        </View>
                        <View style={styles.wrapTotalProductRating}>
                            <Text style={{ fontSize: 10, color: COLORS.lightGray }}>(Total {totalRatingProduct} ratings)</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.btnCommentsRatingsViewAll}>
                        <Text style={{ color: COLORS.darkOrange }}>View all</Text>
                        <AntDesign
                            name={"right"}
                            size={14}
                            color={COLORS.darkOrange}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Start Loop */}
            <View style={styles.containerUserCommentRating}>
                <View style={styles.wrapUserRating}>
                    <Image
                        source={require("../../assets/images/logo.jpg")}
                        style={styles.avatarUser}
                    />
                    <View style={styles.wrapUserNameRating}>
                        <Text style={{ fontSize: 12, fontWeight: "500" }}>{username}</Text>
                        {/* loop star */}
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {stars.map((star, index) => (
                                <FontAwesome
                                    key={index}
                                    name={"star"}
                                    size={12}
                                    color={COLORS.darkOrange}
                                    style={{ marginRight: 2 }}
                                />
                            ))}
                        </View>
                    </View>
                </View>
                <View style={styles.wrapUserComment}>
                    <Text style={{ color: COLORS.lightGray, flexWrap: 'wrap' }}>Classification: {productType}</Text>
                    <Text style={{ flexWrap: 'wrap', }}>{userComment}</Text>
                </View>
            </View>
            <View style={styles.containerUserCommentRating}>
                <View style={styles.wrapUserRating}>
                    <Image
                        source={require("../../assets/images/logo.jpg")}
                        style={styles.avatarUser}
                    />
                    <View style={styles.wrapUserNameRating}>
                        <Text style={{ fontSize: 12, fontWeight: "500" }}>{username}</Text>
                        {/* loop star */}
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {stars.map((star, index) => (
                                <FontAwesome
                                    key={index}
                                    name={"star"}
                                    size={12}
                                    color={COLORS.darkOrange}
                                    style={{ marginRight: 2 }}
                                />
                            ))}
                        </View>
                    </View>
                </View>
                <View style={styles.wrapUserComment}>
                    <Text style={{ color: COLORS.lightGray, flexWrap: 'wrap' }}>Classification: {productType}</Text>
                    <Text style={{ flexWrap: 'wrap', }}>{userComment}</Text>
                </View>
            </View>
            <View style={styles.containerUserCommentRating}>
                <View style={styles.wrapUserRating}>
                    <Image
                        source={require("../../assets/images/logo.jpg")}
                        style={styles.avatarUser}
                    />
                    <View style={styles.wrapUserNameRating}>
                        <Text style={{ fontSize: 12, fontWeight: "500" }}>{username}</Text>
                        {/* loop star */}
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {stars.map((star, index) => (
                                <FontAwesome
                                    key={index}
                                    name={"star"}
                                    size={12}
                                    color={COLORS.darkOrange}
                                    style={{ marginRight: 2 }}
                                />
                            ))}
                        </View>
                    </View>
                </View>
                <View style={styles.wrapUserComment}>
                    <Text style={{ color: COLORS.lightGray, flexWrap: 'wrap' }}>Classification: {productType}</Text>
                    <Text style={{ flexWrap: 'wrap', }}>{userComment}</Text>
                </View>
            </View>
            {/* End  Loop */}
        </View>
    )
}

export default CommentsRatings;

const styles = StyleSheet.create({
    // Component Comments_Ratings --> Using collapse
    containerCommentsRatings: {
        backgroundColor: "#fff",
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    wrapCommentsRatingsHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 8,
        // backgroundColor: "yellow"
    },
    commentsRatingsTitle: {},
    commentsRatingsTitleDetail: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    wrapProductRating: {
        flexDirection: "row",
        alignItems: "center",
    },
    wrapTotalProductRating: {
        marginLeft: 5,
    },
    btnCommentsRatingsViewAll: {
        flexDirection: "row",
        alignItems: "center",
    },

    // Component userCommentRating
    containerUserCommentRating: {
        // backgroundColor: "tomato",
        paddingVertical: 8,
        borderTopWidth: 0.2,
        borderTopColor: "#ccc",
    },
    wrapUserRating: {
        flexDirection: "row",
    },
    avatarUser: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    wrapUserNameRating: {
        marginLeft: 5,
    },
    wrapUserComment: {

    },



})