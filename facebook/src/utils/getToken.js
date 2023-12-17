import AsyncStorage from '@react-native-async-storage/async-storage';

  export const createAuthHeader = async () => {
    try {
    //   const token = await AsyncStorage.getItem('token');
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzYyLCJkZXZpY2VfaWQiOiJzdHJpbmciLCJpYXQiOjE3MDI3ODY1NjZ9.spiDRiqmqY12-3uymTDmH6iU_KiXzMgk8ENmvpVUB14";
      if (token !== null) {
        // console.log('Token đã được truy xuất thành công:', token);
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
