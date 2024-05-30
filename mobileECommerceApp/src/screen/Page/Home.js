import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView, FlatList, Button } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React, { useEffect, useState, useRef } from "react";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Searchbar } from 'react-native-paper';
import { Badge } from "react-native-elements";
import api, { enpoints } from "../../utils/api";
import ProductList from "../../components/Home/ProductList";

const Home = ({ navigation }) => {
    const numberMessage = 12;
    const numberProductInCart = 27;
    const [search, setSearch] = useState('');
    

    return (
        <View style={styles.container}>
            {/* Wrap_Top_Hompage */}
            <View style={{ marginHorizontal: 10, marginTop: 40 }}>
                <View style={styles.wrapHeaderHompage}>
                    {/* Search */}
                    <View style={styles.inputContainer} >
                        <TouchableOpacity onPress={() => navigation.navigate('NavSearch', { search: search })}>
                            <Feather
                                name={"search"}
                                size={24}
                                color={"#9A9A9A"}
                                style={styles.inputIcon}
                            />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Search"
                            onChangeText={setSearch}
                        />
                    </View>

                    {/* Cart_Chat */}
                    <View style={styles.wrapCartMessage}>
                        <View style={{ position: 'relative' }}>
                            <Feather
                                name={"shopping-cart"}
                                size={30}
                                color={"black"}
                                style={styles.socialIcon}
                            />
                            <Badge
                                badgeStyle={{
                                    backgroundColor: "#cf3131",
                                }}
                                containerStyle={{
                                    position: 'absolute',
                                    top: -6,
                                    right: -6,
                                }}
                                onPress={() => {
                                    alert("message");
                                }}
                                status="error"
                                textProps={{}}
                                textStyle={{
                                    fontSize: 10,
                                }}
                                value={numberProductInCart}
                                options={{}}
                            />
                        </View>
                        <View style={{ position: 'relative' }}>
                            <Ionicons
                                name={"chatbubbles-outline"}
                                size={30}
                                color={"black"}
                                style={{ marginLeft: 12 }}
                            />
                            <Badge
                                badgeStyle={{
                                    backgroundColor: "#cf3131",
                                }}
                                containerStyle={{
                                    position: 'absolute',
                                    top: -6,
                                    right: -6,
                                }}
                                onPress={() => {
                                    alert("message");
                                }}
                                status="error"
                                textProps={{}}
                                textStyle={{
                                    fontSize: 10,
                                }}
                                value={numberMessage}
                                options={{}}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <ProductList />
        </View >
    );
}

export default Home;


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5F5F5",
        flex: 1,
    },
    wrapHeaderHompage: {
        flexDirection: "row",
        alignItems: "center",
    },
    inputContainer: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        borderRadius: 20,
        elevation: 10,
        alignItems: "center",
        height: 50,
        marginVertical: 14,
        flex: 2,
    },
    inputIcon: {
        marginLeft: 15,
        marginRight: 5,
    },
    textInput: {
        flex: 1,
        marginRight: 10,
    },
    wrapCartMessage: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        justifyContent: "flex-end"
    },
})