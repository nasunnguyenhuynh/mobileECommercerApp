import { Image, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from 'react';
import api, { authAPI, endpoints } from "../../utils/api";
import styles from "../../styles/Auth/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";


const BasicSetupProfile = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const userInfo = route.params?.userInfo || null;
    const [username, setUsername] = useState(userInfo ? userInfo.user.name : '');
    const [image, setImage] = useState(userInfo ? userInfo.user.photo : '');
    const [firstName, setFirstName] = useState(userInfo ? userInfo.user.givenName : '');
    const [lastName, setLastName] = useState(userInfo ? userInfo.user.familyName : '');
    const [email, setEmail] = useState(userInfo ? userInfo.user.email : '');

    const [error, setError] = useState('');
    const [focusField, setFocusField] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        if (!image) {
            setError("Avatar is required!");
            setFocusField('image');
            return;
        }
        else if (!username) {
            setError("Username is required!");
            setFocusField('username');
            return;
        } else {
            try {
                setLoading(true);
                const axiosInstance = await authAPI();
                let formData = new FormData();

                if (image.includes('com.mobileecommerceapp')) {
                    // Get imgName and imgFormat from URI
                    // image file:///data/user/0/com.mobileecommerceapp/cache/ImagePicker/11d56a86-0761-4ae5-a8a6-65fc82d40cd9.png 
                    const filename = image.split('/').pop();
                    // filename  11d56a86-0761-4ae5-a8a6-65fc82d40cd9.png
                    const match = /\.(\w+)$/.exec(filename);
                    // match  [".png", "png"]
                    const filetype = match ? `image/${match[1]}` : 'image/jpeg';
                    // filetype  image/png

                    formData.append('avatar', {
                        uri: image,
                        name: filename,
                        type: filetype,
                    });

                    if (userInfo) {
                        formData.append('email', email);
                        formData.append('first_name', firstName);
                        formData.append('last_name', lastName); //last=sur=fa
                    }
                }
                else if (image.includes('lh3.googleusercontent.com')) {
                    //https://lh3.googleusercontent.com/a/ACg8ocKNrV-F4w4N175cZPIYRf3h-A6wmB4CLcu7Nj2THdA2IHE-=s96-c
                    try {
                        const response = await fetch(image, { method: 'HEAD' });
                        if (response.ok) {
                            formData.append('avatar', {
                                uri: image,
                                name: 'unnamed.png',
                                type: 'image/png',
                            });
                            formData.append('email', email);
                            formData.append('first_name', firstName);
                            formData.append('last_name', lastName); //last=sur=fa
                        } else {
                            console.error('Google avatar image is not accessible');
                        }
                    } catch (error) {
                        console.error('Error while fetching Google avatar: ', error);
                    }
                    finally {
                        setLoading(false);
                    }
                }

                formData.append('username', username);

                axiosInstance.post('/accounts/basic-setup-profile/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Format data
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
        // result {"assets": [{"assetId": null, "base64": null, "duration": null, "exif": null, "fileName": "11d56a86-0761-4ae5-a8a6-65fc82d40cd9.png", "fileSize": 85292, "height": 1074, "mimeType": "image/png", "rotation": null, "type": "image", "uri": "file:///data/user/0/com.mobileecommerceapp/cache/ImagePicker/11d56a86-0761-4ae5-a8a6-65fc82d40cd9.png", "width": 1074}], "canceled": false}

        if (!result.canceled) { //If the image selection process is not canceled, assign the image uri to the image
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
                        <View style={styles.logo}>
                            {
                                image ?
                                    <Image source={{ uri: image }} style={styles.logo} />
                                    :
                                    <Image
                                        source={require("../../assets/images/profile.png")}
                                        style={styles.logo}
                                    />
                            }
                        </View>
                        <TouchableOpacity style={styles.changeLogo} onPress={pickImage}>
                            <FontAwesome
                                name={"pencil"}
                                size={28}
                                color={"#9A9A9A"}
                            />
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
                                onChangeText={(text) => setUsername(text)}
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
