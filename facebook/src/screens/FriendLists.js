import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsis, faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-native-modal';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";


const Title=()=>{
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
                12 bạn bè
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
    )
}
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
                            <View style={{ paddingHorizontal: 8 }}>
                                <Icon name="angle-left" size={30} color="#000" />
                            </View>
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
const Option = ({ valueOption }) => {
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
                    <Text>Là bạn bè từ tháng 1 năm 2020</Text>
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
                            <Text style={{ fontSize: 16, fontWeight: 600 }}>Chặn trang cá nhân</Text>
                            <Text>{`${valueOption.name} sẽ không thể nhìn thấy bạn hoặc liên hệ với bạn trên Facebook`}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.flexRow, styles.itemOption]}>
                        <View>
                            <Image
                                source={require('../assets/icons/unfriendIcon.png')}
                                style={{ width: 24, height: 24 }}
                            />
                        </View>
                        <View style={{ marginLeft: 16, flex: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: 600 }}>{`Hủy kết bạn`}</Text>
                            <Text>{`Xóa ${valueOption.name} khỏi danh sách bạn bè`}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const FriendLists = () => {
    const [isModalOption, setModalOption] = useState(false);
    const toggleModalOption = () => {
        setModalOption(false);
    };
    const [valueOption, setOption] = useState();
    const toggleOption = (image, name) => {
        setOption({
            image: image,
            name: name,
        });
        setModalOption(true);
    };
    const requests = [
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-1/183502746_1349207945453542_8602506344653869175_n.jpg?stp=dst-jpg_p130x130&_nc_cat=100&ccb=1-7&_nc_sid=db1b99&_nc_ohc=LAOh1uILzO8AX8iGFfQ&_nc_ht=scontent.fhan20-1.fna&oh=00_AfAcCQrZJ69GaxkqyF-T7EBAAosFeLLwghV1lhN0NlmgOg&oe=659208FD',
            name: 'Nguyễn Văn Nam',
            same_friends: 5,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-1/183502746_1349207945453542_8602506344653869175_n.jpg?stp=dst-jpg_p130x130&_nc_cat=100&ccb=1-7&_nc_sid=db1b99&_nc_ohc=LAOh1uILzO8AX8iGFfQ&_nc_ht=scontent.fhan20-1.fna&oh=00_AfAcCQrZJ69GaxkqyF-T7EBAAosFeLLwghV1lhN0NlmgOg&oe=659208FD',
            name: 'Bùi Anh Tuấn',
            same_friends: 5,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-1/183502746_1349207945453542_8602506344653869175_n.jpg?stp=dst-jpg_p130x130&_nc_cat=100&ccb=1-7&_nc_sid=db1b99&_nc_ohc=LAOh1uILzO8AX8iGFfQ&_nc_ht=scontent.fhan20-1.fna&oh=00_AfAcCQrZJ69GaxkqyF-T7EBAAosFeLLwghV1lhN0NlmgOg&oe=659208FD',
            name: 'Nguyễn Mạnh Phương',
            same_friends: 5,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-1/183502746_1349207945453542_8602506344653869175_n.jpg?stp=dst-jpg_p130x130&_nc_cat=100&ccb=1-7&_nc_sid=db1b99&_nc_ohc=LAOh1uILzO8AX8iGFfQ&_nc_ht=scontent.fhan20-1.fna&oh=00_AfAcCQrZJ69GaxkqyF-T7EBAAosFeLLwghV1lhN0NlmgOg&oe=659208FD',
            name: 'Bùi Thức Nam',
            same_friends: 5,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-1/183502746_1349207945453542_8602506344653869175_n.jpg?stp=dst-jpg_p130x130&_nc_cat=100&ccb=1-7&_nc_sid=db1b99&_nc_ohc=LAOh1uILzO8AX8iGFfQ&_nc_ht=scontent.fhan20-1.fna&oh=00_AfAcCQrZJ69GaxkqyF-T7EBAAosFeLLwghV1lhN0NlmgOg&oe=659208FD',
            name: 'Nguyễn Trung Hiếu',
            same_friends: 5,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-1/183502746_1349207945453542_8602506344653869175_n.jpg?stp=dst-jpg_p130x130&_nc_cat=100&ccb=1-7&_nc_sid=db1b99&_nc_ohc=LAOh1uILzO8AX8iGFfQ&_nc_ht=scontent.fhan20-1.fna&oh=00_AfAcCQrZJ69GaxkqyF-T7EBAAosFeLLwghV1lhN0NlmgOg&oe=659208FD',
            name: 'Trần Đình Hiệp',
            same_friends: 5,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-1/183502746_1349207945453542_8602506344653869175_n.jpg?stp=dst-jpg_p130x130&_nc_cat=100&ccb=1-7&_nc_sid=db1b99&_nc_ohc=LAOh1uILzO8AX8iGFfQ&_nc_ht=scontent.fhan20-1.fna&oh=00_AfAcCQrZJ69GaxkqyF-T7EBAAosFeLLwghV1lhN0NlmgOg&oe=659208FD',
            name: 'Văn Hùng',
            same_friends: 5,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-1/183502746_1349207945453542_8602506344653869175_n.jpg?stp=dst-jpg_p130x130&_nc_cat=100&ccb=1-7&_nc_sid=db1b99&_nc_ohc=LAOh1uILzO8AX8iGFfQ&_nc_ht=scontent.fhan20-1.fna&oh=00_AfAcCQrZJ69GaxkqyF-T7EBAAosFeLLwghV1lhN0NlmgOg&oe=659208FD',
            name: 'Thanh Huy',
            same_friends: 5,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-1/183502746_1349207945453542_8602506344653869175_n.jpg?stp=dst-jpg_p130x130&_nc_cat=100&ccb=1-7&_nc_sid=db1b99&_nc_ohc=LAOh1uILzO8AX8iGFfQ&_nc_ht=scontent.fhan20-1.fna&oh=00_AfAcCQrZJ69GaxkqyF-T7EBAAosFeLLwghV1lhN0NlmgOg&oe=659208FD',
            name: 'Tùng Lâm',
            same_friends: 5,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-1/183502746_1349207945453542_8602506344653869175_n.jpg?stp=dst-jpg_p130x130&_nc_cat=100&ccb=1-7&_nc_sid=db1b99&_nc_ohc=LAOh1uILzO8AX8iGFfQ&_nc_ht=scontent.fhan20-1.fna&oh=00_AfAcCQrZJ69GaxkqyF-T7EBAAosFeLLwghV1lhN0NlmgOg&oe=659208FD',
            name: 'Tô Tường',
            same_friends: 5,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-1/183502746_1349207945453542_8602506344653869175_n.jpg?stp=dst-jpg_p130x130&_nc_cat=100&ccb=1-7&_nc_sid=db1b99&_nc_ohc=LAOh1uILzO8AX8iGFfQ&_nc_ht=scontent.fhan20-1.fna&oh=00_AfAcCQrZJ69GaxkqyF-T7EBAAosFeLLwghV1lhN0NlmgOg&oe=659208FD',
            name: 'Tuấn Bùi',
            same_friends: 5,
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-1/183502746_1349207945453542_8602506344653869175_n.jpg?stp=dst-jpg_p130x130&_nc_cat=100&ccb=1-7&_nc_sid=db1b99&_nc_ohc=LAOh1uILzO8AX8iGFfQ&_nc_ht=scontent.fhan20-1.fna&oh=00_AfAcCQrZJ69GaxkqyF-T7EBAAosFeLLwghV1lhN0NlmgOg&oe=659208FD',
            name: 'Hiếu',
            same_friends: 5,
        },
    ];

    return (
            <View style={styles.container}>
                <Header />
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={requests}
                        showsVerticalScrollIndicator={false} //ẩn thanh cuộn dọc
                        ListHeaderComponent={<Title />}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <View style={[styles.itemNoti]}>
                                    <View style={[styles.flexRow]}>
                                        {/* avatar */}
                                        <View>
                                            <Image
                                                style={styles.accountImage}
                                                source={{
                                                    uri: item.image,
                                                }}
                                            ></Image>
                                        </View>
                                        <View style={{ flex: 1, marginLeft: 8 }}>
                                            <View>
                                                <Text style={styles.name}>{item.name}</Text>
                                                <Text>{`${item.same_friends} bạn chung`}</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginLeft: 8 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    toggleOption(item.image, item.name);
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
