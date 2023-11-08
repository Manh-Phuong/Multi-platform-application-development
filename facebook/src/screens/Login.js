import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Chú ý: Icon set của bạn phải được import từ thư viện phù hợp.
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../contexts/AuthContext";
// import firebase from "firebase/app";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "@firebase/auth";
// import { initializeApp } from "firebase/app";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getDatabase, ref, set, push } from "@firebase/database";
import Constants from "expo-constants";

// const firebaseConfig = {
//   apiKey: "AIzaSyDztY_LDzeyw4cSVO16aRIwOPHJ9lMf-YE",
//   authDomain: "facebook-192d6.firebaseapp.com",
//   databaseURL:
//     "https://facebook-192d6-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "facebook-192d6",
//   storageBucket: "facebook-192d6.appspot.com",
//   messagingSenderId: "102938601110",
//   appId: "1:102938601110:android:f32a95205c6add51ac04b7",
// };

// initializeApp(firebaseConfig);

// const auth = getAuth();
// const database = getDatabase();
const deviceId = Constants.installationId;

const windowHeight = Dimensions.get("window").height;
const customHeight = windowHeight - 100;
const Login = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [isFocusedAccount, setIsFocusedAccount] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const accountInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const navigation = useNavigation();
  const { loginUser } = useAuth();

  const changePassword = (newPassword) => {
    setPassword(newPassword);
  };
  const changeAccount = (newAccount) => {
    setAccount(newAccount);
  };
  const handleFocusPassword = () => {
    setIsFocusedPassword(true);
  };

  const handleBlurPassword = () => {
    setIsFocusedPassword(false);
  };
  const handleFocusAccount = () => {
    setIsFocusedAccount(true);
  };

  const handleBlurAccount = () => {
    setIsFocusedAccount(false);
  };

  const handleTogglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  // Đăng nhập người dùng
  // const loginUser = async (email, password) => {
  //   try {
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const user = userCredential.user;
  //     console.log("Đăng nhập thành công:", user);
  //     console.log("deviceId", deviceId);

  //     if (user) {
  //       const userId = user.uid;
  //       const userRef = ref(database, `users/${userId}`);

  //       // Tạo một khóa phiên đăng nhập mới
  //       const sessionRef = push(userRef);

  //       // Lưu thông tin phiên đăng nhập vào Firebase Realtime Database
  //       await set(sessionRef, {
  //         deviceID: deviceId || "null",
  //         loginTime: new Date().toLocaleTimeString(),
  //         loginDate: new Date().toLocaleDateString(),
  //         email: email,
  //       });

  //       console.log(
  //         "Thông tin đăng nhập đã được lưu trong Firebase Realtime Database."
  //       );
  //     } else {
  //       console.log("lỗi Firebase Realtime Database.");
  //     }

  //     navigation.navigate("Home");
  //   } catch (error) {
  //     console.error("Lỗi đăng nhập:", error);
  //   }
  // };

  const handleLogin = async () => {
    await loginUser(account, password, deviceId);

    setAccount("");
    setPassword("");
  };

  const handleSummit = () => {
    if (!account.trim()) {
      Alert.alert("Cần có email", "Nhập email của bạn để tiếp tục.", [
        {
          text: "OK",
          onPress: () => {
            accountInputRef.current.focus();
          },
        },
      ]);
    } else if (account.trim()) {
      if (!isEmailValid(account)) {
        Alert.alert(
          "Email không đúng định dạng",
          "Nhập email đúng dịnh dạng.",
          [
            {
              text: "OK",
              onPress: () => {
                accountInputRef.current.focus();
              },
            },
          ]
        );
      } else if (!password.trim()) {
        Alert.alert("Cần có mật khẩu", "Nhập mật khẩu của bạn để tiếp tục.", [
          {
            text: "OK",
            onPress: () => {
              passwordInputRef.current.focus();
            },
          },
        ]);
      } else {
        handleLogin();

        // navigation.navigate("Home")
      }
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={["#fffaf2", "#eef4fd", "#f0f3fb", "#ecf5fb"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={{ marginTop: 40 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SaveAccountLogin")}
          >
            <Icon name="angle-left" size={30} color="#000" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            paddingTop: 80,
            paddingBottom: 80,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "#0063e0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon name="facebook" size={40} color="white" />
          </View>
        </View>
        <View>
          <Text style={styles.textLabel}>Email</Text>
          <View
            style={[
              styles.textInputContainer,
              isFocusedAccount ? styles.focusedInput : null,
            ]}
          >
            <TextInput
              style={[styles.textInput]}
              ref={accountInputRef}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current.focus()}
              placeholder="Nhập email"
              placeholderTextColor="#888"
              onChangeText={changeAccount}
              onFocus={handleFocusAccount}
              onBlur={handleBlurAccount}
              value={account}
            ></TextInput>
          </View>
        </View>
        <View>
          <Text style={styles.textLabel}>Mật khẩu</Text>
          <View
            style={[
              styles.textInputContainer,
              isFocusedPassword ? styles.focusedInput : null,
            ]}
          >
            <TextInput
              style={styles.textInput}
              ref={passwordInputRef}
              placeholder="Nhập mật khẩu"
              placeholderTextColor="#888"
              secureTextEntry={!isShowPassword}
              returnKeyType="done"
              onChangeText={changePassword}
              onFocus={handleFocusPassword}
              onBlur={handleBlurPassword}
              value={password}
            />
            {(isFocusedPassword || password.trim()) && (
              <Icon
                style={styles.eysIcon}
                onPress={handleTogglePassword}
                name={isShowPassword ? "eye" : "eye-slash"}
                size={20}
                color="#000"
              />
            )}
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.primaryButton} onPress={handleSummit}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linkText}>
          <Text style={{ fontSize: 16, fontWeight: 600 }}>Quên mật khẩu?</Text>
        </View>

        <View style={styles.subButtonView}>
          <TouchableOpacity
            style={styles.subButton}
            onPress={() => navigation.navigate("IntroCreateAccount")}
          >
            <Text style={styles.subButtonText}>Tạo tài khoản mới</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    height: "100%",
    position: "relative",
  },
  textInputContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 10,
    position: "relative",
    height: 56,
  },
  textInput: {
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: "#0063e0",
    width: "100%",
    height: 54,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  subButton: {
    borderColor: "#0063e0", // Màu của viền
    borderWidth: 1, // Độ dày của viền
    padding: 10, // Khoảng cách giữa viền và văn bản
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 54,
  },
  subButtonText: {
    color: "#0063e0",
    fontWeight: "bold",
  },
  icon: {
    width: 30,
    height: 30,
    backgroundColor: "#0063e0",
    borderRadius: 15,
    color: "white",
  },
  subButtonView: {
    position: "absolute",
    top: customHeight,
    left: 16,
    right: 16,
    width: "100%",
    height: 44,
  },
  linkText: {
    paddingTop: 20,
    alignItems: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textLabel: {
    fontSize: 16,
    marginBottom: 6,
    marginLeft: 12,
  },
  eysIcon: {
    position: "absolute",
    right: 12,
    top: 16,
  },
  focusedInput: {
    borderColor: "black",
  },
  // label: {
  //     position: "absolute",
  //     top: 8,
  //     left: 16
  // }
});

export default Login;
