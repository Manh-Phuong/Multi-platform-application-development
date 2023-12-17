import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as FriendServices from '../services/FriendServices';
import { setStoreRequestFriend, setStoreUserFriend, setStoreSuggestFriend } from '../feature/friend';
import { useDispatch, useSelector } from 'react-redux';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

const Title = () => {
    return (
        <View style={[{ paddingHorizontal: 12 }, styles.flexRow, styles.flexBetween]}>
            <View>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginTop: 12,
                    }}
                >
                    Những người bạn có thể biết
                </Text>
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
                            <Text style={styles.headerText}>Gợi ý</Text>
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
const FriendSuggest = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [listSuggested, setListSuggested] = useState([]);
    const listSuggestFriend = useSelector((state) => state.friend.listSuggestFriend);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await FriendServices.getSuggestedFriend({
                    index: '0',
                    count: '999',
                });

                console.log(result.data.data);

                dispatch(
                    setStoreSuggestFriend(
                        result.data.data?.map((item) => {
                            return {
                                id: item?.id,
                                image:
                                    item?.avatar ||
                                    'https://res.cloudinary.com/manhphuong/image/upload/v1702483093/default_avatar_orhez1.jpg',
                                name: item?.username,
                                same_friends: item?.same_friends,
                                on_click_accept: -1,
                            };
                        }) || [],
                    ),
                );

                // setListSuggested(
                //     result.data.data?.map((item) => {
                //         return {
                //             id: item?.id,
                //             image:
                //                 item?.avatar ||
                //                 'https://res.cloudinary.com/manhphuong/image/upload/v1702483093/default_avatar_orhez1.jpg',
                //             name: item?.username,
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

    const handleAddFriend = async (id) => {
        try {
            const result = await FriendServices.setRequestFriend({ user_id: id });
            console.log(result);
        } catch (error) {
            console.log('handleAddFriend FriendSuggest setRequestFriend', error);
        }
    };

    const handleCancelAddFriend = async (id) => {
        try {
            const result = await FriendServices.delRequestFriend({ user_id: id });
            console.log(result);
        } catch (error) {
            console.log('handleAddFriend FriendSuggest setRequestFriend', error);
        }
    };

    const handleClickAccept = (id, value) => {
        // setListSuggested((prevList) =>
        //     prevList.map((item) => {
        //         if (item.id === id) {
        //             return { ...item, on_click_accept: value };
        //         }
        //         return item;
        //     }),
        // );

        dispatch(
            setStoreSuggestFriend(
                listSuggestFriend.map((item) => {
                    if (item.id === id) {
                        return { ...item, on_click_accept: value };
                    }
                    return item;
                }),
            ),
        );
    };

    // const handleDelSuggest = (id) => {
    //     setListRequest((prevList) =>
    //         prevList.filter((item) => {
    //             if (item.id === id) {
    //                 return { ...item, on_click_accept: value };
    //             }
    //             return item;
    //         }),
    //     );
    // };

    return (
        <View style={styles.container}>
            <Header />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={listSuggestFriend}
                    showsVerticalScrollIndicator={false} //ẩn thanh cuộn dọc
                    ListHeaderComponent={<Title />}
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
                                                handleAddFriend(item.id);
                                                handleClickAccept(item?.id, 1);
                                            }}
                                        >
                                            <View style={[styles.reply, styles.replyAccess]}>
                                                <Text style={[styles.textReply, { color: '#fff' }]}>Thêm bạn bè</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <View style={[styles.reply, styles.replyRefuse]}>
                                                <Text style={styles.textReply}>Gỡ</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View>
                                        {/* <Text style={{ fontSize: 14, color: '#65676b' }}>Các bạn đã là bạn bè</Text> */}
                                        {item?.on_click_accept == 1 && (
                                            <>
                                                <Text style={{ fontSize: 14, color: '#65676b' }}>Đã gửi lời mời</Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        handleCancelAddFriend(item?.id);
                                                        handleClickAccept(item?.id, -1);
                                                    }}
                                                >
                                                    <View
                                                        style={[
                                                            {
                                                                // width: withScreen * 0.6,
                                                                paddingVertical: 10,
                                                                borderRadius: 10,
                                                                marginTop: 12,
                                                            },
                                                            styles.replyRefuse,
                                                        ]}
                                                    >
                                                        <Text style={styles.textReply}>Hủy</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </>
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
        paddingTop: 40,
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
    },
    divLarge: {
        height: 1.5,
        width: withScreen,
        backgroundColor: '#f0f2f5',
        marginTop: 8,
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
        width: 95,
        height: 95,
        borderRadius: 999,
        marginRight: 10,
        alignSelf: 'flex-start',
    },
    userName: {
        fontWeight: 'bold',
    },
    title: {
        // marginBottom: 12,
    },
    itemFriend: {
        marginVertical: 8,
        flex: 1,
        paddingHorizontal: 12,
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

export default FriendSuggest;
