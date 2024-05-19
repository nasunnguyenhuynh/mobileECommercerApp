import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, FlatList, } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React, { useEffect, useState, useRef } from "react";
import { Badge } from "react-native-elements";
import api, { authAPI, endpoints } from "../../src/utils/api";
import { useNavigation } from "@react-navigation/native";
import { WebView } from 'react-native-webview';
// import OrderProcessElement from "../../components/Profile/OrderProcessElement";
// import ExtensionElement from "../../components/Profile/ExtensionElement";



const Test = () => {
    const [data, setData] = useState('')

    const fetchUserData = async () => {
        try {
            const body = {
                "order_type": "billpayment",
                "order_id": 26,
                "amount": 322000,
                "order_desc": "Thanh toan qua VN PAY",
                "bank_code": "NCB",
                "language": "vn"
            }

            api.post('/payment', body, {
                headers: {
                    'Content-Type': 'application/json', // Định dạng của dữ liệu gửi đi
                },
            })
                .then(async response => {
                    if (response.status === 200 && response.data) {
                        console.log('response: ', response.data);
                        setData(response.data)
                    }
                })
                .catch(error => {
                    console.log('error: ', error);
                });


        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            // setLoadingUserData(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <WebView
            style={{ marginTop: 28 }}
            source={{
                uri: data.url,
            }}
            startInLoadingState
            renderLoading={() => (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            )}
        />
    )
}

export default Test;

const styles = StyleSheet.create({
})