import { Alert } from 'react-native';
import { createAuthHeader } from '../utils/getToken';
import request from '../utils/httpRequest';

export const getListRequestFriend = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/get_requested_friends', formData, { headers });
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

export const setRequestFriend = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/set_request_friend', formData, { headers });

        return res;
    } catch (err) {
        console.log(err);
    }
};

export const setAcceptFriend = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/set_accept_friend', formData, { headers });
        // console.log(res);
        return res;
    } catch (err) {
        console.log(err.response);
        // if (formData.is_accept == '0') {
        //     Alert.alert('Đã xóa kết bạn.', 'Vui lòng thực hiện thao tác khác.', [
        //         {
        //             text: 'OK',
        //         },
        //     ]);
        // }
        // if (formData.is_accept == '1') {
        //     Alert.alert('Hai bạn đã trở thành bạn bè.', 'Vui lòng thực hiện thao tác khác.', [
        //         {
        //             text: 'OK',
        //         },
        //     ]);
        // }
        Alert.alert('Không tìm thấy lời mời.', 'Vui lòng thực hiện thao tác khác.', [
            {
                text: 'OK',
            },
        ]);
    }
};

export const getUserFriend = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/get_user_friends', formData, { headers });
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

export const getSuggestedFriend = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/get_suggested_friends', formData, { headers });
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

export const unFriend = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/unfriend', formData, { headers });
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

export const delRequestFriend = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/del_request_friend', formData, { headers });
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

