import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

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
    Switch,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faArrowLeft,
    faCamera,
    faComment,
    faEllipsisVertical,
    faPen,
    faPlus,
    faStore,
    faUserGroup,
    faBell,
    faUser,
    faImages,
    faImage,
    faMagnifyingGlass,
    faLock,
    faUsers,
    faBan,
    faCircleMinus,
    faTriangleExclamation,
    faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { MessageCallIcon, MessageVideoCallIcon, MessageLikeIcon } from '../assets/icons';
import { ScrollView } from 'react-native-gesture-handler';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { height } from '@fortawesome/free-solid-svg-icons/faSquareCheck';
import Modal from 'react-native-modal';

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

export default function MessageRecipientInfo() {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const [isShowMore, setIsShowMore] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(false);
    };

    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    const animatedValue = useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsShowMore((prev) => !prev)} style={{ marginRight: 16 }}>
                    <FontAwesomeIcon icon={faEllipsisVertical} size={24} color="black" />
                </TouchableOpacity>
            </View>

            {isShowMore && (
                <View
                    style={{
                        position: 'absolute',
                        top: 88,
                        right: 10,
                        shadowColor: '#000000',
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.18,
                        shadowRadius: 4.59,
                        elevation: 5,
                        zIndex: 2,
                        width: withScreen * 0.5,
                        //   height: heightScreen * 0.5,
                        backgroundColor: '#fff',
                    }}
                >
                    <TouchableOpacity>
                        <View style={{ paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 16 }}>
                            <Text style={{ fontSize: 16, fontWeight: 400 }}>Mở bong bóng chat</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 16 }}>
                            <Text style={{ fontSize: 16, fontWeight: 400 }}>Đổi tên</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 16 }}>
                            <Text style={{ fontSize: 16, fontWeight: 400 }}>Xóa cuộc trò chuyện</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 16 }}>
                            <Text style={{ fontSize: 16, fontWeight: 400 }}>Báo cáo sự cố kỹ thuật</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}

            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        width: withScreen,
                        display: 'flex',
                        justifyContent: 'center',
                        height: withScreen * 0.35,
                        //   backgroundColor: "#ccc",
                        alignItems: 'center',
                    }}
                >
                    <Image
                        style={styles.wrapAvatar}
                        source={{
                            uri: 'https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg',
                        }}
                    />
                    <Text style={{ marginTop: 8, fontSize: 20, fontWeight: 700 }}>Mạnh Phương</Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: 16,
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity>
                            <View style={styles.wrapIcon}>
                                <MessageCallIcon width="18" height="18" />
                            </View>
                        </TouchableOpacity>
                        <Text
                            style={{
                                marginTop: 4,
                                fontSize: 14,
                                textAlign: 'center',
                                marginLeft: 8,
                            }}
                        >
                            Âm thanh
                        </Text>
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity>
                            <View style={styles.wrapIcon}>
                                <MessageVideoCallIcon width="18" height="18" />
                            </View>
                        </TouchableOpacity>
                        <Text
                            style={{
                                marginTop: 4,
                                fontSize: 14,
                                textAlign: 'center',
                                marginLeft: 8,
                            }}
                        >
                            Video
                        </Text>
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <View style={styles.wrapIcon}>
                                <FontAwesomeIcon icon={faUser} size={18} color="black" />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ marginTop: 4, fontSize: 14, textAlign: 'center' }}>Trang cá nhân</Text>
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity>
                            <View style={styles.wrapIcon}>
                                <FontAwesomeIcon icon={faBell} size={18} color="black" />
                            </View>
                        </TouchableOpacity>
                        <Text
                            style={{
                                marginTop: 4,
                                fontSize: 14,
                                textAlign: 'center',
                                marginLeft: 8,
                            }}
                        >
                            Tắt
                        </Text>
                    </View>
                </View>

                <View style={styles.listItem}>
                    <Text
                        style={{
                            marginBottom: 8,
                            fontSize: 15,
                            color: '#a2a1a1',
                            fontWeight: 500,
                            marginTop: 16,
                            marginLeft: 8,
                        }}
                    >
                        Tùy chỉnh
                    </Text>
                    <View style={styles.item}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginLeft: 2,
                                width: withScreen,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 8 }}>Chủ đề</Text>
                            <Image
                                style={{
                                    height: 36,
                                    width: 36,
                                    objectFit: 'cover',
                                    marginRight: 36,
                                }}
                                source={require('../assets/icons/messageTopicIcon.jpg')}
                            ></Image>
                        </View>
                    </View>

                    <View style={styles.item}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginLeft: 2,
                                width: withScreen,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 8 }}>Biểu tượng cảm xúc</Text>
                            <View style={{ marginRight: 40 }}>
                                <MessageLikeIcon />
                            </View>
                        </View>
                    </View>

                    <View style={styles.item}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginLeft: 2,
                                width: withScreen,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 8 }}>Biệt danh</Text>
                        </View>
                    </View>

                    <Text
                        style={{
                            marginBottom: 8,
                            fontSize: 15,
                            color: '#a2a1a1',
                            fontWeight: 500,
                            marginTop: 8,
                            marginLeft: 8,
                        }}
                    >
                        Hành động khác
                    </Text>

                    <View style={styles.item}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginLeft: 2,
                                width: withScreen,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 8 }}>Xem ảnh và video</Text>
                            <TouchableOpacity>
                                <View style={[styles.wrapIcon, { marginRight: 36 }]}>
                                    <FontAwesomeIcon icon={faImage} size={22} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.item}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginLeft: 2,
                                width: withScreen,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 8 }}>
                                Tìm kiếm trong cuộc trò chuyện
                            </Text>
                            <TouchableOpacity>
                                <View style={[styles.wrapIcon, { marginRight: 36 }]}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.item}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginLeft: 2,
                                width: withScreen,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 8 }}>
                                Đi đến cuộc trò chuyện bí mật
                            </Text>
                            <TouchableOpacity>
                                <View style={[styles.wrapIcon, { marginRight: 36 }]}>
                                    <FontAwesomeIcon icon={faLock} size={20} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.item}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginLeft: 2,
                                width: withScreen,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 8 }}>Tạo nhóm</Text>
                            <TouchableOpacity>
                                <View style={[styles.wrapIcon, { marginRight: 36 }]}>
                                    <FontAwesomeIcon icon={faUserGroup} size={20} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text
                        style={{
                            marginBottom: 8,
                            fontSize: 15,
                            color: '#a2a1a1',
                            fontWeight: 500,
                            marginTop: 8,
                            marginLeft: 8,
                        }}
                    >
                        Quyền riêng tư
                    </Text>

                    <View style={styles.item}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 8 }}>Thông báo</Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 400,
                                        marginLeft: 16,
                                        color: '#65676b',
                                    }}
                                >
                                    Bật
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.item}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginLeft: 2,
                                width: withScreen,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 8 }}>Bỏ qua tin nhắn</Text>
                            <TouchableOpacity>
                                <View style={[styles.wrapIcon, { marginRight: 36 }]}>
                                    <FontAwesomeIcon icon={faBan} size={20} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.item}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginLeft: 2,
                                width: withScreen,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 8 }}>Chặn</Text>
                            <TouchableOpacity>
                                <View style={[styles.wrapIcon, { marginRight: 36 }]}>
                                    <FontAwesomeIcon icon={faCircleMinus} size={20} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.item}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginLeft: 2,
                                width: withScreen,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 8 }}>Báo cáo</Text>
                            <TouchableOpacity>
                                <View style={[styles.wrapIcon, { marginRight: 36 }]}>
                                    <FontAwesomeIcon icon={faTriangleExclamation} size={20} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <Modal
                isVisible={isModalVisible}
                onSwipeComplete={toggleModal}
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        // padding: 16,
                        height: heightScreen * 0.88,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }}
                >
                    <View>
                        <Image
                            style={{
                                height: heightScreen * 0.2,
                                width: withScreen,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                resizeMode: 'cover',
                                position: 'relative',
                            }}
                            source={{
                                uri: 'https://bloggiaima.com/wp-content/uploads/2023/03/hinh-anh-gai-sinh-vien-sexy-khoe-noi-y-nong-bong-bloggiaima-10-576x1024.jpg',
                            }}
                        ></Image>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{
                                marginLeft: 'auto',
                                position: 'absolute',
                                right: 16,
                                top: 12,
                                backgroundColor: '#000',
                                borderRadius: 30,
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} size={24} color="#eee" />
                        </TouchableOpacity>

                        <Image
                            style={{
                                height: withScreen * 0.18,
                                width: withScreen * 0.18,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 40,
                                borderWidth: 2,
                                borderColor: '#fff',
                                position: 'absolute',
                                top: withScreen * 0.24,
                                left: withScreen * 0.42,
                            }}
                            source={{
                                uri: 'https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg',
                            }}
                        ></Image>
                    </View>
                    <View>
                        <Text
                            style={{ marginTop: withScreen * 0.1, fontSize: 20, fontWeight: 700, textAlign: 'center' }}
                        >
                            Mạnh Phương
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                display: 'flex',
                                marginTop: 18,
                                paddingLeft: withScreen * 0.15,
                                paddingRight: withScreen * 0.15,
                            }}
                        >
                            <View
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <TouchableOpacity>
                                    <View style={styles.wrapIcon}>
                                        <FontAwesomeIcon icon={faComment} size={20} />
                                    </View>
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        marginTop: 4,
                                        fontSize: 14,
                                        textAlign: 'center',
                                        marginLeft: 8,
                                    }}
                                >
                                    Gọi thoại
                                </Text>
                            </View>

                            <View
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <TouchableOpacity>
                                    <View style={styles.wrapIcon}>
                                        <MessageCallIcon width="18" height="18" />
                                    </View>
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        marginTop: 4,
                                        fontSize: 14,
                                        textAlign: 'center',
                                        marginLeft: 8,
                                    }}
                                >
                                    Gọi thoại
                                </Text>
                            </View>

                            <View
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <TouchableOpacity>
                                    <View style={styles.wrapIcon}>
                                        <MessageVideoCallIcon width="18" height="18" />
                                    </View>
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        marginTop: 4,
                                        fontSize: 14,
                                        textAlign: 'center',
                                        marginLeft: 8,
                                    }}
                                >
                                    Gọi video
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                backgroundColor: '#ededed',
                                marginTop: withScreen * 0.05,
                                padding: 8,
                                marginLeft: withScreen * 0.1,
                                marginRight: withScreen * 0.1,
                                borderRadius: 12,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    textAlign: 'center',
                                }}
                            >
                                XEM TRANG CÁ NHÂN TRÊN FACEBOOK
                            </Text>
                        </View>
                        <View
                            style={{
                                marginLeft: withScreen * 0.1,
                                marginRight: withScreen * 0.1,
                                marginTop: withScreen * 0.05,
                            }}
                        >
                            <Text style={{ fontWeight: 500, color: '#666', marginBottom: withScreen * 0.02 }}>
                                Điểm chung
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}
                            >
                                <FontAwesomeIcon icon={faUser} size={20} color="#666" />
                                <Text style={{ fontWeight: 500, fontSize: 14, marginLeft: 12 }}>20 bạn chung</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
        paddingLeft: 8,
        paddingRight: 8,
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: withScreen,
        padding: 8,
    },
    wrapAvatar: {
        width: withScreen * 0.25,
        height: withScreen * 0.25,
        borderRadius: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: withScreen - 16,
        height: heightScreen * 0.1,
        // backgroundColor: "#ccc",
    },
    wrapIcon: {
        backgroundColor: '#e4e6eb',
        width: 40,
        height: 40,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },

});
