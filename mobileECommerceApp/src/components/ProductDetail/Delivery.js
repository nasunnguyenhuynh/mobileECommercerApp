import { Image, StyleSheet, Text, View, } from "react-native";
import React from "react";
import COLORS from "../COLORS";

const Delivery = ({ delivery_price }) => {

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
                }}>đ{delivery_price}</Text>
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