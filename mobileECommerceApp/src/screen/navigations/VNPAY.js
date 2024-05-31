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
import { NavigationContainer, useRoute } from '@react-navigation/native';
import FormatCurrency from "../../components/FormatCurrency";
import { color } from "react-native-elements/dist/helpers";
import COLORS from "../../components/COLORS";
import api, { authAPI, endpoints } from "../../utils/api";
import { WebView } from 'react-native-webview';

// navigation.navigate('PaymentResult',
//     { vnp_ResponseCode: vnp_ResponseCode, vnp_TransactionNo: vnp_TransactionNo, vnp_Amount: vnp_Amount });
function VNPAY({ navigation }) {
    const route = useRoute();
    const { url } = route.params;
    const [paymentResult, setPaymentResult] = useState(false);
    const [vnp_ResponseCode, setVnp_ResponseCode] = useState('');
    const [vnp_TransactionNo, setVnp_TransactionNo] = useState('');
    const [vnp_Amount, setVnp_Amount] = useState('');

    const handleNavigationStateChange = async (navState) => {
        const { url: newUrl } = navState;
        console.log('url_State ', newUrl)
        if (newUrl.includes('payment_return')) {

            const axiosInstance = await authAPI();
            const response = await axiosInstance.get(newUrl);
            //console.log('response ', response.data)
            // Parse the URL to get the query parameters
            const urlParams = new URLSearchParams(new URL(newUrl).search);
            const vnp_ResponseCode = urlParams.get('vnp_ResponseCode');
            const vnp_TransactionNo = urlParams.get('vnp_TransactionNo');
            const vnp_Amount = urlParams.get('vnp_Amount') / 100;
            console.log('vnp_ResponseCode ', vnp_ResponseCode)
            console.log('vnp_TransactionNo ', vnp_TransactionNo)
            console.log('vnp_Amount ', vnp_Amount)
            setVnp_ResponseCode(vnp_ResponseCode);
            setVnp_TransactionNo(vnp_TransactionNo);
            setVnp_Amount(vnp_Amount);
            setPaymentResult(true);
        }
    };

    if (!url) {
        console.error('url is undefined');
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>url is missing</Text>
            </View>
        );
    }

    return (
        paymentResult ?
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={{ position: "absolute", top: "10%", right: "10%" }}>
                        <TouchableOpacity onPress={() => navigation.navigate('NavPage')}>
                            <Ionicons name={"home"} size={30}
                                color={COLORS.blueSky} style={{}} />
                        </TouchableOpacity>
                    </View>
                    {
                        vnp_ResponseCode === "00" ?
                            <>
                                <View style={styles.checkmarkContainer}>
                                    <View style={styles.checkmarkBackground}>
                                        <AntDesign name="checkcircle" size={64} color="green" />
                                    </View>
                                </View>
                                <Text style={styles.successText}>Payment Successful</Text>
                                <Text style={styles.transactionNumber}>Transaction Number: {vnp_TransactionNo}</Text>
                                <Text style={styles.amount}>Amount paid: đ{FormatCurrency(vnp_Amount)}</Text>
                            </> :
                            <Text style={styles.failureText}>Payment Failed</Text>
                    }
                </View>
            </View> :
            <View style={{ flex: 1 }}>
                <WebView
                    style={{ marginTop: 28 }}
                    source={{ uri: url }}
                    startInLoadingState={true}
                    onNavigationStateChange={handleNavigationStateChange}
                    renderLoading={() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="#000" />
                        </View>
                    )}
                />
            </View>
    );
}

export default VNPAY;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        // backgroundColor: "tomato",
    },
    header: {
        backgroundColor: '#00BCD4',
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkmarkContainer: {
        marginBottom: 20,
    },
    checkmarkBackground: {
        backgroundColor: '#e0f7fa',
        borderRadius: 100,
        padding: 20,
    },
    successText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    transactionNumber: {
        fontSize: 16,
        marginBottom: 5,
    },
    amount: {
        fontSize: 16,
        marginBottom: 5,
        color: '#009688',
    },
    failureText: {
        fontSize: 16,
        color: 'red',
    },
})