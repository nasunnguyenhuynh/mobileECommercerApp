import React, { useEffect, useState, useRef } from "react";
import {
    StyleSheet,
    Text,
    FlatList,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    SafeAreaView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import api, { authAPI, endpoints } from "../../utils/api";
import FormatCurrency from "../FormatCurrency";


const ProductList = () => {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);
    const scrollViewRef = useRef(null);
    const navigation = useNavigation();

    useEffect(() => { //fetchProducts() called to update state when Flatlist mounted 1st
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setRefreshing(true);
        try {
            const response = await api.get('/products/');
            setData(response.data.results); // response.data ->  response.data.results
            setRefreshing(false);
            // console.log(response.data);
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
                        //console.log('data to ProductDetail : ', response.data); //Send JSON
                        navigation.navigate('ProductDetail', { fromHome: true, data: response.data });
                    }
                })
                .catch(error => {
                    console.error(`Error fetching product has id ${id}:`, error)
                });
        } catch (error) {
            console.error(`Error fetching product has id ${id}:`, error);
        }
    };

    handleProductPress = (productId) => {   // Navigate to ProductDetail
        // console.log('Pressed product ID:', productId);
        fetchProduct(productId);
    };

    const renderItemComponent = ({ item }) => { // Render Component for Flatlist
        // console.log(typeof item.rating)
        return (
            <TouchableOpacity style={styles.containerProductCard} onPress={() => handleProductPress(item.id)}>
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

    const handleScroll = (event) => {
        const yOffset = event.nativeEvent.contentOffset.y;
        setShowScrollTopButton(yOffset > 300);
    };

    const scrollToTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToOffset({ offset: 0, animated: true });
        }
    };

    return (
        <>
            <FlatList
                data={data}
                renderItem={renderItemComponent}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                style={{ margin: 10 }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                ref={scrollViewRef}
            />
            {showScrollTopButton && (
                <TouchableOpacity style={styles.scrollTopButton} onPress={scrollToTop}>
                    <AntDesign name="arrowup" size={24} color="white" />
                </TouchableOpacity>
            )}
        </>
    );
}
export default ProductList;

const { width: screenWidth } = Dimensions.get('window');
const containerWidth = screenWidth * 0.44; // 44% của width của thiết bị
const styles = StyleSheet.create({
    containerProductCard: {
        height: 240,
        margin: 5,
        width: containerWidth,
        backgroundColor: '#FFF',
        borderRadius: 6,
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
    scrollTopButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'gray',
        width: 40,
        height: 40,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
});