import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
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
import {
    faAngleRight,
    faEllipsis,
    faLink,
    faPen,
    faPlus,
    faVolumeLow,
    faVolumeXmark,
    faXmark,
    faSearch,
    faUserLock,
} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-native-modal';
import { Video, ResizeMode } from 'expo-av';
import Slider from '@react-native-community/slider';
import {
    faBell,
    faBookmark,
    faCircleQuestion,
    faClock,
    faRectangleXmark,
    faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import { calculateTimeAgo } from '../components/Convert';
import * as PostServices from '../services/PostServices';
import { useDispatch, useSelector } from 'react-redux';
import { getListComment, getListFeel } from '../services/CommentServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

// const imageUrl = require("../assets/images/bg-intro.jpg");
// const imageSource = Image.resolveAssetSource(imageUrl);

// const widthImage = withScreen;
// const heightImage = (withScreen * imageSource.height) / imageSource.width;

const VideoPlay = ({ urlVideo, offsetY }) => {
    const navigation = useNavigation();
    const [volume, setVolume] = useState(0.0);
    const [historyVolume, setHistoryVolume] = useState(1.0);
    const video = useRef(null);
    const [isMute, setIsMute] = useState(true);

    // console.log('urlVideo', urlVideo);
    // console.log('offsetY', offsetY);

    const handleChangeVolume = (value) => {
        setVolume(value);
        setHistoryVolume(value);
    };

    const handleClickVideo = () => {
        // console.log('click roi')
        navigation.navigate('VideoActive');
    };

    useEffect(() => {
        const playTimeout = setTimeout(() => {
            if (video.current) {
                video.current.playAsync();
            } else {
                // video.current.pauseAsync();
            }
        }, 3000);

        return () => {
            // video.current.pauseAsync();
            clearTimeout(playTimeout);
        };
    }, [urlVideo]);

    return (
        <TouchableOpacity onPress={handleClickVideo}>
            <View style={styles.videoContainer}>
                <Video
                    ref={video}
                    style={styles.video}
                    source={{
                        // uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                        uri: urlVideo,
                    }}
                    rate={1.0}
                    volume={volume}
                    // isMuted={true}
                    resizeMode="cover"
                    shouldPlay={false}
                    isLooping
                    useNativeControls
                />
                <View style={styles.iconVolume}>
                    {isMute ? (
                        <TouchableOpacity
                            onPress={() => {
                                // setVolume(historyVolume);
                                setVolume(1.0);
                                setIsMute((prev) => !prev);
                                // setIsMute(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faVolumeXmark} size={24} color="white" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => {
                                setVolume(0.0);
                                setIsMute((prev) => !prev);
                                // setIsMute(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faVolumeLow} size={24} color="white" />
                        </TouchableOpacity>
                    )}
                </View>
                {/* <View style={styles.sliderContainer}>
                    <Text style={styles.sliderLabel}>Volume</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={1}
                        value={volume}
                        onValueChange={(value) => setVolume(value)}
                    />
                </View> */}
            </View>
        </TouchableOpacity>
    );
};

export default function Post({ onCommentPress, darkMode, isMute, offsetY, ...props }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user_id = useSelector((state) => state.profile.user_id);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalReport, setModalReport] = useState(false);
    const [isModalReportSubmit, setModalReportSubmit] = useState(false);
    const [like, setLike] = useState(false);
    const [isKeyboardOpen, setKeyboardOpen] = useState(false);
    const [selectedReports, setSelectedReports] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [listCmt, setListCmt] = useState([]);

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
    const onOptionPress = (option) => {
        if (selectedReports.includes(option)) {
            setSelectedReports(selectedReports.filter((item) => item !== option));
        } else {
            setSelectedReports([...selectedReports, option]);
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

    const handleReportButtonClick = () => {
        setModalReport(false);
        setTimeout(() => {
            setModalReportSubmit(true);
        }, 500);
    };
    const toggleModalReportSubmit = () => {
        setModalReportSubmit(false);
    };

    useEffect(() => {
        if (props.item?.image) {
            Image.getSize(props.item?.image, (width, height) => {
                const aspectRatio = width / height;
                const widthImage = withScreen; // Thay đổi kích thước theo nhu cầu
                const heightImage = widthImage / aspectRatio;
                setImageSize({ width: widthImage, height: heightImage });
            });
        }
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

    // const handleDeletePost = async (id) => {
    //     try {
    //         const result = await PostServices.deletePost(id);

    //     } catch (error) {
    //         console.log('handleDeletePost Post deletePost', error);
    //     }
    // };

    const handleDeletePost = async (id) => {
        try {
            // Hiển thị hộp thoại xác nhận
            Alert.alert(
                'Xác nhận',
                'Bạn có chắc chắn muốn xóa bài viết không?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: async () => {
                            // Người dùng nhấn "OK", thực hiện xóa bài viết
                            try {
                                const result = await PostServices.deletePost(id);

                                // Thực hiện các bước xóa hoặc thông báo thành công tùy thuộc vào kết quả
                                // console.log('Bài viết đã được xóa thành công', result);

                                // Đối với ví dụ này, bạn có thể thêm các bước khác sau khi xóa bài viết ở đây
                            } catch (error) {
                                console.log('handleDeletePost Post deletePost', error);
                            }
                        },
                    },
                ],
                { cancelable: false },
            );
        } catch (error) {
            console.log('handleDeletePost Post deletePost', error);
        }
    };

    // const isString = (value) => {
    //     console.log(typeof value)
    //     return typeof value === 'string' || value instanceof String;
    //   };

    // const getDataOfPost = async () => {
    //     if (props && props.item) {
    //         const res = await getListComment({ id: props.item.id });

    //         if (res.code == 1000) {
    //             setListCmt(res.data);
    //         }
    //     }
    // };

    const handleShowDetailPost = async () => {
        if (props && props.item) {
            let type = false;
            const res = await getListComment({ id: props.item.id });
            const res2 = await PostServices.getPost({ id: props.item.id });
            if (res2.data.code == 1000) {
                props.item['feel'] = parseInt(res2.data.data.kudos, 10) + parseInt(res2.data.data.disappointed, 10);
                type = res2.data.data.is_felt;
            }
            if (res.code == 1000) {
                navigation.navigate('DetailPost', { postInfo: props.item, listCmt: res?.data, type });
            }
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: darkMode ? '#242526' : '#fff' }]}>
            <View style={styles.header}>
                <View style={styles.profile}>
                    {/* <Image
            style={styles.wrapAvatar}
            source={require("../assets/images/avatar-sample.png")}
          ></Image> */}
                    <TouchableOpacity
                        onPress={() => {
                            if (user_id != props?.item?.owner_id) {
                                navigation.navigate('ProfileOtherDetail', { props: props?.item?.owner_id });
                            } else {
                                navigation.navigate('ProfileDetail');
                            }
                        }}
                    >
                        <Image
                            style={styles.wrapAvatar}
                            source={{
                                uri:
                                    props.item?.avatar ||
                                    'https://res.cloudinary.com/manhphuong/image/upload/v1702483093/default_avatar_orhez1.jpg',
                            }}
                        />
                    </TouchableOpacity>

                    <View
                        style={{
                            maxWidth: withScreen * 0.7,
                            marginLeft: 8,
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (user_id != props?.item?.owner_id) {
                                        navigation.navigate('ProfileOtherDetail', { props: props?.item?.owner_id });
                                    } else {
                                        navigation.navigate('ProfileDetail');
                                    }
                                }}
                            >
                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    style={{
                                        fontWeight: 600,
                                        fontSize: 18,
                                        color: darkMode ? '#fff' : '#000',
                                    }}
                                >
                                    {props.item?.owner}
                                    <Text
                                        style={{
                                            fontWeight: 400,
                                            fontSize: 18,
                                            color: '#65676b',
                                        }}
                                    >
                                        {props?.item?.state != 'Hyped' &&
                                            props?.item?.state != '{"type":"activities"}' &&
                                            typeof props?.item?.state === 'string' &&
                                            props?.item?.state != '' &&
                                            ` đang cảm thấy ${props?.item?.state}`}
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                            {/* <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={{
                                    fontWeight: 600,
                                    fontSize: 14,
                                    color: '#65676b',
                                }}
                            >
                                {props?.item?.state != 'Hyped' &&
                                    props?.item?.state != '' &&
                                    `đang cảm thấy ${props?.item?.state}`}
                            </Text> */}
                        </View>
                        <View>
                            <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={{
                                    fontWeight: 600,
                                    fontSize: 14,
                                    color: '#65676b',
                                }}
                            >
                                Gợi ý cho bạn - {calculateTimeAgo(props.item?.created)}
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
                        color: darkMode ? '#fff' : '#65676b',
                    }}
                >
                    {props.item?.content}{' '}
                </Text>
            </View>
            <View>
                {props.item?.images ? (
                    <View>
                        {props.item?.images && props.item?.images.length == 4 && (
                            <View style={styles.imagePart_4}>
                                {props.item?.images &&
                                    props.item?.images?.map((item, index) => (
                                        <View
                                            key={index}
                                            style={{ width: '50%', height: 200, paddingRight: 4, marginBottom: 4 }}
                                        >
                                            <Image
                                                source={{ uri: item?.url }}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </View>
                                    ))}
                            </View>
                        )}
                        {props.item?.images && props.item?.images.length == 3 && (
                            <View style={styles.imagePart_3}>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 400 }}>
                                    <View style={{ width: '50%', height: 400, paddingRight: 4, marginBottom: 4 }}>
                                        <Image
                                            source={{ uri: props.item?.images[0]?.url }}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </View>
                                    <View style={{ display: 'flex', rowGap: 4, width: '50%', height: 198 }}>
                                        <Image
                                            source={{ uri: props.item?.images[1]?.url }}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <Image
                                            source={{ uri: props.item?.images[2]?.url }}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </View>
                                </View>
                            </View>
                        )}
                        {props.item?.images && props.item?.images.length == 2 && (
                            <View style={styles.imagePart_2}>
                                {props.item?.images &&
                                    props.item?.images?.map((item, index) => (
                                        <View
                                            key={index}
                                            style={{ width: '50%', height: 400, paddingRight: 4, marginBottom: 4 }}
                                        >
                                            <Image
                                                source={{ uri: item?.url }}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </View>
                                    ))}
                            </View>
                        )}
                        {props.item?.images && props.item?.images.length == 1 && (
                            <View style={styles.imagePart_1}>
                                <View style={{ width: '100%', height: 400, marginBottom: 4 }}>
                                    <Image
                                        source={{ uri: props.item?.images[0]?.url }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    {/* <Text>{ props.item?.images[0]?.url }</Text> */}
                                </View>
                            </View>
                        )}
                    </View>
                ) : (
                    props.item?.video && (
                        <View>
                            {/* <WebView source={{ uri: props.item.url }} style={styles.videoPlayer} /> */}
                            <VideoPlay urlVideo={props.item?.video} offsetY={offsetY} />
                        </View>
                    )
                )}
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

            <View style={[styles.divSmall, { backgroundColor: darkMode ? '#242526' : '#f0f2f5' }]}></View>

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
                <TouchableOpacity onPress={handleShowDetailPost}>
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
                isVisible={isModalReport}
                onSwipeComplete={toggleModalReport}
                swipeDirection={['down']}
                onBackdropPress={toggleModalReport}
                animationOutTiming= {1000}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        height: props?.item?.can_edit == '1' ? heightScreen * 0.45 : heightScreen * 0.6,
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
                            marginBottom: 8,
                        }}
                    ></View>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <FontAwesomeIcon icon={faBookmark} size={20} color="black" />
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>
                                        Lưu {props.item?.image ? <Text>bài viết</Text> : <Text>video</Text>}{' '}
                                    </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 400, marginLeft: 16 }}>
                                        Thêm vào danh sách{' '}
                                        {props.item?.image ? <Text>các mục</Text> : <Text>video</Text>} đã lưu
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {props?.item?.can_edit == '1' ? (
                        <>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('EditPost', {
                                        info: {
                                            listImage: props?.item?.images,
                                            video: props?.item?.video,
                                            described: props?.item?.content,
                                            status: props?.item?.state,
                                            id: props?.item?.id,
                                        },
                                    });
                                    setModalReport(false);
                                }}
                            >
                                <View style={styles.item}>
                                    <View style={styles.flexRow}>
                                        <FontAwesomeIcon icon={faPen} size={20} color="black" />
                                        <View>
                                            <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>
                                                Chỉnh sửa bài viết
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeletePost(props?.item?.id)}>
                                <View style={styles.item}>
                                    <View style={styles.flexRow}>
                                        <FontAwesomeIcon icon={faTrashCan} size={20} color="black" />
                                        <View>
                                            <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>
                                                Xóa bài viết
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity>
                                <View style={styles.item}>
                                    <View style={styles.flexRow}>
                                        <FontAwesomeIcon icon={faRectangleXmark} size={20} color="black" />
                                        <View>
                                            <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>
                                                Ẩn bài viết
                                            </Text>
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
                            <TouchableOpacity onPress={() => handleReportButtonClick()}>
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
                        </>
                    )}

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
            <Modal
                isVisible={isModalReportSubmit}
                onSwipeComplete={toggleModalReportSubmit}
                swipeDirection={['down']}
                onBackdropPress={toggleModalReportSubmit}
                animationOutTiming= {1000}
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
                            marginBottom: 8,
                        }}
                    ></View>
                    <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 10 }}>
                        Vui lòng chọn vấn đề để tiếp tục
                    </Text>
                    <Text style={{ fontSize: 16, marginLeft: 10, opacity: 0.5, marginTop: 4, marginBottom: 8 }}>
                        Bạn có thể báo cáo bài viết sau khi chọn vấn đề
                    </Text>
                    <View style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
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
                                <Text style={styles.buttonText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.divSmall}></View>
                    <Text style={{ fontSize: 16, fontWeight: '500', marginLeft: 10, marginTop: 10, marginBottom: 8 }}>
                        Các bước khác mà bạn có thể thực hiện
                    </Text>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <FontAwesomeIcon icon={faUserLock} size={20} />
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>Chặn nó</Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 400,
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
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>
                                        Bỏ theo dõi nó
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 400,
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
                        <FontAwesomeIcon icon={faSearch} size={20} style={styles.iconStyle} />
                        {!inputValue && (
                            <Text style={styles.placeholderStyle}>
                                Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy báo ngay cho dịch vụ
                                cấp cứu địa phương
                            </Text>
                        )}
                        <TextInput
                            style={styles.textInputStyle}
                            multiline
                            value={inputValue}
                            onChangeText={(text) => setInputValue(text)}
                            placeholderTextColor="#ccc"
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#e5e6ed',
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            width: 320,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40,
                            marginLeft: 30,
                            marginTop: 15,
                        }}
                    >
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: '500', opacity: 0.6 }}>Tiếp</Text>
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
        paddingTop: 4,
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

    // videoContainer: {
    //     marginBottom: 20,
    // },
    // videoPlayer: {
    //     width: '100%',
    //     aspectRatio: 476 / 476,
    // },
    videoContainer: {
        // position: 'relative',
    },
    video: {
        alignSelf: 'center',
        width: withScreen,
        height: (withScreen * 9) / 16,
        position: 'relative',
    },
    iconVolume: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        zIndex: 2,
    },
    sliderContainer: {
        marginTop: 20,
        width: 200,
    },
    sliderLabel: {
        textAlign: 'center',
        marginBottom: 10,
    },
    slider: {
        height: 40,
    },
    imagePart_4: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginRight: -4,
        marginTop: 12,
    },
    imagePart_3: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginRight: -4,
        marginTop: 12,
    },
    imagePart_2: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginRight: -4,
        marginTop: 12,
    },
    imagePart_1: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginRight: -4,
        marginTop: 12,
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
        fontSize: 12,
        fontWeight: '700',
        color: '#000',
    },
    inputContainer: {
        borderWidth: 1,
        height: 90,
        marginHorizontal: 20,
        borderRadius: 6,
        borderColor: '#aaa',
    },
    textInputStyle: {
        flexWrap: 'wrap',
        width: 300,
    },
    placeholderStyle: {
        // Style giống với TextInput nhưng với màu và kích thước font khác
        position: 'absolute',
        top: 0,
        left: 10, // Căn chỉnh vị trí
        color: '#ccc',
        // Các style khác để phù hợp với TextInput
    },
});
