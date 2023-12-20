import * as React from 'react';
import { useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Chú ý: Icon set của bạn phải được import từ thư viện phù hợp.
import { useNavigation } from '@react-navigation/native';
import { Color, FontFamily, FontSize } from '../GlobalStyles';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { changeProfileAfterSignUp, checkVerifyCode, login, getVerifyCode } from '../services/AuthServices';
import { UseSelector } from 'react-redux/es/hooks/useSelector';
import { removeToken } from '../utils/getToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const VerificationCode = () => {
    const navigation = useNavigation();
    const goBackHandler = () => {
        navigation.goBack(); // Quay lại màn hình trước đó
    };

    const [code, setCode] = React.useState('');
    const [isFocusedCode, setIsFocusedCode] = React.useState(false);
    const changeCode = (newCode) => {
        setCode(newCode);
    };
    const handleFocusCode = () => {
        setIsFocusedCode(true);
    };
    const handleBlurCode = () => {
        setIsFocusedCode(false);
    };
    const codeInputRef = useRef(null);

    const email = useSelector((state) => state.account.email);
    const username = useSelector((state) => state.account.nickname);
    const password = useSelector((state) => state.account.password);

    const handleSummit = async () => {
        if (!code.trim() || code.length < 5) {
            Alert.alert('Cần có mã xác nhận', 'Hãy nhập chính xác mã xác nhận.', [
                {
                    text: 'OK',
                    onPress: () => {
                        codeInputRef.current.focus();
                    },
                },
            ]);
        } else {
            try {
                const res = await checkVerifyCode(email, code);
                if (res.data.code == '1000') {
                    try {
                        const res = await login({ email, password, uuid: 'string' });
                        var token = res.data.data.token
                        var info = res.data.data;
                        if (res.data.code == '1000') {
                            await AsyncStorage.setItem('token', token);
                            info['email'] = email
                            info['password'] = password

                            const res = await changeProfileAfterSignUp({ username });
                            if (res.data.code == '1000') {
                                await AsyncStorage.removeItem('token');
                                info['username'] = username;
                                await AsyncStorage.setItem('accountInfo', JSON.stringify(info));
                                const email = await AsyncStorage.getItem('email');
                                const password = await AsyncStorage.getItem('password');
                                if (email && password) {
                                    navigation.navigate('SaveAccountLogin');
                                } else navigation.navigate('Login');
                            }
                        }
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    Alert.alert('Mã xác nhận không chính xác!', 'Vui lòng nhập lại mã xác nhận!');
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleGenerateCode = async () => {
        const res = await getVerifyCode({ email });
        if (res.code == 1000) {
            Alert.alert('Mã xác nhận của bạn:', res.data.verify_code);
        } else {
            Alert.alert('Có lỗi xảy ra, vui lòng thử lại sau');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <LinearGradient
                colors={['#fffaf2', '#eef4fd', '#f0f3fb', '#ecf5fb']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View>
                        <TouchableOpacity onPress={goBackHandler} style={{ marginTop: 60 }}>
                            <FontAwesomeIcon icon={faArrowLeft} size={20}></FontAwesomeIcon>
                        </TouchableOpacity>

                        <View style={styles.headerText}>
                            <Text style={styles.mainText}>Nhập mã xác nhận</Text>
                            <Text style={styles.subText}>
                                Để xác nhận tài khoản, hãy nhập mã gồm 5 chữ số mà chúng tôi đã gửi đến email của bạn.
                            </Text>
                        </View>

                        <View>
                            <Text style={styles.textLabel}>Mã xác nhận</Text>
                        </View>
                        <View>
                            <KeyboardAvoidingView>
                                <TextInput
                                    maxLength={6}
                                    style={[styles.inputtextCode, isFocusedCode ? styles.focusedInput : null]}
                                    placeholder="Nhập mã xác nhận"
                                    ref={codeInputRef}
                                    keyboardType="numeric"
                                    // value={inputValue}
                                    onChangeText={changeCode}
                                    onFocus={handleFocusCode}
                                    onBlur={handleBlurCode}
                                />
                            </KeyboardAvoidingView>
                        </View>

                        {/* Button chuyển tiếp */}
                        <View>
                            <TouchableOpacity style={styles.primaryButton} onPress={handleSummit}>
                                <Text style={styles.logIn}>Tiếp</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Không nhận được mã */}
                        <TouchableOpacity style={styles.dontGiveCodeButton} onPress={handleGenerateCode}>
                            <Text style={styles.logIn2}>Tôi không nhận được mã</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
};
export default VerificationCode;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        height: '100%',
        position: 'relative',
        fontSize: 16,
    },
    headerText: {
        marginTop: 12,
        marginBottom: 20,
    },
    mainText: {
        paddingBottom: 12,
        fontSize: 24,
        fontWeight: 'bold',
    },
    subText: {
        fontSize: 15,
    },

    inputtextCode: {
        height: 54,
        paddingLeft: 15,
        top: 10,
        width: '100%',
        maxWidth: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 16,
        fontSize: 16,
    },

    primaryButton: {
        backgroundColor: '#0063e0',
        width: '100%',
        padding: 10,
        borderRadius: 999,
        marginTop: 36,
        height: 54,
        display: 'flex',
        justifyContent: 'center',
    },
    dontGiveCodeButton: {
        width: '100%',
        padding: 10,
        marginTop: 12,
        height: 54,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 999,
        display: 'flex',
        justifyContent: 'center',
    },
    logIn: {
        color: Color.white,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    logIn2: {
        color: Color.colorBlack,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    textLabel: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    focusedInput: {
        borderColor: 'black',
    },
});
