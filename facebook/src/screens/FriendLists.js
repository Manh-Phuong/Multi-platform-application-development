import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faEllipsis, faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-native-modal';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as FriendServices from '../services/FriendServices';
import { calculateTimeAgo } from '../components/Convert';
import { setStoreRequestFriend, setStoreUserFriend, setStoreSuggestFriend } from '../feature/friend';
import { useDispatch, useSelector } from 'react-redux';

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

const Title = ({ totalFriend = 0 }) => {
    return (
        <View style={[{ paddingHorizontal: 12 }, styles.flexRow, styles.flexBetween]}>
            <View>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        marginTop: 12,
                    }}
                >
                    {totalFriend} bạn bè
                </Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 16,
                            marginTop: 12,
                            color: '#0866ff',
                        }}
                    >
                        Sắp xếp
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const Header = () => {
    const navigation = useNavigation();
    const goBackHandler = () => {
        navigation.goBack(); // Quay lại màn hình trước đó
    };
    return (
        <View>
            <View style={{ paddingHorizontal: 12 }}>
                <View style={[styles.flexRow, { marginTop: 8 }]}>
                    <View>
                        <TouchableOpacity onPress={goBackHandler}>
                            <FontAwesomeIcon icon={faArrowLeft} size={24} color="black" style={{ marginLeft: 4 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.flexRow, styles.flexBetween, { flex: 1, marginLeft: 16 }]}>
                        <View>
                            <Text style={styles.headerText}>Tất cả bạn bè</Text>
                        </View>
                        <TouchableOpacity>
                            <View style={styles.wrapIcon}>
                                <Icon name="search" size={20} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.divLarge}></View>
        </View>
    );
};
const Option = ({ valueOption, handleClickAccept, setModalOption }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const listUserFriend = useSelector((state) => state.friend.listUserFriend);
    // console.log('valueOption', valueOption);

    const handleUnFriend = async (user_id) => {
        console.log('user_id', typeof user_id, user_id);
        console.log('int user_id', typeof parseInt(user_id), parseInt(user_id));
        try {
            Alert.alert(
                'Xác nhận',
                `Bạn có chắc chắn muốn xóa kết bạn với ${valueOption.name} không?`,
                [
                    {
                        text: 'Hủy',
                        style: 'cancel',
                    },
                    {
                        text: 'Xác nhận',
                        onPress: async () => {
                            // Người dùng nhấn "OK", thực hiện xóa bài viết
                            try {
                                const result = await FriendServices.unFriend({ user_id: user_id });
                                console.log('Xóa bạn thành công', result);
                                handleClickAccept(user_id, 0, true);
                                // dispatch(
                                //     setStoreUserFriend({
                                //         total: listUserFriend.total - 1,
                                //         friends: listUserFriend.friends,
                                //     }),
                                // );
                                setModalOption(false);

                                // Đối với ví dụ này, bạn có thể thêm các bước khác sau khi xóa bài viết ở đây
                            } catch (error) {
                                console.log('handleUnFriend FriendList unFriend 1', error.response);
                            }
                        },
                    },
                ],
                { cancelable: false },
            );
        } catch (error) {
            console.log('handleUnFriend FriendList unFriend 2', error);
        }
    };

    return (
        <View style={styles.option}>
            <View style={[styles.flexRow, { paddingHorizontal: 12, marginTop: 12 }]}>
                <Image
                    source={{
                        uri: valueOption.image,
                    }}
                    style={styles.imageOption}
                />
                <View style={{ marginLeft: 12 }}>
                    <Text style={{ fontWeight: 'bold' }}>{valueOption.name}</Text>
                    {/* <Text>Là bạn bè từ tháng 1 năm 2020</Text> */}
                    <Text>Đã tạo tài khoản từ {valueOption?.time}</Text>
                </View>
            </View>
            <View style={styles.divLarge}></View>
            <View>
                <TouchableOpacity>
                    <View style={[styles.flexRow, styles.itemOption]}>
                        <View>
                            <Image
                                source={require('../assets/icons/messengerIcon.png')}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                        <View>
                            <Text
                                style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}
                            >{`Nhắn tin cho ${valueOption.name}`}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.flexRow, styles.itemOption]}>
                        <View>
                            <Image
                                source={require('../assets/icons/blockFriendIcon.png')}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                        <View style={{ marginLeft: 16, flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: 600 }}>
                                Chặn trang cá nhân của {valueOption.name}
                            </Text>
                            <Text>{`${valueOption.name} sẽ không thể nhìn thấy bạn hoặc liên hệ với bạn trên Facebook`}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleUnFriend(valueOption.user_id)}>
                    <View style={[styles.flexRow, styles.itemOption]}>
                        <View>
                            <Image
                                source={require('../assets/icons/unfriendIcon.png')}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                        <View style={{ marginLeft: 16, flex: 1 }}>
                            <Text
                                style={{ fontSize: 16, fontWeight: 600 }}
                            >{`Hủy kết bạn với ${valueOption.name}`}</Text>
                            <Text>{`Xóa ${valueOption.name} khỏi danh sách bạn bè`}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const FriendLists = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user_id = useSelector((state) => state.profile.user_id);
    const [isModalOption, setModalOption] = useState(false);
    const toggleModalOption = () => {
        setModalOption(false);
    };
    const [valueOption, setOption] = useState();
    const toggleOption = (image, name, time, user_id) => {
        setOption({
            image: image,
            name: name,
            time: time,
            user_id: user_id,
        });
        setModalOption(true);
    };

    const listUserFriend = useSelector((state) => state.friend.listUserFriend);

    // var typeListFriend = props ? listUserFriend.friends : listFriend;

    const fetchApi = async () => {
        try {
            const result = await FriendServices.getUserFriend({
                index: '0',
                count: '999',
                user_id: user_id,
            });

            dispatch(
                setStoreUserFriend({
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
                }),
            );
        } catch (error) {
            console.log('fetchApi FriendServices getUserFriend ' + error);
        }
    };

    useEffect(() => {
        fetchApi();
    }, []);

    const handleAddFriend = async (id) => {
        try {
            const result = await FriendServices.setRequestFriend({ user_id: id });
            console.log('result add friend', result);
        } catch (error) {
            console.log('handleAddFriend FriendList setRequestFriend', error);
        }
    };

    const handleCancelAddFriend = async (id) => {
        try {
            const result = await FriendServices.delRequestFriend({ user_id: id });
            console.log('result cancel friend', result);
        } catch (error) {
            console.log('handleAddFriend FriendList setRequestFriend', error);
        }
    };

    const handleClickAccept = (id, value, unfriend = false) => {
        dispatch(
            setStoreUserFriend({
                total: unfriend == true ? listUserFriend?.total - 1 : listUserFriend?.total,
                friends: listUserFriend.friends.map((item) => {
                    if (item.id === id) {
                        return { ...item, on_click_accept: value };
                    }
                    return item;
                }),
            }),
        );
    };

    const handleBackdropPress = () => {
        setModalOption(false);
    };

    return (
        <View style={styles.container}>
            <Header />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={listUserFriend?.friends}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={<Title totalFriend={listUserFriend?.total} />}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('ProfileOtherDetail', { props: item?.id });
                                }}
                            >
                                <View style={[styles.itemNoti]}>
                                    <View style={[styles.flexRow]}>
                                        {/* avatar */}
                                        <View>
                                            <Image
                                                style={styles.accountImage}
                                                source={{
                                                    uri: item?.image,
                                                }}
                                            ></Image>
                                        </View>
                                        <View style={{ flex: 1, marginLeft: 8 }}>
                                            <View>
                                                <Text style={styles.name}>{item?.name}</Text>
                                                {item?.on_click_accept != -1 ? (
                                                    <View>
                                                        {item?.on_click_accept == 0 && (
                                                            <Text style={{ marginTop: 4 }}>Đã gửi lời mời</Text>
                                                        )}
                                                        {item?.on_click_accept == 1 && (
                                                            <Text style={{ marginTop: 4 }}>Đã hủy yêu cầu</Text>
                                                        )}
                                                    </View>
                                                ) : (
                                                    <Text
                                                        style={{ marginTop: 4 }}
                                                    >{`${item?.same_friends} bạn chung`}</Text>
                                                )}
                                            </View>
                                        </View>
                                        {item?.on_click_accept != -1 ? (
                                            <View>
                                                {item?.on_click_accept == 0 && (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            handleAddFriend(item?.id);
                                                            handleClickAccept(item?.id, 1);
                                                        }}
                                                    >
                                                        <View
                                                            style={[
                                                                {
                                                                    width: withScreen * 0.3,
                                                                    paddingVertical: 10,
                                                                    borderRadius: 10,
                                                                    marginTop: 12,
                                                                    backgroundColor: '#e4e6eb',
                                                                },
                                                            ]}
                                                        >
                                                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                                                Thêm bạn bè
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )}
                                                {item?.on_click_accept == 1 && (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            handleCancelAddFriend(item?.id);
                                                            handleClickAccept(item?.id, 0);
                                                        }}
                                                    >
                                                        <View
                                                            style={[
                                                                {
                                                                    width: withScreen * 0.3,
                                                                    paddingVertical: 10,
                                                                    borderRadius: 10,
                                                                    marginTop: 12,
                                                                    backgroundColor: '#e4e6eb',
                                                                },
                                                            ]}
                                                        >
                                                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                                                Hủy
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                        ) : (
                                            <>
                                                <View style={{ marginLeft: 8 }}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            toggleOption(item?.image, item?.name, item?.time, item?.id);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faEllipsis} size={20} color="#65676b" />
                                                    </TouchableOpacity>
                                                </View>
                                            </>
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
            <Modal
                isVisible={isModalOption}
                onSwipeComplete={toggleModalOption}
                swipeDirection={['down']}
                onBackdropPress={handleBackdropPress}
                animationOutTiming={1500}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <Option
                    valueOption={valueOption}
                    handleClickAccept={handleClickAccept}
                    setModalOption={setModalOption}
                />
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
    },
    headerText: {
        color: 'black',
        fontSize: 16,
    },
    wrapIcon: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexBetween: {
        justifyContent: 'space-between',
    },
    textBtn: {
        fontWeight: 'bold',
        backgroundColor: '#e4e6eb',
        padding: 8,
        borderRadius: 20,
        marginRight: 12,
    },
    accountImage: {
        width: 60,
        height: 60,
        borderRadius: 999,
        alignSelf: 'flex-start',
    },
    imageOption: {
        width: 60,
        height: 60,
        borderRadius: 999,
        alignSelf: 'center',
    },
    name: {
        fontWeight: 'bold',
    },
    title: {
        marginBottom: 12,
    },
    contentNoti: {
        marginVertical: 8,
        flex: 1,
        alignItems: 'flex-start',
    },
    itemNoti: {
        paddingHorizontal: 12,
        marginTop: 8,
        marginBottom: 8,
    },
    icon: {
        width: 30,
        height: 30,
        position: 'absolute',
        right: 0,
        bottom: -4,
        zIndex: 1,
    },
    option: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    divLarge: {
        height: 1.5,
        width: withScreen,
        backgroundColor: '#f0f2f5',
        marginTop: 8,
        paddingHorizontal: 0,
    },
    itemOption: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 8,
    },
});
export default FriendLists;
