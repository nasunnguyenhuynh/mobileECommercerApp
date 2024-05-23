import { Image, StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView, FlatList, useWindowDimensions } from "react-native";
import React, { useEffect, useState, useRef } from "react";

import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import COLORS from "../COLORS";
import { useNavigation } from "@react-navigation/native";
import FormatCurrency from "../FormatCurrency";
const transparent = 'rgba(0,0,0,0.5)';

const AddToCart = ({ visible, closeModal, colors, productPrice, shopName, productName, deliveryPrice, productId }) => {
    const navigation = useNavigation();


    console.log('visible_tocard ', visible)
    console.log('closeModal_tocard', closeModal)
    console.log('deliveryPrice ', deliveryPrice)
    // Check visible
    if (!visible) return null;
    // Handle select image product
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedColorName, setSelectedColor] = useState(null);
    const [selectedColorId, setSelectedColorId] = useState(null);

    const handleSelectImage = (imageUri, colorName, colorId) => {
        setSelectedImage({ uri: imageUri });
        setSelectedColor(colorName);
        setSelectedColorId(colorId);
    };
    // Handle choose quantity
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
    };
    // Display color badge
    const renderItem = ({ item }) => (
        <View style={styles.wrapColorBadge}>
            <TouchableOpacity style={styles.colorBadge}
                onPress={() => handleSelectImage(item.url_image, item.name_color, item.id)}>
                <Image
                    source={{ uri: item.url_image }}
                    style={styles.imgColor}
                />
                <Text>{item.name_color}</Text>
            </TouchableOpacity>
        </View>

    );

    const renderItemData = [
        ...colors
    ];

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

                        <View style={styles.wrapHeader}>
                            <Image
                                source={selectedImage}
                                style={styles.largeImage}
                            />
                            <View style={styles.wrapPrice}>
                                <Text style={{ color: "red", fontSize: 16 }}>{FormatCurrency(productPrice)}đ</Text>
                            </View>
                        </View>

                        <View style={styles.wrapBody}>
                            <View style={styles.wrapColor}>
                                <View style={styles.wrapColorTitle}>
                                    <Text>Color</Text>
                                </View>

                                <FlatList
                                    data={renderItemData}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id.toString()}
                                    numColumns={1}
                                    style={{}}
                                />
                            </View>

                            <View style={styles.wrapQuantity}>
                                <Text style={styles.textQuantity}>Quantity</Text>
                                <View>
                                    <View style={styles.btnSelectQuantity}>
                                        <TouchableOpacity style={styles.btnDecrease} onPress={decreaseQuantity}>
                                            <Text>-</Text>
                                        </TouchableOpacity>
                                        <Text>{quantity}</Text>
                                        <TouchableOpacity style={styles.btnIncrease} onPress={increaseQuantity}>
                                            <Text>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {
                            selectedImage ?
                                <TouchableOpacity
                                    style={[styles.btnAddToCart, { backgroundColor: 'green' }]}
                                    onPress={() => {
                                        closeModal();
                                        navigation.navigate('NavPayment', {                                     
                                            shopName: shopName,
                                            productId: productId,
                                            productName: productName,
                                            productImg: selectedImage,
                                            productPrice: productPrice,
                                            quantity: quantity,
                                            colorId: selectedColorId,
                                            colorName: selectedColorName,
                                            deliveryPrice: deliveryPrice,
                                        });
                                    }}>
                                    <Text style={{ fontSize: 18 }}>Add to cart</Text>
                                    {/* price, quantity, name, color */}
                                </TouchableOpacity> :
                                <View
                                    style={[styles.btnAddToCart, { backgroundColor: 'gray' }]}
                                >
                                    <Text style={{ fontSize: 18 }}>Add to cart</Text>
                                </View>
                        }
                    </View>
                </View>
            </Modal>
        );
    }

    return (

        <View style={styles.containerProductDetail}>
            {renderModal()}
        </View >
    );
}

export default AddToCart;

const styles = StyleSheet.create({
    containerProductDetail: {
        backgroundColor: "#fff",
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    wrapHeader: {
        flexDirection: "row",
        alignItems: "center",

        borderColor: COLORS.lightGray,
        borderBottomWidth: 0.5,
        paddingVertical: 10,
    },
    largeImage: {
        height: 100,
        width: 100,
    },
    wrapPrice: {
        marginLeft: 5,
        position: "absolute",
        left: 100,
        top: 50,
    },

    wrapBody: {
        paddingVertical: 10,
    },
    wrapColor: {
        borderColor: COLORS.lightGray,
        borderBottomWidth: 0.5,
        paddingBottom: 10,
    },
    wrapColorTitle: {
        marginBottom: 5,
    },
    wrapColorBadge: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    colorBadge: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.lightGray,
        width: "30%",
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    imgColor: {
        width: 30,
        height: 30,
    },
    wrapQuantity: {
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textQuantity: {
        fontSize: 14,
    },
    btnSelectQuantity: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 80,
        borderColor: COLORS.lightGray,
        borderWidth: 0.5,
    },
    btnDecrease: {
        flexDirection: "row",
        justifyContent: "center",
        fontSize: 12,
        width: "30%",
        borderColor: COLORS.lightGray,
        borderRightWidth: 0.5,
    },
    btnIncrease: {
        flexDirection: "row",
        justifyContent: "center",
        fontSize: 12,
        width: "30%",
        borderColor: COLORS.lightGray,
        borderLeftWidth: 0.5,
    },
    btnAddToCart: {
        position: "absolute",
        bottom: 10,
        left: 16,
        height: 40,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
})