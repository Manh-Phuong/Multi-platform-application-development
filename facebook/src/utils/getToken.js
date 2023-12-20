import AsyncStorage from '@react-native-async-storage/async-storage';

export const createAuthHeader = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTU2LCJkZXZpY2VfaWQiOiJzdHJpbmciLCJpYXQiOjE3MDI5Njg4MjF9.vIzsOQZ60mX3GgjtqKbVSf6yaGYPnPl3wF3qhvBvhSk";
      if (token !== null) {
        return  {Authorization: `Bearer ${token}`};
      } else {
        console.log('Không có token được lưu trữ.');
        return null;
      }
    } catch (error) {
        console.error('Lỗi khi truy xuất token:', error);
        return null;
    }
};
