import AsyncStorage from '@react-native-async-storage/async-storage';

export const createAuthHeader = async () => {
    try {
        //   const token = await AsyncStorage.getItem('token');
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzYyLCJkZXZpY2VfaWQiOiJzdHJpbmciLCJpYXQiOjE3MDI5MDg5ODF9.tDWztwkf8_k8HLl5p1fE8MLOT7Z6y1jRs4oT24QJ9n4';
        if (token !== null) {
            // console.log('Token đã được truy xuất thành công:', token);
            return { Authorization: `Bearer ${token}` };
        } else {
            console.log('Không có token được lưu trữ.');
            return null;
        }
    } catch (error) {
        console.error('Lỗi khi truy xuất token:', error);
        return null;
    }
};
