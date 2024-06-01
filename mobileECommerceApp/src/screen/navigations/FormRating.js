import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import FormatCurrency from '../../components/FormatCurrency';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Entypo from "react-native-vector-icons/Entypo"
import api, { authAPI, endpoints } from "../../utils/api";
import COLORS from '../../components/COLORS';

// POST /products/proId/rating_comment/

const FormRating = ({ navigation, route }) => {
    //console.log('order ', route.params.order);
    // product, shop
    const { id,
        product: { name: productName },
        order_color: { product_colors: { name_color, url_image: productImg } },
        product: { id: productId, shop: { img: shopImg, name: shopName } } } = route.params.order

    const [productStars, setProductStars] = useState(0);
    const [productMeaning, setProductMeaning] = useState('');

    const [shopStars, setShopStars] = useState(0);
    const [shopMeaning, setShopMeaning] = useState('');

    const meanings = ['', 'Bad', 'Unsatisfied', 'Normal', 'Good', 'Very good'];

    const handleProductStarPress = (index) => {
        if (productStars === index) {
            setProductStars(0);
            setProductMeaning('');
        } else {
            setProductStars(index);
            setProductMeaning(meanings[index]);
        }
    };

    const handleShopStarPress = (index) => {
        if (shopStars === index) {
            setShopStars(0);
            setShopMeaning('');
        } else {
            setShopStars(index);
            setShopMeaning(meanings[index]);
        }
    };

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [shopComment, setShopComment] = useState('');
    const [productComment, setProductComment] = useState('');
    const handleSend = async () => {
        setLoading(true);
        if (!productStars || !shopStars || !shopComment || !productComment) {
            console.log('productStars ', productStars)
            console.log('shopStars ', shopStars)
            console.log('shopComment ', shopComment)
            console.log('productComment ', productComment)
            setError("Please leave your rating and comment for shop and product");
            setLoading(false);
        } else {

            const axiosInstance = await authAPI();

            axiosInstance.post(endpoints.comment_rating(productId), {
                ratedProduct: productStars,
                ratedShop: shopStars,
                contentProduct: productComment,
                contentShop: shopComment,
                order_id: id
            })
                .then(async response => {
                    if (response.status === 201 && response.data) {
                        console.log('response.data ', response.data);
                        setLoading(false);
                        navigation.navigate('NavPage');
                    }
                })
                .catch(error => {
                    console.error('An error occurred while posting a rating and comment:', error);
                    setError("An error occurred while posting a rating and comment");
                    setLoading(false);
                });
        }
    }

    const starArray = Array.from({ length: 5 }, (_, index) => index + 1); // Tạo mảng ngôi sao từ 1 đến 5
    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    {/* product */}
                    <View style={styles.containerProduct}>
                        <Image
                            source={{ uri: productImg }}
                            style={styles.productImg}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text numberOfLines={1} style={styles.productName}>
                                {productName.length > 30 ? productName.substring(0, 30) + '...' : productName}</Text>
                            <Text style={styles.classification}>Classification: {name_color}</Text>
                        </View>
                    </View>
                    {/* FormRating */}
                    <View style={styles.containerForm}>
                        <View style={styles.quality}>
                            <Text>Quality</Text>
                            <View style={styles.wrapStars}>
                                {starArray.map((index) => (
                                    <TouchableOpacity key={index} onPress={() => handleProductStarPress(index)}>
                                        <FontAwesome
                                            name={productStars >= index ? "star" : "star-o"}
                                            size={30}
                                            color={productStars >= index ? 'orange' : 'yellow'}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={styles.qualityText}>{productMeaning}</Text>

                        </View>
                        <View style={styles.containerMedia}>
                            <TouchableOpacity style={styles.mediaBtn}>
                                <Entypo
                                    name={"camera"}
                                    size={30}
                                    style={styles.mediaIcon}
                                />
                                <Text style={styles.mediaText}>Add Image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.mediaBtn}>
                                <Entypo
                                    name={"video-camera"}
                                    size={30}
                                    style={styles.mediaIcon}
                                />
                                <Text style={styles.mediaText}>Add Video</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.containerComment}>
                            <TextInput
                                multiline={true}
                                placeholder="Leave your comment here ..."
                                onChangeText={setProductComment}
                                value={productComment}
                                style={styles.commentText}></TextInput>
                        </View>
                    </View>
                </View>


                <View style={styles.container}>
                    {/* Shop */}
                    <View style={styles.containerProduct}>
                        <Image
                            source={{ uri: shopImg }}
                            style={styles.productImg}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text numberOfLines={1} style={styles.productName}>
                                {shopName.length > 30 ? shopName.substring(0, 30) + '...' : shopName}</Text>
                        </View>
                    </View>
                    {/* FormRating */}
                    <View style={styles.containerForm}>
                        <View style={styles.quality}>
                            <Text>Quality</Text>
                            <View style={styles.wrapStars}>
                                {starArray.map((index) => (
                                    <TouchableOpacity key={index} onPress={() => handleShopStarPress(index)}>
                                        <FontAwesome
                                            name={shopStars >= index ? "star" : "star-o"}
                                            size={30}
                                            color={shopStars >= index ? 'orange' : 'yellow'}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={styles.qualityText}>{shopMeaning}</Text>
                        </View>

                        <View style={styles.containerComment}>
                            <TextInput
                                multiline={true}
                                placeholder="Leave your comment here ..."
                                onChangeText={setShopComment}
                                value={shopComment}
                                style={styles.commentText}></TextInput>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.ratingBtn}
                    onPress={() => { handleSend() }}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#bc2b78" />
                    ) : (
                        <Text style={styles.btnText}>Send</Text>
                    )}
                </TouchableOpacity>
            </View>
        </>
    );
};

export default FormRating;

const styles = StyleSheet.create({
    container: { flex: 1 },
    containerProduct: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 0.2,
        borderColor: COLORS.lightGray,
    },
    productImg: { borderRadius: 4, height: 50, width: 50 },
    productName: { fontSize: 14 },
    classification: { fontSize: 12, color: COLORS.lightGray },
    containerForm: {
        backgroundColor: '#fff',
        marginBottom: 20,
        padding: 10,
    },
    quality: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    wrapStars: {
        width: '50%',
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    qualityText: { color: COLORS.lightGray, marginLeft: 10 },
    containerMedia: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    mediaBtn: {
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        width: '48%',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 0.2,
        borderColor: 'tomato',
    },
    mediaIcon: { color: 'tomato' },
    mediaText: { fontSize: 12, color: 'tomato' },
    containerComment: {
        height: 200,
        borderRadius: 4,
        borderWidth: 0.2,
        borderColor: COLORS.lightGray,
        backgroundColor: '#f5f5f5',
        borderColor: COLORS.lightGray,
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
    commentText: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 2,
    },
    footer: {
        height: '8%',
        backgroundColor: COLORS.lightGray,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    ratingBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'tomato',
    },
    btnText: {
        fontSize: 16,
        color: '#fff',
    },
})