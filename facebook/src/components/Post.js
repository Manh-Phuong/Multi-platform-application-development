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
    BackHandler,
    KeyboardAvoidingView,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { HomeIcon, VideoIcon, FriendIcon, MarketIcon, MessageIcon, SendIcon } from '../assets/icons';
import { ScrollView } from 'react-native-gesture-handler';
import { faAngleRight, faEllipsis, faLink, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-native-modal';
import { faBell, faBookmark, faCircleQuestion, faClock, faRectangleXmark } from '@fortawesome/free-regular-svg-icons';

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

// const imageUrl = require("../assets/images/bg-intro.jpg");
// const imageSource = Image.resolveAssetSource(imageUrl);

// const widthImage = withScreen;
// const heightImage = (withScreen * imageSource.height) / imageSource.width;

export default function Post({ onCommentPress, ...props }) {
    const navigation = useNavigation();
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalReport, setModalReport] = useState(false);
    const [like, setLike] = useState(false);
    const [isKeyboardOpen, setKeyboardOpen] = useState(false);
    const [comments, setComments] = useState([
        {
            name: 'Nguyễn Văn A',
            content: 'Bình luận 1',
        },
        {
            name: 'Nguyễn Văn B',
            content: 'Bình luận 2',
        },
        {
            name: 'Nguyễn Văn A',
            content: 'Bình luận 1',
        },
        {
            name: 'Nguyễn Văn B',
            content: 'Bình luận 2',
        },
        {
            name: 'Nguyễn Văn A',
            content: 'Bình luận 1',
        },
        {
            name: 'Nguyễn Văn B',
            content: 'Bình luận 2',
        },
        {
            name: 'Nguyễn Văn A',
            content: 'Bình luận 1',
        },
        {
            name: 'Nguyễn Văn B',
            content: 'Bình luận 2',
        },
        {
            name: 'Nguyễn Văn A',
            content: 'Bình luận 1',
        },
        {
            name: 'Nguyễn Văn B',
            content: 'Bình luận 2',
        },
        // ...Thêm bình luận khác nếu cần
    ]);

    const [newComment, setNewComment] = useState('');

    const addComment = () => {
        if (newComment) {
            setComments([...comments, { nickname: 'Tuấn Bùi', text: newComment }]);
            setNewComment('');
        }
    };

    const toggleModal = () => {
        setModalVisible(false);
    };

    const toggleModalReport = () => {
        setModalReport(false);
    };

    const toggleLike = () => {
        setLike(!like);
    };

    useEffect(() => {
        Image.getSize(props.item.image, (width, height) => {
            const aspectRatio = width / height;
            const widthImage = withScreen; // Thay đổi kích thước theo nhu cầu
            const heightImage = widthImage / aspectRatio;
            setImageSize({ width: widthImage, height: heightImage });
        });
    }, []);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardOpen(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardOpen(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const modalHeight = isKeyboardOpen ? heightScreen * 0.5 : heightScreen * 0.9;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profile}>
                    {/* <Image
            style={styles.wrapAvatar}
            source={require("../assets/images/avatar-sample.png")}
          ></Image> */}
                    <Image
                        style={styles.wrapAvatar}
                        source={{
                            uri:
                                props.item.avatar ||
                                'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/356150905_221055794134074_7342427060415828020_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=qsmztDXjbrgAX-UdlbA&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDT1VZf8gV7mZsMT07r4iENKWnEi-KoIXCYDju-9BcRlw&oe=653C4A7B',
                        }}
                    />

                    <View
                        style={{
                            maxWidth: withScreen * 0.72,
                            marginLeft: 8,
                        }}
                    >
                        <View>
                            <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={{
                                    fontWeight: 600,
                                    fontSize: 18,
                                }}
                            >
                                {props.item.owner}{' '}
                            </Text>
                        </View>
                        <View>
                            <Text
                                Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={{
                                    fontWeight: 600,
                                    fontSize: 14,
                                    color: '#65676b',
                                }}
                            >
                                Gợi ý cho bạn - 18 giờ
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => setModalReport(true)}>
                        <FontAwesomeIcon icon={faEllipsis} size={24} color="#65676b" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesomeIcon style={{ marginLeft: 12 }} icon={faXmark} size={24} color="#65676b" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ margin: 8 }}>
                <Text
                    Text
                    numberOfLines={3}
                    ellipsizeMode="tail"
                    style={{
                        fontWeight: 400,
                        fontSize: 15,
                        color: '#65676b',
                    }}
                >
                    {props.item.content}{' '}
                </Text>
            </View>
            <View>
                <Image
                    style={[
                        styles.wrapImage,
                        {
                            width: imageSize.width,
                            height: imageSize.height,
                        },
                    ]}
                    contentFit="cover"
                    source={{ uri: props.item.image }}
                />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: withScreen - 16,
                    paddingTop: 8,
                    marginLeft: 8,
                    marginRight: 8,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        style={{
                            width: 20,
                            height: 20,
                        }}
                        contentFit="cover"
                        source={require('../assets/icons/likeIconColor.png')}
                    />
                    <Text
                        style={{
                            fontSize: 16,
                            marginLeft: 6,
                            color: '#65676b',
                        }}
                    >
                        1
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <View>
                        <Text
                            style={{
                                fontSize: 16,
                                marginLeft: 6,
                                color: '#65676b',
                            }}
                        >
                            55 bình luận
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: 16,
                                marginLeft: 6,
                                color: '#65676b',
                            }}
                        >
                            9 chia sẻ
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.divSmall}></View>

            <View style={styles.footer}>
                <View style={styles.footerItem}>
                    <Image
                        style={{
                            width: 26,
                            height: 26,
                        }}
                        contentFit="cover"
                        source={require('../assets/icons/likeIcon.png')}
                    />
                    <Text
                        style={{
                            marginLeft: 4,
                            fontSize: 15,
                            color: '#65676b',
                        }}
                    >
                        Thích
                    </Text>
                </View>

                {/* onpress -> oncommentPress */}
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View style={styles.footerItem}>
                        <Image
                            style={{
                                width: 26,
                                height: 26,
                            }}
                            contentFit="cover"
                            source={require('../assets/icons/commentIcon.png')}
                        />
                        <Text
                            style={{
                                marginLeft: 4,
                                fontSize: 15,
                                color: '#65676b',
                            }}
                        >
                            Bình luận
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.footerItem}>
                    <Image
                        style={{
                            width: 26,
                            height: 26,
                        }}
                        contentFit="cover"
                        source={require('../assets/icons/shareIcon.png')}
                    />
                    <Text
                        style={{
                            marginLeft: 4,
                            fontSize: 15,
                            color: '#65676b',
                        }}
                    >
                        Chia sẻ
                    </Text>
                </View>
            </View>

            <Modal
                isVisible={isModalVisible}
                onSwipeComplete={toggleModal}
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{
                        backgroundColor: 'white',
                        // padding: 16,
                        // height: heightScreen * 0.9,
                        height: modalHeight,
                        position: 'relative',
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 16,
                        }}
                    >
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                style={{ width: 20, height: 20 }}
                                contentFit="cover"
                                source={require('../assets/icons/likeIconColor.png')}
                            />
                            <Text style={{ margin: 5 }}>146</Text>
                            <FontAwesomeIcon icon={faAngleRight} size={18} color="black" />
                        </View>
                        <TouchableOpacity onPress={toggleLike}>
                            {like ? (
                                <Image
                                    style={{ width: 24, height: 24 }}
                                    contentFit="cover"
                                    source={require('../assets/icons/likedIcon.png')}
                                />
                            ) : (
                                <Image
                                    style={{
                                        width: 24,
                                        height: 24,
                                        marginTop: 2,
                                        marginBottom: -2,
                                    }}
                                    contentFit="cover"
                                    source={require('../assets/icons/likeIcon.png')}
                                />
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={{}}>
                        <View style={styles.containerFlex}>
                            <Text style={styles.title}>Hiển thị bình luận trước...</Text>
                        </View>
                        <FlatList
                            data={comments}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={[styles.containerFlex, { marginTop: 10, marginLeft: 8, marginRight: 8 }]}>
                                    <Image
                                        style={styles.accountImage}
                                        source={require('../assets/images/avatar-sample.png')}
                                    ></Image>
                                    <View style={{ maxWidth: withScreen * 0.85 }}>
                                        <View style={styles.textComment}>
                                            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                            <Text>{item.content}</Text>
                                        </View>
                                        <View style={styles.containerFlex}>
                                            <Text>20p</Text>
                                            <Text style={{ marginLeft: 20, marginRight: 20 }}>Thích</Text>
                                            <Text>Phản hồi</Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    </View>

                    <View style={[styles.commentInput, { position: 'absolute', bottom: 0 }]}>
                        <TouchableOpacity>
                            <View style={styles.wrapIconNews}>
                                <FontAwesomeIcon icon={faPlus} size={22} color="white" />
                            </View>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            placeholder="Viết bình luận..."
                            value={newComment}
                            onChangeText={setNewComment}
                        />
                        <TouchableOpacity style={{ marginRight: 8, marginLeft: 8 }} onPress={addComment}>
                            <SendIcon width="24" height="24" fill={newComment.trim().length > 0 ? '#0866ff' : '#ccc'} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            <Modal
                isVisible={isModalReport}
                onSwipeComplete={toggleModalReport}
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        height: heightScreen * 0.8,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingTop: 12,
                    }}
                >
                    <View
                        style={{
                            height: 6,
                            width: withScreen * 0.16,
                            backgroundColor: '#ccc',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            borderRadius: 4,
                            marginBottom: 8
                        }}
                    ></View>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <FontAwesomeIcon icon={faBookmark} size={20} color="black" />
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>Lưu bài viết</Text>
                                    <Text style={{ fontSize: 14, fontWeight: 400, marginLeft: 16 }}>
                                        Thêm vào danh sách các mục đã lưu
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <FontAwesomeIcon icon={faRectangleXmark} size={20} color="black" />
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>Ẩn bài viết</Text>
                                    <Text style={{ fontSize: 14, fontWeight: 400, marginLeft: 16 }}>
                                        Ẩn bớt các bài viết tương tự
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <FontAwesomeIcon icon={faClock} size={20} color="black" />
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>
                                        Tạm ẩn trong 30 ngày
                                    </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 400, marginLeft: 16 }}>
                                        Tạm thời dừng xem bài viết
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <FontAwesomeIcon icon={faCircleQuestion} size={20} color="black" />
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>
                                        Tại sao tôi nhìn thấy bài viết này?
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <Image
                                    style={{ height: 20, width: 20, objectFit: 'cover' }}
                                    source={require('../assets/icons/warning.png')}
                                ></Image>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>
                                        Báo cáo bài viết
                                    </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 400, marginLeft: 16 }}>
                                        Tôi lo ngại về bài viết này
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <FontAwesomeIcon icon={faBell} size={20} color="black" />
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>
                                        Bật thông báo cho bài viết này
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <FontAwesomeIcon icon={faLink} size={20} color="black" />
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>
                                        Sao chép liên kết
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: withScreen,
        backgroundColor: 'white',
        marginTop: 4,
        paddingBottom: 0,
        // position: "relative",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: withScreen - 16,
        paddingTop: 6,
        marginLeft: 8,
        marginRight: 8,
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: withScreen - 64,
        // paddingTop: 10,
        marginLeft: 32,
        marginRight: 32,
    },

    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },

    profile: {
        flexDirection: 'row',
    },

    wrapImage: {
        resizeMode: 'cover',
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

    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: withScreen - 16,
        paddingTop: 20,
        marginLeft: 8,
        marginRight: 8,
    },

    divSmall: {
        height: 1,
        width: withScreen,
        backgroundColor: '#f0f2f5',
        marginTop: 10,
        width: withScreen - 16,
        marginLeft: 8,
        marginRight: 8,
    },

    divLarge: {
        height: 10,
        width: withScreen,
        backgroundColor: '#f0f2f5',
        marginTop: 10,
    },

    wrapAvatar: {
        width: 40,
        height: 40,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerFlex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textComment: {
        backgroundColor: '#F1F2F6',
        borderRadius: 10,
        padding: 10,
        paddingTop: 5,
    },
    commentInput: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        backgroundColor: '#fff',
    },
    accountImage: {
        width: 40,
        height: 40,
        borderRadius: 999,
        marginRight: 10,
        alignSelf: 'flex-start',
    },
    wrapIconNews: {
        backgroundColor: '#0866ff',
        width: 32,
        height: 32,
        borderRadius: 38,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        marginRight: 8,
    },
    input: {
        height: 40,
        borderRadius: 30,
        paddingLeft: 12,
        backgroundColor: '#F1F2F6',
        flex: 1,
        marginHorizontal: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        marginLeft: 8,
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
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
