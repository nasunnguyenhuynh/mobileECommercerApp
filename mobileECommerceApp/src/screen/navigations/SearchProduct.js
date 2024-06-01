import {
    StyleSheet,
    Text,
    FlatList,
    View,
    Image,
    TouchableOpacity,
    Dimensions, TextInput,
    SafeAreaView
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import React, { useState, useEffect, useRef } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';

import { ScrollView } from "react-native-gesture-handler";
import FormatCurrency from "../../components/FormatCurrency";
import { color } from "react-native-elements/dist/helpers";
import COLORS from "../../components/COLORS";
import api, { authAPI, endpoints } from "../../utils/api";
import useModal from "../../components/useModal"
import UpdateInfo from "../../components/Payment/UpdateInfo";
import ProductFilter from "../../components/Home/ProductFilter";


function SearchProduct({ navigation, route }) {
    // For header
    const [search, setSearch] = useState(route.params.search || '');
    const { isModalVisible, openModal, closeModal } = useModal();

    const [filters, setFilters] = useState({
        sortOrder: null,
        priceOrder: null,
        selectedCategories: [],
    });

    const handleApplyFilters = async (newFilters) => {
        console.log('newFilters ', newFilters);
        setFilters(newFilters);
        setRefreshing(true);
        try {
            if (containsOnlyDigits(search)) {
                //selectedCategories
                if (newFilters.selectedCategories.length === 1) {
                    const response = await api.get(`/categories/${Number(newFilters.selectedCategories)}/products`);
                    setData(response.data);
                    setRefreshing(false);
                } else {
                    const response = await api.get(`/products/?pmn=${search}&${newFilters.sortOrder}&${newFilters.priceOrder}&pmn=${newFilters.min}&pmx=${newFilters.max}`);
                    setData(response.data.results);
                    setRefreshing(false);
                }

            } else {
                if (newFilters.selectedCategories.length === 1) {
                    const response = await api.get(`/categories/${Number(newFilters.selectedCategories)}/products`);
                    setData(response.data);
                    setRefreshing(false);
                } else {
                    const response = await api.get(`/products/?n=${search}&${newFilters.sortOrder}&${newFilters.priceOrder}&pmn=${newFilters.min}&pmx=${newFilters.max}`);
                    setData(response.data.results);
                    setRefreshing(false);
                }
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setRefreshing(false);
        }

    };

    // For fetch
    function containsOnlyDigits(input) {
        return !isNaN(input);
    }

    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);
    const scrollViewRef = useRef(null);

    useEffect(() => { //fetchProducts() called to update state when Flatlist mounted 1st
        fetchProducts();
    }, []);

    const fetchProducts = async () => { // Fetch searched products
        setRefreshing(true);
        try {
            if (containsOnlyDigits(search)) {
                const response = await api.get(endpoints.products_pmn(search));
                setData(response.data.results);
                setRefreshing(false);
            } else {
                const response = await api.get(endpoints.products_n(search));
                setData(response.data.results);
                setRefreshing(false);
            }
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
            {/* header */}
            <View style={styles.wrapHeaderHompage}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={30} color="black" />
                </TouchableOpacity>
                <View style={styles.inputContainer} >
                    <TouchableOpacity
                        onPress={() => fetchProducts()}>
                        <Feather
                            name={"search"}
                            size={20}
                            color={"#9A9A9A"}
                            style={styles.inputIcon}
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Search"
                        value={search}
                        onChangeText={text => setSearch(text)}
                    />
                </View>
                {/* Filter */}
                <TouchableOpacity
                    style={styles.wrapFilter}
                    onPress={openModal}
                >
                    <AntDesign
                        name={"filter"}
                        size={30}
                        color={"#000"}
                        style={{}}
                    />
                    <View style={{ height: "100%", justifyContent: "flex-end" }}>
                        <Text style={{ fontSize: 8 }}>
                            Filter
                        </Text>
                    </View>
                </TouchableOpacity>
                {isModalVisible && (
                    <ProductFilter
                        visible={isModalVisible}
                        closeModal={closeModal}
                        onApplyFilters={handleApplyFilters}
                    />
                )}
            </View>
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

export default SearchProduct;

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



    // header
    wrapHeaderHompage: {
        // backgroundColor: "yellow",
        marginTop: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        width: '100%',
    },
    inputContainer: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        borderRadius: 20,
        elevation: 10,
        alignItems: "center",
        height: "100%",
        marginLeft: 10,
        width: '60%',
    },
    inputIcon: {
        marginLeft: 15,
        marginRight: 5,
    },
    textInput: {
        flex: 1,
        marginRight: 15,
    },
    wrapFilter: {
        marginLeft: 10,
        // backgroundColor: "tomato",
        height: 30,
        flexDirection: "row",
        alignItems: "center",
    }
});