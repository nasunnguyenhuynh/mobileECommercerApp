import { Image, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Entypo from "react-native-vector-icons/Entypo"
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import api, { authAPI, endpoints } from "../../utils/api";
import styles from "../../styles/Auth/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import { WEB_CLIENT_ID } from '@env'


const Login = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [focusField, setFocusField] = useState('');
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()
    const navigateSignup = () => {
        navigation.navigate("Signup")
    }
    const navigateLoginpWithSms = () => {
        navigation.navigate("LoginWithSms")
    }

    const handlePhoneChange = (text) => {
        // Remove non-numeric characters
        const numericText = text.replace(/[^0-9]/g, '');
        // Limit to 10 characters
        if (numericText.length <= 10) {
            setPhone(numericText);
        }
    };

    // POST with Axios
    const handleLogin = async () => {
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
                setLoading(true);
                const axiosInstance = await authAPI();

                axiosInstance.post('/accounts/login/', {
                    phone: phone,
                    password: password
                })
                    .then(async response => {
                        if (response.status === 200 && response.data) {
                            console.log(response.data);
                            await AsyncStorage.setItem('access_token', response.data.access_token);
                            navigation.navigate('NavPage');
                        }
                        else
                            navigation.navigate('Login');
                    })
                    .catch(error => {
                        setError("username or password is incorrect!");
                    });
            } catch (error) {
                setError("An error occurred while logging in");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleFieldFocus = (field) => {
        if (error && (field === 'phone' || field === 'password')) {
            setError('');
        }
    };

    GoogleSignin.configure({
        webClientId: '94351095163-3mijcspelts6uk77oi8051viqvmg6mv9.apps.googleusercontent.com',
    })

    const handleLoginWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            api.post(endpoints.loginWithGoogle, {
                ...userInfo
            })
                .then(async response => {
                    if (response.status === 200 && response.data) {
                        if (response.data.success === 'Login successfully') { //Email was used
                            await AsyncStorage.setItem('access_token', response.data.access_token);
                            navigation.navigate('NavPage');
                        }
                        else
                            navigation.navigate("Signup", { userInfo: userInfo, loginWithGoogle: true })
                    }
                })
                .catch(error => {
                    console.error('Login failed:', error);
                    setError("An error occurred while logging");
                });
        } catch (error) {
            console.error('Login failed:', error);
            setError("An error occurred while logging with Google");
        }
    }

    return (
        <View style={styles.container}>
            {
                loading ?
                    <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} size="small" color="#bc2b78" /> :
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
                                        keyboardType="numeric"
                                        maxLength={10}
                                        onChangeText={handlePhoneChange}
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
                                        onBlur={() => setFocusField('')}
                                    />
                                </View>
                                <View style={styles.textLinkContainer}>
                                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                                    <TouchableOpacity onPress={navigateLoginpWithSms}>
                                        <Text style={styles.loginWithSMSText}>Login with SMS</Text>
                                    </TouchableOpacity>
                                </View>
                                {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
                                <TouchableOpacity style={styles.loginButtonContainer} onPress={handleLogin}>
                                    <Text style={styles.loginButtonText}>Login</Text>
                                </TouchableOpacity>
                                <View style={styles.textLinkSignupContainer}>
                                    <TouchableOpacity onPress={navigateSignup}>
                                        <Text>Don't have an account?
                                            <Text style={{ color: "#0171d3" }}> Signup</Text>
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    marginVertical: 16,
                                    flexDirection: "row",
                                    justifyContent: 'center',
                                    alignItems: "center",
                                }}>
                                    <View style={{
                                        width: "40%",
                                        borderTopWidth: 1,
                                        borderTopColor: "#8b8b8b",
                                    }}></View>
                                    <View style={{ marginHorizontal: 10 }}><Text style={{ color: "#8b8b8b" }}>Or</Text></View>
                                    <View style={{
                                        width: "40%",
                                        borderTopWidth: 1,
                                        borderTopColor: "#8b8b8b",
                                    }}></View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.socialMediaContainer}>
                            <Entypo
                                name={"facebook-with-circle"}
                                size={30}
                                color={"blue"}
                                style={styles.socialIcon}
                            />
                            <AntDesign
                                name={"github"}
                                size={30}
                                color={"black"}
                                style={styles.socialIcon}
                            />
                            <TouchableOpacity onPress={handleLoginWithGoogle}>
                                <AntDesign
                                    name={"google"}
                                    size={30}
                                    color={"red"}
                                    style={styles.socialIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
            }
        </View >
    );
};

export default Login;
