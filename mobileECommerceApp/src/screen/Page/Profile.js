import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl, } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React, { useEffect, useState, useRef } from "react";
import { Badge } from "react-native-elements";
import { authAPI, endpoints } from "../../utils/api";
import { useNavigation } from "@react-navigation/native";
import OrderProcessElement from "../../components/Profile/OrderProcessElement";
import ExtensionElement from "../../components/Profile/ExtensionElement";
import COLORS from "../../components/COLORS";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from "@react-native-google-signin/google-signin";

const Profile = ({ navigation }) => {
    const numberMessage = 12;
    const numberProductInCart = 27;


    const [orderConfirming, setOrderConfirming] = useState([]);
    const [orderPacking, setOrderPacking] = useState([]);
    const [orderDelivering, setOrderDelivering] = useState([]);
    const [orderDelivered, setOrderDelivered] = useState([]);
    const [orderNotRated, setOrderNotRated] = useState([]);
    const [orderCanceled, setOrderCanceled] = useState([]);
    const [orderReturned, setOrderReturned] = useState([]);

    const classifyOrders = (orders) => {
        const confirming = [];
        const packing = [];
        const delivering = [];
        const delivered = [];
        const notRated = [];
        const canceled = [];
        const returned = [];

        orders.forEach(order => {
            const status = order.status.status;
            switch (status) {
                case "Đang thanh toán":
                    confirming.push(order);
                    break;
                case "Đã thanh toán":
                    confirming.push(order);
                    break;
                case "Đang chuẩn bị hàng":
                    packing.push(order);
                    break;
                case "Đang giao hàng":
                    delivering.push(order);
                    break;
                case "Đã giao":
                    delivered.push(order);
                    break;
                case "Đã hủy":
                    canceled.push(order);
                    break;
                default:
                    break;
            }
        });

        delivered.forEach(order => {
            if (!order.is_rating_comment) {
                notRated.push(order);
            }
        })

        setOrderConfirming(confirming);
        setOrderPacking(packing);
        setOrderDelivering(delivering);
        setOrderDelivered(delivered);
        setOrderNotRated(notRated);
        setOrderCanceled(canceled);
        setOrderReturned(returned);
    };

    const [userData, setUserData] = useState(null);
    const [confirmation, setConfirmation] = useState('');
    const [order, setOrder] = useState('');
    const [loadingUserData, setLoadingUserData] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loading = () => {
        return (
            <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} size="small" color="#bc2b78" />
        )
    }

    const fetchUserData = async () => {
        try {
            const axiosInstance = await authAPI();
            const response = await axiosInstance.get(endpoints.currentUser);

            if (response.data) {
                setUserData(response.data);
                const dataConfirm = await axiosInstance.get(endpoints.confirmationShop(response.data.id));
                setConfirmation(dataConfirm.data);
                //console.log('dataConfirm.data ', dataConfirm.data)

                const dataOrder = await axiosInstance.get(endpoints.order(response.data.id));
                setOrder(dataOrder.data);
                //console.log('dataOrder.data ', dataOrder.data)
                classifyOrders(dataOrder.data);

            } else {
                console.error('Error: response.data is empty');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoadingUserData(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchUserData();
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        if (GoogleSignin.getCurrentUser()) {
            await GoogleSignin.signOut();
            navigation.navigate('Login');
        }
        else {
            const axiosInstance = await authAPI();
            axiosInstance.post(endpoints.logout)
                .then(async response => {
                    if (response.status === 200 && response.data) {
                        console.log(response.data);
                        navigation.navigate('Login');
                    }
                })
                .catch(error => {
                    console.error('Logout failed:', error);
                });
        }
    }

    return (
        <View style={styles.container}>
            {userData ? (
                <>
                    <View style={{ marginHorizontal: 10, marginTop: 40 }}>
                        {/*Header*/}
                        <View style={styles.wrapHeaderProfile}>
                            <View style={styles.wrapUserInfo} >
                                <TouchableOpacity style={styles.avatarContainer} >
                                    <Image
                                        source={{ uri: userData.avatar }}
                                        style={styles.avatar}
                                    />
                                    <View style={styles.iconContainer} >
                                        <FontAwesome
                                            name={"pencil"}
                                            size={16}
                                            color={"black"}
                                            style={{}}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.userInfo}>
                                    <Text style={{ fontWeight: "500" }}>{userData.username}</Text>
                                </View>
                            </View>

                            {/* Setting_Cart_Chat */}
                            <View style={styles.wrapSettingCartMessage}>
                                <View>
                                    <AntDesign
                                        name={"setting"}
                                        size={30}
                                        color={"black"}
                                    />
                                </View>
                                <View style={{ position: 'relative' }}>
                                    <Feather
                                        name={"shopping-cart"}
                                        size={30}
                                        color={"black"}
                                        style={styles.socialIcon}
                                    />
                                    <Badge
                                        badgeStyle={{
                                            backgroundColor: "#cf3131",
                                        }}
                                        containerStyle={{
                                            position: 'absolute',
                                            top: -6,
                                            right: -6,
                                        }}
                                        onPress={() => {
                                            alert("message");
                                        }}
                                        status="error"
                                        textProps={{}}
                                        textStyle={{
                                            fontSize: 10,
                                        }}
                                        value={numberProductInCart}
                                        options={{}}
                                    />
                                </View>
                                <View style={{ position: 'relative' }}>
                                    <Ionicons
                                        name={"chatbubbles-outline"}
                                        size={30}
                                        color={"black"}
                                        style={styles.socialIcon}
                                    />
                                    <Badge
                                        badgeStyle={{
                                            backgroundColor: "#cf3131",
                                        }}
                                        containerStyle={{
                                            position: 'absolute',
                                            top: -6,
                                            right: -6,
                                        }}
                                        onPress={() => {
                                            alert("message");
                                        }}
                                        status="error"
                                        textProps={{}}
                                        textStyle={{
                                            fontSize: 10,
                                        }}
                                        value={numberMessage}
                                        options={{}}
                                    />
                                </View>
                            </View>
                        </View>

                    </View>
                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        {/*Order*/}
                        <View style={styles.wrapOrder}>
                            <TouchableOpacity
                                style={styles.wrapOrderTitle}
                                onPress={() => {
                                    navigation.navigate('NavOrder', {
                                        userData,
                                        orderConfirming,
                                        orderPacking,
                                        orderDelivering,
                                        orderDelivered,
                                        orderCanceled,
                                        orderReturned
                                    })
                                }}
                            >
                                <Text style={{ fontWeight: "500" }}>Order</Text>
                                <Text style={{ color: "#3169f5", textDecorationLine: 'underline' }}>Order History</Text>
                            </TouchableOpacity>
                            <View style={styles.wrapOrderProcess}>
                                <OrderProcessElement
                                    iconType={"Ionicons"}
                                    iconName={"wallet-outline"}
                                    text={"Confirming"}
                                    value={orderConfirming.length} />
                                <OrderProcessElement
                                    iconType={"Feather"}
                                    iconName={"package"}
                                    text={"Packing"}
                                    value={orderPacking.length} />
                                <OrderProcessElement
                                    iconType={"Feather"}
                                    iconName={"truck"}
                                    text={"Delivering"}
                                    value={orderDelivering.length} />
                                <OrderProcessElement
                                    iconType={"AntDesign"}
                                    iconName={"staro"}
                                    text={"Rating"}
                                    value={orderNotRated.length} />
                            </View>
                        </View>

                        {/*Extension*/}
                        <View style={styles.wrapExtension}>
                            <View style={styles.wrapExtensionTitle}>
                                <Text style={{ fontWeight: "500" }}>Extension</Text>
                            </View>
                            <View style={styles.wrapExtensionComponent}>
                                <TouchableOpacity style={{ width: "48%" }}>
                                    <ExtensionElement
                                        iconType={"Ionicons"} iconName={"medal-outline"}
                                        iconColor={"#e7700d"} text={"Loyal Customer"}
                                        containerStyle={{ width: "100%", borderColor: "#e7700d" }}
                                        textStyle={{ fontSize: 12, fontWeight: "400", color: "#e7700d" }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: "48%" }}>
                                    <ExtensionElement
                                        iconType={"AntDesign"} iconName={"hearto"}
                                        iconColor={"#cf3131"} text={"Liked"}
                                        containerStyle={{ width: "100%", borderColor: "#cf3131" }}
                                        textStyle={{ fontSize: 12, fontWeight: "400", color: "#cf3131" }} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.wrapExtensionComponent}>
                                <TouchableOpacity style={{ width: "48%" }}>
                                    <ExtensionElement
                                        iconType={"AntDesign"} iconName={"clockcircleo"}
                                        iconColor={"blue"} text={"Recently Viewd"}
                                        containerStyle={{ width: "100%", borderColor: "blue" }}
                                        textStyle={{ fontSize: 12, fontWeight: "400", color: "blue" }} />
                                </TouchableOpacity>
                                {
                                    loadingUserData ? (
                                        loading()
                                    ) :
                                        confirmation ? (
                                            confirmation.status.id === 1 ? (
                                                <TouchableOpacity style={{ width: "48%" }} onPress={() => navigation.navigate('NavExtension', { userId: userData.id, statusId: confirmation.status.id })}>
                                                    <ExtensionElement
                                                        iconType={"Ionicons"} iconName={"storefront-outline"}
                                                        iconColor={"green"} text={"My Store"}
                                                        containerStyle={{ width: "100%", borderColor: "green" }}
                                                        textStyle={{ fontSize: 12, fontWeight: "400", color: "green" }} />
                                                </TouchableOpacity>
                                            ) : confirmation.status.id === 2 ? (
                                                <TouchableOpacity style={{ width: "48%" }} onPress={() => navigation.navigate('NavExtension', { userId: userData.id, statusId: confirmation.status.id })}>
                                                    <ExtensionElement
                                                        iconType={"Ionicons"} iconName={"storefront-outline"}
                                                        iconColor={"gray"} text={"Create Store"}
                                                        containerStyle={{ width: "100%", borderColor: "gray" }}
                                                        textStyle={{ fontSize: 12, fontWeight: "400", color: "gray" }} />
                                                </TouchableOpacity>
                                            ) : confirmation.status.id === 3 ? (
                                                <TouchableOpacity style={{ width: "48%" }} onPress={() => navigation.navigate('NavExtension', { userId: userData.id, statusId: confirmation.status.id })}>
                                                    <ExtensionElement
                                                        iconType={"Ionicons"} iconName={"storefront-outline"}
                                                        iconColor={"navy"} text={"Needs Edit"}
                                                        containerStyle={{ width: "100%", borderColor: "navy" }}
                                                        textStyle={{ fontSize: 12, fontWeight: "400", color: "navy" }} />
                                                </TouchableOpacity>
                                            ) : confirmation.status.id === 4 ? (

                                                <View style={{ width: "48%" }}>
                                                    <ExtensionElement
                                                        iconType={"Ionicons"} iconName={"storefront-outline"}
                                                        iconColor={"powderblue"} text={"Confirming"}
                                                        containerStyle={{ width: "100%", borderColor: "powderblue" }}
                                                        textStyle={{ fontSize: 12, fontWeight: "400", color: "powderblue" }} />
                                                </View>

                                            ) : loading()
                                        ) : (<TouchableOpacity style={{ width: "48%" }} onPress={() => navigation.navigate('NavExtension', { userId: userData.id, statusId: 0 })}>
                                            <ExtensionElement
                                                iconType={"Ionicons"} iconName={"storefront-outline"}
                                                iconColor={"gray"} text={"Create Store"}
                                                containerStyle={{ width: "100%", borderColor: "gray" }}
                                                textStyle={{ fontSize: 12, fontWeight: "400", color: "gray" }} />
                                        </TouchableOpacity>)
                                }

                                {/* Check status_id
                                    1: success, 2 : fail,
                                    3: edit, 4: confirming    
                                */}


                            </View>
                        </View>

                        {/*Support*/}
                        <View style={styles.wrapSupport}>
                            <View style={styles.wrapSupportTitle}>
                                <Text style={{ fontWeight: "500" }}>Support</Text>
                            </View>
                            <View style={styles.wrapSupportComponent}>
                                <ExtensionElement iconType={"AntDesign"} iconName={"questioncircleo"} text={"Help Center"}
                                    containerStyle={{ width: "100%", marginBottom: 8 }}
                                    textStyle={{ fontSize: 14, fontWeight: "500" }} />
                                <ExtensionElement iconType={"AntDesign"} iconName={"customerservice"} text={"Customer Service"}
                                    containerStyle={{ width: "100%" }}
                                    textStyle={{ fontSize: 14, fontWeight: "500" }} />
                            </View>
                        </View>

                        {/*Short cut*/}
                        <View style={styles.wrapSupport}>
                            <View style={styles.wrapSupportTitle}>
                                <Text style={{ fontWeight: "500" }}>Short cut</Text>
                            </View>
                            <View style={styles.wrapSupportComponent}>
                                <TouchableOpacity onPress={handleLogout}>
                                    <ExtensionElement
                                        iconType={"MaterialIcons"}
                                        iconColor={COLORS.blueSky}
                                        iconName={"logout"}
                                        text={"Logout"}
                                        containerStyle={{ width: "100%", marginBottom: 8, borderColor: COLORS.blueSky }}
                                        textStyle={{ fontSize: 14, fontWeight: "500", color: COLORS.blueSky }} />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </ScrollView>
                </>
            ) : (
                loading()
            )}

        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        flex: 1,
    },
    wrapHeaderProfile: {
        flexDirection: "row",
        alignItems: "center",
    },
    wrapUserInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 14,
        flex: 2,
    },
    avatarContainer: {
        flexDirection: "row",
        justifyContent: "center",
        position: "relative",
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    iconContainer: {
        position: "absolute",
        top: "60%",
        left: "60%",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "gray",
        width: 20,
        height: 20,
        borderRadius: 100,
    },
    userInfo: {
        marginVertical: 4,
        marginHorizontal: 6,
    },
    wrapSettingCartMessage: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        justifyContent: "space-between",
    },
    wrapOrder: {
        marginVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    wrapOrderTitle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    wrapOrderProcess: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
        marginHorizontal: 16,
    },
    wrapExtension: {
        marginVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    wrapExtensionTitle: {
        marginVertical: 8,
    },
    wrapExtensionComponent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },

    wrapSupport: {
        marginVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    wrapSupportTitle: {
        marginVertical: 8,
    },
    wrapSupportComponent: {
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
})