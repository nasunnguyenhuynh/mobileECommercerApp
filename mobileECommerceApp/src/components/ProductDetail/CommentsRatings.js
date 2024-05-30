import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView, FlatList, useWindowDimensions } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome"
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"

import React, { useEffect, useState, useRef } from "react";
import api, { authAPI, endpoints } from "../../utils/api";
import COLORS from "../../components/COLORS";
import { useNavigation } from "@react-navigation/native";
import NavRating from "../../screen/navigations/NavRating"
import ProductRating from "../../screen/Page/ProductRating";

const CommentsRatings = ({ product_id, averageStarProductRating, averageStarShopRating }) => { //GET: product_id, averageStarRatingProduct, totalRatingProduct, 
    const [commentsRatings, setCommentsRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchCommentsRatings = async () => {
            try {
                const response = await authAPI.get(endpoints.comment_rating(product_id));
                if (response.status === 200 && response.data) {
                    // console.log('response.data ' , response.data) //get []
                    setCommentsRatings(response.data);
                }
            } catch (error) {
                console.error(`Error fetching comments and ratings for product ID ${product_id}:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommentsRatings();
    }, [product_id]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const totalRatingProduct = 892;
    const productType = "Colors Size"


    return (
        <View style={styles.containerCommentsRatings}>
            <View style={styles.wrapCommentsRatingsHeader}>
                <View>
                    <View style={styles.commentsRatingsTitle}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "500",
                            textTransform: 'capitalize',
                        }}>Product Ratings</Text>
                    </View>
                    <View style={styles.commentsRatingsTitleDetail}>
                        <View style={styles.wrapProductRating}>
                            <FontAwesome
                                name={"star"}
                                size={10}
                                color={COLORS.darkOrange}
                            />
                            <Text style={{ fontSize: 10, marginLeft: 5, color: COLORS.darkRed }}>
                                {Math.round(averageStarProductRating * 10) / 10}/5</Text>
                        </View>
                        <View style={styles.wrapTotalProductRating}>
                            <Text style={{ fontSize: 10, color: COLORS.lightGray }}>(Total {totalRatingProduct} ratings)</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.btnCommentsRatingsViewAll}
                        onPress={() => navigation.navigate('NavRating', {
                            fromCommentsRatings: true, data: commentsRatings, id: product_id,
                            productRating: averageStarProductRating,
                            shopRating: averageStarShopRating
                        })} //  Send commentsRatings[] to NavRating.js
                    >
                        <Text style={{ color: COLORS.darkOrange }}>View all</Text>
                        <AntDesign
                            name={"right"}
                            size={14}
                            color={COLORS.darkOrange}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Start Loop */}
            {
                commentsRatings.slice(0, 2).map((item) => { // GET 2 element in commentsRatings[]
                    const { id, comment: { contentProduct }, user: { username, avatar }, rating: { ratedShop } } = item;
                    const stars = Array.from({ length: Math.round(ratedShop) }, (_, index) => index + 1);
                    const secureAvatarUrl = avatar.startsWith("https://") ? avatar : avatar.replace("image/upload/http://", "https://");

                    return (
                        <View style={styles.containerUserCommentRating} key={id}>
                            <View style={styles.wrapUserRating}>
                                <View style={{ flexDirection: "row", alignItems: "center", }}>
                                    <Image
                                        source={{ uri: secureAvatarUrl }}
                                        style={styles.avatarUser}
                                    />
                                    <View style={styles.wrapUserNameRating}>
                                        <Text style={{ fontSize: 12, fontWeight: "500" }}>{username}</Text>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            {stars.map((star, index) => (
                                                <FontAwesome
                                                    key={index}
                                                    name={"star"}
                                                    size={12}
                                                    color="#e7700d"
                                                    style={{ marginRight: 2 }}
                                                />
                                            ))}
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <AntDesign
                                        name={"like2"}
                                        size={16}
                                        style={{ marginRight: 2 }}
                                    />
                                </View>
                            </View>

                            <View style={styles.wrapUserComment}>
                                <Text style={{ color: "#6d6969", flexWrap: 'wrap' }}>Classification: {productType}</Text>
                                <Text style={{ flexWrap: 'wrap' }}>{contentProduct}</Text>
                            </View>
                        </View>
                    );
                })
            }
            {/* End  Loop */}
        </View >
    )
}

export default CommentsRatings;

const styles = StyleSheet.create({
    // Component Comments_Ratings --> Using collapse
    containerCommentsRatings: {
        backgroundColor: "#fff",
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    wrapCommentsRatingsHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 8,
    },
    commentsRatingsTitle: {},
    commentsRatingsTitleDetail: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    wrapProductRating: {
        flexDirection: "row",
        alignItems: "center",
    },
    wrapTotalProductRating: {
        marginLeft: 5,
    },
    btnCommentsRatingsViewAll: {
        flexDirection: "row",
        alignItems: "center",
    },

    // Component userCommentRating
    containerUserCommentRating: {
        paddingVertical: 8,
        borderTopWidth: 0.2,
        borderTopColor: "#ccc",
    },
    wrapUserRating: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    avatarUser: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    wrapUserNameRating: {
        marginLeft: 5,
    },
    wrapUserComment: {
        marginLeft: 45,
        marginTop: 5,
    },
})