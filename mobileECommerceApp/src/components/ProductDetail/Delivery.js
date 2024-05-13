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

const Delivery = () => {
    {/*price_name_rating_sold*/ }
    const fee = "30.000";

    return (
        <View style={styles.containerDeliveryFee}>
            <View style={styles.wrapDeliveryTitle}>
                <Text style={{
                    fontWeight: "500",
                }}>Delivery Fee</Text>
                <Text style={{
                    marginLeft: 10,
                    fontWeight: "500",
                    color: "tomato",
                }}>đ{fee}</Text>
            </View>
            <View style={styles.wrapDeliveryText}>
                <Text style={styles.deliveryText}>Free shipping for orders from đxxxxx</Text>
                <Text style={styles.deliveryText}>Guaranteed delivery from xxx to xxx</Text>
                <Text style={styles.deliveryText}>Receive a voucher worth xxx if your order arrives later than expected</Text>
                <View style={{
                    marginVertical: 5,
                }}>
                    <Text style={{ color: COLORS.blueSky }}>Select shipping unit</Text>
                </View>
            </View>
        </View>
    )
}

export default Delivery;

const styles = StyleSheet.create({
    containerDeliveryFee: {
        backgroundColor: "#fff",
        marginBottom: 10,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    wrapDeliveryTitle: {
        flexDirection: "row",
        marginBottom: 4,
    },
    wrapDeliveryText: {

    },
    deliveryText: {
        fontSize: 12,
        color: COLORS.lightGray,
    },
})