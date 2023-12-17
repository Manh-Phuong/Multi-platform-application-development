import { Alert } from 'react-native';
import { createAuthHeader } from '../utils/getToken';
import request from '../utils/httpRequest';

export const changeProfileAfterSignup = async (data) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/change_profile_after_signup', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...headers,
            },
        });

        return res;
    } catch (err) {
        console.log('changeProfileAfterSignup', err.response);
        Alert.alert('Có lỗi xảy ra', 'Vui lòng thử lại.', [
            {
                text: 'OK',
            },
        ]);
    }
};

export const getUserInfo = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/get_user_info', formData, { headers });
        // console.log('res getUserInfo', res)
        return res;
    } catch (err) {
        console.log(err);
        console.log(err.response);
    }
};

export const setUserInfo = async (data) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/set_user_info', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...headers,
            },
        });
        // console.log('res setUserInfo', res)
        return res;
    } catch (err) {
        console.log('changeProfileAfterSignup', err.response);
        Alert.alert('Có lỗi xảy ra', 'Vui lòng thử lại.', [
            {
                text: 'OK',
            },
        ]);
    }
};