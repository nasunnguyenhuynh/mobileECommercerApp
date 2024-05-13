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

const PriceNameRatingSold = () => {
    {/*price_name_rating_sold*/ }
    const price = 0;
    const name = "React Native: Correct scrolling in horizontal FlatList with Item Separator";
    // const productName = data.item.url.length > 50 ? data.item.url.substring(0, 50) + '...' : data.item.url;
    const productName = name.length > 70 ? name.substring(0, 70) + '...' : name;
    const rating = 0;
    const sold = 0;

    return (
        <View style={styles.containerPriceNameRatingSold}>
            <View style={styles.wrapProductName}>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "600",
                    }}>{productName}</Text>
            </View>
            <View style={styles.wrapProductPrice}>
                <Text style={{ fontSize: 16, color: COLORS.darkRed }}>123.000đ</Text>
            </View>
            <View style={styles.wrapProductRatingSold}>
                <View style={styles.wrapProductRating}>
                    <FontAwesome
                        name={"star"}
                        size={14}
                        color={COLORS.darkOrange}
                    />
                    <Text style={{ fontSize: 14, marginLeft: 5, }}>4.7 / 5</Text>
                </View>
                <View
                    style={{
                        marginHorizontal: 5,
                        borderWidth: 0.2,
                        borderColor: COLORS.lightGray,
                        height: "80%",
                    }}></View>
                <View style={styles.wrapProductSold}>
                    <Text style={{ fontSize: 14, color: COLORS.lightGray }}>23k sold</Text>
                </View>
            </View>

        </View>
    )
}

export default PriceNameRatingSold;

const styles = StyleSheet.create({
    // PriceNameRatingSold
    containerPriceNameRatingSold: {
        backgroundColor: "#fff",
        marginBottom: 10,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    wrapProductName: {

    },
    wrapProductPrice: {

    },
    wrapProductRatingSold: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    wrapProductRating: {
        flexDirection: "row",
        alignItems: "center",
    },
    wrapProductSold: {
    },
})