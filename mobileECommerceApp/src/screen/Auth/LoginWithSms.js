import { Image, StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useNavigation } from "@react-navigation/native";
import api, { authAPI, endpoints } from "../../utils/api";
import styles from "../../styles/Auth/styles";


const LoginWithSms = () => {
    const [phone, setPhone] = useState();
    const [error, setError] = useState('');
    const [focusField, setFocusField] = useState('');

    const navigation = useNavigation()
    const navigateSignup = () => {
        navigation.navigate("Signup")
    }
    const navigateLoginpWithPassword = () => {
        navigation.navigate("Login")
    }
    const handleSendOTP = async () => {
        if (!phone) {
            setError("This field cannot be empty");
            setFocusField('phone');
            return;
        } else
            try {
                const api = await authAPI();
                const response = await api.post(endpoints.loginWithSms, { phone: phone });

                if (response.status === 200) {
                    console.log('OTP sent successfully', response.data);
                    navigation.navigate('VerifyOTP');
                } else {
                    console.log('Failed to send OTP', response.data);
                    alert('Failed to send OTP. Please try again.');
                }
            } catch (error) {
                console.error('Error sending OTP:', error);
                alert('Error when sending OTP. Please check your network and try again.');
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
                        <Text style={styles.loginText}>Login</Text>
                    </View>
                    <View style={styles.wrapInputContainer}>
                        <View style={styles.inputContainer} >
                            <FontAwesome
                                name={"phone"}
                                size={24}
                                color={"#9A9A9A"}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Phone"
                                onChangeText={text => setPhone(text)}
                                value={phone}
                            />
                        </View>
                        <View style={styles.textLinkContainer}>
                            <TouchableOpacity onPress={navigateLoginpWithPassword}>
                                <Text style={styles.loginWithPasswordText}>Login with password</Text>
                            </TouchableOpacity>
                        </View>
                        {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
                        <View style={styles.loginButtonContainer}>
                            <TouchableOpacity onPress={handleSendOTP}>
                                <Text style={styles.loginButtonText}>Send SMS</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.textLinkSignupContainer}>
                            <TouchableOpacity onPress={navigateSignup}>
                                <Text>Don't have an account?
                                    <Text style={{ color: "#0171d3" }}> Signup</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View >
    );
};

export default LoginWithSms;