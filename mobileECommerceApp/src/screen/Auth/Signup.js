import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useNavigation } from "@react-navigation/native";
import api, { authAPI, endpoints } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/Auth/styles";

const Signup = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [focusField, setFocusField] = useState('');

    const navigation = useNavigation()
    const navigateLoginpWithPassword = () => {
        navigation.navigate("Login")
    }
    const navigateLoginpWithSms = () => {
        navigation.navigate("LoginWithSms")
    }

    // POST with Axios
    const handleSignup = async () => {
        // Kiểm tra các trường và đặt lỗi thích hợp
        if (!phone && !password) {
            setError("This field cannot be empty");
            setFocusField('phone');
            return;
        } else if (!phone) {
            setError("This field cannot be empty");
            setFocusField('phone');
            return;
        } else if (!password) {
            setError("This field cannot be empty");
            setFocusField('password');
            return;
        } else {
            try {
                // Sử dụng authAPI để tạo instance axios có Authorization header
                // const axiosInstance = await authAPI();


                api.post('/accounts/signup/', {
                    phone: phone,
                    password: password
                })
                    .then(async response => {
                        if (response.status === 200 && response.data) {
                            console.log(response.data);
                            navigation.navigate('VerifyOTP', { fromSignup: true });
                        }
                    })
                    .catch(error => {
                        setError("username or password is incorrect!");
                        //So dien thoai da duoc su dung
                        //Khong thoa yeu cau toi thieu password
                    });
            } catch (error) {
                setError("An error occurred while logging in");
            }
        }
    };

    const handleFieldFocus = (field) => {
        if (error && (field === 'phone' || field === 'password')) {
            setError('');
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
                        <Text style={styles.loginText}>Signup</Text>
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
                                onChangeText={setPhone}
                                value={phone}
                                onFocus={() => handleFieldFocus('phone')}
                                onBlur={() => setFocusField('')} />
                        </View>
                        <View style={styles.inputContainer} >
                            <FontAwesome
                                name={"lock"}
                                size={24}
                                color={"#9A9A9A"}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Password"
                                onChangeText={setPassword}
                                value={password}
                                secureTextEntry={true}
                                onFocus={() => handleFieldFocus('password')}
                                onBlur={() => setFocusField('')} />
                        </View>
                        <View style={styles.textLinkContainer}>
                            <TouchableOpacity onPress={navigateLoginpWithPassword}>
                                <Text style={styles.loginWithPasswordText}>Login with password</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={navigateLoginpWithSms}>
                                <Text style={styles.loginWithSMSText}>Login with SMS</Text>
                            </TouchableOpacity>
                        </View>
                        {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
                        <TouchableOpacity style={styles.loginButtonContainer} onPress={handleSignup}>
                            <Text style={styles.loginButtonText}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    );
};

export default Signup;