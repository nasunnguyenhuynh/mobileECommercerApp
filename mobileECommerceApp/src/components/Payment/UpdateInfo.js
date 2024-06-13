import {
    StyleSheet, TouchableOpacity, View, Modal, Text, TextInput, Image, ActivityIndicator
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import React, { useState, useEffect } from "react";
import { NavigationContainer, useRoute } from '@react-navigation/native';

import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import FormatCurrency from "../FormatCurrency";
import { color } from "react-native-elements/dist/helpers";
import COLORS from "../COLORS";
import api, { authAPI, endpoints } from "../../utils/api";
import { useNavigation } from "@react-navigation/native";
//import { useAddress } from "../../components/Payment/AddressContext"

const transparent = 'rgba(0,0,0,0.5)';
function UpdateInfo({ visible, closeModal, id, username, firstName, lastName, address, phone}) {
    //const { addAddress } = useAddress(); 
    const navigation = useNavigation();
    const [uFirstName, setUFirstName] = useState(firstName)
    const [uLastName, setULastName] = useState(lastName)
    const [uAddress, setUAddress] = useState(address) //[]
    const [newAddress, setNewAddress] = useState('')

    const [error, setError] = useState('');
    const [focusField, setFocusField] = useState('');
    const [loading, setLoading] = useState(false);
    // console.log('visible_tocard ', visible)
    // console.log('closeModal_tocard', closeModal)
    // console.log('phone', phone)
    // console.log('username ', username)
    // console.log('newAddress ', newAddress)
    // Check visible
    if (!visible) return null;


    const refreshAddress = (resPosted) => {
        uAddress.push(resPosted)
        navigation.navigate('NavAddress',
            {
                id, username,
                firstName: uFirstName,
                lastName: uLastName,
                addresses: uAddress,
                phone
            })
        //Edit for suitable with key in NavAddress.js
    }

    const handleUpdate = async () => {
        if (!uFirstName) {
            setError("This field cannot be empty");
            setFocusField('uFirstName');
            return;
        } else if (!uLastName) {
            setError("This field cannot be empty");
            setFocusField('uLastName');
            return;
        } else if (!newAddress) {
            setError("This field cannot be empty");
            setFocusField('newAddress');
            return;
        } else {
            try {
                setLoading(true);
                const axiosInstance = await authAPI();

                const userResponse = await axiosInstance.patch(endpoints.currentUser, {
                    first_name: uFirstName,
                    last_name: uLastName,
                });

                if (userResponse.status === 200 && userResponse.data) {
                    // console.log('PATCH user\'s info ', userResponse.data);

                    try {
                        // console.log('userID to update address ', id)
                        const addressResponse = await axiosInstance.post(endpoints.addresses(id), {
                            name: username,
                            phone_number: phone,
                            address: newAddress,
                        });

                        if (addressResponse.status === 201 && addressResponse.data) {
                            // console.log('POST new address ', addressResponse.data);
                            refreshAddress(addressResponse.data);
                            closeModal();
                        } else {
                            navigation.navigate('NavPage');
                        }
                    } catch (error) {
                        setLoading(false);
                        setError("An error occurred while updating user's address");
                        console.error('Error update user\'s address:', error);
                    }
                } else {
                    navigation.navigate('NavPage');
                }
            } catch (error) {
                setLoading(false);
                setError("An error occurred while updating user's information");
                console.error('Error update user\'s information:', error);
            }
        }
    };


    const handleFieldFocus = (field) => {
        if (error && (field === 'uFirstName' || field === 'uLastName' || field === 'newAddress')) {
            setError('');
        }
    };

    function renderModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: transparent,
                    }}
                >
                    <View style={{
                        position: "absolute",
                        bottom: 0,
                        backgroundColor: "white",
                        // backgroundColor: "tomato",
                        padding: 15,
                        width: "90%",
                        height: "60%",
                        borderRadius: 10,
                    }}>
                        <TouchableOpacity
                            onPress={closeModal}
                            style={{
                                zIndex: 1,
                                flexDirection: "row",
                                position: "absolute",
                                right: 10, top: 10,
                            }}>
                            <AntDesign
                                name={"close"}
                                size={30}
                                color={"black"}
                            />
                        </TouchableOpacity>

                        <View style={styles.wrapProductDetailTitle}>
                            <Text
                                style={{
                                    color: "red",
                                    fontSize: 16,
                                    marginTop: 15,
                                }}
                            >Update Information</Text>
                        </View>

                        <View style={styles.wrapInputContainer}>
                            {
                                firstName.length === 0 && (

                                    <View style={styles.inputContainer}>
                                        <FontAwesome
                                            name={"user"}
                                            size={24}
                                            color={"#9A9A9A"}
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="First name ... "
                                            onChangeText={setUFirstName}
                                            value={uFirstName}
                                            onFocus={() => handleFieldFocus('uFirstName')}
                                            onBlur={() => setFocusField('')}
                                        />
                                    </View>

                                )
                            }
                            {
                                lastName.length === 0 && (

                                    <View style={styles.inputContainer}>
                                        <FontAwesome
                                            name={"user"}
                                            size={24}
                                            color={"#9A9A9A"}
                                            style={styles.inputIcon}
                                        />
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Last name ... "
                                            onChangeText={setULastName}
                                            value={uLastName}
                                            onFocus={() => handleFieldFocus('uFirstName')}
                                            onBlur={() => setFocusField('')}
                                        />
                                    </View>

                                )
                            }

                            <View style={styles.inputContainer}>
                                <FontAwesome
                                    name={"home"}
                                    size={24}
                                    color={"#9A9A9A"}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Address ... "
                                    onChangeText={setNewAddress}
                                    value={newAddress}
                                    onFocus={() => handleFieldFocus('newAddress')}
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
            </Modal>
        );
    }

    return (
        <View style={styles.containerProductDetail}>
            {renderModal()}
        </View >

    )
}

export default UpdateInfo;

const styles = StyleSheet.create({
    containerProductDetail: {
        backgroundColor: "#fff",
        marginBottom: 10,
        paddingHorizontal: 10,
    },


    wrapProductDetailTitle: {
        flexDirection: "row",
        justifyContent: "center",
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
})