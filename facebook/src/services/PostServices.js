import { Alert } from 'react-native';
import { createAuthHeader } from '../utils/getToken';
import request from '../utils/httpRequest';

export const addPost = async (data) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/add_post', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...headers,
            },
        });

        return res;
    } catch (err) {
        // console.log('addPost', err.response);
        // if (err.response.data.code != '2001') {
        //     Alert.alert('Có lỗi xảy ra', 'Vui lòng thử lại.', [
        //         {
        //             text: 'OK',
        //         },
        //     ]);
        // }
        return err.response;
    }
};

// export const getPost = async (formData) => {
//     try {
//         const headers = await createAuthHeader();
//         const res = await request.post('/get_post', formData, { headers });

//         return res;
//     } catch (err) {
//         console.log(err);
//     }
// };

export const getPost = async ({ id = '737' }) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post(
            '/get_post',
            {
                id: id,
            },
            { headers },
        );
        ``;

        return res;
    } catch (err) {
        console.log(err);
        return err.response;
    }
};

export const getListPost = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/get_list_posts', formData, { headers });
        // console.log('getlistport serviec', res.data);
        return res.data;
    } catch (err) {
        // console.log('getlistport serviec err', err.response);
        return err.response.data;
    }
};

export const editPost = async (data) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/edit_post', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...headers,
            },
        });

        return res.data;
    } catch (err) {
        console.log('addPost', err.response);
        if (err.response.data.code != '2001') {
            Alert.alert('Có lỗi xảy ra', 'Vui lòng thử lại.', [
                {
                    text: 'OK',
                },
            ]);
        }
        return err.response;
    }
};

export const getListVideos = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/get_list_videos', formData, { headers });

        return res;
    } catch (err) {
        if (err.response.data.code == '9998') {
            Alert.alert('Phiên đăng nhập đã hết hạn', 'Vui lòng đăng nhập lại.', [
                {
                    text: 'OK',
                },
            ]);
        }
        return err;
    }
};

export const deletePost = async (id) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/delete_post', { id: id }, { headers });
        if (res.status == '200') {
            Alert.alert('Thông báo', 'Xóa bài viết thành công.', [
                {
                    text: 'OK',
                },
            ]);
        }
        return res;
    } catch (err) {
        if (err.response.data.code == '9998') {
            Alert.alert('Phiên đăng nhập đã hết hạn', 'Vui lòng đăng nhập lại.', [
                {
                    text: 'OK',
                },
            ]);
        }
        if (err.response.data.code == '9992') {
            Alert.alert('Bài viết không tồn tại', 'Vui lòng thực hiện thao tác khác.', [
                {
                    text: 'OK',
                },
            ]);
        }
    }
};

export const reportPost = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/report_post', formData, { headers });

        return res.data;
    } catch (err) {
        console.log(err.response.data);
        return err.response;
    }
};

export const getNewPost = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/get_new_posts', formData, { headers });

        return res;
    } catch (err) {
        console.log(err.response.data);
    }
};

export const setViewedPost = async (formData) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/set_viewed_post', formData, { headers });

        return res;
    } catch (err) {
        console.log(err.response.data);
    }
};
