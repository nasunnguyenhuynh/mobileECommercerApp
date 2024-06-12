import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useNavigation } from "@react-navigation/native";
import api, { authAPI, endpoints } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles/Auth/styles";

const Signup = ({ route }) => {
    const userInfo = route.params ? route.params.userInfo : null; //Get from gg login

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [focusField, setFocusField] = useState('');

    const navigation = useNavigation()
    const navigateLoginpWithPassword = () => {
        navigation.navigate("Login")
    }
    const navigateLoginWithSms = () => {
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

    const handleSignup = async () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
        } else if (!passwordRegex.test(password)) {
            setError("Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character");
            setFocusField('password');
            return;
        } else {
            try {
                api.post('/accounts/signup/', {
                    phone: phone,
                    password: password
                })
                    .then(async response => {
                        if (response.status === 200 && response.data) {
                            console.log(response.data);
                            if (userInfo)
                                navigation.navigate('VerifyOTP', { fromSignup: true, userInfo: userInfo });
                            else
                                navigation.navigate('VerifyOTP', { fromSignup: true });
                        }
                    })
                    .catch(error => {
                        setError("username or password is incorrect!");
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
                        {userInfo ?
                            <Image
                                source={{ uri: userInfo.user.photo }}
                                style={styles.logo}
                            /> :
                            <Image
                                source={require("../../assets/images/logo.jpg")}
                                style={styles.logo}
                            />
                        }
                    </View>
                    <View style={styles.loginTextContainer}>
                        {
                            userInfo ?
                                <Text style={styles.loginText}>Hi, {userInfo.user.name}!</Text> :
                                <Text style={styles.loginText}>Signup</Text>
                        }
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
                                onBlur={() => setFocusField('')} />
                        </View>
                        {
                            userInfo ?
                                <></> :
                                <View style={styles.textLinkContainer}>
                                    <TouchableOpacity onPress={navigateLoginpWithPassword}>
                                        <Text style={styles.loginWithPasswordText}>Login with password</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={navigateLoginWithSms}>
                                        <Text style={styles.loginWithSMSText}>Login with SMS</Text>
                                    </TouchableOpacity>
                                </View>
                        }
                        {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
                        <TouchableOpacity style={styles.loginButtonContainer} onPress={handleSignup}>
                            {
                                userInfo ?
                                    <Text style={styles.loginButtonText}>Next</Text> :
                                    <Text style={styles.loginButtonText}>Signup</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    );
};

export default Signup;