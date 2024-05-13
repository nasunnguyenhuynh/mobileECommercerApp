import React, { useEffect, useState, useRef } from "react";
import { Image, StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView, FlatList, useWindowDimensions } from "react-native";

const transparent = 'rgba(0,0,0,0.5)';
const ModalExample = () => {

    const [openModel, setOpenModal] = useState(false);

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
                        height: 150,
                        borderRadius: 10,
                    }}>
                        <TouchableOpacity onPress={() => setOpenModal(false)}>
                            <Text style={{ color: "black" }}>Close</Text>
                        </TouchableOpacity>
                        <Text
                            style={{
                                color: "red",
                                fontSize: 18,
                                marginTop: 15,
                            }}
                        >Like Subcribe Share</Text>
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'cyan',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Text
                style={{
                    fontSize: 40,
                    textTransform: 'capitalize',
                    textAlign: 'center',
                    fontWeight: '600',
                    color: 'black',
                }}
            >How to make responsive modal</Text >


            <TouchableOpacity
                style={{
                    marginTop: 20,
                    backgroundColor: "yellow",
                    borderRadius: 8,
                    padding: 10,
                }}
                onPress={() => setOpenModal(true)}
            >
                <Text
                    style={{
                        color: 'black',
                        fontSize: 20,
                    }}
                >Open Modal</Text>
            </TouchableOpacity>
            {renderModal()}
        </View >
    )
};
export default ModalExample;