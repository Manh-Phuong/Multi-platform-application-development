import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as FriendServices from '../services/FriendServices';
import { calculateTimeAgo } from '../components/Convert';
import { setStoreRequestFriend, setStoreUserFriend, setStoreSuggestFriend } from '../feature/friend';
import { useDispatch, useSelector } from 'react-redux';

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

const Header = ({ totalRequest }) => {
    const navigation = useNavigation();
    return (
        <>
            <View>
                <View style={[styles.flexRow, styles.flexBetween, { marginTop: 8 }]}>
                    <View>
                        <Text style={styles.headerText}>Bạn bè</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={styles.wrapIcon}>
                            <Icon name="search" size={20} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.flexRow, { marginVertical: 8 }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('FriendSuggest')}>
                        <View>
                            <Text style={styles.textBtn}>Gợi ý</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('FriendLists')}>
                        <View>
                            <Text style={styles.textBtn}>Bạn bè</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.divLarge}></View>
            <View>
                <View style={[styles.flexRow, styles.flexBetween]}>
                    <View style={styles.flexRow}>
                        <Text style={styles.attend}>Lời mời kết bạn</Text>
                        <Text style={styles.amount}>{totalRequest}</Text>
                    </View>
                </View>
            </View>
        </>
    );
};
const Friend = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [listRequest, setListRequest] = useState([]);
    const [totalRequest, setTotalRequest] = useState(null);
    // const [onClickAccept, setOnClickAccept] = useState(-1);
    const listRequestFriend = useSelector((state) => state.friend.listRequestFriend);
    // console.log(listRequestFriend);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await FriendServices.getListRequestFriend({
                    index: '0',
                    count: '999',
                });

                // console.log(result.data.data.requests);

                setTotalRequest(result.data.data?.total);
                dispatch(
                    setStoreRequestFriend({
                        total: result.data.data?.total,
                        requests:
                            result.data.data.requests?.map((item) => {
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

                // setListRequest(
                //     result.data.data.requests?.map((item) => {
                //         return {
                //             id: item?.id,
                //             image:
                //                 item?.avatar ||
                //                 'https://res.cloudinary.com/manhphuong/image/upload/v1702483093/default_avatar_orhez1.jpg',
                //             name: item?.username,
                //             time: calculateTimeAgo(item?.created),
                //             same_friends: item?.same_friends,
                //             on_click_accept: -1,
                //         };
                //     }),
                // );
            } catch (error) {
                console.log('fetchApi FriendServices getListRequestFriend ' + error);
            }
        };
        fetchApi();
    }, []);

    const handleAcceptFriend = async (id) => {
        try {
            const result = await FriendServices.setAcceptFriend({
                user_id: id,
                is_accept: '1',
            });
        } catch (error) {
            console.log('handleAcceptFriend Friend setAcceptFriend', error);
        }
    };

    const handleRejectFriend = async (id) => {
        try {
            const result = await FriendServices.setAcceptFriend({
                user_id: id,
                is_accept: '0',
            });
        } catch (error) {
            console.log('handleAcceptFriend Friend setAcceptFriend', error);
        }
    };

    const handleClickAccept = (id, value) => {
        // setListRequest((prevList) =>
        //     prevList.map((item) => {
        //         if (item.id === id) {
        //             return { ...item, on_click_accept: value };
        //         }
        //         return item;
        //     }),
        // );

        dispatch(
            setStoreRequestFriend({
                total: listRequestFriend.total - 1,
                requests: listRequestFriend.requests.map((item) => {
                    if (item.id === id) {
                        return { ...item, on_click_accept: value };
                    }
                    return item;
                }),
            }),
        );
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={listRequestFriend.requests}
                    showsVerticalScrollIndicator={false} //ẩn thanh cuộn dọc
                    ListHeaderComponent={<Header totalRequest={listRequestFriend?.total} />}
                    renderItem={({ item }) => (
                        <View style={[styles.flexRow, styles.itemFriend]}>
                            {/* avatar */}
                            <Image
                                style={styles.accountImage}
                                source={{
                                    uri: item.image,
                                }}
                            ></Image>
                            <View style={{ flex: 1 }}>
                                <View style={[styles.flexRow, styles.flexBetween, styles.title]}>
                                    <Text style={styles.userName}>{item.name}</Text>
                                    <Text>{item.time}</Text>
                                </View>
                                {item.same_friends != '0' && item?.on_click_accept == -1 && (
                                    <View>
                                        <Text style={{ fontSize: 14, color: '#65676b', marginTop: 4 }}>
                                            {item.same_friends} bạn chung
                                        </Text>
                                    </View>
                                )}

                                {item?.on_click_accept == -1 ? (
                                    <View
                                        style={[styles.flexRow, styles.flexBetween, { width: '100%', marginTop: 12 }]}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleAcceptFriend(item.id);
                                                handleClickAccept(item?.id, 1);
                                            }}
                                        >
                                            <View style={[styles.reply, styles.replyAccess]}>
                                                <Text style={[styles.textReply, { color: '#fff' }]}>Chấp nhận</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleRejectFriend(item.id);
                                                handleClickAccept(item?.id, 0);
                                            }}
                                        >
                                            <View style={[styles.reply, styles.replyRefuse]}>
                                                <Text style={styles.textReply}>Xóa</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View>
                                        {/* <Text style={{ fontSize: 14, color: '#65676b' }}>Các bạn đã là bạn bè</Text> */}
                                        {item?.on_click_accept == 1 && (
                                            <Text style={{ fontSize: 14, color: '#65676b' }}>Các bạn đã là bạn bè</Text>
                                        )}
                                        {item?.on_click_accept == 0 && (
                                            <Text style={{ fontSize: 14, color: '#65676b' }}>Đã gỡ lời mời</Text>
                                        )}
                                    </View>
                                )}
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
        //   paddingTop: 40,
        paddingHorizontal: 12,
    },
    divLarge: {
        height: 1.5,
        width: withScreen,
        backgroundColor: '#f0f2f5',
        marginVertical: 8,
    },
    headerText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 24,
    },
    wrapIcon: {
        backgroundColor: '#e4e6eb',
        width: 32,
        height: 32,
        borderRadius: 30,
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
    textReply: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    reply: {
        width: withScreen * 0.3,
        paddingVertical: 10,
        borderRadius: 10,
    },
    replyAccess: {
        backgroundColor: '#0866ff',
    },
    replyRefuse: {
        backgroundColor: '#e4e6eb',
    },
    accountImage: {
        width: 100,
        height: 100,
        borderRadius: 999,
        marginRight: 10,
        alignSelf: 'flex-start',
    },
    userName: {
        fontWeight: 'bold',
    },
    title: {
        // marginBottom: 4,
    },
    itemFriend: {
        marginVertical: 8,
        flex: 1,
    },
    attend: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    amount: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 4,
    },
});
export default Friend;
