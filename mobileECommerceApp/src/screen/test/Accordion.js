import React, { useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, UIManager, Platform, LayoutAnimation } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign"

export default function Accordion({ title, details }) {
    const [opened, setOpened] = useState(false);

    // Supply animation for old android device
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    function toggleAccordion() { //easeInEaseOut & setOpened
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpened(!opened);
    }

    return (
        <View>
            <TouchableWithoutFeedback onPress={toggleAccordion}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <AntDesign name={opened ? 'caretup' : 'caretdown'} size={16} />
                </View>
            </TouchableWithoutFeedback>

            {opened && (
                <View style={styles.content}>
                    {details}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginBottom: 10,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: "500",
        textTransform: 'capitalize',
    },
    content: {
        marginTop: 8,
    },
    details: {
        opacity: 0.65,
    },
});
