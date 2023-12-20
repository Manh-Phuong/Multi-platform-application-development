import {
    faSearch,
    faArrowLeft,
    faEllipsis,
    faHouse,
    faLocationDot,
    faGlobe,
    faUserPlus,
    faUserCheck,
    faRectangleXmark,
    faUserMinus,
    faUserPen,
    faHeart,
    faUserXmark,
    faCamera,
    faUserClock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import Post from '../components/Post';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { MessageIcon } from '../assets/icons/index';
import * as ProfileServices from '../services/ProfileServices';
import * as PostServices from '../services/PostServices';
import * as FriendServices from '../services/FriendServices';

import { useDispatch, useSelector } from 'react-redux';
import { calculateTimeAgo } from '../components/Convert';

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

const Header = ({ setModalVisible, selectedButton, setSelectedButton, handleButtonPress, profile }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user_id = useSelector((state) => state.profile.user_id);

    const [listFriend, setListFriend] = useState({ total: 0, friends: [] });
    const [acceptFriend, setAcceptFriend] = useState(null);

    console.log('acceptFriend', acceptFriend);
    console.log('profile', profile);

    // const listFriend = useSelector((state) => state.friend.listUserFriend);

    useEffect(() => {
        setAcceptFriend(profile?.is_friend);

        const fetchApi = async () => {
            try {
                const result = await FriendServices.getUserFriend({
                    index: '0',
                    count: '999',
                    user_id: profile?.id,
                });

                // console.log('result.data.data?.friends', result.data.data?.friends);
                setListFriend({
                    total: result.data.data?.total,
                    friends:
                        result.data.data?.friends?.map((item) => {
                            return {
                                id: item?.id,
                                image:
                                    item?.avatar ||
                                    'https://res.cloudinary.com/manhphuong/image/upload/v1702483093/default_avatar_orhez1.jpg',
                                name: item?.username,
                                time: calculateTimeAgo(item?.created),
                                same_friends: item?.same_friends,
                                on_click_accept: -1,
                            };
                        }) || [],
                });
            } catch (error) {
                console.log('fetchApi FriendServices getUserFriend ' + error);
            }
        };
        fetchApi();
    }, [profile?.id]);

    const handleAddFriend = async (id, is_friend) => {
        setAcceptFriend('2');
        console.log('handleAddFriend is_friend====================', is_friend);
        console.log('setAcceptFriend====================', acceptFriend);
        try {
            const result = await FriendServices.setRequestFriend({ user_id: id });
            // console.log(result);
        } catch (error) {
            console.log('handleAddFriend FriendSuggest setRequestFriend', error);
        }
    };

    const handleCancelAddFriend = async (id, is_friend) => {
        setAcceptFriend('0');
        console.log('handleCancelAddFriend is_friend======================', is_friend);
        console.log('setAcceptFriend====================', acceptFriend);

        try {
            const result = await FriendServices.delRequestFriend({ user_id: id });
            console.log('del request add friend', result);
        } catch (error) {
            console.log('handleAddFriend FriendSuggest setRequestFriend', error);
        }
    };

    return (
        <View>
            <View style={{ marginTop: 20, height: 290 }}>
                <Image
                    style={{ height: 230, width: 'auto' }}
                    source={{
                        uri:
                            profile?.cover_image ||
                            'https://res.cloudinary.com/manhphuong/image/upload/v1702693703/default-thumbnail_lscmuo.jpg',
                    }}
                />
                <View style={styles.overlayContainer}>
                    <Image
                        style={styles.menuImg}
                        source={{
                            uri:
                                profile?.avatar ||
                                'https://res.cloudinary.com/manhphuong/image/upload/v1702483093/default_avatar_orhez1.jpg',
                        }}
                    ></Image>
                </View>
                {profile?.online && (
                    <View style={styles.cameraContainer1}>
                        <TouchableOpacity onPress={() => setIsModalAvatar(true)}>
                            <View
                                style={{ width: 22, height: 22, backgroundColor: '#31a24c', borderRadius: 99 }}
                            ></View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <View>
                <Text style={{ fontSize: 20, fontWeight: '800', marginLeft: 20 }}>{profile?.username}</Text>
                <View style={{ flexDirection: 'row', display: 'flex', marginTop: 10, marginLeft: 20 }}>
                    <Text style={{ fontSize: 14, fontWeight: '700', marginRight: 5 }}>{listFriend?.total}</Text>
                    <Text style={{ fontSize: 14, opacity: 0.5 }}>bạn bè</Text>
                </View>
                <Text style={{ fontSize: 14, fontWeight: '500', marginTop: 4, marginLeft: 20 }}>
                    {profile?.description}
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 16,
                        width: withScreen - 32,
                        marginLeft: 16,
                    }}
                >
                    {!(profile?.is_friend == '1') ? (
                        <>
                            {acceptFriend != '0' && profile?.is_friend != '0' ? (
                                <TouchableOpacity
                                    onPress={() => handleCancelAddFriend(profile?.id, profile?.is_friend)}
                                    style={[styles.buttonAddInfo, { flexDirection: 'row' }]}
                                >
                                    <FontAwesomeIcon
                                        icon={faUserClock}
                                        size={20}
                                        color="white"
                                        style={{ marginRight: 6 }}
                                    />
                                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Hủy lời mời</Text>
                                </TouchableOpacity>
                            ) : (
                                <>
                                    {acceptFriend != '0' && profile?.is_friend == '0' ? (
                                        <TouchableOpacity
                                            onPress={() => handleCancelAddFriend(profile?.id, profile?.is_friend)}
                                            style={[styles.buttonAddInfo, { flexDirection: 'row' }]}
                                        >
                                            <FontAwesomeIcon
                                                icon={faUserClock}
                                                size={20}
                                                color="white"
                                                style={{ marginRight: 6 }}
                                            />
                                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                                                Hủy lời mời
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() => handleAddFriend(profile?.id, profile?.is_friend)}
                                            style={[styles.buttonAddInfo, { flexDirection: 'row' }]}
                                        >
                                            <FontAwesomeIcon
                                                icon={faUserPlus}
                                                size={20}
                                                color="white"
                                                style={{ marginRight: 6 }}
                                            />
                                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                                                Thêm bạn bè
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </>
                            )}
                            <TouchableOpacity
                                style={styles.buttonEdit}
                                onPress={() => navigation.navigate('EditProfile')}
                            >
                                <MessageIcon width="20" height="20" />
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', marginLeft: 6 }}>
                                    Nhắn tin
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity
                                onPress={() => setModalVisible(true)}
                                style={[styles.buttonAddInfo, { flexDirection: 'row', backgroundColor: '#e4e6eb' }]}
                            >
                                <FontAwesomeIcon
                                    icon={faUserCheck}
                                    size={20}
                                    color="#050505"
                                    style={{ marginRight: 6 }}
                                />
                                <Text style={{ color: '#050505', fontSize: 16, fontWeight: '600' }}>Bạn bè</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.buttonEdit, { backgroundColor: '#0866ff' }]}
                                onPress={() => navigation.navigate('EditProfile')}
                            >
                                <MessageIcon width="20" height="20" fill="#fff" />
                                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 6 }}>
                                    Nhắn tin
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}

                    <TouchableOpacity
                        style={styles.buttonMenu}
                        onPress={() =>
                            navigation.navigate('ProfileSetting', {
                                type: 'other',
                                link: profile?.link,
                                info: { id: profile?.id, name: profile.username },
                            })
                        }
                    >
                        <FontAwesomeIcon icon={faEllipsis} size={16} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#c9cad2', height: 8, marginVertical: 16 }} />

                <View style={styles.buttonHeaderContainer}>
                    <TouchableOpacity
                        style={[styles.button, selectedButton === 'post' && styles.selectedButton]}
                        onPress={() => handleButtonPress('post')}
                    >
                        <Text style={[styles.buttonText, selectedButton === 'post' && styles.selectedText]}>
                            Bài viết
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selectedButton === 'photo' && styles.selectedButton]}
                        onPress={() => handleButtonPress('photo')}
                    >
                        <Text style={[styles.buttonText, selectedButton === 'photo' && styles.selectedText]}>Ảnh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selectedButton === 'reels' && styles.selectedButton]}
                        onPress={() => handleButtonPress('reels')}
                    >
                        <Text style={[styles.buttonText, selectedButton === 'reels' && styles.selectedText]}>
                            Reels
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.horizontalView}></View>
                </View>
                <View style={{ marginTop: 4 }}>
                    <Text style={{ fontSize: 20, fontWeight: '700', marginLeft: 14 }}>Chi tiết</Text>
                    <View>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                display: 'flex',
                                marginTop: 10,
                                width: withScreen - 32,
                                marginLeft: 16,
                                paddingVertical: 4,
                            }}
                        >
                            <FontAwesomeIcon icon={faHouse} size={20} color="#666" style={{ marginRight: 10 }} />
                            <Text>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: '300' }}>Địa chỉ </Text>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>
                                    {profile?.address}{' '}
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                display: 'flex',
                                marginTop: 10,
                                width: withScreen - 32,
                                marginLeft: 16,
                                paddingVertical: 4,
                            }}
                        >
                            <FontAwesomeIcon icon={faLocationDot} size={20} color="#666" style={{ marginRight: 10 }} />
                            <Text>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: '300' }}>Sống tại </Text>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', marginLeft: 16 }}>
                                    {profile?.city}
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                display: 'flex',
                                marginTop: 10,
                                width: withScreen - 32,
                                marginLeft: 16,
                                paddingVertical: 4,
                            }}
                        >
                            <FontAwesomeIcon icon={faGlobe} size={20} color="#666" style={{ marginRight: 10 }} />
                            <Text>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: '300' }}>Ở </Text>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>
                                    {profile?.country}
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        display: 'flex',
                        flexWrap: 'wrap',
                        marginTop: 8,
                        marginLeft: 16,
                        width: withScreen - 32,
                        justifyContent: 'space-around',
                    }}
                >
                    <TouchableOpacity style={styles.favarite}>
                        <Text style={[styles.buttonText, , { paddingHorizontal: 6 }]}>⚽ Bóng đá</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.favarite}>
                        <Text style={[styles.buttonText, { paddingHorizontal: 6 }]}>🎧 Nghe nhạc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.favarite}>
                        <Text style={[styles.buttonText, { paddingHorizontal: 6 }]}>🌏 Du lịch</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.favarite}>
                        <Text style={[styles.buttonText, { paddingHorizontal: 6 }]}>🍕 Ăn uống</Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 16,
                        width: withScreen - 32,
                        marginLeft: 16,
                    }}
                >
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: '700' }}>Bạn bè</Text>
                        <Text style={{ fontSize: 14, opacity: 0.5 }}>{listFriend?.total} người bạn</Text>
                    </View>
                    <TouchableOpacity style={{ marginRight: 10 }}>
                        <Text style={{ fontSize: 16, color: '#0064d1' }}>Tìm bạn bè</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={[
                        styles.listFriends,
                        { justifyContent: listFriend?.friends?.length >= 3 ? 'space-between' : 'flex-start' },
                    ]}
                >
                    {listFriend?.friends?.slice(0, 6).map((item, index) => (
                        <TouchableOpacity
                            onPress={() => {
                                if (user_id != item?.id) {
                                    navigation.navigate('ProfileOtherDetail', { props: item?.id });
                                } else {
                                    navigation.navigate('ProfileDetail');
                                }
                            }}
                            style={[styles.friend, { marginRight: listFriend?.friends?.length >= 3 ? 0 : 16 }]}
                            key={index}
                        >
                            <Image
                                source={{
                                    uri: item?.image,
                                }}
                                style={styles.imgFriends}
                            />
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{
                                    marginVertical: 4,
                                    fontSize: 16,
                                    fontWeight: '700',
                                    width: (withScreen - 64) / 3,
                                }}
                            >
                                {item?.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('FriendListsOther', { props: profile?.id, list: listFriend })
                        }
                        style={{
                            backgroundColor: '#e5e6ed',
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            width: withScreen - 32,
                            // marginLeft: 16,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40,
                        }}
                    >
                        <Text
                            style={{
                                color: '#000',
                                fontSize: 16,
                                fontWeight: '700',
                            }}
                        >
                            Xem tất cả bạn bè
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: '#c9cad2', height: 8, marginVertical: 16 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginLeft: 14 }}>
                        <Text style={{ fontSize: 20, fontWeight: '700' }}>Bài viết của bạn</Text>
                    </View>
                    <TouchableOpacity style={{ marginRight: 10 }}>
                        <Text style={{ fontSize: 16, color: '#0064d1' }}>Bộ lọc</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.underNav}>
                    <Image
                        style={styles.wrapAvatar}
                        source={{
                            uri:
                                profile?.avatar ||
                                'https://res.cloudinary.com/manhphuong/image/upload/v1702483093/default_avatar_orhez1.jpg',
                        }}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
                        <View style={styles.youThink}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Viết gì đó cho ...</Text>
                        </View>
                    </TouchableOpacity>

                    <Image
                        style={{ height: 26, width: 26, objectFit: 'cover' }}
                        source={require('../assets/icons/iconImage.png')}
                    ></Image>
                </View>

                <View style={{ backgroundColor: '#c9cad2', height: 8, marginVertical: 16 }} />
            </View>
        </View>
    );
};

const ProfileOtherDetail = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const { props } = route.params || '';
    const [propsData, setPropsData] = useState(null);
    const [selectedButton, setSelectedButton] = useState('post');
    const [isModalVisible, setModalVisible] = useState(false);

    const [lastId, setLastId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const [outTiming, setOutTiming] = useState(0);
    const [userOther, setUserOther] = useState(null);

    const [hasData, setHasData] = useState(true);

    const handleButtonPress = (buttonType) => {
        setSelectedButton(buttonType);
    };

    const toggleModal = () => {
        setModalVisible(false);
        setOutTiming(0);
    };

    const handleBackdropPress = () => {
        setModalVisible(false);
        setOutTiming(1500);
    };

    const handleUnFriend = async (user_id) => {
        try {
            Alert.alert(
                'Xác nhận',
                `Bạn có chắc chắn muốn xóa kết bạn với ${userOther.username} không?`,
                [
                    {
                        text: 'Hủy',
                        style: 'cancel',
                    },
                    {
                        text: 'Xác nhận',
                        onPress: async () => {
                            try {
                                const result = await FriendServices.unFriend({ user_id: user_id });
                                console.log('Xóa bạn thành công', result);
                                fetchApi();

                                setModalVisible(false);
                            } catch (error) {
                                console.log('handleUnFriend FriendList unFriend 1', error.response);
                            }
                        },
                    },
                ],
                { cancelable: false },
            );
        } catch (error) {
            console.log('handleUnFriend ProfileOtherDetail.js unFriend ', error);
        }
    };

    const fetchApi = async () => {
        try {
            const result = await ProfileServices.getUserInfo({ user_id: props });
            // console.log('profile', result.data.data);
            if (result.data.code == '1000') {
                setUserOther(result.data.data);
            }
        } catch (error) {
            console.log('fetchApi ProfileOtherDetail.js ProfileServices getUserInfo' + error);
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            // setData([]);
            const response = await PostServices.getListPost({
                user_id: props,
                in_campaign: '1',
                campaign_id: '1',
                latitude: '1.0',
                longitude: '1.0',
                last_id: lastId,
                index: '0',
                count: '10',
            });

            setLastId(response?.data?.last_id);

            // console.log(response.data);

            if (response?.code == '1000') {
                setData((prevData) => [
                    ...prevData,
                    ...response?.data?.post?.map((item) => {
                        return {
                            id: item?.id,
                            owner: item.author.name,
                            owner_id: item.author.id,
                            avatar: item.author.avatar,
                            content: item.described,
                            images: item?.image,
                            video: item?.video?.url,
                            created: item?.created,
                            feel: item?.feel,
                            comment_mark: item?.comment_mark,
                            is_felt: item?.is_felt,
                            is_blocked: item?.is_blocked,
                            can_edit: item?.can_edit,
                            banned: item?.banned,
                            state: item?.state,
                        };
                    }),
                ]);
            } else {
                setLoading(false);
            }

            setHasData(response?.data.post?.length > 0);
        } catch (error) {
            console.error('Error fetching data5', error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchNewData = async () => {
        try {
            setLoading(true);
            setData([]);
            const response = await PostServices.getListPost({
                user_id: props,
                in_campaign: '1',
                campaign_id: '1',
                latitude: '1.0',
                longitude: '1.0',
                last_id: lastId,
                index: '0',
                count: '10',
            });

            setLastId(response?.data?.last_id);

            console.log('new data', response.data);

            if (response?.code == '1000') {
                setData((prevData) => [
                    ...prevData,
                    ...response?.data?.post?.map((item) => {
                        return {
                            id: item?.id,
                            owner: item.author.name,
                            owner_id: item.author.id,
                            avatar: item.author.avatar,
                            content: item.described,
                            images: item?.image,
                            video: item?.video?.url,
                            created: item?.created,
                            feel: item?.feel,
                            comment_mark: item?.comment_mark,
                            is_felt: item?.is_felt,
                            is_blocked: item?.is_blocked,
                            can_edit: item?.can_edit,
                            banned: item?.banned,
                            state: item?.state,
                        };
                    }),
                ]);
            } else {
                setLoading(false);
            }

            setHasData(response?.data?.post?.length > 0);
        } catch (error) {
            console.error('Error fetching data5', error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Kiểm tra xem có sự thay đổi mới của props hay không
        if (route.params.props !== propsData) {
            // Cập nhật state với props mới
            setPropsData(route.params.props);
        }
    }, [route.params.props, propsData]);

    useEffect(() => {
        // Kiểm tra xem propsData đã được cập nhật hay chưa
        if (propsData !== null) {
            // Gọi API bằng propsData mới
            fetchApi(propsData);
        }
    }, [propsData]);

    useEffect(() => {
        fetchApi();
        fetchNewData();
        console.log('props data', props);
        // fetchData();
    }, [props]);

    // useEffect(() => {
    //     fetchData();
    // }, [props]);

    const handleEndReached = () => {
        if (!loading && hasData) {
            fetchData();
        }
        fetchNewData();
    };

    const renderFooter = () => {
        return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
    };

    return (
        <View style={styles.container}>
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                        paddingBottom: 8,
                        justifyContent: 'space-between',
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faArrowLeft} size={24} color="black" style={{ marginLeft: 10 }} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', display: 'flex', marginRight: 10 }}>
                        <FontAwesomeIcon icon={faSearch} size={24} color="black" style={{ marginRight: 8 }} />
                    </View>
                </View>

                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <Header
                            setModalVisible={setModalVisible}
                            selectedButton={selectedButton}
                            setSelectedButton={setSelectedButton}
                            handleButtonPress={handleButtonPress}
                            profile={userOther}
                        />
                    }
                    renderItem={({ item }) => (
                        <View>
                            <Post item={item} />
                            <View style={styles.divLarge}></View>
                        </View>
                    )}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={renderFooter}
                />
            </View>
            <Modal
                isVisible={isModalVisible}
                onSwipeComplete={toggleModal}
                swipeDirection={['down']}
                onBackdropPress={handleBackdropPress}
                animationOutTiming={outTiming}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        height: heightScreen * 0.44,
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
                                <View style={styles.wrapIcon}>
                                    <FontAwesomeIcon icon={faRectangleXmark} size={20} color="black" />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 16 }}>Bỏ theo dõi</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <View style={styles.wrapIcon}>
                                    <FontAwesomeIcon icon={faUserMinus} size={20} color="black" />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 16 }}>
                                        Giảm tương tác
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <View style={styles.wrapIcon}>
                                    <FontAwesomeIcon icon={faUserPen} size={20} color="black" />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 16 }}>
                                        Chỉnh sửa danh sách bạn bè
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <View style={styles.wrapIcon}>
                                    <FontAwesomeIcon icon={faHeart} size={20} color="black" />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 16 }}>Yêu thích</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleUnFriend(userOther.id)}>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <View style={styles.wrapIcon}>
                                    <FontAwesomeIcon icon={faUserXmark} size={20} color="black" />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 16 }}>Hủy kết bạn</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: '#fdfcfc',
        paddingTop: 40,
    },
    menuImg: {
        width: 160,
        height: 160,
    },
    imgFriends: {
        width: (withScreen - 64) / 3,
        height: (withScreen - 64) / 3,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
    },
    cameraContainer1: {
        position: 'absolute',
        top: 240,
        left: 130,
        width: 30,
        height: 30,
        backgroundColor: '#fff',
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'white',
    },
    buttonAddInfo: {
        backgroundColor: '#0c64fe', // Màu nền của button
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: withScreen * 0.36,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    buttonEdit: {
        flexDirection: 'row',
        display: 'flex',
        backgroundColor: '#e5e6ed', // Màu nền của button
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: withScreen * 0.36,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    buttonMenu: {
        backgroundColor: '#e5e6ed', // Màu nền của button
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: withScreen * 0.13,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    buttonPost: {
        flexDirection: 'row',
        display: 'flex',
        width: 100,
        backgroundColor: '#feffff',
        height: 34,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        marginLeft: 10,
    },
    cameraContainer2: {
        position: 'absolute',
        top: 180,
        left: 340,
        width: 40,
        height: 40,
        backgroundColor: '#e2e4eb',
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'white',
    },
    overlayContainer: {
        position: 'absolute',
        top: 110,
        left: 10,
        borderRadius: 999,
        overflow: 'hidden',
        borderWidth: 4,
        borderColor: 'white',
    },
    buttonHeaderContainer: {
        flexDirection: 'row',
        display: 'flex',
        // marginHorizontal: 4,
        width: withScreen - 32,
        marginLeft: 16,
    },
    button: {
        backgroundColor: 'transparent',
        borderRadius: 16,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        marginRight: 8,
    },
    selectedButton: {
        backgroundColor: '#ecf4ff',
    },
    selectedText: {
        color: '#2571bc',
    },
    buttonText: {
        // marginHorizontal: 8,
        fontSize: 16,
        fontWeight: '600',
        paddingHorizontal: 12,
        // marginRight: 8,
        textAlign: 'center',
    },
    horizontalView: {
        marginVertical: 8,
        width: withScreen,
        height: 1,
        backgroundColor: 'black',
        opacity: 0.1,
    },
    favarite: {
        flexDirection: 'row',
        display: 'flex',
        marginTop: 10,
        marginLeft: 5,
        backgroundColor: '#e2e4eb',
        width: 120,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listFriends: {
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        // marginVertical: 10,
        marginTop: 12,
        marginHorizontal: 20,
        backgroundColor: '#fdfcfc',
    },
    friend: {
        marginHorizontal: 2,
        marginBottom: 6,
        alignItems: 'center',
        height: (withScreen - 64) / 3 + 32,
        borderRadius: 6,
        backgroundColor: '#feffff',
        shadowColor: '#fdfcfc',
        borderWidth: 0.2,
        borderColor: '#bbb',
    },
    underNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: withScreen - 40,
        paddingTop: 20,
        marginLeft: 16,
        marginRight: 24,
    },
    wrapAvatar: {
        width: 46,
        height: 46,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    youThink: {
        borderColor: '#d0d0d0',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 8,
        width: withScreen * 0.66,
        borderRadius: 999,
        paddingLeft: 20,
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
    wrapIcon: {
        backgroundColor: '#e1e1e1',
        borderRadius: 999,
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    divLarge: {
        height: 10,
        width: withScreen,
        backgroundColor: '#f0f2f5',
        // marginTop: 10,
    },
});

export default ProfileOtherDetail;
