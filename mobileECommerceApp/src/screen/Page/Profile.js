import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, FlatList, } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React, { useEffect, useState, useRef } from "react";
import { Badge } from "react-native-elements";
import api, { enpoints } from "../../utils/api";
import OrderProcessElement from "../../components/Profile/OrderProcessElement";
import ExtensionElement from "../../components/Profile/ExtensionElement";

const Profile = () => {
    const numberMessage = 12;
    const numberProductInCart = 27;
    const numberConfirming = 2;
    const numberPacking = 4;
    const numberDelivering = 5;
    const numberRating = 0;

    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: 10, marginTop: 40 }}>
                {/*Header*/}
                <View style={styles.wrapHeaderProfile}>
                    <View style={styles.wrapUserInfo} >
                        <TouchableOpacity style={styles.avatarContainer} >
                            <Image
                                source={require("../../assets/images/logo.jpg")}
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
                            <Text style={{ fontWeight: "500" }}>Username</Text>
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
            <ScrollView>
                {/*Order*/}
                <View style={styles.wrapOrder}>
                    <View style={styles.wrapOrderTitle}>
                        <Text style={{ fontWeight: "500" }}>Order</Text>
                        <Text style={{ color: "#3169f5", textDecorationLine: 'underline' }}>Order History</Text>
                    </View>
                    <View style={styles.wrapOrderProcess}>
                        <OrderProcessElement
                            iconType={"Ionicons"}
                            iconName={"wallet-outline"}
                            text={"Confirming"}
                            value={numberConfirming} />
                        <OrderProcessElement
                            iconType={"Feather"}
                            iconName={"package"}
                            text={"Packing"}
                            value={numberPacking} />
                        <OrderProcessElement
                            iconType={"Feather"}
                            iconName={"truck"}
                            text={"Delivering"}
                            value={numberDelivering} />
                        <OrderProcessElement
                            iconType={"AntDesign"}
                            iconName={"staro"}
                            text={"Rating"}
                            value={numberDelivering} />
                    </View>
                </View>

                {/*Extension*/}
                <View style={styles.wrapExtension}>
                    <View style={styles.wrapExtensionTitle}>
                        <Text style={{ fontWeight: "500" }}>Extension</Text>
                    </View>
                    <View style={styles.wrapExtensionComponent}>
                        <ExtensionElement
                            iconType={"Ionicons"} iconName={"medal-outline"}
                            iconColor={"#e7700d"} text={"Loyal Customer"}
                            containerStyle={{ width: "48%", borderColor: "#e7700d" }}
                            textStyle={{ fontSize: 12, fontWeight: "400", color: "#e7700d" }} />
                        <ExtensionElement
                            iconType={"AntDesign"} iconName={"hearto"}
                            iconColor={"#cf3131"} text={"Liked"}
                            containerStyle={{ width: "48%", borderColor: "#cf3131" }}
                            textStyle={{ fontSize: 12, fontWeight: "400", color: "#cf3131" }} />
                    </View>
                    <View style={styles.wrapExtensionComponent}>
                        <ExtensionElement
                            iconType={"AntDesign"} iconName={"clockcircleo"}
                            iconColor={"blue"} text={"Recently Viewd"}
                            containerStyle={{ width: "48%", borderColor: "blue" }}
                            textStyle={{ fontSize: 12, fontWeight: "400", color: "blue" }} />
                        <ExtensionElement
                            iconType={"Ionicons"} iconName={"storefront-outline"}
                            iconColor={"green"} text={"Create Store"}
                            containerStyle={{ width: "48%", borderColor: "green" }}
                            textStyle={{ fontSize: 12, fontWeight: "400", color: "green" }} />
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



                <View style={styles.wrapOrder}>
                    <View style={styles.wrapOrderTitle}>
                        <Text style={{ fontWeight: "500" }}>Order</Text>
                        <Text style={{ color: "#3169f5", textDecorationLine: 'underline' }}>Order History</Text>
                    </View>
                    <View style={styles.wrapOrderProcess}>
                        <OrderProcessElement
                            iconType={"Ionicons"}
                            iconName={"wallet-outline"}
                            text={"Confirming"}
                            value={numberConfirming} />
                        <OrderProcessElement
                            iconType={"Feather"}
                            iconName={"package"}
                            text={"Packing"}
                            value={numberPacking} />
                        <OrderProcessElement
                            iconType={"Feather"}
                            iconName={"truck"}
                            text={"Delivering"}
                            value={numberDelivering} />
                        <OrderProcessElement
                            iconType={"AntDesign"}
                            iconName={"staro"}
                            text={"Rating"}
                            value={numberDelivering} />
                    </View>
                </View>

                {/*Extension*/}
                <View style={styles.wrapExtension}>
                    <View style={styles.wrapExtensionTitle}>
                        <Text style={{ fontWeight: "500" }}>Extension</Text>
                    </View>
                    <View style={styles.wrapExtensionComponent}>
                        <ExtensionElement
                            iconType={"Ionicons"} iconName={"medal-outline"}
                            iconColor={"#e7700d"} text={"Loyal Customer"}
                            containerStyle={{ width: "48%", borderColor: "#e7700d" }}
                            textStyle={{ fontSize: 12, fontWeight: "400", color: "#e7700d" }} />
                        <ExtensionElement
                            iconType={"AntDesign"} iconName={"hearto"}
                            iconColor={"#cf3131"} text={"Liked"}
                            containerStyle={{ width: "48%", borderColor: "#cf3131" }}
                            textStyle={{ fontSize: 12, fontWeight: "400", color: "#cf3131" }} />
                    </View>
                    <View style={styles.wrapExtensionComponent}>
                        <ExtensionElement
                            iconType={"AntDesign"} iconName={"clockcircleo"}
                            iconColor={"blue"} text={"Recently Viewd"}
                            containerStyle={{ width: "48%", borderColor: "blue" }}
                            textStyle={{ fontSize: 12, fontWeight: "400", color: "blue" }} />
                        <ExtensionElement
                            iconType={"Ionicons"} iconName={"storefront-outline"}
                            iconColor={"green"} text={"Create Store"}
                            containerStyle={{ width: "48%", borderColor: "green" }}
                            textStyle={{ fontSize: 12, fontWeight: "400", color: "green" }} />
                    </View>
                </View>

                {/*Extension*/}
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
            </ScrollView>
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
        // backgroundColor: "blue"
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
        // backgroundColor: "tomato",
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
        // backgroundColor: "gray",
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