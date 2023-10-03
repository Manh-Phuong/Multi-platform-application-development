import React, {useState, useRef} from 'react';
import { useNavigation } from '@react-navigation/native';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Keyboard,
    TouchableWithoutFeedback
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Chú ý: Icon set của bạn phải được import từ thư viện phù hợp.
import { useNavigation } from "@react-navigation/native";

const Login = () => {

    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [isFocusedAccount, setIsFocusedAccount] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);

    const accountInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const navigation = useNavigation();

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
        setIsShowPassword(!isShowPassword)
    }
    const handleSummit = () => {
        if (!account.trim()) {
            Alert.alert("Cần có email hoặc số di động", 'Nhập email và số di động của bạn để tiếp tục.', [{
                    text: 'OK',
                    onPress: () => {
                        accountInputRef.current.focus()
                    }
                },])
        } else if (!password.trim()) {
            Alert.alert("Cần có mật khẩu", 'Nhập mật khẩu của bạn để tiếp tục.', [{
                    text: 'OK',
                    onPress: () => {
                        passwordInputRef.current.focus()
                    }
                },])
        }
    };

    return (<TouchableWithoutFeedback onPress={
            Keyboard.dismiss
        }
        accessible={false}>
        <View style={
            styles.container
        }>
            <View style={
                {marginTop: 40}
            }>
                <Icon name="angle-left"
                    size={30}
                    color="#000"/>
            </View>
            <View style={
                {
                    width: "100%",
                    paddingTop: 80,
                    paddingBottom: 80,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }>
                <View style={
                    {
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: "#0063e0",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                }>
                    <Icon name="facebook"
                        size={40}
                        color="white"/>
                </View>
            </View>
            <View>
                <Text style={
                    styles.textLabel
                }>Số di động hoặc email</Text>
                <View style={styles.textInputContainer}>

                <TextInput style={
                        [
                            styles.textInput,
                            isFocusedAccount ? styles.focusedInput : null
                        ]
                    }
                    ref={accountInputRef}
                    keyboardType='email-address'
                    returnKeyType='next'
                    onSubmitEditing={
                        () => passwordInputRef.current.focus()
                    }
                    placeholder="Nhập số di động hoặc email"
                    placeholderTextColor="#888"
                    onChangeText={changeAccount}
                    onFocus={handleFocusAccount}
                    onBlur={handleBlurAccount}></TextInput>
                                    </View>

            </View>
            <View>
                <Text style={
                    styles.textLabel
                }>Mật khẩu</Text>
                <View style={
                    [
                        styles.textInputContainer,
                        isFocusedPassword ? styles.focusedInput : null
                    ]
                }>

                    <TextInput style={styles.textInput} ref={passwordInputRef}
                        placeholder="Nhập mật khẩu"
                        placeholderTextColor="#888"
                        secureTextEntry={
                            !isShowPassword
                        }
                        returnKeyType='done'
                        onChangeText={changePassword}
                        onFocus={handleFocusPassword}
                        onBlur={handleBlurPassword}/>
                        {(isFocusedPassword || password.trim()) && <Icon style={
                                styles.eysIcon
                            }
                            onPress={handleTogglePassword}
                            name={
                                isShowPassword ? "eye" : "eye-slash"
                            }

                            size={20}
                            color="#000"/>}
                </View>

            </View>
            <View>
                <TouchableOpacity style={
                        styles.primaryButton
                    }
                    onPress={handleSummit}>
                    <Text style={
                        styles.buttonText
                    }>Đăng nhập</Text>
                </TouchableOpacity>
            </View>

            <View style={
                styles.linkText
            }>
                <Text>Quên mật khẩu?</Text>
            </View>

            <View style={
                styles.subButtonView
            }>
                <TouchableOpacity style={
                    styles.subButton
                } onPress={() => navigation.navigate('ChooseGender')}>
                    <Text style={
                        styles.subButtonText
                    }>Tạo tài khoản mới</Text>
                </TouchableOpacity>
            </View>
        </View>
    </TouchableWithoutFeedback>);
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "white",
        height: "100%",
        position: "relative"
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
        height: 56
    },
    textInput: {
        fontSize: 16,
    },
    primaryButton: {
        backgroundColor: "#0063e0",
        width: "100%",
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%"
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"

    },
    subButton: {
        borderColor: "#0063e0", // Màu của viền
        borderWidth: 1, // Độ dày của viền
        padding: 10, // Khoảng cách giữa viền và văn bản
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 44
    },
    subButtonText: {
        color: "#0063e0",
        fontWeight: "bold"
    },
    icon: {
        width: 30,
        height: 30,
        backgroundColor: "#0063e0",
        borderRadius: 15,
        color: "white"

    },
    subButtonView: {
        position: "absolute",
        bottom: 50,
        left: 16,
        right: 16,
        width: "100%",
        height: 44
    },
    linkText: {
        paddingTop: 20,
        alignItems: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    textLabel: {
        fontSize: 16,
        marginBottom: 6,
        marginLeft: 12
    },
    eysIcon: {
        position: "absolute",
        right: 12,
        top: 16
    }
    // focusedInput: {
    //     paddingTop: 10,
    //     fontSize:16,
    //     placeholder: "none"
    // },
    // label: {
    //     position: "absolute",
    //     top: 8,
    //     left: 16
    // }

});

export default Login;
