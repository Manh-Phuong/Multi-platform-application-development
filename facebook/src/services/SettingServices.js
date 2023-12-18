import { Alert } from 'react-native';
import { createAuthHeader } from '../utils/getToken';
import request from '../utils/httpRequest';

export const setDevToken = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/set_devtoken', formData, { headers });
        console.log(res);
        return res;
    } catch (err) {
        console.log(err.response.data);
        console.log(err);
    }
};

export const BuyCoins = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/buy_coins', formData, { headers });
        console.log('res mua coi BuyCoins', res.data);

        return res;
    } catch (err) {
        console.log('res mua coi err', err.response.data);
        if (err.response.data.code == '9998') {
            Alert.alert('Phiên đăng nhập đã hết hạn', 'Vui lòng đăng nhập lại.', [
                {
                    text: 'OK',
                },
            ]);
        }
        Alert.alert('Có lỗi xảy ra', 'Vui lòng thử lại.', [
            {
                text: 'OK',
            },
        ]);
    }
};

export const getPushSettings = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/get_push_settings', formData, { headers });
        console.log(res);

        return res.data;
    } catch (err) {
        console.log(err.response);
        return err.response;
    }
};

export const setPushSettings = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/set_push_settings', formData, { headers });

        return res.data;
    } catch (err) {
        return err.response;
    }
};
