import { Image, StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView, FlatList, useWindowDimensions } from "react-native";
import React, { useEffect, useState, useRef } from "react";

import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"

const transparent = 'rgba(0,0,0,0.5)';
const Info = ({ origin, material, manufacture }) => {
    const [openModel, setOpenModal] = useState(false);
    const data =
    {
        "info": {
            "id": 1,
            "origin": "Mỹ",
            "material": "Nhựa, kim lọai tổng hợp",
            "description": "<p>BLUETOOTH 5.2</p>\r\n\r\n<p>- Để tăng trải nghiệm kh&ocirc;ng d&acirc;y ho&agrave;n to&agrave;ntr&ecirc;n Headphone Bluetooth, ONEODIO đ&atilde; trang bị Bluetooth 5.2 hiện đại cho d&ograve;ng sản phẩm tai nghe Headphone Bluetooth OneOdio A70, đem lại 1 trải nghiệm kết nối nhanh, ổn định hơn với khoảng c&aacute;ch kết nối xa hơn.</p>\r\n\r\n<p>&nbsp;M&Agrave;NG LOA RỘNG 40MM - THIẾT KẾ OVER-EAR</p>\r\n\r\n<p>- ONEODIO A70 trang bị Driver40mm c&ugrave;ng thiết kế Over-Ear cho khả năng chống ồn thụ động tốt khi bao k&iacute;n được tai của người sử dụng.</p>\r\n\r\n<p>- Với m&agrave;ng loa rộng 40mm, A70 mang đến chất lượng sống động v&agrave; ch&acirc;n thực. &Acirc;mtrầm mạnh mẽ, giọng h&aacute;t r&otilde; r&agrave;ng v&agrave; &acirc;m cao sắc n&eacute;t tạo th&agrave;nh &acirc;mthanh c&acirc;n bằng ho&agrave;n hảo, n&acirc;ng cao trải nghiệm &acirc;m nhạc của người d&ugrave;ng.</p>\r\n\r\n",
            "manufacture": "ONIO"
        }
    }

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={styles.column1}>
                <Text style={styles.text}>{item.title}</Text>
            </View>
            <View style={styles.column2}>
                <Text style={styles.text}>{item.value}</Text>
            </View>
        </View>
    );

    const renderItemData = [
        { title: 'Origin', value: origin },
        { title: 'Material', value: material },
        { title: 'Manufacture', value: manufacture },
        // { title: 'Description', value: data.info.description },
    ];

    function renderModal() {
        return (
            <Modal
                visible={openModel}
                animationType="slide"
                transparent={true}
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
                        height: "50%",
                        borderRadius: 10,
                    }}>
                        <TouchableOpacity onPress={() => setOpenModal(false)} style={{
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
                        <View>
                            <View style={styles.wrapProductDetailTitle}>
                                <Text
                                    style={{
                                        color: "red",
                                        fontSize: 16,
                                        marginTop: 15,
                                    }}
                                >Product details</Text>
                            </View>

                            <FlatList
                                data={renderItemData}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={1} // Hiển thị 2 cột
                                style={{}}

                            // ItemSeparatorComponent={this.ItemSeparator}
                            // refreshing={this.state.refreshing}
                            // onRefresh={this.handleRefresh}

                            // onScroll={this.handleScroll}
                            // scrollEventThrottle={16}
                            // ref={(ref) => { this.scrollViewRef = ref; }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <View
            style={styles.containerProductDetail}>
            <View style={styles.productDetailTitle}>
                <View style={styles.wrapProductDetailTitle}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "500",
                            textTransform: 'capitalize',
                        }}
                    >Product details</Text >
                </View>


                <TouchableOpacity
                    style={styles.wrapProductDetailSeeMore}
                    onPress={() => setOpenModal(true)}
                >
                    <Text>Origin, Material, ..</Text>
                    <AntDesign name={openModel ? 'caretup' : 'caretdown'} size={16} />
                </TouchableOpacity>
            </View>
            {renderModal()}
        </View >

    )
}

export default Info;

const styles = StyleSheet.create({
    containerProductDetail: {
        backgroundColor: "#fff",
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    productDetailTitle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 4,
    },
    wrapProductDetailTitle: {
        flexDirection: "row",
        justifyContent: "center",
    },
    wrapProductDetailSeeMore: {
        flexDirection: "row",
        alignItems: "center",
    },

    item: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    column1: {
        marginLeft: 5,
        maxWidth: "35%",
    },
    column2: {
        marginRight: 5,
        maxWidth: "50%",
    },
    text: {
        fontSize: 12,
        flexWrap: 'wrap',
    },
})