import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { login } from '../services/AuthServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SaveAccountLogin = () => {
    const navigation = useNavigation();
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [info, setInfo] = useState({});
    const [isLoadApi, setIsLoadApi] = useState(false);
    const togglePopup = () => {
        setIsShowPopup(!isShowPopup);
    };

    const handleLogin = async () => {
        let account = await AsyncStorage.getItem('accountInfo');
        account = JSON.parse(account);
        const email = account.email;
        const password = account.password;
        try {
            setIsLoadApi(true);
            const res = await login({ email, password });
            setIsLoadApi(false);
            await AsyncStorage.setItem('token', res.data.data.token);
            if (res.data.code == '1000') {
                console.log(res.data)
                navigation.navigate('Home');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleResetAccount = async () => {``
        await AsyncStorage.removeItem('accountInfo');
        navigation.navigate('Login');
        // const res = await AsyncStorage.getAllKeys()
        // console.log(res);
    };

    useEffect(() => {
        const getInfo = async () => {
            const value = await AsyncStorage.getItem('accountInfo');
            if (!value) {
                navigation.navigate('Login');
            }
            setInfo(JSON.parse(value));
        };
        getInfo();
    }, []);
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss;
                setIsShowPopup(false);
            }}
            accessible={false}
        >
            <LinearGradient
                colors={['#fffaf2', '#eef4fd', '#f0f3fb', '#ecf5fb']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >
                <View
                    style={{
                        width: '100%',
                        paddingTop: 140,
                        paddingBottom: 80,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: '#0063e0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Icon name="facebook" size={40} color="white" />
                    </View>
                </View>

                <View style={[styles.infoLoginBar, styles.boxShadow]}>
                    <TouchableOpacity onPress={handleLogin} style={{ width: '80%' }}>
                        <View style={styles.infoLoginBarRight}>
                            <Image
                                style={styles.accountImage}
                                source={{
                                    uri:
                                        info.avatar ||
                                        'https://res.cloudinary.com/manhphuong/image/upload/v1702483093/default_avatar_orhez1.jpg',
                                }}
                            ></Image>
                            <Text style={styles.accountName}>{info.username}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={togglePopup}>
                        <View style={[styles.infoLoginBarLeft, styles.touchAble]}>
                            <Icon name="ellipsis-v" size={20} color="#000" />
                        </View>
                    </TouchableOpacity>

                    {isShowPopup && (
                        <View style={[styles.popupMenu, styles.boxShadow]}>
                            <TouchableOpacity onPress={() => handleResetAccount()}>
                                <Text style={styles.popupMenuItem}>Gỡ tài khoản khỏi thiết bị</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.popupMenuItem}>Tắt thông báo đẩy</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.subButtonView}>
                    <TouchableOpacity style={styles.subButton} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.subButtonText}>Đăng nhập bằng tài khoản khác</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.linkText}>
                    <TouchableOpacity onPress={() => navigation.navigate('IntroCreateAccount')}>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>Tạo tài khoản mới</Text>
                    </TouchableOpacity>
                </View>
                {isLoadApi && (
                <ActivityIndicator
                    size="large"
                    style={{ position: 'absolute', top: '50%', left: '48%' }}
                ></ActivityIndicator>
            )}
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        // backgroundColor: "#f0f2f5",
        height: '100%',
        // position: "relative",
    },
    textInputContainer: {
        borderColor: '#ccc',
        borderWidth: 1,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 10,
        position: 'relative',
        height: 56,
    },
    textInput: {
        fontSize: 16,
    },
    primaryButton: {
        backgroundColor: '#0063e0',
        width: '100%',
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    subButton: {
        borderColor: '#0063e0', // Màu của viền
        borderWidth: 1, // Độ dày của viền
        padding: 10, // Khoảng cách giữa viền và văn bản
        borderRadius: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 54,
    },
    subButtonText: {
        color: '#0063e0',
        fontWeight: 'bold',
        fontSize: 15,
    },
    icon: {
        width: 30,
        height: 30,
        backgroundColor: '#0063e0',
        borderRadius: 15,
        color: 'white',
    },
    subButtonView: {
        position: 'absolute',
        bottom: 90,
        left: 16,
        right: 16,
        width: '100%',
        height: 50,
    },
    linkText: {
        paddingTop: 20,
        alignItems: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 50,
        left: 16,
        right: 16,
        width: '100%',
        height: 44,
    },
    textLabel: {
        fontSize: 16,
        marginBottom: 6,
        marginLeft: 12,
    },
    eysIcon: {
        position: 'absolute',
        right: 12,
        top: 16,
    },
    focusedInput: {
        borderColor: 'black',
    },
    infoLoginBar: {
        backgroundColor: 'white',
        height: 80,
        width: '100%',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    accountImage: {
        width: 60,
        height: 60,
        borderRadius: 999,
    },
    accountName: {
        fontSize: 16,
        fontWeight: '700',
    },
    boxShadow: {
        shadowColor: '#333333',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
    },
    infoLoginBarRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 12,
    },

    infoLoginBarLeft: {},
    popupMenu: {
        position: 'absolute',
        top: 60,
        right: -20,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 16,
        paddingRight: 16,
    },
    popupMenuItem: {
        height: 50,
        lineHeight: 50,
    },
    touchAble: {
        width: 40,
        height: 80,
        // backgroundColor: "#ccc",
        display: 'flex',
        alignItems: 'center',
        lineHeight: 80,
        justifyContent: 'center',
    },
});

export default SaveAccountLogin;
