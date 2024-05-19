import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, FlatList, } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import React, { useEffect, useState, useRef } from "react";
import { Badge } from "react-native-elements";
import api, { authAPI, enpoints } from "../../utils/api";
import { useNavigation } from "@react-navigation/native";
import OrderProcessElement from "../../components/Profile/OrderProcessElement";
import ExtensionElement from "../../components/Profile/ExtensionElement";

const Edit = ({ route }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Edit Screen</Text>
        </View>
    )
}

export default Edit;
const styles = StyleSheet.create({})
