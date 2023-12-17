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

const FriendListsOther = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const { props, list } = route.params || { props: '', list: [] };


    const [listFriend, setListFriend] = useState({ total: 0, friends: list });

    const fetchApi = async () => {
        try {
            const result = await FriendServices.getUserFriend({
                index: '0',
                count: '999',
                user_id: props,
            });

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

    useEffect(() => {
        fetchApi();
    }, [props, list]);

    return (
        <View style={styles.container}>
            <Header />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={listFriend?.friends}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={<Title totalFriend={listFriend?.total} />}
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
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
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
export default FriendListsOther;
