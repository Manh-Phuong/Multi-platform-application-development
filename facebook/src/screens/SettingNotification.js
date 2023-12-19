import { useNavigation, useRoute } from '@react-navigation/native';
import {
    faArrowLeft,
    faBell,
    faCakeCandles,
    faLightbulb,
    faMessage,
    faTriangleExclamation,
    faUser,
    faUserCheck,
    faUserPlus,
    faVolumeLow,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Switch,
    TextInput,
    Alert,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { width } from '@fortawesome/free-solid-svg-icons/faSquareCheck';
import * as ImagePicker from 'expo-image-picker';
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
import * as SettingServices from '../services/SettingServices';
import Autolink from 'react-native-autolink';
import { setStoreSetting } from '../feature/settings';
import { faCreativeCommonsSampling, faYoutube } from '@fortawesome/free-brands-svg-icons';

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

const SettingNotification = () => {
    const route = useRoute();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const settings = useSelector((state) => state.settings.settings);
    // console.log(settings);

    const handleActive = (newSetting) => {
        // console.log('new setting', newSetting);
        dispatch(setStoreSetting(newSetting));
    };

    const handleSaveSettings = async () => {
        try {
            Alert.alert(
                'Xác nhận',
                'Bạn có chắc chắn muốn lưu cài đặt này không?',
                [
                    {
                        text: 'Hủy',
                        style: 'cancel',
                    },
                    {
                        text: 'Xác nhận',
                        onPress: async () => {
                            try {
                                const result = await SettingServices.setPushSettings(settings);

                                console.log('settings', result);
                                if (result.code == '1000') {
                                    Alert.alert('Thay đổi thành công', 'Bạn đã cài đặt thông báo thành công', [
                                        {
                                            text: 'OK',
                                        },
                                    ]);
                                } else {
                                    Alert.alert('Thay đổi không thành công', 'Vui lòng thử lại', [
                                        {
                                            text: 'OK',
                                        },
                                    ]);
                                }
                            } catch (error) {
                                console.log(
                                    'handleSaveSettings SettingNotification.js SettingServices setPushSettings 1',
                                    error,
                                );
                            }
                        },
                    },
                ],
                { cancelable: false },
            );
        } catch (error) {
            console.log('handleSaveSettings SettingNotification.js SettingServices setPushSettings 2', error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fefefe', height: '100%' }}>
            <View
                style={{
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 50,
                    backgroundColor: 'fefefe',
                    borderBottomWidth: 4,
                    borderBottomColor: '#ddd',
                    height: 50,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color="black" style={{ marginLeft: 16 }} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: '500', marginRight: 12 }}>Cài đặt thông báo</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.wrapItem}>
                    <View style={styles.item}>
                        <FontAwesomeIcon icon={faMessage} size={22} color="black" />
                        <Text style={{ fontSize: 16 }}>Thích bình luận</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#8cbae8' }}
                        thumbColor={settings.like_comment == '1' ? '#1976d2' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(prev) => {
                            handleActive({ ...settings, like_comment: prev ? '1' : '0' });
                        }}
                        value={settings.like_comment == '1' ? true : false}
                        style={{ marginRight: 4 }}
                    />
                </View>

                <View style={styles.wrapItem}>
                    <View style={styles.item}>
                        <FontAwesomeIcon icon={faUser} size={22} color="black" />
                        <Text style={{ fontSize: 16 }}>Từ bạn bè</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#8cbae8' }}
                        thumbColor={settings.from_friends == '1' ? '#1976d2' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(prev) => {
                            handleActive({ ...settings, from_friends: prev ? '1' : '0' });
                        }}
                        value={settings.from_friends == '1' ? true : false}
                        style={{ marginRight: 4 }}
                    />
                </View>

                <View style={styles.wrapItem}>
                    <View style={styles.item}>
                        <FontAwesomeIcon icon={faUserPlus} size={22} color="black" />
                        <Text style={{ fontSize: 16 }}>Yêu cầu kết bạn</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#8cbae8' }}
                        thumbColor={settings.requested_friend == '1' ? '#1976d2' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(prev) => {
                            handleActive({ ...settings, requested_friend: prev ? '1' : '0' });
                        }}
                        value={settings.requested_friend == '1' ? true : false}
                        style={{ marginRight: 4 }}
                    />
                </View>

                <View style={styles.wrapItem}>
                    <View style={styles.item}>
                        <FontAwesomeIcon icon={faUserCheck} size={22} color="black" />
                        <Text style={{ fontSize: 16 }}>Gợi ý bạn bè</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#8cbae8' }}
                        thumbColor={settings.suggested_friend == '1' ? '#1976d2' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(prev) => {
                            handleActive({ ...settings, suggested_friend: prev ? '1' : '0' });
                        }}
                        value={settings.suggested_friend == '1' ? true : false}
                        style={{ marginRight: 4 }}
                    />
                </View>

                <View style={styles.wrapItem}>
                    <View style={styles.item}>
                        <FontAwesomeIcon icon={faCakeCandles} size={22} color="black" />
                        <Text style={{ fontSize: 16 }}>Sinh nhật</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#8cbae8' }}
                        thumbColor={settings.birthday == '1' ? '#1976d2' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(prev) => {
                            handleActive({ ...settings, birthday: prev ? '1' : '0' });
                        }}
                        value={settings.birthday == '1' ? true : false}
                        style={{ marginRight: 4 }}
                    />
                </View>

                <View style={styles.wrapItem}>
                    <View style={styles.item}>
                        <FontAwesomeIcon icon={faYoutube} size={22} color="black" />
                        <Text style={{ fontSize: 16 }}>Video</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#8cbae8' }}
                        thumbColor={settings.video == '1' ? '#1976d2' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(prev) => {
                            handleActive({ ...settings, video: prev ? '1' : '0' });
                        }}
                        value={settings.video == '1' ? true : false}
                        style={{ marginRight: 4 }}
                    />
                </View>

                <View style={styles.wrapItem}>
                    <View style={styles.item}>
                        <FontAwesomeIcon icon={faTriangleExclamation} size={22} color="black" />
                        <Text style={{ fontSize: 16 }}>Báo cáo</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#8cbae8' }}
                        thumbColor={settings.report == '1' ? '#1976d2' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(prev) => {
                            handleActive({ ...settings, report: prev ? '1' : '0' });
                        }}
                        value={settings.report == '1' ? true : false}
                        style={{ marginRight: 4 }}
                    />
                </View>

                <View style={styles.wrapItem}>
                    <View style={styles.item}>
                        <FontAwesomeIcon icon={faVolumeLow} size={22} color="black" />
                        <Text style={{ fontSize: 16 }}>Âm thanh</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#8cbae8' }}
                        thumbColor={settings.sound_on == '1' ? '#1976d2' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(prev) => {
                            handleActive({ ...settings, sound_on: prev ? '1' : '0' });
                        }}
                        value={settings.sound_on == '1' ? true : false}
                        style={{ marginRight: 4 }}
                    />
                </View>

                <View style={styles.wrapItem}>
                    <View style={styles.item}>
                        <FontAwesomeIcon icon={faBell} size={22} color="black" />
                        <Text style={{ fontSize: 16 }}>Thông báo</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#8cbae8' }}
                        thumbColor={settings.notification_on == '1' ? '#1976d2' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(prev) => {
                            handleActive({ ...settings, notification_on: prev ? '1' : '0' });
                        }}
                        value={settings.notification_on == '1' ? true : false}
                        style={{ marginRight: 4 }}
                    />
                </View>

                <View style={styles.wrapItem}>
                    <View style={styles.item}>
                        <FontAwesomeIcon icon={faCreativeCommonsSampling} size={22} color="black" />
                        <Text style={{ fontSize: 16 }}>Sôi động</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#8cbae8' }}
                        thumbColor={settings.vibrant_on == '1' ? '#1976d2' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(prev) => {
                            handleActive({ ...settings, vibrant_on: prev ? '1' : '0' });
                        }}
                        value={settings.vibrant_on == '1' ? true : false}
                        style={{ marginRight: 4 }}
                    />
                </View>

                <View style={styles.wrapItem}>
                    <View style={styles.item}>
                        <FontAwesomeIcon icon={faLightbulb} size={22} color="black" />
                        <Text style={{ fontSize: 16 }}>Đèn LED</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#767577', true: '#8cbae8' }}
                        thumbColor={settings.led_on === '1' ? '#1976d2' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(prev) => {
                            handleActive({ ...settings, led_on: prev ? '1' : '0' });
                        }}
                        value={settings.led_on == '1' ? true : false}
                        style={{ marginRight: 4 }}
                    />
                </View>
            </ScrollView>

            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: withScreen,
                    backgroundColor: '#fff',
                    paddingVertical: 10,
                }}
            >
                <TouchableOpacity
                    onPress={handleSaveSettings}
                    style={{
                        backgroundColor: '#0866ff',
                        paddingVertical: 8,
                        width: withScreen - 32,
                        marginLeft: 16,
                        borderRadius: 8,
                    }}
                >
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 600, color: '#fff' }}>Lưu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {},
    menuImg: {
        width: 140,
        height: 140,
        borderRadius: 999,
    },

    horizontalView: {
        marginVertical: 14,
        width: withScreen - 32,
        height: 1,
        backgroundColor: 'black',
        opacity: 0.1,
    },

    wrapItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
    },

    item: { flexDirection: 'row', columnGap: 8 },
});

export default SettingNotification;
