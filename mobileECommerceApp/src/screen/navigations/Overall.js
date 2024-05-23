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


function Overall({ navigation }) {
    const route = useRoute();

    const transportationNameMethod = 'Express';
    const methodPaymentName = 'VN PAY';
    const productDiscount = 2000;


    // Loading
    const loading = () => {
        return (
            <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} size="small" color="#bc2b78" />
        )
    }


    const [loadingUserData, setLoadingUserData] = useState(false);
    // Address & Info
    const [addresses, setAddresses] = useState([]);
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [id, setId] = useState([]);
    const [username, setUsername] = useState([]);
    const [phone, setPhone] = useState([]);


    const fetchAddresses = async () => { // Get addresses by userId
        setLoadingUserData(true)
        try {
            const axiosInstance = await authAPI();
            const user = await axiosInstance.get(endpoints.currentUser);
            if (user.data) { // fetch current user -> id, username, fname, lname, phone
                console.log('currentUser ', user.data)

                setId(user.data.id)
                setUsername(user.data.username)
                setLastName(user.data.last_name)
                setFirstName(user.data.first_name)
                setPhone(user.data.phone)

                try { // fetch user's addresses
                    const userAdreesses = await axiosInstance.get(endpoints.addresses(user.data.id));
                    if (userAdreesses.data) {
                        setAddresses(userAdreesses.data)
                    } else {
                        setAddresses([])
                    }
                } catch (error) {
                    console.error('Error fetching userAdreesses.data', error);
                } finally {
                    setLoadingUserData(false)
                }
            } else {
                console.error('Error: user.data is empty');
            }
        } catch (error) {
            console.error('Error fetching user.data:', error);
        } finally {
            setLoadingUserData(false)
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [route.params]);


    const renderAddresses = (item) => { // choose AddressDefault
        return (
            item.default && (
                <View style={styles.wrapAddress} key={item.id}>
                    <Text numberOfLines={1} ellipsizeMode="tail">{item.user.last_name + ' ' + item.user.first_name}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail">{item.user.phone}</Text>
                    <Text style={{ flexWrap: "wrap" }}>{item.address}</Text>
                </View>
            )
        )
    }

    const [shopName, setShopName] = useState(route.params.shopName);
    const [productId, setProductId] = useState(route.params.productId);
    const [productName, setProductName] = useState(route.params.productName);
    const [productImg, setProductImg] = useState(route.params.productImg);
    const [productPrice, setProductPrice] = useState(route.params.productPrice);
    const [quantity, setQuantity] = useState(route.params.quantity);
    const [colorId, setColorId] = useState(route.params.colorId);
    const [color, setColor] = useState(route.params.color);
    const [deliveryPrice, setDeliveryPrice] = useState(route.params.deliveryPrice);

    const totalProductPrice = productPrice * quantity;
    const total = productPrice * quantity + deliveryPrice;


    const createOrder = async (userId) => {
        setLoadingUserData(true);
        try { //createOrder
            const axiosInstance = await authAPI();
            const createOrder = await axiosInstance.post(endpoints.order(userId), {
                final_amount: total,
                quantity: quantity,
                product_id: productId,
                product_color_id: colorId,
            });
            if (createOrder.status === 201 && createOrder.data) {
                console.log('createOrder.data ', createOrder.data)
                try { //rerdirect to VNPAY
                    const response = await axiosInstance.post(endpoints.payment, {
                        order_ecommerce_id: createOrder.data.order.id,
                        amount: createOrder.data.order.final_amount,
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
                    setLoadingUserData(false)
                }
            }

        } catch (error) {
            console.error('Error creating order:', error);
        } finally {
            setLoadingUserData(false)
        }
    }

    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ marginHorizontal: 10, marginBottom: 50, }}>
                        {/* Address */}
                        <View style={styles.addressContainer}>
                            <View style={styles.wrapAddressIcon}>
                                <Ionicons
                                    name={"location-outline"}
                                    size={20}
                                    color={COLORS.lightGray}
                                    style={{}}
                                />
                            </View>
                            {/* Check user's address, lname+fname exist ? */}
                            {
                                loadingUserData ?
                                    loading() :
                                    (lastName.length === 0 || firstName.length === 0 || addresses.length === 0) ?
                                        <>
                                            <Text style={{ color: "red", }}>Please update your information </Text>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    navigation.navigate('NavAddress', {
                                                        id,
                                                        username,
                                                        firstName,
                                                        lastName,
                                                        addresses,
                                                        phone,
                                                        productPrice,
                                                        quantity,
                                                        color,
                                                    }
                                                    )}
                                            >

                                                <Text style={{
                                                    textDecorationLine: "underline",
                                                    fontWeight: "500",
                                                    color: COLORS.blueSky
                                                }}>here</Text>
                                            </TouchableOpacity>
                                        </> :
                                        (addresses.map(item => renderAddresses(item)))
                            }
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('NavAddress', {
                                        id,
                                        username,
                                        firstName,
                                        lastName,
                                        addresses,
                                        phone,
                                        productPrice,
                                        quantity,
                                        color,
                                    }
                                    )}
                            >
                                <Text style={{ color: COLORS.blueSky, fontSize: 12, }}>Change</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Product */}
                        <View style={styles.productContainer}>
                            <View>
                                <Text style={styles.shopName}>{shopName}</Text>
                            </View>
                            <View style={styles.wrapProduct}>
                                <Image source={productImg} style={styles.productImg} />
                                <View style={styles.wrapProductInfo}>
                                    <Text
                                        style={styles.productName}
                                        numberOfLines={1} ellipsizeMode="tail">{productName}</Text>
                                    <Text style={styles.productText}>Classification: {color}</Text>
                                    <Text style={styles.productText}>Quantity: {quantity}</Text>
                                    <Text style={styles.productText}>đ{FormatCurrency(productPrice)}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Transportation */}
                        <View style={styles.transportationContainer}>
                            <View style={styles.wrapTransportationMethodPrice}>
                                <Text style={{ fontWeight: "500", }}>{transportationNameMethod}</Text>
                                <Text>đ{FormatCurrency(deliveryPrice)}</Text>
                            </View>
                            <Text style={styles.transportationText}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
                                a type specimen book.
                            </Text>
                        </View>

                        {/* methodPayment */}
                        <TouchableOpacity style={styles.methodPaymentContainer}>
                            <View style={styles.wrapMethodPaymentLeft}>
                                <MaterialIcons name={"currency-exchange"} size={16} color={COLORS.darkRed} style={{}} />
                                <Text style={{ marginLeft: 5, }}>Method Payment</Text>
                            </View>
                            <View style={styles.wrapMethodPaymentRight}>
                                <Text>{methodPaymentName}</Text>
                                <AntDesign name={"right"} size={16} color={COLORS.lightGray} style={{}} />
                            </View>
                        </TouchableOpacity>

                        {/* PaymentDetailContainer */}
                        <View style={styles.paymentDetailContainer}>
                            <View style={styles.paymentDetailTitle}>
                                <FontAwesome name={"newspaper-o"} size={16} color={COLORS.darkOrange} style={{}} />
                                <Text style={{ marginLeft: 10, fontWeight: "500" }}>Payment Detail</Text>
                            </View>
                            <View style={styles.wrapTotalProductPrice}>
                                <Text>Total product price</Text>
                                <Text>đ{FormatCurrency(totalProductPrice)}</Text>
                            </View>
                            <View style={styles.wrapTotalTransportationFee}>
                                <Text>Total transportation fee</Text>
                                <Text>đ{FormatCurrency(deliveryPrice)}</Text>
                            </View>
                            {/* <View style={styles.wrapProductDiscount}>
                                <Text>Product discount</Text>
                                <Text>- đ{FormatCurrency(productDiscount)}</Text>
                            </View>
                            <View style={styles.wrapTransportationDiscount}>
                                <Text>Transportation discount</Text>
                                <Text>- đ{FormatCurrency(productDiscount)}</Text>
                            </View> */}
                            <View style={styles.wrapTotal}>
                                <Text style={{ fontSize: 16, }}>Total</Text>
                                <Text style={{ color: COLORS.darkOrange, fontSize: 16, }}>
                                    đ{FormatCurrency(total)}</Text>
                            </View>
                        </View>

                        {/* Noti terms */}
                        <View style={styles.notiTermsContainer}>
                            <FontAwesome name={"newspaper-o"} size={16} color={COLORS.darkOrange} style={{}} />
                            <Text style={{ marginLeft: 10, fontSize: 12 }}>
                                Clicking "
                                <Text style={{ fontWeight: "500", fontSize: 12 }}>Purchase</Text>
                                " means obeying our
                                <Text style={{ textDecorationLine: "underline", color: COLORS.blueSky }}> terms</Text>
                            </Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
            {/* footer */}
            <View style={styles.footerPayment}>
                <View style={styles.wrapFooterPayment}>
                    <View style={styles.displayTotal}>
                        <Text>Total</Text>
                        <Text style={{ color: COLORS.darkOrange, fontWeight: "500" }}>
                            đ{FormatCurrency(total)}</Text>
                    </View>
                    {
                        loadingUserData ?
                            loading() :
                            <TouchableOpacity style={styles.btnPurchase}
                                onPress={() => createOrder(id)}
                            >
                                <Text style={{ color: "#fff", fontWeight: "500" }}>Purchase</Text>
                            </TouchableOpacity>
                    }
                </View>
            </View>
        </>
    );
}

export default Overall;

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