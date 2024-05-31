import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView, FlatList, } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Searchbar } from 'react-native-paper';
import { Badge } from "react-native-elements";
import COLORS from "../COLORS";
// import api, { enpoints } from "../../utils/api";

const Shop = ({ name, logo, rating }) => {
    const locationShop = "TP.Hồ Chí Minh";
    const totalProducts = "37";

    return (
        <View style={styles.containerShop}>
            <View style={styles.wrapShopTop}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                }}>
                    <Image
                        source={{ uri: logo }}
                        style={styles.logoShop}
                    />
                    <View style={styles.wrapNameLocationShop}>
                        <Text>{name.length > 12 ? name.substring(0, 12) : name + ' ...'}</Text>
                        <View style={styles.locationShop}>
                            <Ionicons
                                name={"location-outline"}
                                size={16}
                                color={COLORS.lightGray}
                                style={{}}
                            />
                            <Text
                                style={{
                                    color: COLORS.lightGray,
                                    fontSize: 10,
                                }}>
                                {locationShop}
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.btnViewShop}>
                    <Text style={{ color: COLORS.darkRed }}>View Shop</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.wrapShopBottom}>
                <View style={styles.totalProduct}>
                    <Text style={{ color: COLORS.darkRed, fontSize: 10 }}>{totalProducts}</Text>
                    <Text style={{ marginLeft: 4, fontSize: 10 }}>Products</Text>
                </View>
                <View style={styles.rating}>
                    <Text style={{ color: COLORS.darkRed, fontSize: 10 }}>{Math.round(rating * 10) / 10}</Text>
                    <Text style={{ marginLeft: 4, fontSize: 10 }}>Ratings</Text>
                </View>
            </View>
        </View>
    )
}

export default Shop;

const styles = StyleSheet.create({
    containerShop: {
        backgroundColor: "#fff",
        marginBottom: 10,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    wrapShopTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    logoShop: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    wrapNameLocationShop: {
        marginLeft: 10,
    },
    nameShop: {},
    locationShop: {
        flexDirection: "row",
        alignItems: "center",
    },
    btnViewShop: {
        borderWidth: 1,
        borderColor: COLORS.darkRed,
        paddingVertical: 4,
        paddingHorizontal: 6,
    },
    wrapShopBottom: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    totalProduct: {
        flexDirection: "row",
        alignItems: "center",
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },
})