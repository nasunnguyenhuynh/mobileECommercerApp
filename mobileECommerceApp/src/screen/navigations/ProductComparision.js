import {
    StyleSheet,
    Text,
    ScrollView,
    FlatList,
    View,
    Image,
    TouchableOpacity,
    Dimensions, TextInput,
    SafeAreaView,
    VirtualizedList
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import React, { useState, useEffect, useRef } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';

import FormatCurrency from "../../components/FormatCurrency";
import COLORS from "../../components/COLORS";
import api, { authAPI, endpoints } from "../../utils/api";


function ProductComparision({ navigation, route }) {

    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(true);

    useEffect(() => { //fetchProducts() called to update state when Flatlist mounted 1st
        fetchProducts();
    }, []);

    const fetchProducts = async () => { // Fetch searched products
        setRefreshing(true);
        try {
            const response = await api.get(endpoints.categories_id(route.params.categoryId));
            //console.log(response.data)
            setData(response.data);
            setRefreshing(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setRefreshing(false);
        }
    };

    const fetchProduct = async (id) => {
        try {
            api.get(`/products/${id}`)
                .then(async response => {
                    if (response.status === 200 && response.data) {
                        //console.log('data to ProductDetail : ', response.data);
                        if (!pro1) {
                            setPro1(response.data)
                        }
                        else if (!pro2) {
                            setPro2(response.data)
                        }
                    }
                })
                .catch(error => {
                    console.error(`Error fetching product has id ${id}:`, error)
                });
        } catch (error) {
            console.error(`Error fetching product has id ${id}:`, error);
        }
    };

    // console.log('productId ', route.params.productId)
    // console.log('categoryId ', route.params.categoryId)
    const [pro1, setPro1] = useState('')
    const [pro2, setPro2] = useState('')

    const [selectedProduct1, setSelectedProduct1] = useState(null);
    const [selectedProduct2, setSelectedProduct2] = useState(null);

    handleProductPress = (productId) => {
        //console.log('Pressed product ID:', productId);
        if (selectedProduct1 === productId) {
            setPro1('')
            setSelectedProduct1(null);
        } else if (selectedProduct2 === productId) {
            setPro2('')
            setSelectedProduct2(null);
        } else if (!pro1) {
            setSelectedProduct1(productId);
            fetchProduct(productId);
        } else if (!pro2) {
            setSelectedProduct2(productId);
            fetchProduct(productId);
        }
    };


    const renderItemComponent = ({ item }) => { // Render Component for Flatlist
        // console.log(typeof item.rating)
        const isSelected = selectedProduct1 === item.id || selectedProduct2 === item.id;
        return (
            <TouchableOpacity
                style={[
                    styles.containerProductCard,
                    isSelected && styles.selectedProductCard
                ]}
                onPress={() => handleProductPress(item.id)}>
                <Image style={styles.image} source={{ uri: item.img }} />
                <View style={{ margin: 4 }}>
                    <Text numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>
                    <View style={styles.wrapRating}>
                        <FontAwesome name={"star"} size={10} color={"#e7700d"} />
                        <Text style={{ fontSize: 8 }}>{Math.round(item.rating * 10) / 10}</Text>
                    </View>
                    <View style={styles.wrapPriceSold}>
                        <Text style={{ fontSize: 16, color: "#cf3131", textDecorationLine: 'underline' }}>{FormatCurrency(item.price)}đ</Text>
                        <Text style={{ fontSize: 10, color: "#6d696996" }}>{item.sold_quantity} sold</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    const handleRefresh = () => {
        setRefreshing(false);
        fetchProducts();
    };




    return (
        <>
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <View style={styles.section}>
                        <View style={[styles.feature, styles.bg1]}>
                            <Text style={[styles.text1]}>
                                feature
                            </Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={[styles.feature, styles.bg2]}>
                            <Text style={[styles.text2]}>
                                Name
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <View style={styles.content1}>
                                <Text style={{ flexWrap: 'wrap' }}>{pro1 ? pro1.name : ''}</Text>
                            </View>
                            <View style={styles.content2}>
                                <Text style={{ flexWrap: 'wrap' }}>{pro2 ? pro2.name : ''}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={[styles.feature, styles.bg3]}>
                            <Text style={[styles.text2]}>
                                Price
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <View style={styles.content1}>
                                <Text style={{ flexWrap: 'wrap' }}>{pro1 ? pro1.price : ''}</Text>
                            </View>
                            <View style={styles.content2}>
                                <Text style={{ flexWrap: 'wrap' }}>{pro2 ? pro2.price : ''}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={[styles.feature, styles.bg2]}>
                            <Text style={[styles.text2]}>
                                Rated
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <View style={styles.content1}>
                                <Text style={{ flexWrap: 'wrap' }}>{pro1 ? pro1.sell.rating : ''}</Text>
                            </View>
                            <View style={styles.content2}>
                                <Text style={{ flexWrap: 'wrap' }}>{pro2 ? pro2.sell.rating : ''}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={[styles.feature, styles.bg3]}>
                            <Text style={[styles.text2]}>
                                Sold
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <View style={styles.content1}>
                                <Text style={{ flexWrap: 'wrap' }}>{pro1 ? pro1.sell.sold_quantity : ''}</Text>
                            </View>
                            <View style={styles.content2}>
                                <Text style={{ flexWrap: 'wrap' }}>{pro2 ? pro2.sell.sold_quantity : ''}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={[styles.feature, styles.bg2]}>
                            <Text style={[styles.text2]}>
                                Shop
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <View style={styles.content1}>
                                <Text style={{ flexWrap: 'wrap' }}>{pro1 ? pro1.shop.name : ''}</Text>
                            </View>
                            <View style={styles.content2}>
                                <Text style={{ flexWrap: 'wrap' }}>{pro2 ? pro2.shop.name : ''}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={[styles.feature, styles.bg3]}>
                            <Text style={[styles.text2]}>
                                Rated
                            </Text>
                        </View>
                        <View style={styles.content}>
                            <View style={styles.content1}>
                                <Text style={{ flexWrap: 'wrap' }}>{pro1 ? Math.round(pro1.shop.rated * 10) / 10 : ''}</Text>
                            </View>
                            <View style={styles.content2}>
                                <Text style={{ flexWrap: 'wrap' }}>{pro2 ? Math.round(pro2.shop.rated * 10) / 10 : ''}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView >

            <FlatList
                data={data}
                renderItem={renderItemComponent}
                keyExtractor={item => item.id.toString()}
                numColumns={1}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </>
    );
}

export default ProductComparision;

const { width: screenWidth } = Dimensions.get('window');
const containerWidth = screenWidth * 0.44; 
const styles = StyleSheet.create({
    containerProductCard: {
        height: 240,
        margin: 5,
        width: containerWidth,
        backgroundColor: '#FFF',
        borderRadius: 6,
    },
    selectedProductCard: {
        borderColor: 'red',
        borderWidth: 2,
    },
    wrapRating: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "#e7700d",
        backgroundColor: "#eac55b",
        width: 34,
        paddingHorizontal: 2,
        paddingVertical: 1,
        justifyContent: "space-between"
    },
    wrapPriceSold: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    image: {
        height: 140,
        width: "100%",
        borderRadius: 6,
    },




    section: {
        backgroundColor: 'yellow',
        flexDirection: 'row',
        alignItems: 'center'
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '30%',
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    bg1: {
        backgroundColor: '#000'
    },
    bg2: {
        backgroundColor: '#ffb39b'
    },
    bg3: {
        backgroundColor: '#ffd2c4'
    },
    text1: {
        fontSize: 16,
        textTransform: 'uppercase',
        color: '#fff'
    },
    text2: {
        fontSize: 16,
        color: '#000',
        flexWrap: 'wrap'
    },
    content: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        flex: 1,
        borderWidth: 0.2, borderColor: COLORS.lightGray,
    },
    content1: {
        height: '100%',
        flex: 1, flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 0.2, borderColor: COLORS.lightGray,
    },
    content2: {
        flex: 1, flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 0.2, borderColor: COLORS.lightGray,
    }
});