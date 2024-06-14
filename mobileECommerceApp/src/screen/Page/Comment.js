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
    const [parentComment, setParentComment] = useState([]);
    const [expandedComments, setExpandedComments] = useState({});
    useEffect(() => {
        fetchParentComment();
    }, [productId]);

    const [refreshing, setRefreshing] = useState(true); // For refreshing state
    const handleRefresh = () => {
        setParentComment([]);
        setExpandedComments({});
        setReplyTo(null);
        setComment('');
        fetchParentComment();
    };

    const fetchParentComment = async () => {
        setRefreshing(true);
        try {
            const response = await api.get(`/products/${productId}/replyParentComment/`);
            if (response.data) {
                setParentComment(response.data);
            } else {
                console.error('Error: response.data is empty');
            }
        } catch (error) {
            console.error('Error fetching parentComments:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const fetchChildComment = async (parentCommentId) => {
        try {
            const response = await api.get(`/products/${productId}/replyParentComment/${parentCommentId}/replyChildComments/`);
            if (response.data) {
                setExpandedComments(prevState => ({
                    ...prevState,
                    [parentCommentId]: response.data
                }));
            } else {
                console.error('Error: response.data is empty');
            }
        } catch (error) {
            console.error('Error fetching child comments:', error);
        }
    };

    const handleToggle = (parentCommentId) => {
        if (expandedComments[parentCommentId]) {
            setExpandedComments(prevState => {
                const newState = { ...prevState };
                delete newState[parentCommentId];
                return newState;
            });
        } else {
            fetchChildComment(parentCommentId);
        }
    };

    const renderChildComment = (parentCommentId, childComment) => (
        childComment
            .filter(item => item.parent_comment_id === parentCommentId)
            .map(item => (
                <View style={styles.childCommentContainer} key={item.id.toString()}>
                    <View style={styles.userContainer}>
                        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
                        <Text style={styles.username}>{item.user.username}</Text>
                    </View>
                    <Text style={styles.commentContent}>{item.content}</Text>
                    {
                        item.isParentCommentReply &&
                        <TouchableOpacity onPress={() => handleToggle(item.id)}>
                            <Text style={styles.replyComment}>
                                {expandedComments[item.id] ? 'Collapse' : 'View All'}
                            </Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={() => handleReplyPress(item.id)}>
                        <Text style={styles.replyComment}>Reply</Text>
                    </TouchableOpacity>
                    {expandedComments[item.id] && renderChildComment(item.id, expandedComments[item.id])}
                </View>
            ))
    );

    const renderParentComment = ({ item }) => (
        <View style={styles.commentContainer} key={item.id.toString()}>
            <View style={styles.userContainer}>
                <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
                <Text style={styles.username}>{item.user.username}</Text>
            </View>
            <Text style={styles.commentContent}>{item.content}</Text>
            {
                item.isParentCommentReply &&
                <TouchableOpacity onPress={() => handleToggle(item.id)}>
                    <Text style={styles.replyComment}>
                        {expandedComments[item.id] ? 'Collapse' : 'View All'}
                    </Text>
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => handleReplyPress(item.id)}>
                <Text style={styles.replyComment}>Reply</Text>
            </TouchableOpacity>
            {expandedComments[item.id] && renderChildComment(item.id, expandedComments[item.id])}
        </View>
    );

    const [comment, setComment] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const handleSendComment = async () => {

        if (!comment.trim()) return;
        try {
            setRefreshing(true);
            const body = {
                "content": comment,
                "parent_comment_id": replyTo ? replyTo : null,
            }

            const axiosInstance = await authAPI();
            // Post
            await axiosInstance.post(`/products/${productId}/replyComment/`, body, {
                headers: {
                    'Content-Type': 'application/json', // Data format
                },
            });
        } catch (error) {
            console.error('Error sending comment:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const handleReplyPress = (id) => {
        setReplyTo(replyTo === id ? null : id); // Toggle the reply state
    };
    return (
        <>
            <FlatList
                data={parentComment}
                renderItem={renderParentComment}
                keyExtractor={(item) => item.id.toString()}

                refreshing={refreshing}
                onRefresh={handleRefresh}
            />
            {/* For comment */}
            <View style={styles.commentInputContainer}>
                <TextInput
                    style={styles.commentInput}
                    value={comment}
                    onChangeText={setComment}
                    placeholder={replyTo ? `Reply to comment id ${replyTo}` : "Write comment..."}
                />
                <Button title="Send" onPress={handleSendComment} />
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
    replyComment: {
        color: 'blue',
        marginTop: 5,
        marginLeft: 10,
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    commentInput: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
    },
});
