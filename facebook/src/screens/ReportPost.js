import React, { useState, useRef, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

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
    Image,
    FlatList,
    Animated,
    Easing,
    BackHandler,
    KeyboardAvoidingView,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faEllipsisVertical, faSearch, faUserLock } from '@fortawesome/free-solid-svg-icons';
import {
    setStoreName,
    setStoreAvatar,
    setStoreImageBackground,
    setStoreDescription,
    setStoreAddress,
    setStoreCity,
    setStoreCountry,
    setStoreLink,
    setStoreTemp,
} from '../feature/profile';
import { useDispatch, useSelector } from 'react-redux';
import * as PostServices from '../services/PostServices';
import * as BlockServices from '../services/BlockServices';
import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
import { ScrollView } from 'react-native-gesture-handler';

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

export default function ReportPost() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { props } = route.params || '';
    console.log(props.handleRemovePost)

    const address = useSelector((state) => state.profile.address);
    const city = useSelector((state) => state.profile.city);
    const country = useSelector((state) => state.profile.country);

    const [inputAddress, setInputAddress] = useState(address);
    const [inputCity, setInputCity] = useState(city);
    const [inputCountry, setInputCountry] = useState(country);
    const [inputValue, setInputValue] = useState('');
    const [selectedReports, setSelectedReports] = useState([]);

    const options = [
        'Ảnh thoả thân',
        'Bạo lực',
        'Quấy rối',
        'Tự tử/Tự gây thương tích',
        'Tin giả',
        'Spam',
        'Bán hàng trái phép',
        'Ngôn ngữ gây thù ghét',
        'Khủng bố',
        'Vấn đề khác',
    ];

    const handleSaveReport = async () => {
        if (inputValue.trim().length > 0 != '' && selectedReports.length > 0) {
            try {
                const result = await PostServices.reportPost({
                    id: props?.id_post,
                    subject: selectedReports.join(', ') || '',
                    details: inputValue,
                });
                console.log(result);
                if (result.code == '1000') {
                    Alert.alert('Báo cáo thành công', 'Bạn đã báo cáo bài viết thành công.', [
                        {
                            text: 'OK',
                            onPress: () => {
                                props?.handleRemovePost(props?.id_post);
                                navigation.goBack();
                            }
                        },
                    ]);
                } else {
                    Alert.alert('Báo cáo không thành công', 'Vui lòng thử lại.', [
                        {
                            text: 'OK',
                        },
                    ]);
                }
            } catch (error) {
                console.log('fetchApi ReportPost handleSaveReport PostServices reportPost' + error);
            }
        } else {
        }
    };

    const handleBlockUser = async (id) => {
        try {
            Alert.alert(
                'Xác nhận',
                `Bạn có chắc chắn muốn chặn ${props?.name} không?`,
                [
                    {
                        text: 'Hủy',
                        style: 'cancel',
                    },
                    {
                        text: 'Chặn',
                        onPress: async () => {
                            try {
                                const result = await BlockServices.setBlockUser({ user_id: id });
                            } catch (error) {
                                console.log('handleBlockUser ReportPost BlockServices setBlockUser 1', error);
                            }
                        },
                    },
                ],
                { cancelable: false },
            );
        } catch (error) {
            console.log('handleBlockUser ProfileSetting BlockServices setBlockUser 2', error);
        }
    };

    const onOptionPress = (option) => {
        if (selectedReports.includes(option)) {
            setSelectedReports(selectedReports.filter((item) => item !== option));
        } else {
            setSelectedReports([...selectedReports, option]);
        }
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header]}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faArrowLeft} size={24} color="black" />
                    </TouchableOpacity>

                    <View style={{ width: withScreen - 56 }}>
                        <Text
                            style={{
                                // marginLeft: 24,
                                textAlign: 'center',
                                fontSize: 18,
                                fontWeight: '600',
                            }}
                        >
                            Báo cáo bài viết
                        </Text>
                    </View>
                </View>
            </View>

            <View
                style={{
                    backgroundColor: '#fff',
                    paddingHorizontal: 18,
                    paddingVertical: 12,
                    position: 'absolute',
                    width: withScreen,
                    bottom: 0,
                    left: 0,
                    zIndex: 2,
                }}
            >
                <TouchableOpacity
                    onPress={handleSaveReport}
                    style={{
                        backgroundColor:
                            inputValue.trim().length > 0 != '' && selectedReports.length > 0 ? '#0866ff' : '#ccc',
                        paddingHorizontal: 18,
                        paddingVertical: 8,
                        borderRadius: 6,
                        // position: 'absolute',
                        width: withScreen - 32,
                    }}
                    disabled={!(inputValue.trim().length > 0 != '' && selectedReports.length > 0)}
                >
                    <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>Gửi</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                    <View
                        style={{
                            marginTop: 12,
                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 16 }}>
                            Vui lòng chọn vấn đề để tiếp tục
                        </Text>
                        <Text style={{ fontSize: 16, marginLeft: 16, opacity: 0.5, marginTop: 4, marginBottom: 8 }}>
                            Bạn có thể báo cáo bài viết sau khi chọn vấn đề
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                display: 'flex',
                                flexWrap: 'wrap',
                                marginLeft: 16,
                                marginRight: 16,
                            }}
                        >
                            {options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.boxReport,
                                        selectedReports.includes(option) ? styles.boxReportSelected : {},
                                    ]}
                                    onPress={() => onOptionPress(option)}
                                >
                                    {option === 'Vấn đề khác' ? <FontAwesomeIcon icon={faSearch} /> : null}
                                    <Text
                                        style={[
                                            styles.buttonText,
                                            { color: selectedReports.includes(option) ? '#fff' : '#000' },
                                        ]}
                                    >
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={styles.divSmall}></View>
                        <Text
                            style={{ fontSize: 16, fontWeight: '500', marginLeft: 16, marginTop: 16, marginBottom: 8 }}
                        >
                            Các bước khác mà bạn có thể thực hiện
                        </Text>
                        <TouchableOpacity onPress={() => handleBlockUser(props?.id)}>
                            <View style={styles.item}>
                                <View style={styles.flexRow}>
                                    <FontAwesomeIcon icon={faUserLock} size={20} />
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 16 }}>
                                            Chặn {props?.name}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: '400',
                                                marginLeft: 16,
                                                opacity: 0.6,
                                                flexWrap: 'wrap',
                                                width: 300,
                                            }}
                                        >
                                            Các bạn sẽ không thể nhìn thấy hoặc liên hệ với nhau
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <View style={styles.flexRow}>
                                    <FontAwesomeIcon icon={faRectangleXmark} size={20} />
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 16 }}>
                                            Bỏ theo dõi {props?.name}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: '400',
                                                marginLeft: 16,
                                                opacity: 0.6,
                                                flexWrap: 'wrap',
                                                width: 300,
                                            }}
                                        >
                                            Dừng xem bài viết nhưng vẫn là bạn bè
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.inputContainer}>
                            {/* <FontAwesomeIcon icon={faSearch} size={20} style={styles.iconStyle} /> */}

                            <TextInput
                                style={styles.textInputStyle}
                                multiline
                                value={inputValue}
                                onChangeText={(text) => setInputValue(text)}
                                placeholderTextColor="#ccc"
                                placeholder=" Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy báo ngay cho dịch
                                        vụ cấp cứu địa phương"
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: heightScreen,
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: withScreen,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderBottomStyle: 'solid',
    },
    boxReport: {
        flexDirection: 'row',
        display: 'flex',
        marginTop: 10,
        marginLeft: 5,
        backgroundColor: '#e2e4eb',
        paddingHorizontal: 12,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxReportSelected: {
        backgroundColor: '#0967ff',
    },
    buttonText: {
        paddingHorizontal: 4,
        marginHorizontal: 2,
        fontSize: 14,
        fontWeight: '700',
        color: '#000',
    },
    inputContainer: {
        borderWidth: 1,
        height: 90,
        marginHorizontal: 16,
        borderRadius: 6,
        borderColor: '#aaa',
    },
    textInputStyle: {
        // flexWrap: 'wrap',
        width: '100%',
        // paddingHorizontal: 12,
        paddingVertical: 6,
        paddingHorizontal: 10,
        // paddingTop: 8,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: withScreen,
        height: heightScreen * 0.08,
        // backgroundColor: "#ccc",
        padding: 8,
        paddingLeft: 16,
    },
    scrollView: {
        // flex: 1,
        // justifyContent: 'flex-end',
        // padding: 16,
        paddingBottom: 60,
    },
});
