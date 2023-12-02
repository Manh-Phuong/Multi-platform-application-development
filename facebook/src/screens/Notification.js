import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsis, faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-native-modal';
import { useState } from 'react';

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
const Notification = () => {
    const [isModalOption, setModalOption] = useState(false);
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
    const requests = [
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-1/183502746_1349207945453542_8602506344653869175_n.jpg?stp=dst-jpg_p130x130&_nc_cat=100&ccb=1-7&_nc_sid=db1b99&_nc_ohc=LAOh1uILzO8AX8iGFfQ&_nc_ht=scontent.fhan20-1.fna&oh=00_AfAcCQrZJ69GaxkqyF-T7EBAAosFeLLwghV1lhN0NlmgOg&oe=659208FD',
            iconLink: require('../assets/icons/birthdayIcon.png'),
            content: 'Sinh nhật của Nguyễn Văn Nam vào 30 tháng 11.',
            time: '2 ngày trước',
            seen: false,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/335905476_891499558741787_4169812642276808370_n.jpg?stp=c0.79.130.130a_dst-jpg_p130x130&_nc_cat=111&ccb=1-7&_nc_sid=4da83f&_nc_ohc=QYCkom8rQLkAX8NCT4K&_nc_ht=scontent.fhan20-1.fna&oh=00_AfBR1KbEtQarufKk-4uyeBv7u60J5kvLm6oD9tjzLjBAfQ&oe=656FE75F',
            iconLink: require('../assets/icons/groupIcon.png'),
            content: 'Bây giờ trong KMHTO1-K65: # **Các em join vào buổi học này nhé**',
            time: '2 ngày trước',
            seen: false,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/402082126_858838229064181_7143429889673621239_n.jpg?stp=dst-jpg_p130x130&_nc_cat=103&ccb=1-7&_nc_sid=4da83f&_nc_ohc=acha5Fbv2kkAX9m6LoQ&_nc_ht=scontent.fhan20-1.fna&oh=00_AfBb9WVdM5PfX_PGxgSfkBmA07TC6T4dp_qV7GGu11nTvw&oe=656FCA8D',
            iconLink: require('../assets/icons/commentIconGreen.png'),
            content: 'Xuân Thuyên đã bình luận về bài viết của Trần Doãn Quang',
            time: '1 tuần trước',
            seen: true,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/367061187_122104175828009668_3521630750285971881_n.jpg?stp=dst-jpg_p130x130&_nc_cat=106&ccb=1-7&_nc_sid=4da83f&_nc_ohc=qTkkYtgJjZUAX_h4d-q&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCPe3uBcO0cxZdqjZA6l6rVhdeAAxLFP0JPmpHxtbUiHA&oe=657070BE',
            iconLink: require('../assets/icons/friendIcon.png'),
            content: 'Hồ Đăng Chung đã chấp nhận lời mời kết bạn.',
            time: '2 tuần trước',
            seen: true,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/402082126_858838229064181_7143429889673621239_n.jpg?stp=dst-jpg_p130x130&_nc_cat=103&ccb=1-7&_nc_sid=4da83f&_nc_ohc=acha5Fbv2kkAX9m6LoQ&_nc_ht=scontent.fhan20-1.fna&oh=00_AfBb9WVdM5PfX_PGxgSfkBmA07TC6T4dp_qV7GGu11nTvw&oe=656FCA8D',
            iconLink: require('../assets/icons/commentIconGreen.png'),
            content: 'Xuân Thuyên đã bình luận về ảnh của bạn',
            time: '2 tuần trước',
            seen: true,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-1/183502746_1349207945453542_8602506344653869175_n.jpg?stp=dst-jpg_p130x130&_nc_cat=100&ccb=1-7&_nc_sid=db1b99&_nc_ohc=LAOh1uILzO8AX8iGFfQ&_nc_ht=scontent.fhan20-1.fna&oh=00_AfAcCQrZJ69GaxkqyF-T7EBAAosFeLLwghV1lhN0NlmgOg&oe=659208FD',
            iconLink: require('../assets/icons/birthdayIcon.png'),
            content: 'Sinh nhật của Nguyễn Văn Nam vào 30 tháng 11.',
            time: '2 tuần trước',
            seen: false,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/335905476_891499558741787_4169812642276808370_n.jpg?stp=c0.79.130.130a_dst-jpg_p130x130&_nc_cat=111&ccb=1-7&_nc_sid=4da83f&_nc_ohc=QYCkom8rQLkAX8NCT4K&_nc_ht=scontent.fhan20-1.fna&oh=00_AfBR1KbEtQarufKk-4uyeBv7u60J5kvLm6oD9tjzLjBAfQ&oe=656FE75F',
            iconLink: require('../assets/icons/groupIcon.png'),
            content: 'Bây giờ trong KMHTO1-K65: # **Các em join vào buổi học này nhé**',
            time: '2 tuần trước',
            seen: false,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/402082126_858838229064181_7143429889673621239_n.jpg?stp=dst-jpg_p130x130&_nc_cat=103&ccb=1-7&_nc_sid=4da83f&_nc_ohc=acha5Fbv2kkAX9m6LoQ&_nc_ht=scontent.fhan20-1.fna&oh=00_AfBb9WVdM5PfX_PGxgSfkBmA07TC6T4dp_qV7GGu11nTvw&oe=656FCA8D',
            iconLink: require('../assets/icons/commentIconGreen.png'),
            content: 'Xuân Thuyên đã bình luận về bài viết của Trần Doãn Quang',
            time: '2 tuần trước',
            seen: true,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/367061187_122104175828009668_3521630750285971881_n.jpg?stp=dst-jpg_p130x130&_nc_cat=106&ccb=1-7&_nc_sid=4da83f&_nc_ohc=qTkkYtgJjZUAX_h4d-q&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCPe3uBcO0cxZdqjZA6l6rVhdeAAxLFP0JPmpHxtbUiHA&oe=657070BE',
            iconLink: require('../assets/icons/friendIcon.png'),
            content: 'Hồ Đăng Chung đã chấp nhận lời mời kết bạn.',
            time: '2 tuần trước',
            seen: false,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/402082126_858838229064181_7143429889673621239_n.jpg?stp=dst-jpg_p130x130&_nc_cat=103&ccb=1-7&_nc_sid=4da83f&_nc_ohc=acha5Fbv2kkAX9m6LoQ&_nc_ht=scontent.fhan20-1.fna&oh=00_AfBb9WVdM5PfX_PGxgSfkBmA07TC6T4dp_qV7GGu11nTvw&oe=656FCA8D',
            iconLink: require('../assets/icons/commentIconGreen.png'),
            content: 'Xuân Thuyên đã bình luận về ảnh của bạn',
            time: '2 tuần trước',
            seen: false,
        },
    ];

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={requests}
                    showsVerticalScrollIndicator={false} //ẩn thanh cuộn dọc
                    ListHeaderComponent={<Header />}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <View style={[styles.itemNoti, item.seen ? styles.seenBackgr : styles.notSeenBackgr]}>
                                <View style={[styles.flexRow, styles.contentNoti]}>
                                    {/* avatar */}
                                    <View>
                                        <Image source={item.iconLink} style={styles.icon} />
                                        <Image
                                            style={styles.accountImage}
                                            source={{
                                                uri: item.image,
                                            }}
                                        ></Image>
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 8 }}>
                                        <View>
                                            <Text style={styles.content}>{item.content}</Text>
                                            <Text>{item.time}</Text>
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
