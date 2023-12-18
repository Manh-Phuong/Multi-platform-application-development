import { useNavigation, useRoute } from '@react-navigation/native';
import {
    faArrowLeft,
    faExclamationCircle,
    faUserPen,
    faLocationDot,
    faHouse,
    faGlobe,
    faPen,
    faClockRotateLeft,
    faBars,
    faList,
    faMagnifyingGlass,
    faPhone,
    faVideo,
    faUserGroup,
    faUserXmark,
    faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useRef, useState } from 'react';
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
import * as BlockServices from '../services/BlockServices';
import Autolink from 'react-native-autolink';
import { faBookmark, faEye, faNewspaper } from '@fortawesome/free-regular-svg-icons';

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

const ProfileSetting = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { type, link, info } = route.params || { type: '', link: 'youtube.com', info: { id: '', name: '' } };

    const handleBlockUser = async (id) => {
        try {
            Alert.alert(
                'Xác nhận',
                `Bạn có chắc chắn muốn chặn ${info.name} không?`,
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
                                console.log('handleBlockUser ProfileSetting BlockServices setBlockUser 1', error);
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
                    <Text style={{ fontSize: 18, fontWeight: '500', marginRight: 12 }}>Cài đặt trang cá nhân</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {type == 'personal' && (
                    <View>
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('EditProfile')}>
                            <FontAwesomeIcon icon={faPen} size={24} color="black" style={{ marginLeft: 10 }} />
                            <Text style={{ fontSize: 16 }}>Chỉnh sửa trang cá nhân</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item}>
                            <FontAwesomeIcon
                                icon={faClockRotateLeft}
                                size={24}
                                color="black"
                                style={{ marginLeft: 10 }}
                            />
                            <Text style={{ fontSize: 16 }}>Kho lưu trữ tin</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item}>
                            <FontAwesomeIcon icon={faBookmark} size={24} color="black" style={{ marginLeft: 10 }} />
                            <Text style={{ fontSize: 16 }}>Mục đã lưu</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item}>
                            <FontAwesomeIcon icon={faEye} size={24} color="black" style={{ marginLeft: 10 }} />
                            <Text style={{ fontSize: 16 }}>Chế độ xem</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item}>
                            <FontAwesomeIcon icon={faList} size={24} color="black" style={{ marginLeft: 10 }} />
                            <Text style={{ fontSize: 16 }}>Nhật ký hoạt động</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item}>
                            <FontAwesomeIcon icon={faNewspaper} size={24} color="black" style={{ marginLeft: 10 }} />
                            <Text style={{ fontSize: 16 }}>Quản lý bài viết</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Search')}>
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                size={24}
                                color="black"
                                style={{ marginLeft: 10 }}
                            />
                            <Text style={{ fontSize: 16 }}>Tìm kiếm</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {type == 'other' && (
                    <View>
                        <TouchableOpacity style={styles.item}>
                            <FontAwesomeIcon icon={faPhone} size={24} color="black" style={{ marginLeft: 10 }} />
                            <Text style={{ fontSize: 16 }}>Gọi thoại</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item}>
                            <FontAwesomeIcon icon={faVideo} size={24} color="black" style={{ marginLeft: 10 }} />
                            <Text style={{ fontSize: 16 }}>Gọi video</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item}>
                            <FontAwesomeIcon icon={faUserGroup} size={24} color="black" style={{ marginLeft: 10 }} />
                            <Text style={{ fontSize: 16 }}>Xem quan hệ bạn bè</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item}>
                            <FontAwesomeIcon
                                icon={faTriangleExclamation}
                                size={24}
                                color="black"
                                style={{ marginLeft: 10 }}
                            />
                            <Text style={{ fontSize: 16 }}>Báo cáo trang cá nhân</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item} onPress={() => handleBlockUser(info?.id)}>
                            <FontAwesomeIcon icon={faUserXmark} size={24} color="black" style={{ marginLeft: 10 }} />
                            <Text style={{ fontSize: 16 }}>Chặn</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Search')}>
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                size={24}
                                color="black"
                                style={{ marginLeft: 10 }}
                            />
                            <Text style={{ fontSize: 16 }}>Tìm kiếm</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={{ marginTop: 12 }}>
                    <View style={{ width: withScreen - 32, marginLeft: 16, marginBottom: 8 }}>
                        <Text style={{ fontSize: 18, fontWeight: 800 }}>
                            Liên kết đến trang cá nhân của {type == 'personal' ? 'bạn' : `${info.name}`}
                        </Text>
                        <Text style={{ fontSize: 18, fontWeight: 400 }}>
                            Liên kết riêng của {type == 'personal' ? 'bạn' : `${info.name}`} trên Facebook
                        </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <View style={styles.horizontalView}></View>
                    </View>
                    <View style={{ marginLeft: 16 }}>
                        <Text style={{ fontSize: 16, fontWeight: 700, width: withScreen - 32 }}>{link}</Text>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#ecf4ff',
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                width: withScreen - 32,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 40,
                                flexDirection: 'row',
                                marginTop: 12,
                            }}
                        >
                            <Text style={{ color: '#006fd1', fontSize: 16, fontWeight: '700' }}>
                                {' '}
                                Sao chép liên kết
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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

    item: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingHorizontal: 16,
        height: 50,
    },

    horizontalView: {
        marginVertical: 14,
        width: withScreen - 32,
        height: 1,
        backgroundColor: 'black',
        opacity: 0.1,
    },
});

export default ProfileSetting;
