import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import React from "react";
import COLORS from "../COLORS";
import { useNavigation } from "@react-navigation/native";

const PriceNameRatingSold = ({ productId, categoryId, price, name, rating, sold }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.containerPriceNameRatingSold}>
            <View style={styles.wrapProductName}>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "600",
                        flexWrap: 'wrap',
                    }}>{name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                    <View style={styles.wrapProductPrice}>
                        <Text style={{ fontSize: 16, color: COLORS.darkRed }}>{price}đ</Text>
                    </View>
                    <View style={styles.wrapProductRatingSold}>
                        <View style={styles.wrapProductRating}>
                            <FontAwesome
                                name={"star"}
                                size={14}
                                color={COLORS.darkOrange}
                            />
                            <Text style={{ fontSize: 14, marginLeft: 5, }}>{Math.round(rating * 10) / 10}/5</Text>
                        </View>
                        <View
                            style={{
                                marginHorizontal: 5,
                                borderWidth: 0.2,
                                borderColor: COLORS.lightGray,
                                height: "80%",
                            }}></View>
                        <View style={styles.wrapProductSold}>
                            <Text style={{ fontSize: 14, color: COLORS.lightGray }}>{sold} sold</Text>
                        </View>
                    </View>
                </View>
                <View >
                    <TouchableOpacity style={styles.btnCompareProduct}
                        onPress={() => { navigation.navigate('NavProduct', { productId, categoryId }) }}
                    >
                        <FontAwesome
                            name={"magic"}
                            size={24}
                            style={{ color: '#9400d3' }}
                        />
                    </TouchableOpacity>
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
    btnCompareProduct: {
        padding: 6,
        backgroundColor: '#f5f5f5',
        borderRadius: 50,
    }
})