import React, { useState, useRef, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

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
    Animated,
    Easing,
    BackHandler,
    Switch,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faCircleMinus, faPlus, faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faBell, faImage } from '@fortawesome/free-regular-svg-icons';
import {
    SendIcon,
    MessageCallIcon,
    MessageVideoCallIcon,
    MessageNoteIcon,
    MessageEmojiIcon,
    MessageLikeIcon,
} from '../assets/icons';

import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import Modal from 'react-native-modal';
import Hyperlink from 'react-native-hyperlink';
import Autolink from 'react-native-autolink';
import call from 'react-native-phone-call';

// import EmojiPicker from "emoji-picker-react";

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

const emojis = [
    { label: '😊', emoji: '😊' },
    { label: '🎉', emoji: '🎉' },
];

const data = [
    {
        id: '1',
        name: 'Samsung',
        avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/369910721_10160974400856815_2716180799949117069_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=CcXwFrZErvQAX_Yp-Xt&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfDx4w4M8XVDrGAsp3dkQyjJ_mHy4wdsEVlMhOgYWQ3KQg&oe=653D275E',
    },
    {
        id: '2',
        name: 'XMEN - For Boss',
        avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/358681064_279532781395858_6541355092957352746_n.png?stp=cp0_dst-png_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kV-SiG8f4OMAX_O3YIG&_nc_oc=AQkmR5EOt0tYta1-jW3qZK8Tdtl-mKXrOyxfq9TsdA4TIk2Rd0BZ2gebff6-sGCnftpbqAOEdPnTg4DerXWYApN3&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfAK_g3aTwWZUasEUQR0sWnh4rTCCj128MKzLRV8ZjHQFQ&oe=653C9C31',
    },
    {
        id: '3',
        name: 'Recent',
        avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/309658071_134569009335886_1161259950930816405_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=MaK2p23PPr0AX8RKYbG&_nc_ht=scontent.fhan15-1.fna&oh=00_AfCERp7xiSlMLkrQ3eRjYyzThfMMHBaOZqodsAy2Y11OVg&oe=653D33B7',
    },
    {
        id: '4',
        name: 'Study With Me',
        avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/241357309_106468151792976_3114688578357951904_n.jpg?stp=c80.0.320.320a_dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=yOpqaii7WM8AX_q0XQd&_nc_ht=scontent.fhan15-1.fna&oh=00_AfCrtyqfnW7f4byf6dmX8D7Vkndr8IOnyP9eC_SWPqYihQ&oe=653D5ED8',
    },
    {
        id: '5',
        name: 'Kiến Trúc Việt - Thiết Kế Thi Công Trọn Gói',
        avatar: 'https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/305406546_1118571769035664_2586701446268501879_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=jXQa653iGm4AX-wxdnw&_nc_ht=scontent.fhan15-2.fna&oh=00_AfDCcCy-I1tMYiIl2B5Dy4tN6xaBmNLT_fR6fIqqgMuFjw&oe=653E1025',
    },
    {
        id: '6',
        name: 'Một chút decor',
        avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/329991810_565594582204694_5571908352438977267_n.jpg?stp=c53.0.320.320a_dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=2XIpav4JB7cAX8glJNM&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDzr56Qev1G0szwS0CvdqveLJcrhvm7Ky0Lp8mcbrQkAQ&oe=653D9A88',
    },
    {
        id: '7',
        name: 'Troll Cả Showbiz',
        avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/380547481_740120898129984_7583509023442880520_n.jpg?stp=dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=0f_3pflO6kYAX_hONK1&_nc_ht=scontent.fhan15-1.fna&oh=00_AfAMGzDRvDgoIF6O5GVqzizIQbTlX-Piws7MRYEzgo87Sg&oe=653D0CBB',
    },
    {
        id: '8',
        name: 'Anh Tùng Design - Kiến Trúc Nội Thất Thông Minh',
        avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/371098588_793859796077879_2506753863383987577_n.jpg?stp=dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_OAfq_YCLewAX-9aKgS&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDGvpwdGM9KrOLfQQfoiBFXQ422MBkNxNK2yvxF2CMjBQ&oe=653CE45D',
    },
    {
        id: '9',
        name: 'Trương Toàn - IPHONE SÓC TRĂNG',
        avatar: 'https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/377779680_784875696987100_6321804957547872809_n.jpg?stp=cp6_dst-jpg_p60x60&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3NB_RallAboAX-QUWdy&_nc_ht=scontent.fhan15-2.fna&oh=00_AfC913AkTF8p-abQK55X1XlARieUbdIZWT99IgtGbOkHXg&oe=653E76AE',
    },

    {
        id: '10',
        name: 'Đà Lạt Review Tất Tần Tật',
        avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/300433472_407878474778564_7824663035530571659_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=XGTjPsui3CUAX8AgEHn&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDUAyxFwrw8aDEZBLdqPmrfz1_EaGdDPFu3GWZum2cB_Q&oe=653D5E63',
    },
];

const ActionMessage = ({ user }) => {
    const navigation = useNavigation();

    return (
        <View>
            <View
                style={{
                    width: withScreen,
                    display: 'flex',
                    justifyContent: 'center',
                    height: withScreen * 0.35,
                    //   backgroundColor: "#ccc",
                    alignItems: 'center',
                }}
            >
                <Image
                    style={styles.wrapAvatar}
                    source={{
                        uri: 'https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg',
                    }}
                />
                <Text style={{ marginTop: 8, fontSize: 18, fontWeight: '600' }}>{user.name}</Text>
            </View>
        </View>
    );
};

const ActiveMessage = ({ detailMessage }) => {
    const navigation = useNavigation();
    const handlePhonePress = (phone) => {
        const args = {
            number: phone,
            prompt: true,
        };
        call(args).catch(console.error);
    };

    return (
        <View style={{ marginTop: 8 }}>
            <FlatList
                data={detailMessage}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10, paddingTop: 60 }}
                inverted={true}
                renderItem={({ item }) => {
                    if (item.status === 'send') {
                        return (
                            <View
                                style={{
                                    paddingLeft: 14,
                                    paddingRight: 14,
                                    paddingTop: 8,
                                    paddingBottom: 8,
                                    backgroundColor: '#0084ff',
                                    maxWidth: withScreen * 0.8,
                                    alignSelf: 'flex-end',
                                    borderRadius: 20,
                                    marginRight: 16,
                                    marginBottom: 8,
                                }}
                            >
                                {/* <Text style={{ color: '#ffffff', fontSize: 16 }}>{item.content}</Text> */}
                                <Text style={{ color: '#ffffff', fontSize: 16 }}>
                                    <Autolink
                                        text={item.content}
                                        linkStyle={{ color: '#fff', fontSize: 16, textDecorationLine: 'underline' }}
                                        linkText={(url, type, props, children, urlHref) => {
                                            if (type === 'phone') {
                                                return (
                                                    <Text
                                                        {...props}
                                                        onPress={() => handlePhonePress(url)}
                                                        style={{ color: '#fff', textDecorationLine: 'underline' }}
                                                    >
                                                        {children}
                                                    </Text>
                                                );
                                            } else if (type === 'url') {
                                                return (
                                                    <Text
                                                        {...props}
                                                        onPress={() => Linking.openURL(url)}
                                                        style={{ color: '#fff', textDecorationLine: 'underline' }}
                                                    >
                                                        {children}
                                                    </Text>
                                                );
                                            } else {
                                                return (
                                                    <Text {...props} style={{ color: '#fff', fontSize: 16 }}>
                                                        {children}
                                                    </Text>
                                                );
                                            }
                                        }}
                                    />
                                </Text>
                            </View>
                        );
                    } else {
                        return (
                            <View
                                style={{
                                    paddingLeft: 14,
                                    paddingRight: 14,
                                    paddingTop: 8,
                                    paddingBottom: 8,
                                    backgroundColor: '#f0f0f0',
                                    maxWidth: withScreen * 0.8,
                                    alignSelf: 'flex-start',
                                    borderRadius: 20,
                                    marginLeft: 8,
                                    marginBottom: 8,
                                }}
                            >
                                {/* <Text style={{ color: '#000000', fontSize: 16 }}>{item.content}</Text> */}
                                <Text style={{ color: '#000000', fontSize: 16 }}>
                                    <Autolink
                                        text={item.content}
                                        linkStyle={{ color: '#000000', fontSize: 16, textDecorationLine: 'underline' }}
                                        linkText={(url, type, props, children, urlHref) => {
                                            if (type === 'phone') {
                                                return (
                                                    <Text
                                                        {...props}
                                                        onPress={() => handlePhonePress(url)}
                                                        style={{ color: '#000000', textDecorationLine: 'underline' }}
                                                    >
                                                        {children}
                                                    </Text>
                                                );
                                            } else if (type === 'url') {
                                                return (
                                                    <Text
                                                        {...props}
                                                        onPress={() => Linking.openURL(url)}
                                                        style={{ color: '#000000', textDecorationLine: 'underline' }}
                                                    >
                                                        {children}
                                                    </Text>
                                                );
                                            } else {
                                                return (
                                                    <Text {...props} style={{ color: '#000000', fontSize: 16 }}>
                                                        {children}
                                                    </Text>
                                                );
                                            }
                                        }}
                                    />
                                </Text>
                            </View>
                        );
                    }
                }}
            />
        </View>
    );
};

export default function MessagePrimary() {
    const navigation = useNavigation();
    const route = useRoute();
    const { waitingParam } = route.params || { waitingParam: false };
    const [isModalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState({
        name: 'Mạnh Phương',
    });
    const [isEnabled, setIsEnabled] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [isSelect, setIsSelect] = useState(false);
    const searchInputRef = useRef(null);
    const [isFocusedSearch, setIsFocusedSearch] = useState(true);
    const [search, setSearch] = useState('');
    const [listSearch, setListSearch] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [messageContent, setMessageContent] = useState('');
    // const reversedData = [...detailMessage.data].reverse();
    const [detailMessage, setDetailMessage] = useState({
        receiver: 'Mạnh Phương',
        data: [
            { content: 'Chào em', status: 'send' },
            { content: 'Chào anh', status: 'receive' },
            { content: 'Em tên gì', status: 'send' },
            { content: 'Em tên Phương', status: 'receive' },
            { content: 'Ừ chào em', status: 'send' },
            { content: 'Ừ chào anh', status: 'receive' },
            { content: 'À em cho anh hỏi', status: 'send' },
            { content: 'Sao thế anh', status: 'receive' },
            {
                content: `Khi nhấn vào nút ba chấm (dọc) sẽ thấy các tùy chọn. Chỉ giữ tùy chọn “Xóa cuộc trò chuyện”
      `,
                status: 'send',
            },
            { content: 'Là sao anh https://youtube.com   số điện thoại 0999999999', status: 'receive' },
            {
                content: `Khi nhấn vào nút “Trang cá nhân” sẽ có giao diện như hình bên trái
      Dưới ảnh đại diện chỉ giữ lại nút “Nhắn tin”   https://www.npmjs.com/package/react-native-phone-call   và 0123456789
      Giữ lại mục “Điểm chung” biểu thị số bạn chung. Nhưng không nói rõ bạn nào chung. (Gọi API get_user_friends)
      `,
                status: 'send',
            },
        ],
    });
    const [reversedData, setReversedData] = useState([...detailMessage.data].reverse());

    const toggleModal = () => {
        setModalVisible(false);
    };

    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    const changeSearch = (newSearch) => {
        setSearch(newSearch);
    };
    const handleFocusSearch = () => {
        setIsFocusedSearch(true);
    };

    const handleBlurSearch = () => {
        setIsFocusedSearch(false);
    };

    const handleDelete = () => {
        setListSearch((prev) => {
            const newList = [...prev];
            newList.pop(); // Xóa phần tử cuối cùng
            return newList;
        });
    };

    const handleKeyPress = ({ nativeEvent }) => {
        if (nativeEvent.key === 'Backspace') {
            handleDelete();
        }
    };

    const handleSelect = async (item) => {
        setUser(item);
        setIsSelect(true);
        await setListSearch((prev) => [...prev, item.name]);
    };

    const handleEmojiSelect = (emoji) => {
        setSelectedEmoji(emoji);
        setShowPicker(false);
    };

    const handleSendMessage = (value) => {
        if (value) {
            setDetailMessage((prev) => ({
                ...prev,
                data: [...prev.data, { content: value, status: 'send' }],
            }));

            setIsSend(true);
        } else if (messageContent.trim().length > 0) {
            setDetailMessage((prev) => ({
                ...prev,
                data: [...prev.data, { content: messageContent, status: 'send' }],
            }));
            setIsSend(true);
            setMessageContent('');
        }
    };

    useEffect(() => {
        // console.log(detailMessage);
        setReversedData([...detailMessage.data].reverse());
    }, [detailMessage]);

    useEffect(() => {
        setSearch(listSearch.join(' '));
    }, [listSearch]);

    useEffect(() => {
        if (search.length < listSearch.join(' ').length && search.length != 0) {
            handleDelete();
        }

        if (search.length == 0) {
            setIsSelect(false);
        }
    }, [search]);

    const animatedValue = useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.header,
                    isSend && {
                        width: withScreen,
                        borderBottomWidth: 0.15,
                        borderTopColor: '#e1e1e1',
                    },
                ]}
            >
                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faArrowLeft} size={24} color="black" />
                    </TouchableOpacity>
                    {/* <Text
                        style={{
                            marginLeft: 24,
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: '600',
                        }}
                    >
                        Tin nhắn mới
                    </Text> */}
                    <Image
                        style={[styles.imageAvatar, { marginLeft: 16 }]}
                        source={{
                            uri: 'https://keomoi.com/wp-content/uploads/2019/05/anh-gai-xinh-toc-ngan-de-thuong.jpg',
                        }}
                    ></Image>

                    <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={{
                            marginLeft: 12,
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: '600',
                            maxWidth: withScreen * 0.39,
                        }}
                    >
                        Mạnh Phương
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                    {!waitingParam && (
                        <>
                            <MessageCallIcon fill="#0084ff" />
                            <View style={{ marginLeft: withScreen * 0.07 }}>
                                <MessageVideoCallIcon fill="#0084ff" />
                            </View>
                        </>
                    )}

                    {waitingParam ? (
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <View style={{ marginLeft: withScreen * 0.07 }}>
                                <MessageNoteIcon fill="#0084ff" />
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => navigation.navigate('MessageRecipientInfo')}>
                            <View style={{ marginLeft: withScreen * 0.07 }}>
                                <MessageNoteIcon fill="#0084ff" />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {detailMessage.data.length > 0 ? (
                <View style={{ flex: 1 }}>
                    <ActiveMessage detailMessage={reversedData} />
                </View>
            ) : (
                <View
                    style={{
                        flex: 1,
                        position: 'relative',
                        top: heightScreen * 0.45,
                        // backgroundColor: "#ccc",
                    }}
                >
                    <ActionMessage user={user} />
                </View>
            )}

            <View>
                {showPicker && (
                    <View
                        style={{
                            position: 'absolute',
                            top: -heightScreen * 0.4,
                            flex: 1,
                            backgroundColor: '#fff',
                        }}
                    >
                        <EmojiSelector
                            category={Categories.symbols}
                            onEmojiSelected={(emoji) => setMessageContent((prev) => `${prev}${emoji}`)}
                            emojis={emojis}
                        />
                    </View>
                )}

                <View style={styles.wrapMessageInput}>
                    <View style={styles.messageInput}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhắn tin"
                            value={messageContent}
                            onChangeText={setMessageContent}
                        />
                        <TouchableOpacity onPress={() => setShowPicker((prev) => !prev)}>
                            <MessageEmojiIcon />
                        </TouchableOpacity>
                    </View>
                    {messageContent.trim().length > 0 ? (
                        <TouchableOpacity onPress={handleSendMessage}>
                            <SendIcon width="24" height="24" fill={'#0866ff'} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => {
                                handleSendMessage('👍');
                            }}
                        >
                            <MessageLikeIcon />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <Modal
                isVisible={isModalVisible}
                onSwipeComplete={toggleModal}
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <View style={{ backgroundColor: 'white', padding: 16, height: 300 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700' }}>Bạn có muốn chat không?</Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', color: '#666' }}>
                        Bạn có thể xóa cuộc trò chuyện, ngăn người này nhắn tin cho bạn hoặc cho chúng tôi biết nếu thấy
                        có gì không ổn. chúng tôi sẽ không tiết lộ với họ rằng bạn đã thực hiện những hành động này.
                    </Text>
                    <View>
                        <View style={styles.item}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginLeft: 2,
                                    width: withScreen,
                                }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: '600', color: 'red' }}>Xóa cuộc trò chuyện</Text>
                                <TouchableOpacity>
                                    <View style={[styles.wrapIcon2, { marginRight: 36 }]}>
                                        <FontAwesomeIcon icon={faTrash} size={20} color="black" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.item}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginLeft: 2,
                                    width: withScreen,
                                }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: '600' }}>Chặn</Text>
                                <TouchableOpacity>
                                    <View style={[styles.wrapIcon2, { marginRight: 36 }]}>
                                        <FontAwesomeIcon icon={faCircleMinus} size={20} color="black" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.item}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginLeft: 2,
                                    width: withScreen,
                                }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: '600' }}>Có gì đó không ổn</Text>
                                <TouchableOpacity>
                                    <View style={[styles.wrapIcon2, { marginRight: 36 }]}>
                                        <FontAwesomeIcon icon={faTriangleExclamation} size={20} color="black" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
        // paddingLeft: 8,
        // paddingRight: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: withScreen,
        padding: 8,
        height: heightScreen * 0.08,
        paddingLeft: 8,
        paddingRight: 8,
        // backgroundColor: '#ccc'
    },
    wrapAvatar: {
        width: withScreen * 0.25,
        height: withScreen * 0.25,
        borderRadius: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: withScreen - 16,
        height: heightScreen * 0.08,
        // backgroundColor: "#ccc",
    },
    wrapTextInput: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 24,
        backgroundColor: '#fff',
        height: heightScreen * 0.08,
        width: withScreen,
        borderBottomWidth: 0.15,
        borderTopColor: '#ccc',
        // shadowColor: "#000000",
        // shadowOffset: {
        //   width: 0,
        //   height: 3,
        // },
        // shadowOpacity: 0.18,
        // shadowRadius: 4.59,
        // elevation: 5,
    },
    textInput: {
        fontSize: 18,
        marginLeft: 8,
        width: withScreen * 0.7,
    },
    wrapIcon: {
        backgroundColor: '#e4e6eb',
        width: 20,
        height: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapIcon2: {
        backgroundColor: '#e4e6eb',
        width: 36,
        height: 36,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    imageMessage: {
        height: withScreen * 0.1,
        width: withScreen * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
    },
    messageItem: {
        height: withScreen * 0.16,
        width: withScreen - 16,
        marginLeft: 8,
        // backgroundColor: "#ccc",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: "center",
        marginBottom: 8,
    },
    wrapEmoji: {
        // display: "flex",
        // flexDirection: "row",
        // alignItems: "center",
        // justifyContent: "space-between",
        position: 'absolute',
        top: heightScreen * 0.4,
        // bottom: 20,
        // width: withScreen - 16,
        // flex: 1,
        backgroundColor: '#fff',
    },
    wrapMessageInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        width: withScreen,
        padding: 8,
        backgroundColor: '#fff',
    },
    messageInput: {
        borderColor: '#d0d0d0',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: '#f0f2f5',
        padding: 8,
        width: withScreen - 60,
        borderRadius: 999,
        paddingLeft: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    input: {
        height: heightScreen * 0.04,
        flex: 1,
        marginRight: 8,
    },
    imageAvatar: {
        height: withScreen * 0.11,
        width: withScreen * 0.11,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
    },
});
