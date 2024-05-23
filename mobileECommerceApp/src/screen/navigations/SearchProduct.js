import {
    StyleSheet, TouchableOpacity, View, Text, Image, ActivityIndicator
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Fontisto from "react-native-vector-icons/Fontisto"
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';

import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import FormatCurrency from "../../components/FormatCurrency";
import { color } from "react-native-elements/dist/helpers";
import COLORS from "../../components/COLORS";
import api, { authAPI, endpoints } from "../../utils/api";
import useModal from "../../components/useModal"
import UpdateInfo from "../../components/Payment/UpdateInfo";



function SearchProduct({ navigation, route }) {
    // const navigation = useNavigation();

    return (
        <Text style={{ justifyContent: "center", alignContent: "center" }}>Search Product</Text>
    )
}

export default SearchProduct;

const styles = StyleSheet.create({

})