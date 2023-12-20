import * as React from 'react';
import { useState, useRef } from 'react';

import {
    Text,
    StyleSheet,
    View,
    Image,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
} from 'react-native';
import { Color, FontSize, Border, Padding } from '../GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreEmail, setStoreEmail } from '../feature/account';
import { checkEmail } from '../services/AuthServices';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const windowHeight = Dimensions.get('window').height;
const customHeight = windowHeight - 30;

const ChooseNumberPhone = () => {
    const navigation = useNavigation();
    // const [email, setEmail] = useState("");
    const email = useSelector((state) => state.account.email);

    const [isFocusedEmail, setIsFocusedEmail] = useState(false);

    const emailInputRef = useRef(null);

    const dispatch = useDispatch();

    const inputBorderStyleEmail = isFocusedEmail
        ? {
              borderColor: 'black',
              borderWidth: 1,
          }
        : {};

    const changeEmail = (newEmail) => {
        dispatch(setStoreEmail(newEmail));
    };

    const handleFocusEmail = () => {
        setIsFocusedEmail(true);
    };

    const handleBlurEmail = () => {
        setIsFocusedEmail(false);
    };

    const handleSummit = async () => {
        if (!email.trim()) {
            Alert.alert('Email không được để trống', 'Hãy nhập email của bạn để tiếp tục.', [
                {
                    text: 'OK',
                    onPress: () => {
                        emailInputRef.current.focus();
                    },
                },
            ]);
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            Alert.alert('Email không hợp lệ', 'Hãy nhập một địa chỉ email hợp lệ để tiếp tục.', [
                {
                    text: 'OK',
                    onPress: () => {
                        emailInputRef.current.focus();
                    },
                },
            ]);
        } else {
            try {
                const data = await checkEmail(email.trim());
                console.log(data.data);
                if (data.data.data.existed == 1) {
                    Alert.alert('Email không hợp lệ', 'Email đã được sử dụng cho tài khoản khác!');
                } else {
                    goToNextScreen();
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const goBackHandler = () => {
        navigation.goBack(); // Quay lại màn hình trước đó
    };

    const goToNextScreen = () => {
        navigation.navigate('CreatePassword');
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <LinearGradient
                colors={['#fffaf2', '#eef4fd', '#f0f3fb', '#ecf5fb']}
                start={{
                    x: 0,
                    y: 0,
                }}
                end={{
                    x: 1,
                    y: 1,
                }}
                style={styles.createEmail}
            >
                <TouchableOpacity onPress={goBackHandler} style={{ marginTop: 60 }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20}></FontAwesomeIcon>
                </TouchableOpacity>

                <Text style={[styles.bnTnG]}>Địa chỉ email của bạn là gì?</Text>
                <Text style={[styles.nhpTnBn1]}>
                    Nhập địa chỉ email có thể dùng để liên hệ với bạn. Thông tin này sẽ không hiển thị với ai khác trên
                    trang cá nhân của bạn.
                </Text>
                <Text style={[styles.label]}>Địa chỉ email</Text>
                <View>
                    <KeyboardAvoidingView>
                        <TextInput
                            style={[styles.inputtextPosition1, inputBorderStyleEmail]}
                            placeholder="Địa chỉ email"
                            ref={emailInputRef}
                            // keyboardType="email"
                            returnKeyType="done"
                            onChangeText={changeEmail}
                            onFocus={handleFocusEmail}
                            onBlur={handleBlurEmail}
                            autoFocus
                        />
                    </KeyboardAvoidingView>
                </View>

                <Text style={[styles.nhpTnBn2]}>
                    Bạn cũng sẽ nhận được thông báo của chúng tôi qua email và có thể chọn không nhận bất cứ lúc nào.
                    <TouchableOpacity onPress={() => navigation.navigate('Policy')}>
                        <Text
                            style={{
                                color: '#0062e0',
                                fontWeight: 600,
                            }}
                        >
                            Tìm hiểu thêm
                        </Text>
                    </TouchableOpacity>
                </Text>

                <TouchableOpacity style={styles.buttonprimary} onPress={handleSummit}>
                    <Text style={styles.logIn}>Tiếp</Text>
                </TouchableOpacity>

                <View style={styles.buttonSub}>
                    <Text style={styles.logIn2}>Đăng ký bằng số điện thoại</Text>
                </View>

                <Text style={[styles.button]}>Bạn đã có tài khoản ư?</Text>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    iconLayout: {
        maxHeight: '100%',
        maxWidth: '100%',
        position: 'relative',
        top: 90,
        overflow: 'hidden',
    },
    button: {
        position: 'absolute',
        left: '32%',
        width: '100%',
        top: customHeight,
        color: '#0062e0',
        fontWeight: '600',
    },
    bnTnGClr: {
        color: Color.colorBlack,
        textAlign: 'center',
        position: 'absolute',
    },
    label: {
        top: 40,
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputtextPosition1: {
        height: 50,
        top: 50,
        position: 'absolute',
        width: '100%',
        maxWidth: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 16,
        paddingHorizontal: 15,
    },
    inputtextPosition2: {
        height: 50,
        top: 148,
        left: 206,
        position: 'absolute',
        minWidth: 170,
        maxWidth: 170,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 16,
        paddingHorizontal: 15,
    },
    showTypo: {
        fontWeight: '500',
        top: '50%',
        marginTop: -9,
        fontSize: FontSize.uI16Medium_size,
        position: 'absolute',
    },
    logIn: {
        color: Color.white,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
    },
    logIn2: {
        color: Color.colorBlack,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
    },
    buttonprimary: {
        bottom: -130,
        borderRadius: Border.br_81xl,
        backgroundColor: Color.colorRoyalblue_200,
        alignItems: 'center',
        paddingHorizontal: Padding.p_13xl,
        paddingVertical: Padding.p_base,
        position: 'relative',
    },
    buttonSub: {
        bottom: -140,
        borderRadius: Border.br_81xl,
        backgroundColor: Color.white,
        borderColor: '#ccc',
        borderWidth: 1,
        alignItems: 'center',
        paddingHorizontal: Padding.p_13xl,
        paddingVertical: Padding.p_base,
        position: 'relative',
    },
    vectorIcon: {
        width: 20,
        height: 20,
        objectFit: 'cover',
    },
    bnTnG: {
        top: 20,
        fontSize: FontSize.size_xl,
        width: '100%',
        height: 30,
        fontWeight: '800',
        color: Color.colorBlack,
    },
    nhpTnBn1: {
        top: 30,
        fontSize: 15,
        maxWidth: '100%',
    },
    nhpTnBn2: {
        top: 110,
        fontSize: 15,
        width: '100%',
    },
    bgIcon: {
        height: '100%',
        top: '0%',
        right: '0%',
        bottom: '0%',
        left: '0%',
        borderRadius: Border.br_5xs,
        width: '100%',
        maxWidth: '100%',
    },
    email: {
        color: Color.gray03,
        textAlign: 'left',
        left: 16,
    },
    show: {
        color: Color.greenPrimary,
        textAlign: 'right',
        display: 'none',
        right: 16,
    },
    inputtext: {
        right: 195,
        left: 16,
    },
    inputtext1: {
        right: 14,
        left: 197,
    },
    createEmail: {
        flex: 1,
        overflow: 'hidden',
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
    },
});

export default ChooseNumberPhone;
