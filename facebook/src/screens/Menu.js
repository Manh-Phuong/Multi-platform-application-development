import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, ScrollView, Image, FlatList, TouchableOpacity,Alert,
    ActivityIndicator, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faCoins, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../services/AuthServices';

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

const Menu = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const name = useSelector((state) => state.profile.name);
    const avatar = useSelector((state) => state.profile.avatar);
    const [isLoadApi, setIsLoadApi] = useState(false);
    const data = [
        { id: '1', title: 'Video', iconLink: require('../assets/icons/videoIcon.png') },
        { id: '2', title: 'Nhóm', iconLink: require('../assets/icons/groupIcon.png') },
        { id: '3', title: 'Đã lưu', iconLink: require('../assets/icons/savedIcon.png') },
        { id: '4', title: 'Maketplace', iconLink: require('../assets/icons/marketPlaceIcon.png') },
        { id: '5', title: 'Bạn bè', iconLink: require('../assets/icons/timBanBeIcon.png') },
        { id: '6', title: 'Kỷ niệm', iconLink: require('../assets/icons/kyNiemIcon.png') },
        { id: '7', title: 'Bảng feed', iconLink: require('../assets/icons/bangFeedIcon.png') },
        { id: '8', title: ' Sự kiện', iconLink: require('../assets/icons/suKienIcon.png') },
    ];
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Menu</Text>
                <View style={styles.viewIcon}>
                    <Icon style={styles.searchIcon} name="search" size={20} color="#000" />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileDetail')}>
                        <View style={styles.menuItem}>
                            {/* <Image
          source={require("../assets/images/avatar-sample.png")}
          style={styles.menuImg}
        /> */}
                            <Image
                                style={styles.menuImg}
                                source={{
                                    uri: avatar,
                                }}
                            />
                            <Text style={{ fontSize: 16, fontWeight: 500 }}>{name}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.shortcutDivider} />
                    <View style={styles.shortcutHeader}>
                        <View style={styles.iconPlus}>
                            <Icon name="plus" size={15} color="#fff" />
                        </View>
                        <View style={styles.textIconsPlus}>
                            <Text style={{ color: '#828282', fontSize: 16, fontWeight: 500 }}>
                                Tạo trang cá nhân khác
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.textLT}>
                    <Text>Lối tắt của bạn</Text>
                </View>

                <View style={styles.wrapItem}>
                    <View style={styles.menuItemLT}>
                        {/* <Icon style={{ color: "#228CE6" }} name={item.icon} size={20} /> */}
                        <Image source={require('../assets/icons/videoIcon.png')} style={{ width: 26, height: 26 }} />
                        <Text style={styles.menuText}>Video</Text>
                    </View>
                    <View style={styles.menuItemLT}>
                        {/* <Icon style={{ color: "#228CE6" }} name={item.icon} size={20} /> */}
                        <Image source={require('../assets/icons/groupIcon.png')} style={{ width: 26, height: 26 }} />
                        <Text style={styles.menuText}>Nhóm</Text>
                    </View>
                </View>
                <View style={styles.wrapItem}>
                    <View style={styles.menuItemLT}>
                        {/* <Icon style={{ color: "#228CE6" }} name={item.icon} size={20} /> */}
                        <Image source={require('../assets/icons/savedIcon.png')} style={{ width: 26, height: 26 }} />
                        <Text style={styles.menuText}>Đã lưu</Text>
                    </View>
                    <View style={styles.menuItemLT}>
                        {/* <Icon style={{ color: "#228CE6" }} name={item.icon} size={20} /> */}
                        <Image
                            source={require('../assets/icons/marketPlaceIcon.png')}
                            style={{ width: 26, height: 26 }}
                        />
                        <Text style={styles.menuText}>Maketplace</Text>
                    </View>
                </View>
                <View style={styles.wrapItem}>
                    <View style={styles.menuItemLT}>
                        {/* <Icon style={{ color: "#228CE6" }} name={item.icon} size={20} /> */}
                        <Image source={require('../assets/icons/timBanBeIcon.png')} style={{ width: 26, height: 26 }} />
                        <Text style={styles.menuText}>Bạn bè</Text>
                    </View>
                    <View style={styles.menuItemLT}>
                        {/* <Icon style={{ color: "#228CE6" }} name={item.icon} size={20} /> */}
                        <Image source={require('../assets/icons/kyNiemIcon.png')} style={{ width: 26, height: 26 }} />
                        <Text style={styles.menuText}>Kỷ niệm</Text>
                    </View>
                </View>
                <View style={styles.wrapItem}>
                    <View style={styles.menuItemLT}>
                        {/* <Icon style={{ color: "#228CE6" }} name={item.icon} size={20} /> */}
                        <Image source={require('../assets/icons/bangFeedIcon.png')} style={{ width: 26, height: 26 }} />
                        <Text style={styles.menuText}>Bảng feed</Text>
                    </View>
                    <View style={styles.menuItemLT}>
                        {/* <Icon style={{ color: "#228CE6" }} name={item.icon} size={20} /> */}
                        <Image source={require('../assets/icons/suKienIcon.png')} style={{ width: 26, height: 26 }} />
                        <Text style={styles.menuText}>Sự kiện</Text>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    <View style={styles.menuItem}>
                        <Icon name="question" size={20} />
                        <Text style={styles.menuText}>Trợ giúp hỗ trợ</Text>
                    </View>
                    <View style={styles.shortcutDivider} />
                    <TouchableOpacity onPress={() => navigation.navigate('BlockList')}>
                        <View style={styles.menuItem}>
                            <FontAwesomeIcon icon={faUserXmark} size={24} color="black" />
                            <Text style={styles.menuText}>Danh sách chặn</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.shortcutDivider} />
                    <TouchableOpacity onPress={() => navigation.navigate('BuyCoins')}>
                        <View style={styles.menuItem}>
                            <FontAwesomeIcon icon={faCoins} size={22} color="black" />
                            <Text style={styles.menuText}>Mua xu</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.shortcutDivider} />
                    <TouchableOpacity onPress={() => navigation.navigate('SettingNotification')}>
                        <View style={styles.menuItem}>
                            <FontAwesomeIcon icon={faBell} size={22} color="black" />
                            <Text style={styles.menuText}>Cài đặt thông báo</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.shortcutDivider} />
                    <View style={styles.menuItem}>
                        <Icon name="gear" size={20} />
                        <Text style={styles.menuText}>Cài đặt quyền riêng tư</Text>
                    </View>
                    <View style={styles.shortcutDivider} />
                    <View style={styles.menuItem}>
                        <Icon name="lock" size={20} />
                        <Text style={styles.menuText}>Quyền truy cập chuyên nghiệp</Text>
                    </View>
                    <View style={styles.shortcutDivider} />
                    <View style={styles.menuItem}>
                        <Icon name="sliders" size={20} />
                        <Text style={styles.menuText}>Cũng từ Meta</Text>
                    </View>
                </View>
                <View style={styles.menuContainer}>
                            <TouchableOpacity style={styles.menuItemR} onPress={handleLogout}>
                                <Image
                                    source={{
                                        uri: 'https://img.icons8.com/ios/50/000000/logout-rounded-up.png',
                                    }}
                                    style={styles.menuIcon}
                                />
                                <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </View>
            </ScrollView>
            {isLoadApi && (
                <ActivityIndicator
                    size="large"
                    style={{ position: 'absolute', top: '50%', left: '44%' }}
                ></ActivityIndicator>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        backgroundColor: '#f3f2f7',
    },
    header: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    headerText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 28,
    },
    menuContainer: {
        padding: 10,
        marginTop: 10,
        marginRight: 15,
        marginLeft: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    menuImg: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 999,
    },
    menuIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    shortcutDivider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 10,
    },
    shortcutHeader: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 5,
        color: '#828282',
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewIcon: {
        borderRadius: 999,
        padding: 8,
        marginTop: 14,
        marginRight: 6,
        backgroundColor: '#CFCFCF',
    },
    iconPlus: {
        marginLeft: 10,
        borderRadius: 999,
        backgroundColor: '#696969',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textIconsPlus: {
        marginLeft: 10,
    },
    textLT: {
        marginLeft: 16,
        marginTop: 15,
        fontSize: 16,
        fontWeight: 800,
    },
    flatList: {
        marginLeft: 15,
        marginRight: 5,
    },
    menuItemLT: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        padding: 20,
        // marginRight: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        width: withScreen * 0.5 - 24,
    },
    wrapItem: {
        flexDirection: 'row',
        marginHorizontal: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuIcon: {
        width: 20,
        height: 20,
    },
    menuText: {
        marginLeft: 10,
    },
    menuItemR: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
});

export default Menu;
