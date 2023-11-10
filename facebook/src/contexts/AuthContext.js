import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
// import firebase from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "@firebase/auth";
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, ref, set, push, remove, get } from "@firebase/database";
import Constants from "expo-constants";

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  async function sendPushNotification(expoPushToken) {
    try {
      console.log('sendPushNotification');
      const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Cảnh báo đăng nhập',
        body: 'Có thiết bị khác đang đăng nhập vào tài khoản của bạn!',
        data: { someData: 'goes here' },
      };
  
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
  
      if (!response.ok) {
        // Xử lý lỗi ở đây, ví dụ in ra console
        console.error(`Gửi push notification không thành công. Mã lỗi: ${response.status}`);
      } else {
        console.log('Push notification đã được gửi thành công.');
      }
    } catch (error) {
      // Xử lý lỗi ở đây
      console.error('Lỗi khi gửi push notification:', error);
    }
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      console.log(token);
    } else {
      // alert('Must use physical device for Push Notifications');
      console.log('Must use physical device for Push Notifications');
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      console.log("token virtual machine", token);
    }
  
    return token.data;
  }


const firebaseConfig = {
  apiKey: "AIzaSyDztY_LDzeyw4cSVO16aRIwOPHJ9lMf-YE",
  authDomain: "facebook-192d6.firebaseapp.com",
  databaseURL:
    "https://facebook-192d6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "facebook-192d6",
  storageBucket: "facebook-192d6.appspot.com",
  messagingSenderId: "102938601110",
  appId: "1:102938601110:android:f32a95205c6add51ac04b7",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const database = getDatabase();
const deviceId = Constants.installationId;

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [sessionRef, setSessionRef] = useState(null);

  const navigation = useNavigation();

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
 
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);



  const loginUser = async (email, password, deviceId) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Đăng nhập thành công:", user);
      setUser(user);

      if (user) {
        const userId = user.uid;
        const userRef = ref(database, `users/${userId}`);
        const sessionRef = push(userRef);
        setSessionRef(sessionRef);

        await set(sessionRef, {
          deviceID: deviceId || "null",
          loginTime: new Date().toLocaleTimeString(),
          loginDate: new Date().toLocaleDateString(),
          email: email,
          token: expoPushToken
        });

        console.log("Thông tin đăng nhập đã được lưu trong Firebase Realtime Database.");
        navigation.navigate("Home");

        const sessionsSnapshot = await get(userRef);
        console.log('sessionsSnapshot', sessionsSnapshot)

        sessionsSnapshot.forEach(async (session) => {
          const sessionData = session.val();
          console.log('sessionData', sessionData)
          if (sessionData.token !== expoPushToken) {
            await sendPushNotification(sessionData.token);
          }
        });        

      } else {
        console.log("Lỗi Firebase Realtime Database.");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };

  const logoutUser = async (deviceId) => {
    try {
      if (user) {
        const userId = user.uid;
        console.log('userId', userId)
        console.log('sessionRef', sessionRef)

        if (sessionRef) {
          // Xóa phiên đăng nhập tương ứng với sessionRef
          remove(sessionRef);
        }

        // Lấy danh sách phiên đăng nhập của người dùng
        // const userSessionRef = ref(database, `userSessions/${userId}`);
        // const sessionsSnapshot = await get(userSessionRef);

        // sessionsSnapshot.forEach((session) => {
        //   const sessionData = session.val();
        //   if (sessionData.deviceID === deviceId) {
        //     // Xóa phiên đăng nhập tương ứng với thiết bị hiện tại
        //     remove(ref(database, `userSessions/${userId}/${session.key}`));
        //   }
        // });
      }

      // Đăng xuất người dùng
      await signOut(auth);
      setUser(null);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
