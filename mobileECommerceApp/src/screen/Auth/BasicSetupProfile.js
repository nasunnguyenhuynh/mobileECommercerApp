import { Image, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import api, { authAPI, endpoints } from "../../utils/api";
import styles from "../../styles/Auth/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";


const BasicSetupProfile = () => {
    const [username, setUsername] = useState("");
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [focusField, setFocusField] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation()

    const handleUpdate = async () => {
        if (!image) {
            setError("Avatar and Username is required!");
            setFocusField('image');
        }
        else if (!username) {
            console.log('image', image.uri)
            setError("Username is required!");
            setFocusField('username');
            return;
        } else {
            try {
                setLoading(true);
                const axiosInstance = await authAPI();
                console.log('image', image)

                // Trích xuất tên và loại của tệp hình ảnh từ URI
                const filename = image.split('/').pop(); // Lấy phần cuối cùng của URI là tên tệp
                const match = /\.(\w+)$/.exec(filename); // Lấy đuôi của tệp
                const filetype = match ? `image/${match[1]}` : 'image/jpeg'; // Xác định loại dựa trên đuôi tệp

                let formData = new FormData();
                formData.append('avatar', {
                    uri: image, // Truy cập vào URI của hình ảnh đã chọn
                    name: filename, // Tên của tệp hình ảnh
                    type: filetype, // Loại hình ảnh
                });
                formData.append('username', username);

                axiosInstance.post('/accounts/basic-setup-profile/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Định dạng của dữ liệu gửi đi
                    },
                })
                    .then(async response => {
                        if (response.status === 200 && response.data) {
                            console.log('response: ', response.data);
                            await AsyncStorage.setItem('access_token', response.data.access_token);
                            navigation.navigate('NavPage');
                        }
                    })
                    .catch(error => {
                        console.log('error: ', error);
                        setError("Username already taken!");
                        setLoading(false);
                    });
            } catch (error) {
                console.error('Error with API call:', error);
                setError("An error occurred during profile setup");
                setLoading(false);
            }
        }
    };

    const handleFieldFocus = (field) => {
        if (error && field === 'username') {
            setError('');
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
                        <Text style={styles.loginText}>Setup profile</Text>
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
                        <View style={[styles.inputContainer, focusField === 'username']}>
                            <FontAwesome
                                name={"user"}
                                size={24}
                                color={"#9A9A9A"}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Username"
                                onChangeText={setUsername}
                                value={username}
                                onFocus={() => handleFieldFocus('username')}
                                onBlur={() => setFocusField('')}
                            />
                        </View>
                        {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
                        <TouchableOpacity
                            style={styles.loginButtonContainer}
                            onPress={loading ? null : handleUpdate}
                            disabled={loading}>
                            {loading ? (
                                <ActivityIndicator size="small" color="#bc2b78" />
                            ) : (
                                <Text style={styles.loginButtonText}>Update</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    );
};

export default BasicSetupProfile;
