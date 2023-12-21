import { Alert } from 'react-native';
import { createAuthHeader } from '../utils/getToken';
import request from '../utils/httpRequest';

export const getListBlock = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/get_list_blocks', formData, { headers });
        // console.log(res);
        return res;
    } catch (err) {
        console.log(err.response.data);
        console.log(err);
        if (err.response.data.code == '9998') {
            Alert.alert('Phiên đăng nhập đã hết hạn', 'Vui lòng đăng nhập lại.', [
                {
                    text: 'OK',
                },
            ]);
        }
    }
};

export const setBlockUser = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/set_block', formData, { headers });
        // console.log(res);
        if (res.data.code == '1000') {
            Alert.alert('Chặn thành công.', 'Bạn đã chặn thành công.', [
                {
                    text: 'OK',
                    onPress: () => {
                        // Xử lý khi người dùng nhấn nút OK
                    },
                },
            ]);
        }

        return res;
    } catch (err) {
        console.log(err.response);
        Alert.alert('Đã chặn người dùng.', 'Vui lòng thực hiện thao tác khác.', [
            {
                text: 'OK',
            },
        ]);
    }
};

export const setUnBlockUser = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/unblock', formData, { headers });
        // console.log(res);
        return res;
    } catch (err) {
        console.log(err.response);
    }
};
