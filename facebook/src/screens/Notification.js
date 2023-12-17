import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsis, faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-native-modal';
import { useEffect, useState } from 'react';
import { getNotification } from '../services/NotificationServices';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    return (
        <View style={{ paddingHorizontal: 12 }}>
            <View>
                <View style={[styles.flexRow, styles.flexBetween, { marginTop: 8 }]}>
                    <View>
                        <Text style={styles.headerText}>Thông báo</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={styles.wrapIcon}>
                            <Icon name="search" size={20} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        marginTop: 12,
                    }}
                >
                    Trước đó
                </Text>
            </View>
        </View>
    );
};
const Option = ({ valueOption }) => {
    return (
        <View style={styles.option}>
            <View
                style={{
                    height: 6,
                    width: withScreen * 0.16,
                    backgroundColor: '#ccc',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: 4,
                    marginBottom: 16,
                    marginTop: 8,
                }}
            ></View>
            <View>
                <View style={{ marginBottom: 50 }}>
                    <Image
                        source={{
                            uri: valueOption.image,
                        }}
                        style={styles.imageOption}
                    />
                    <Text style={{ textAlign: 'center', paddingHorizontal: 3 }}>{valueOption.content}</Text>
                </View>
                <TouchableOpacity>
                    <View style={[styles.flexRow, { paddingHorizontal: 12, marginBottom: 20 }]}>
                        <View style={{ backgroundColor: '#e4e6eb', padding: 8, borderRadius: 99 }}>
                            <FontAwesomeIcon icon={faRectangleXmark} size={20} color="black" />
                        </View>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>Gỡ thông báo này</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const NotificationContent = ({ notification }) => {
    switch (notification.type) {
        case '1':
            return (
                <Text>
                    <Text style={{ fontWeight: 'bold' }}>{notification.user.username}</Text>{' '}
                    <Text>đã gửi cho bạn lời mời kết bạn.</Text>
                </Text>
            );
        case '2':
            return (
                <Text>
                    <Text style={{ fontWeight: 'bold' }}>{notification.user.username}</Text>{' '}
                    <Text>đã chấp nhận yêu cầu kết bạn.</Text>
                </Text>
            );
        case '3':
            return <Text>A new post has been added.</Text>;
        case '4':
            return <Text>A post has been updated.</Text>;
        case '5':
            return (
                <Text>
                    <Text style={{ fontWeight: 'bold' }}>{notification.user.username}</Text>{' '}
                    <Text>đã bày tỏ cảm xúc về bài viết của bạn.</Text>
                </Text>
            );
        case '6':
            return <Text>Your post has been marked.</Text>;
        case '7':
            return (
                <Text>
                    <Text style={{ fontWeight: 'bold' }}>{notification.user.username}</Text>{' '}
                    <Text>đã bình luận về bài viết của bạn.</Text>
                </Text>
            );
        case '8':
            return <Text>A new video has been added.</Text>;
        case '9':
            return (
                <Text>
                    <Text style={{ fontWeight: 'bold' }}>{notification.user.username}</Text>{' '}
                    <Text>đã bình luận về bài viết của bạn.</Text>
                </Text>
            );
        default:
            return <Text>Unknown notification type.</Text>;
    }
};

const GenerateTime = ({notification}) => {
    const inputDate = new Date(notification.created);
    const currentDate = new Date();
    const timeDifference = (currentDate - inputDate) / 1000; // Chuyển đổi sang giây

    if (timeDifference < 2) {
        return <Text>Vừa xong</Text>
    } else if (timeDifference < 3600) {
        const minutes = Math.floor(timeDifference / 60);
        return <Text>{minutes} phút trước</Text>
    } else if (timeDifference < 86400) {
        const hours = Math.floor(timeDifference / 3600);
        return <Text>{hours} giờ trước</Text>
    } else {
        const days = Math.floor(timeDifference / 86400);
        return <Text>{days} ngày trước</Text>
    }
};

const Notification = () => {
    const navigation = useNavigation();

    const [isModalOption, setModalOption] = useState(false);
    const [listNotify, setListNotify] = useState([]);
    const toggleModalOption = () => {
        setModalOption(false);
    };
    const [valueOption, setOption] = useState();
    const toggleOption = (image, content) => {
        setOption({
            image: image,
            content: content,
        });
        setModalOption(true);
    };

    useEffect(() => {
        const getNotify = async () => {
            const res = await getNotification({});
            console.log(res.data);
            setListNotify(res.data);
        };

        getNotify();
    }, []);

    const handlePressComment = (type, id) => {
        switch (type) {
            case '1':
                navigation.navigate('Friend')
            // case '2':
            //     return (
            //         <Text>
            //             <Text style={{ fontWeight: 'bold' }}>{notification.user.username}</Text>{' '}
            //             <Text>đã chấp nhận yêu cầu kết bạn.</Text>
            //         </Text>
            //     );
            // case '3':
            //     return <Text>A new post has been added.</Text>;
            // case '4':
            //     return <Text>A post has been updated.</Text>;
            // case '5':
            //     return (
            //         <Text>
            //             <Text style={{ fontWeight: 'bold' }}>{notification.user.username}</Text>{' '}
            //             <Text>đã bày tỏ cảm xúc về bài viết của bạn.</Text>
            //         </Text>
            //     );
            // case '6':
            //     return <Text>Your post has been marked.</Text>;
            // case '7':
            //     return (
            //         <Text>
            //             <Text style={{ fontWeight: 'bold' }}>{notification.user.username}</Text>{' '}
            //             <Text>đã bình luận về bài viết của bạn.</Text>
            //         </Text>
            //     );
            // case '8':
            //     return <Text>A new video has been added.</Text>;
            // case '9':
                // return (
                //     <Text>
                //         <Text style={{ fontWeight: 'bold' }}>{notification.user.username}</Text>{' '}
                //         <Text>đã bình luận về bài viết của bạn.</Text>
                //     </Text>
                // );
            default:
                return <Text>Unknown notification type.</Text>;
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={listNotify}
                    showsVerticalScrollIndicator={false} //ẩn thanh cuộn dọc
                    ListHeaderComponent={<Header />}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handlePressComment(item.type, item.object_id)}>
                            <View style={[styles.itemNoti, item.seen ? styles.seenBackgr : styles.notSeenBackgr]}>
                                <View style={[styles.flexRow, styles.contentNoti]}>
                                    {/* avatar */}
                                    <View>
                                        {/* <Image source={item.iconLink} style={styles.icon} /> */}
                                        <Image
                                            style={styles.accountImage}
                                            source={{
                                                uri: item.avatar,
                                            }}
                                        ></Image>
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 8 }}>
                                        <View>
                                            <NotificationContent notification={item} />
                                            <GenerateTime notification={item} />
                                        </View>
                                    </View>
                                    <View style={{ marginLeft: 8 }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                toggleOption(item.image, item.content);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faEllipsis} size={20} color="#65676b" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <Modal
                isVisible={isModalOption}
                onSwipeComplete={toggleModalOption}
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <Option valueOption={valueOption} />
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
    },
    headerText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 22,
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
    content: {},
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
    },
    seenBackgr: {
        backgroundColor: '#fff',
    },
    notSeenBackgr: {
        backgroundColor: '#E7F3FF',
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
        paddingBottom: 20,
    },
});
export default Notification;
