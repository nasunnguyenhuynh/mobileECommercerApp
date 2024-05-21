import {
    StyleSheet, TouchableOpacity, View, Text, Image, ActivityIndicator
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import React, { useState, useEffect } from "react";
import { NavigationContainer, useRoute } from '@react-navigation/native';

import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import FormatCurrency from "../../components/FormatCurrency";
import { color } from "react-native-elements/dist/helpers";
import COLORS from "../../components/COLORS";
import api, { authAPI, endpoints } from "../../utils/api";
import UpdateInfo from "../../components/Payment/UpdateInfo";


function Payment({ navigation }) {
    const route = useRoute();


    const shopName = "ABCJFKFKK";
    const productName = 'Ao thun the thao nam ASDASDASDASDASDS';
    const classification = 'Blue';
    const productPrice = 178000; //FormatCurrency , total for quantity
    // const quantity = '2';
    const transportationNameMethod = 'Express';
    const transportationFee = 16000;
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

    const [price, setPrice] = useState(route.params.price);
    const [quantity, setQuantity] = useState(route.params.quantity);
    const [color, setColor] = useState(route.params.color);

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
                                                        price,
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
                                        price,
                                        quantity,
                                        color,
                                    }
                                    )}
                            >
                                <Text style={{ color: COLORS.blueSky, fontSize: 12, }}>Change</Text>
                            </TouchableOpacity>
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
                            đ{FormatCurrency(productDiscount)}</Text>
                    </View>
                    <View style={styles.btnPurchase}>
                        <Text style={{ color: "#fff", fontWeight: "500" }}>Purchase</Text>
                    </View>
                </View>
            </View>
        </>
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