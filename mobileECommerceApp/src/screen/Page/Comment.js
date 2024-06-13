import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView, FlatList, useWindowDimensions, Button } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"

import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Badge } from "react-native-elements";

import api, { authAPI, endpoints } from "../../utils/api";
import COLORS from "../../components/COLORS";

const Comment = ({ route }) => {
    const { productId } = route.params;
    const [parentComments, setParentComments] = useState([]);
    const [childComments, setChildComments] = useState({});
    const [expandedComments, setExpandedComments] = useState({}); // expand comment state
    const [loadingParentComments, setLoadingParentComments] = useState(true); // loading parentComment state
    const [replyText, setReplyText] = useState(''); // comment text state
    const [replyingTo, setReplyingTo] = useState({ id: null, isParent: true }); // comment_id replying to State

    useEffect(() => { // fetch parentComment for first init
        fetchParentComments();
    }, [productId]);

    const [refreshing, setRefreshing] = useState(true); // For refreshing state
    const handleRefresh = () => {
        setRefreshing(false);
        fetchParentComments();
    };

    const fetchParentComments = async () => {
        setRefreshing(true);
        try {
            const response = await api.get(`/products/${productId}/replyParentComment/`);
            if (response.data) {
                setParentComments(response.data);
                //console.log('prComment ', response.data);
            } else {
                console.error('Error: response.data is empty');
            }
        } catch (error) {
            console.error('Error fetching parentComments:', error);
        } finally {
            setLoadingParentComments(false);
            setRefreshing(false);
        }
    };

    const fetchChildComments = async (parentCommentId) => {
        try {
            const response = await api.get(`/products/${productId}/replyParentComment/${parentCommentId}/replyChildComments/`);
            setChildComments(prevState => ({
                ...prevState,
                [parentCommentId]: response.data
            }));
            //console.log('childComment ', response.data);
        } catch (error) {
            console.error(`Error fetching childComments for parentCommentId ${parentCommentId}:`, error);
        }
    };

    const handleToggleExpand = async (parentCommentId) => {
        const isExpanded = expandedComments[parentCommentId];
        if (!isExpanded && !childComments[parentCommentId]) {
            await fetchChildComments(parentCommentId);
        }
        setExpandedComments(prevState => ({
            ...prevState,
            [parentCommentId]: !isExpanded
        }));
    };

    const handleReply = (commentId, isParent) => {
        setReplyingTo({ id: commentId, isParent });
    };

    const handleSendReply = async () => {
        if (!replyText.trim()) return;
        try {
            console.log('replyingTo.id, ', replyingTo.id)
            // console.log('productId, ', productId)
            const body = {
                "content": replyText,
                "parent_comment_id": replyingTo.id ? replyingTo.id : null,
            }

            const axiosInstance = await authAPI();
            // Post
            await axiosInstance.post(`/products/${productId}/replyComment/`, body, {
                headers: {
                    'Content-Type': 'application/json', // Data format
                },
            });

            //Fetching updating Comment
            replyingTo.id ? await fetchChildComments(replyingTo.id) : await fetchParentComments();

            //Reset State
            setReplyText('');
            setReplyingTo({ id: null, isParent: true });
        } catch (error) {
            console.error('Error sending reply:', error);
        }
    };

    const renderChildComment = ({ item }) => (
        <View style={styles.childCommentContainer} key={item.id.toString()}>
            <View style={styles.userContainer}>
                <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
                <Text style={styles.username}>{item.user.username}</Text>
            </View>
            <Text style={styles.commentContent}>{item.content}</Text>
            <TouchableOpacity onPress={() => handleReply(item.id, false)}>
                <Text style={styles.replyComment}>Reply</Text>
            </TouchableOpacity>
            {expandedComments[item.id] && childComments[item.id] && (
                <FlatList
                    data={childComments[item.id]}
                    renderItem={renderChildComment}
                    keyExtractor={(childItem) => childItem.id.toString()}
                />
            )}
            {replyingTo.id === item.id && !replyingTo.isParent && (
                <View style={styles.replyInputContainer}>
                    <TextInput
                        style={styles.replyInput}
                        value={replyText}
                        onChangeText={setReplyText}
                        placeholder="Write a reply..."
                    />
                    <Button title="Send" onPress={handleSendReply} />
                </View>
            )}
        </View>
    );

    const renderComment = ({ item }) => (
        <View style={styles.commentContainer} key={item.id.toString()}>
            <View style={styles.userContainer}>
                <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
                <Text style={styles.username}>{item.user.username}</Text>
            </View>
            <Text style={styles.commentContent}>{item.content}</Text>
            <TouchableOpacity onPress={() => handleToggleExpand(item.id)}>
                {item.isParentCommentReply ?
                    <Text style={styles.viewReplyComment}>
                        {expandedComments[item.id] ? 'Thu gọn' : 'Xem thêm'}
                    </Text> :
                    <></>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleReply(item.id, true)}>
                <Text style={styles.replyComment}>Reply</Text>
            </TouchableOpacity>
            {expandedComments[item.id] && childComments[item.id] && (
                <FlatList
                    data={childComments[item.id]}
                    renderItem={renderChildComment}
                    keyExtractor={(childItem) => childItem.id.toString()}
                />
            )}
            {replyingTo.id === item.id && replyingTo.isParent && (
                <View style={styles.replyInputContainer}>
                    <TextInput
                        style={styles.replyInput}
                        value={replyText}
                        onChangeText={setReplyText}
                        placeholder="Write a reply..."
                    />
                    <Button title="Send" onPress={handleSendReply} />
                </View>
            )}
        </View>
    );

    if (loadingParentComments) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }


    return (
        <>
            <FlatList
                data={parentComments}
                renderItem={renderComment}
                keyExtractor={(item) => item.id.toString()}

                refreshing={refreshing}
                onRefresh={handleRefresh}
            />
            <View style={styles.replyInputContainer}>
                <TextInput
                    style={styles.replyInput}
                    value={replyText}
                    onChangeText={setReplyText}
                    placeholder="Write comment..."
                />
                <Button title="Send" onPress={handleSendReply} />
            </View>
        </>


    );
};


export default Comment;


const styles = StyleSheet.create({
    commentContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    childCommentContainer: {
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        fontSize: 14,
        fontWeight: '500',
    },
    commentContent: {
        fontSize: 14,
        fontWeight: '400',
    },
    viewReplyComment: {
        color: 'blue',
        marginTop: 5,
    },
    replyComment: {
        color: 'blue',
        marginTop: 5,
        marginLeft: 10,
    },
    replyInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    replyInput: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
});
