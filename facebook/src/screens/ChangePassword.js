import * as React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
    FlatList,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteHistory, getListHistory } from '../services/SearchServices';
import { setLoading } from '../feature/loading';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { changePasswordAsync } from '../services/AuthServices';
const ChangePassword = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isLoadingApi = useSelector((state) => state.loading.isLoadingApi);

    const [isFocusedPassword, setIsFocusedPassword] = React.useState(false);
    const [isFocusedNewPassword, setIsFocusedNewPassword] = React.useState(false);
    const [isFocusedNewPasswordRetype, setIsFocusedNewPasswordRetype] = React.useState(false);
    const [isLogining, setIsLogining] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [newPasswordRetype, setNewPasswordRetype] = React.useState('');
    const goBackHandler = () => {
        navigation.goBack(); // Quay lại màn hình trước đó
    };

    const handleSummit = async () => {
        if (newPassword.length == 0 || password.length == 0 || newPasswordRetype.length == 0) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin', [
                {
                    text: 'Ok',
                    style: 'cancel',
                },
            ]);
        } else if (newPassword.length < 6) {
            Alert.alert('Lỗi','Mật khẩu phải có ít nhật 6 ký tự', [
                {
                    text: 'Ok',
                    style: 'cancel',
                },
            ]);
        } else if (!/^[a-zA-Z0-9]+$/.test(newPassword)) {
            Alert.alert('Lỗi', 'Mật khẩu phải chứa cả chữ và số', [
                {
                    text: 'Ok',
                    style: 'cancel',
                },
            ]);
        } 
        else if (newPassword != newPasswordRetype) {
            Alert.alert('Lỗi', 'Mật khẩu nhập lại không trùng khớp', [
                {
                    text: 'Ok',
                    style: 'cancel',
                },
            ]);
        }else {
            setIsLogining(true)
            const res = await changePasswordAsync({ password, newPassword });
            setIsLogining(false)
            if (res.code == 1000) {
                Alert.alert('Thành công.', 'Đổi mật khẩu thành công', [
                    {
                        text: 'Đăng nhập lại',
                        onPress: async () => navigation.navigate('Login'),
                    },
                ]);
            } else if (res.data.code == 9990) {
                Alert.alert('Lỗi.', 'Mật khẩu không chính xác', [
                    {
                        text: 'Ok',
                    },
                ]);
            } else {
                Alert.alert('Lỗi.', 'Có lỗi xảy ra, vui lòng thử lại', [
                    {
                        text: 'Ok',
                    },
                ]);
            }
        }
    };

    const changePassword = (newPassword) => {
        setPassword(newPassword);
    };
    const changeNewPassword = (newPassword) => {
        setNewPassword(newPassword);
    };
    const changeNewPasswordRetype = (newPassword) => {
        setNewPasswordRetype(newPassword);
    };
    const handleFocusPassword = () => {
        setIsFocusedPassword(true);
    };

    const handleFocusNewPassword = () => {
        setIsFocusedNewPassword(true);
    };
    const handleFocusNewPasswordRetype = () => {
        setIsFocusedNewPasswordRetype(true);
    };

    const handleBlurPassword = () => {
        setIsFocusedPassword(false);
    };

    const handleBlurNewPassword = () => {
        setIsFocusedNewPassword(false);
    };
    const handleBlurNewPasswordRetype = () => {
        setIsFocusedNewPasswordRetype(false);
    };

    return (
        <TouchableWithoutFeedback>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={goBackHandler}>
                        <FontAwesomeIcon icon={faArrowLeft} size={20}></FontAwesomeIcon>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20 }}>Đổi mật khẩu</Text>
                </View>

                <View style={{ marginTop: 20, paddingLeft: 16, paddingRight: 16 }}>
                    <View style={[styles.textInputContainer, isFocusedPassword ? styles.focusedInput : null]}>
                        <TextInput
                            style={[styles.textInput]}
                            onChangeText={changePassword}
                            onFocus={handleFocusPassword}
                            onBlur={handleBlurPassword}
                            value={password}
                            placeholder="Mật khẩu hiện tại"
                        ></TextInput>
                    </View>
                    <View style={[styles.textInputContainer, isFocusedNewPassword ? styles.focusedInput : null]}>
                        <TextInput
                            style={[styles.textInput]}
                            onFocus={handleFocusNewPassword}
                            onBlur={handleBlurNewPassword}
                            value={newPassword}
                            placeholder="Mật khẩu mới"
                            onChangeText={changeNewPassword}
                        ></TextInput>
                    </View>

                    <View style={[styles.textInputContainer, isFocusedNewPasswordRetype ? styles.focusedInput : null]}>
                        <TextInput
                            style={[styles.textInput]}
                            onChangeText={changeNewPasswordRetype}
                            onFocus={handleFocusNewPasswordRetype}
                            onBlur={handleBlurNewPasswordRetype}
                            value={newPasswordRetype}
                            placeholder="Gõ lại mật khẩu mới"
                        ></TextInput>
                    </View>
                </View>
                <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                    <TouchableOpacity style={styles.primaryButton} onPress={handleSummit}>
                        {!isLogining && <Text style={styles.buttonText}>Đổi mật khẩu</Text>}
                        {isLogining && <ActivityIndicator size="large" />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.subButtonText}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 92,
        // backgroundColor: "red",
        paddingTop: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingLeft: 16,
        paddingRight: 16,
        columnGap: 12,
    },
    backIcon: {
        width: 16,
        height: 16,
    },
    historyView: {
        paddingLeft: 20,
        paddingTop: 20,
    },
    iconSearch: {
        width: 48,
        height: 48,
    },
    icon: {
        width: 24,
        height: 24,
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 16,
        marginTop: 10,
        marginBottom: 10,
    },
    itemText: {
        flex: 1,
        rowGap: 2,
    },
    privateText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 6,
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
    focusedInput: {
        borderColor: 'black',
    },
    primaryButton: {
        backgroundColor: '#0063e0',
        width: '100%',
        height: 54,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
        marginTop: 16,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
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
        marginTop: 20,
    },
    subButtonText: {
        color: '#0063e0',
        fontWeight: 'bold',
    },
});

export default ChangePassword;
