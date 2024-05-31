import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import FormatCurrency from '../../components/FormatCurrency';
import { authAPI, endpoints } from "../../utils/api";
import COLORS from '../../components/COLORS';
// Xu ly data rong
const OrderConfirming = ({ navigation, route }) => {
    //console.log('userData ', route.params.userData)
    const [order, setOrder] = useState(route.params.orderConfirming);
    const [refreshing, setRefreshing] = useState(false); // For refreshing state

    const fetchOrders = async () => {
        setRefreshing(true);
        try {
            const axiosInstance = await authAPI();
            const response = await axiosInstance.get(endpoints.order(route.params.userData.id));
            if (response.status === 200 && response.data) {

                const confirming = [];
                response.data.forEach(order => {
                    const status = order.status.status;
                    if (status === "Đang thanh toán" || status === "Đã thanh toán") {
                        confirming.push(order);
                    }
                    setOrder(confirming);
                })

            } else {
                console.error('Error: response.data is empty');
            }
        } catch (error) {
            console.error('Error fetching order:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const handlePayment = async (item) => {
        //console.log('itemId ', item.id)
        try { //rerdirect to VNPAY
            const axiosInstance = await authAPI();
            const response = await axiosInstance.post(endpoints.payment, {
                order_ecommerce_id: item.id,
                amount: item.final_amount,
            });
            if (response.status === 200 && response.data.url) {
                console.log('response.data.url ', response.data.url)
                navigation.navigate('PaymentMethod', { url: response.data.url });
            } else {
                console.error('Error: URL not found in response');
            }

        } catch (error) {
            console.error('Error posting order to VNPAY:', error);
        } finally {
            //setLoadingUserData(false)
        }
    }

    const renderOrder = ({ item }) => {
        const {
            id, final_amount,
            product: { id: productId, img, name: productName, price, shop: { name: shopName }, delivery_price },
            order_detail: { quantity },
            order_color: { product_colors: { id: colorId, name_color, url_image } },
            status: { status }
        } = item;

        return (
            <View style={styles.containerOrder}>
                <View style={styles.orderTitle}>
                    <Text style={styles.shopName}>
                        {shopName.length > 15 ? shopName.substring(0, 15) + '...' : shopName}
                    </Text>
                    <Text style={styles.orderStatus}>
                        {status}
                    </Text>
                </View>
                <View style={styles.orderBody}>
                    <Image
                        source={{ uri: img }}
                        style={styles.orderImg}
                    />
                    <View style={styles.orderContent}>
                        <Text style={styles.productName}>
                            {productName.length > 25 ? productName.substring(0, 25) + '...' : productName}
                        </Text>
                        <View style={styles.wrapProductClassificationQuantity}>
                            <Text style={{ fontSize: 14, color: COLORS.lightGray }}>
                                {name_color}
                            </Text>
                            <Text style={{ fontSize: 14 }}>x
                                {quantity}
                            </Text>
                        </View>
                        <Text style={styles.productPrice}>đ{FormatCurrency(price)}</Text>
                    </View>
                </View>
                <View style={styles.orderTotal}>
                    <Text style={{ color: COLORS.lightGray }}>
                        Total: <Text style={{ color: 'tomato' }}>đ{FormatCurrency(final_amount)}</Text>
                    </Text>
                </View>
                {
                    status === "Đang thanh toán" ?
                        <View style={styles.orderFooter}>
                            <TouchableOpacity
                                style={styles.btnPurchase}
                                onPress={() => { handlePayment(item) }}
                            >
                                <Text style={{ color: "#fff" }}>Purchase</Text>
                            </TouchableOpacity>
                        </View> :
                        <></>
                }

            </View>
        )

    }

    return (
        <FlatList
            data={order}
            renderItem={renderOrder}
            keyExtractor={(item) => item.id.toString()}
            refreshing={refreshing}
            onRefresh={fetchOrders}
        />
    );
};

export default OrderConfirming;

const styles = StyleSheet.create({
    containerOrder: {
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    orderTitle: {
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    shopName: {
        fontSize: 14,
        fontWeight: '500',
    },
    orderStatus: {
        fontSize: 12,
        color: 'tomato',
    },
    orderBody: {
        padding: 10,
        borderBottomWidth: 0.2,
        borderColor: COLORS.lightGray,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    orderImg: {
        width: 100,
        height: 100,
        borderRadius: 4,
    },
    orderContent: {
        marginLeft: 10,
        flex: 1,
    },
    productName: { fontSize: 14 },
    wrapProductClassificationQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    productPrice: {
        fontSize: 14,
        color: 'tomato',
    },
    orderTotal: {
        padding: 10,
        borderBottomWidth: 0.2,
        borderColor: COLORS.lightGray,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    orderFooter: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    btnPurchase: {
        backgroundColor: 'tomato',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    }
})