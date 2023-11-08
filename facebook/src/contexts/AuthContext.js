import React, { createContext, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/app";
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
        });

        console.log("Thông tin đăng nhập đã được lưu trong Firebase Realtime Database.");
        navigation.navigate("Home");
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
