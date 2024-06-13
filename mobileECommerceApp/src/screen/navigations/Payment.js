import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
    ActivityIndicator,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import React, { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';

import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import FormatCurrency from "../../components/FormatCurrency";
import COLORS from "../../components/COLORS";
import api, { authAPI, endpoints } from "../../utils/api";
import { createStackNavigator } from '@react-navigation/stack';
import Overall from "./Overall";

const Stack = createStackNavigator();

function Payment({ navigation }) {
    //console.log('Payment')
    const route = useRoute();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Overall"
                component={Overall}
                initialParams={{
                    productId: route.params.productId,
                    productName: route.params.productName,
                    productImg: route.params.productImg,
                    productPrice: route.params.productPrice,
                    quantity: route.params.quantity,
                    colorId: route.params.colorId,
                    colorName: route.params.colorName,
                    shopName: route.params.shopName,
                    deliveryPrice: route.params.deliveryPrice,
                }} // pass initialParams to Overall
                options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                            <AntDesign name="arrowleft" size={30} color="black" />
                        </TouchableOpacity>
                    ),
                    headerTitle: 'Payment',
                }}
            />
        </Stack.Navigator>
    );
}

export default Payment;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        flex: 1,
    },
    // Address 
    addressContainer: {
        marginVertical: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 6,
        paddingVertical: 4,
    },
    wrapAddressIcon: {
        height: "100%",
    },
    wrapAddress: {
        marginLeft: 10,
        flex: 1,
    },
    // Product
    productContainer: {
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 4,
    },
    shopName: { fontWeight: "500" },
    wrapProduct: {
        flexDirection: "row",
        alignItems: "center",
    },
    productImg: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    wrapProductInfo: {
        flex: 1,
        marginLeft: 5,
    },
    productName: {
        flexWrap: 'wrap',
    },
    productText: { color: COLORS.lightGray, fontSize: 14, },

    // Transportation
    transportationContainer: {
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 4,
        backgroundColor: "powderblue",
    },
    wrapTransportationMethodPrice: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    transportationText: {
        flexWrap: "wrap",
        fontSize: 12,
        color: COLORS.lightGray,
    },
    // methodPayment
    methodPaymentContainer: {
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 4,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
    },
    wrapMethodPaymentLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    wrapMethodPaymentRight: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-end',
    },
    // PaymentDetailContainer
    paymentDetailContainer: {
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 4,
    },
    paymentDetailTitle: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
    },
    wrapTotalProductPrice: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    wrapTotalTransportationFee: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    wrapProductDiscount: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    wrapTransportationDiscount: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    wrapTotal: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    //
    notiTermsContainer: {
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 4,

        flexDirection: "row",
        alignItems: "center",
    },
    // footer
    footerPayment: {
        position: "absolute",
        bottom: 0,
        height: "8%",
        width: "100%",
        backgroundColor: "#fff",
    },
    wrapFooterPayment: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        height: "100%",
    },
    displayTotal: {
        height: "100%",
        backgroundColor: COLORS.lightGray,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
    },

    btnPurchase: {
        height: "100%",
        backgroundColor: COLORS.darkOrange,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 8,
        paddingVertical: 12,
    },
})