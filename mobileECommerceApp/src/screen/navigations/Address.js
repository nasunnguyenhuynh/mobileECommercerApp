import {
    StyleSheet, TouchableOpacity, View, Text, Image, ActivityIndicator
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Fontisto from "react-native-vector-icons/Fontisto"
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';

import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import FormatCurrency from "../../components/FormatCurrency";
import { color } from "react-native-elements/dist/helpers";
import COLORS from "../../components/COLORS";
import api, { authAPI, endpoints } from "../../utils/api";
import useModal from "../../components/useModal"
import UpdateInfo from "../../components/Payment/UpdateInfo";



function Address({ navigation, route }) {
    // const navigation = useNavigation();
    const { isModalVisible, openModal, closeModal } = useModal();
    const [id, setId] = useState(route.params.id);
    const [username, setUsername] = useState(route.params.username);
    const [firstName, setfirstName] = useState(route.params.firstName);
    const [lastName, setlastName] = useState(route.params.lastName);
    const [address, setAddress] = useState(route.params.address);
    const [phone, setPhone] = useState(route.params.phone);

    const [price, setPrice] = useState(route.params.price);
    const [quantity, setQuantity] = useState(route.params.quantity);
    const [color, setColor] = useState(route.params.color);

    const refreshAddress = (resPatched) => {
        const updatedAddresses = address.map(item => {
            if (item.id === resPatched.id) {
                return { ...resPatched };
            } else {
                return { ...item, default: false };
            }
        })
        console.log('updatedAddresses ', updatedAddresses)
        setAddress(updatedAddresses)
        //Edit for suitable with key in NavAddress.js
        console.log('price ', price)
        console.log('quantity ', quantity)
        console.log('color ', color)
        navigation.navigate('Payment', {
            price,
            quantity,
            color,
        })
    }

    const changeAddressDefault = async (userId, addressId) => {
        try {
            const axiosInstance = await authAPI();
            const response = await axiosInstance.patch(endpoints.addressDefault(userId, addressId));
            if (response.status === 200 && response.data) {
                console.log('response.data patched', response.data);
                refreshAddress(response.data);
            }

        } catch (error) {
            console.error('Error fetching user.data:', error);
        } finally {
            // setLoadingUserData(false)
        }
    }

    const renderAddresses = (item) => {
        return (
            <TouchableOpacity
                style={styles.addressContainer}
                key={item.id}
                onPress={() => changeAddressDefault(item.user.id, item.id)}
            >
                <View style={styles.wrapRadioBtn}>
                    {
                        item.default ?
                            <Fontisto
                                name={"radio-btn-active"}
                                size={12}
                                color="#e7700d"
                            /> :
                            <Fontisto
                                name={"radio-btn-passive"}
                                size={12}
                                color="#e7700d"
                            />
                    }

                </View>
                <View style={styles.wrapUserInfo}>
                    <Text numberOfLines={1} ellipsizeMode="tail">{lastName + ' ' + firstName}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail">{phone}</Text>
                    <Text style={{ flexWrap: "wrap" }}>{item.address}</Text>
                </View>
                <View style={styles.wrapChangeAddress}>
                    <Text style={{ fontSize: 12, color: COLORS.blueSky, }}>Change</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ marginHorizontal: 10, marginBottom: 50, }}>
                    {isModalVisible && (
                        <UpdateInfo
                            visible={isModalVisible}
                            closeModal={closeModal}
                            id={id}
                            username={username}
                            firstName={firstName}
                            lastName={lastName}
                            address={address}
                            phone={phone}
                        />
                    )}
                    {/* map address lay address tu state*/}
                    {address.map(item => renderAddresses(item))}


                    <TouchableOpacity
                        onPress={openModal}
                        style={styles.btnAddNewAddress}>
                        <View>
                            <AntDesign
                                name={"pluscircleo"}
                                size={20}
                                color={"tomato"}
                                style={{}}
                            />
                        </View>
                        <Text style={{ color: "tomato", marginLeft: 10, }}>Add new address</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default Address;

const styles = StyleSheet.create({
    btnAddNewAddress: {
        backgroundColor: "yellow",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        paddingVertical: 16,
        paddingHorizontal: 8,
    },

    addressContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 0.2,
        borderColor: COLORS.lightGray,
        borderRadius: 4,
        marginBottom: 5,
        padding: 4,
    },
    wrapRadioBtn: {
        // height: "100%",
    },
    wrapUserInfo: {
        marginLeft: 5,
        flex: 1,
    },
    wrapChangeAddress: {
        // height: "100%",
    },
})