import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HOST = 'https://a4a7-14-169-22-64.ngrok-free.app'


export const endpoints = {
    'currentUser': '/users/current-user/', //GET, PATCH
    'login': '/accounts/login/',
    'loginWithSms': '/accounts/login-with-sms/',
    'signup': '/accounts/signup/',
    'verifyOTP': '/accounts/verify-otp/',
    'basicSetupProfile': '/accounts/basic-setup-profile/',

    'categories': '/categories/',
    // /products/?page=1
    'products': '/products/',
    'products_id': (productId) => `/products/${productId}/`,
    'products_n': (name) => `/products/?n=${name}`,
    'products_pmn': (pmn) => `/products/?pmn=${pmn}`,
    'products_pmx': (pmx) => `/products/?pmx=${pmx}`,

    'products_filter': (name,order,price) => `/products/?n=${name}&${order}&${price}`,

    

    'comment_rating': (productId) => `/products/${productId}/rating_comment/`,
    'parentComment': (productId) => `/products/${productId}/replyParentComment/`,
    'childComment': (productId, parentCommentId) =>
        `/products/${productId}/replyParentComment/${parentCommentId}/replyChildComments/`,
    'replyComment': (productId) => `/products/${productId}/replyComment/`,

    'confirmationShop': (userId) => `/users/${userId}/confirmationshop/`, //GET, POST

    'addresses': (userId) => `/users/${userId}/addresses/`, //GET, POST
    'addressDefault': (userId, addressId) => `/users/${userId}/addresses/${addressId}/default/`, //PATCH

    'order': (userId) => `/users/${userId}/orders/`, //GET, POST
    'payment': '/payment',
}

export const authAPI = async () => {
    const token = await AsyncStorage.getItem('access_token');
    // console.log('Token: ', token);

    return axios.create({
        baseURL: HOST,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export default axios.create({
    baseURL: HOST
})