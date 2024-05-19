import { Image, StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity, Alert } from "react-native";
import React, { useState } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import { OtpInput } from "react-native-otp-entry";
import api, { authAPI, endpoints } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/Auth/styles";
const VerifyOTP = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const fromSignup = route.params?.fromSignup || false;

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const handleVerifydOTP = async () => {
        if (otp.length < 6) {
            setError("This field cannot be empty");
            return;
        }
        
        try {
            // Nếu từ Signup điều hướng đến thực hiện yêu cầu GET trước khi POST
            if (fromSignup) {
                api.get('/accounts/verify-otp/')
                    .then(async response => {
                        console.log(response.data);
                        if (response.status === 200 && response.data) {
                            console.log(response.data);
                            // Kiểm tra nếu số điện thoại đã được sử dụng cho một tài khoản khác
                            if (response.data.success && response.data.phone && response.data.existing_user) {
                                console.log(response.data);
                                Alert.alert(
                                    "Phone number is already registered",
                                    `${response.data.phone} was used for ${response.data.existing_user} user.`,
                                    [
                                        {
                                            text: "Continue Signup",
                                            onPress: () => postVerifyOTP()
                                        },
                                        {
                                            text: "Login",
                                            onPress: () => navigation.navigate('LoginWithSms')
                                        }
                                    ]
                                );
                            } else {
                                postVerifyOTP();
                            }
                        }
                    })
                    .catch(error => {
                        console.error('Verification failed:', error);
                        setError("OTP verification failed!");
                    });
            }
            else {
                postVerifyOTP();
            }
        } catch (error) {
            console.error('Error with API call:', error);
            setError("An error occurred during OTP verification");
        }
    };

    // Hàm để thực hiện yêu cầu POST sau khi đã kiểm tra kết quả từ yêu cầu GET
    const postVerifyOTP = async () => {
        try {
            
            const axiosInstance = await authAPI();

            axiosInstance.post('/accounts/verify-otp/', { otp: otp })
                .then(async response => {
                    
                    if (response.status === 200 && response.data) {
                        console.log(response.data);
                        if (response.data.success === "Continue to setup profile to finish") {
                            navigation.navigate('BasicSetupProfile');
                        } else {
                            await AsyncStorage.setItem('access_token', response.data.access_token);
                            navigation.navigate('NavPage');
                        }
                    }
                })
                .catch(error => {
                    console.error('Verification failed:', error);
                    setError("OTP verification failed!");
                });
        } catch (error) {
            console.error('Error with API call:', error);
            setError("An error occurred during OTP verification");
        }
    };


    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: 40, marginVertical: 60 }}>
                <View style={styles.formMain}>
                    <View style={styles.logoLoginContainer} >
                        <Image
                            source={require("../../assets/images/logo.jpg")}
                            style={styles.logo}
                        />
                    </View>
                    <View style={styles.loginTextContainer}>
                        <Text style={styles.loginText}>Verification OTP</Text>
                        <Text>Your verification code will be sent by text message to phone</Text>
                    </View>
                    <View style={styles.wrapInputContainer}>
                        <OtpInput
                            numberOfDigits={6}
                            onTextChange={(text) => {
                                setOtp(text);
                                if (text.length === 6) {
                                    setError('');
                                }
                            }}
                            focusColor={"#232836"}
                            focusStickBlinkingDuration={400}
                            theme={{
                                pinCodeContainerStyle: {
                                    backgroundColor: "#ffffff",
                                    borderRadius: 12
                                }
                            }}></OtpInput>
                        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
                        <View style={styles.loginButtonContainer}>
                            <TouchableOpacity onPress={handleVerifydOTP}>
                                <Text style={styles.loginButtonText}>Send OTP</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.textLinkSignupContainer}>
                        </View>
                    </View>
                </View>

            </View>
        </View >
    );
};

export default VerifyOTP;