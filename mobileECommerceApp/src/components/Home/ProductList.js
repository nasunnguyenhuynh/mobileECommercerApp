import React, { useEffect, useState, useRef } from "react";
import {
    StyleSheet,
    Text,
    FlatList,
    View,
    Image,
    TouchableOpacity,
    Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import api, { authAPI, endpoints } from "../../utils/api";
import axios from 'axios';

const ProductList = () => {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);
    const scrollViewRef = useRef(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetchCats();
    }, []);

    const fetchCats = () => { // Fetch to GET products
        setRefreshing(true);
        fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1')
            .then(res => res.json())
            .then(resJson => {
                setData(resJson);
                setRefreshing(false);
            }).catch(e => console.log(e));
    };

    handleProductPress = (productId) => {   // Navigate to ProductDetail
        console.log('Pressed product ID:', productId);
        navigation.navigate('ProductDetail')
    };

    const renderItemComponent = ({ item }) => { // Render Component for Flatlist
        const productName = item.url.length > 50 ? item.url.substring(0, 50) + '...' : item.url;

        // const productName = data.item.name.length > 50 ? data.item.name.substring(0, 50) + '...' : data.item.name;
        // const ratings = data.item.rating;
        // const price = data.item.price;
        // const sold = data.item.sold_quantity;
        return (
            <TouchableOpacity style={styles.containerProductCard} onPress={() => handleProductPress(item.id)}>
                <Image style={styles.image} source={{ uri: item.url }} />
                <View style={{ margin: 4 }}>
                    <Text numberOfLines={2} ellipsizeMode="tail">{productName}</Text>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 0.5,
                        borderColor: "#e7700d",
                        backgroundColor: "#eac55b",
                        width: 34,
                        paddingHorizontal: 2,
                        paddingVertical: 1,
                        justifyContent: "space-between"
                    }}>
                        <FontAwesome name={"star"} size={10} color={"#e7700d"} />
                        <Text style={{ fontSize: 8 }}>4.7</Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}>
                        <Text style={{ fontSize: 16, color: "#cf3131", textDecorationLine: 'underline' }}>123.000đ</Text>
                        <Text style={{ fontSize: 10, color: "#6d696996" }}>23k sold</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    const handleRefresh = () => { 
        setRefreshing(false);
        fetchCats();
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