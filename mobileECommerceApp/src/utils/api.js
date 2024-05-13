import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HOST = 'https://18fe-14-169-22-64.ngrok-free.app'


export const endpoints = {
    'currentUser': '/users/current-user/',
    'categories': '/categories/',
    'login': '/accounts/login/',
    'loginWithSms': '/accounts/login-with-sms/',
    'signup': '/accounts/signup/',
    'verifyOTP': '/accounts/verify-otp/',
    'basicSetupProfile': '/accounts/basic-setup-profile/',

    'products': '/products/',
    'products_id': (productId) => `/products/${productId}/`,
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