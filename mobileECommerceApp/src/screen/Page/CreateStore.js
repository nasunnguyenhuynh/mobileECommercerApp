import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, FlatList, } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React, { useEffect, useState, useRef } from "react";
import { Badge } from "react-native-elements";
import api, { authAPI, enpoints } from "../../utils/api";
import { useNavigation } from "@react-navigation/native";
import OrderProcessElement from "../../components/Profile/OrderProcessElement";
import ExtensionElement from "../../components/Profile/ExtensionElement";

const CreateStore = ({ route }) => {
    const { userId } = route.params;
    console.log('userId:', userId);
    const [username, setUsername] = useState("");
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [focusField, setFocusField] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation()

    const handleSend = async (userId) => {
        if (!image) {
            setError("Image is required!");
            setFocusField('image');
        }
        else {
            try {
                setLoading(true);
                const axiosInstance = await authAPI();
                console.log('image', image)

                // Trích xuất tên và loại của tệp hình ảnh từ URI
                const filename = image.split('/').pop(); // Lấy phần cuối cùng của URI là tên tệp
                const match = /\.(\w+)$/.exec(filename); // Lấy đuôi của tệp
                const filetype = match ? `image/${match[1]}` : 'image/jpeg'; // Xác định loại dựa trên đuôi tệp

                let formData = new FormData();
                formData.append('citizen_identification_image', {
                    uri: image, // Truy cập vào URI của hình ảnh đã chọn
                    name: filename, // Tên của tệp hình ảnh
                    type: filetype, // Loại hình ảnh
                });

                axiosInstance.post(`/users/${userId}/confirmationshop/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Định dạng của dữ liệu gửi đi
                    },
                })
                    .then(async response => {
                        if (response.status === 201 && response.data) {
                            console.log('response: ', response.data);
                            //Hien thi gui di thanh cong -> Chinh button createShop --> Quay ve Profile
                            navigation.navigate('NavPage');
                        }
                    })
                    .catch(error => {
                        console.log('error: ', error);
                        setError("An error occurred during sending, please try again");
                        setLoading(false);
                    });
            } catch (error) {
                console.error('Error with API call:', error);
                setError("An error occurred during sending, please try again");
                setLoading(false);
            }
        }
    };


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        console.log('result', result);

        if (!result.canceled) { //Nếu qt chọn ảnh ko bị hủy thì gán uri ảnh cho image
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: 40, marginVertical: 60 }}>
                <View style={styles.formMain}>
                    <View style={{ marginBottom: 30 }}>
                        <Text style={styles.loginText}>Confirmation Shop</Text>
                    </View>
                    <View style={styles.logoLoginContainer} >
                        <TouchableOpacity style={styles.logo} onPress={pickImage}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.logo} />
                            ) : (
                                <Image
                                    source={require("../../assets/images/profile.png")}
                                    style={styles.logo}
                                />
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.wrapInputContainer}>
                        {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
                        <TouchableOpacity
                            style={styles.loginButtonContainer}
                            onPress={loading ? null : () => handleSend(userId)}
                            disabled={loading}>
                            {loading ? (
                                <ActivityIndicator size="small" color="#bc2b78" />
                            ) : (
                                <Text style={styles.loginButtonText}>Send</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    );
}

export default CreateStore;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        flex: 1,
        // justifyContent: "center"
    },
    logoLoginContainer: {
        flexDirection: "row",
        justifyContent: "center"
    },
    logo: {
        width: 160,
        height: 160,
        borderRadius: 100
    },
    loginTextContainer: {
        marginTop: 30,
    },
    loginText: {
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold",
        color: "#232836",
    },
    wrapInputContainer: {
        marginVertical: 10,
    },
    inputContainer: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        borderRadius: 20,
        elevation: 10,
        alignItems: "center",
        height: 50,
        marginVertical: 14
    },
    inputIcon: {
        marginLeft: 15,
        marginRight: 5,
    },
    textInput: {
        flex: 1,
    },
    textLinkContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    forgotPasswordText: {
        color: "#0171d3",
        fontSize: 12,
    },
    loginWithPasswordText: {
        color: "#0171d3",
        fontSize: 12,
    },
    loginWithSMSText: {
        color: "#0171d3",
        fontSize: 12,
    },
    loginButtonContainer: {
        marginVertical: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#016dcb",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20
    },
    loginButtonText: {
        fontSize: 20,
        fontWeight: "400",
        color: "#fff"
    },
    textLinkSignupContainer: {
        flexDirection: "row",
        justifyContent: "center"
    },
    socialMediaContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    socialIcon: {
        backgroundColor: "white",
        marginHorizontal: 10,
        borderRadius: 50,
        padding: 10,
        elevation: 10,
    }
})