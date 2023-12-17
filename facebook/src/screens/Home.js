import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

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
    ActivityIndicator,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faStore, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faBell, faImage } from '@fortawesome/free-regular-svg-icons';
import { HomeIcon, VideoIcon, FriendIcon, MarketIcon, MessageIcon } from '../assets/icons';
import { ScrollView } from 'react-native-gesture-handler';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import Post from '../components/Post';
import Comment from '../components/Comment';
import Report from '../components/Report';
import Menu from './Menu';
import Friend from './Friend';
import Notification from './Notification';
import TabVideos from './TabVideos';
import VideoScreen from './VideoScreen';
import * as PostServices from '../services/PostServices';
import { setStoreListPost, setStoreLasIdPost } from '../feature/listPost';
import { useDispatch, useSelector } from 'react-redux';

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

const listNews = [
    {
        id: '1',
        name: 'Thu Phương',
        image: 'https://bloggiaima.com/wp-content/uploads/2023/03/hinh-anh-gai-sinh-vien-sexy-khoe-noi-y-nong-bong-bloggiaima-10-576x1024.jpg',
    },
    {
        id: '2',
        name: 'Thu Trang',
        image: 'https://kenh14cdn.com/thumb_w/660/2018/11/17/photo-1-15424548896091911165278.jpg',
    },
    {
        id: '3',
        name: 'Bảo Ngọc',
        image: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-gai-xinh-viet-nam-mac-vay-hoa.jpg',
    },
    {
        id: '4',
        name: 'Ngọc Đặng',
        image: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-trung-quoc.jpg',
    },
    {
        id: '5',
        name: 'Phương Thảo',
        image: 'https://keomoi.com/wp-content/uploads/2019/05/anh-gai-xinh-toc-ngan-de-thuong.jpg',
    },
];

const Header = () => {
    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.underNav}>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileDetail')}>
                    <Image
                        style={styles.wrapAvatar}
                        source={{
                            uri: 'https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg',
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
                    <View style={styles.youThink}>
                        <Text style={{ fontSize: 16, fontWeight: 500 }}>Bạn đang nghĩ gì?</Text>
                    </View>
                </TouchableOpacity>

                <Image
                    style={{ height: 26, width: 26, objectFit: 'cover' }}
                    source={require('../assets/icons/iconImage.png')}
                ></Image>
            </View>

            <View style={styles.divLarge}></View>

            <View>
                <ScrollView horizontal={true} style={styles.newsList} showsHorizontalScrollIndicator={false}>
                    <View style={styles.newsItem}>
                        <Image
                            style={styles.addNews}
                            source={{
                                uri: 'https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg',
                            }}
                        ></Image>
                        <View style={styles.wrapIconNews}>
                            {/* <Icon name="plus" size={24} color="white" /> */}
                            <FontAwesomeIcon icon={faPlus} size={22} color="white" />
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: heightScreen * 0.03,
                            }}
                        >
                            <Text style={{ fontWeight: 600, fontSize: 18 }}>Tạo tin</Text>
                        </View>
                    </View>

                    {listNews?.map((item) => {
                        return (
                            <View key={item.id} style={styles.newsItem}>
                                <Image
                                    style={styles.imageNews}
                                    source={{
                                        uri: item.image,
                                    }}
                                ></Image>
                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    style={{
                                        position: 'absolute',
                                        bottom: 8,
                                        left: 8,
                                        fontSize: 16,
                                        fontWeight: 600,
                                        width: withScreen * 0.26 - 8,
                                        color: 'white',
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
            <View style={styles.divLarge}></View>
        </View>
    );
};

export default function Home() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [showHeader, setShowHeader] = useState(true);
    const [lastOffset, setLastOffset] = useState(0);
    const [active, setActive] = useState({
        home: true,
        video: false,
        friend: false,
        market: false,
        notification: false,
        menu: false,
    });
    const [listPost, setListPost] = useState([]);
    const [lastId, setLastId] = useState(null);
    const listPostStore = useSelector((state) => state.listPost.listPost);
    const lasIdPost = useSelector((state) => state.listPost.lasIdPost);
    const [viewableItems, setViewableItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasData, setHasData] = useState(true);
    const flatListRef = useRef(null);

    const handleActive = (detailName) => {
        setActive((prevState) => ({
            home: false,
            video: false,
            friend: false,
            market: false,
            notification: false,
            menu: false,
            [detailName]: true,
        }));
    };

    const handleScroll = (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const isScrollingUp = currentOffset < lastOffset;
        setShowHeader(isScrollingUp);
        setLastOffset(currentOffset);
    };
    const animatedValue = useRef(new Animated.Value(0)).current;

    // Hung start
    const [showComments, setShowComments] = useState(false);
    const toggleComments = () => {
        // setShowComments(!showComments);
        if (showComments) {
            // Ẩn giao diện comment với animation khi người dùng nhấn "Hide Comments"
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start(() => {
                setShowComments(false);
            });
        } else {
            setShowComments(true);
            // Hiển thị giao diện comment với animation khi người dùng nhấn "View Comments"
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    // Quay lại -> ẩn comment
    useEffect(() => {
        const handleBackPress = () => {
            if (showComments) {
                // Nếu giao diện comment đang hiển thị, ẩn nó và ngăn sự kiện "Quay lại" mặc định
                // setShowComments(false);
                toggleComments();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            backHandler.remove();
        };
    }, [showComments]);
    //Nháy vào comment thì đổi background
    const colorBackGround = showComments ? styles.colorChange : styles.colorwhite;
    // Hung end
    //Tuong
    const [showReport, setShowReport] = useState(false);
    const toggleReport = () => {
        setShowReport(!showReport);
    };
    //Tuong start
    useEffect(() => {
        const handleBackPress = () => {
            if (showReport) {
                // Nếu giao diện report đang hiển thị, ẩn nó và ngăn sự kiện "Quay lại" mặc định
                setShowReport(false);
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            backHandler.remove();
        };
    }, [showReport]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await PostServices.getListPost({
                user_id: null,
                in_campaign: '1',
                campaign_id: '1',
                latitude: '1.0',
                longitude: '1.0',
                last_id: lastId,
                index: '0',
                count: '10',
            });

            setLastId(response.data.data.last_id);

            // console.log(response.data.data.post);
            setListPost((prevData) => [
                ...prevData,
                ...(response.data.data.post?.map((item) => {
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
                }) || []),
                ,
            ]);

            setHasData(response.data.data.post?.length > 0);

            // dispatch(
            //     setStoreListPost((prevData) => [
            //         ...prevData,
            //         ...response.data.data.post?.map((item) => {
            //             return {
            //                 id: item?.id,
            //                 owner: item.author.name,
            //                 avatar: item.author.avatar,
            //                 content: item.described,
            //                 images: item?.image,
            //                 video: item?.video?.url,
            //                 created: item?.created,
            //                 feel: item?.feel,
            //                 comment_mark: item?.comment_mark,
            //                 is_felt: item?.is_felt,
            //                 is_blocked: item?.is_blocked,
            //                 can_edit: item?.can_edit,
            //                 banned: item?.banned,
            //                 state: item?.state,
            //             };
            //         }),
            //     ]),
            // );
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    const handleEndReached = () => {
        if (!loading && hasData) {
            fetchData();
        }
    };

    // useEffect(() => {
    //     const fetchApi = async () => {
    //         try {
    //             const result = await PostServices.getListPost({
    //                 user_id: null,
    //                 in_campaign: '1',
    //                 campaign_id: '1',
    //                 latitude: '1.0',
    //                 longitude: '1.0',
    //                 last_id: lastId,
    //                 index: '0',
    //                 count: '10',
    //             });

    //             console.log('1                ', result.data.data.last_id);
    //             // setPostIdBetween(result.data.data.post[7].id);
    //             setLastId(result.data.data.last_id);
    //             console.log('lastId', result.data.data.last_id);
    //             dispatch(setStoreLasIdPost(result.data.data.last_id));

    //             dispatch(
    //                 setStoreListPost(
    //                     result.data.data.post?.map((item) => {
    //                         return {
    //                             id: item?.id || 0,
    //                             owner: item.author.name,
    //                             avatar: item.author.avatar,
    //                             content: item.described,
    //                             images: item?.image,
    //                             video: item?.video?.url,
    //                             created: item?.created,
    //                             feel: item?.feel,
    //                             comment_mark: item?.comment_mark,
    //                             is_felt: item?.is_felt,
    //                             is_blocked: item?.is_blocked,
    //                             can_edit: item?.can_edit,
    //                             banned: item?.banned,
    //                             state: item?.state,
    //                         };
    //                     }),
    //                 ),
    //             );
    //         } catch (error) {
    //             console.log('fetchApi PostServices ' + error);
    //         }
    //     };
    //     fetchApi();
    // }, []);

    const renderFooter = () => {
        return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
    };

    return (
        <View style={styles.container}>
            {/* <Collapsible collapsed={!showHeader}> */}
            <Collapsible collapsed={false}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.logo}>facebook</Text>
                    </View>
                    <View style={styles.rightButton}>
                        <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
                            <View style={styles.wrapIcon}>
                                <Icon name="plus" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                            <View style={styles.wrapIcon}>
                                <Icon name="search" size={22} color="black" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('MessageHome')}>
                            <View style={styles.wrapIcon}>
                                <MessageIcon width="24" height="24" fill="#000" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Collapsible>
            <View style={styles.nav}>
                <TouchableOpacity onPress={() => handleActive('home')}>
                    <View style={styles.wrapIconNav}>
                        <HomeIcon fill={active.home ? '#0866ff' : '#65676b'} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleActive('video')}>
                    <View style={styles.wrapIconNav}>
                        <VideoIcon fill={active.video ? '#0866ff' : '#65676b'} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleActive('friend')}>
                    <View style={styles.wrapIconNav}>
                        <FriendIcon fill={active.friend ? '#0866ff' : '#65676b'} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleActive('market')}>
                    <View style={styles.wrapIconNav}>
                        <MarketIcon fill={active.market ? '#0866ff' : '#65676b'} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleActive('notification')}>
                    <View style={styles.wrapIconNav}>
                        <FontAwesomeIcon icon={faBell} size={26} color={active.notification ? '#0866ff' : '#65676b'} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleActive('menu')}>
                    <View style={styles.wrapIconNav}>
                        <Icon name="bars" size={26} color={active.menu ? '#0866ff' : '#65676b'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.divSmall}>
                {active.home && (
                    <View
                        style={{
                            height: 2,
                            width: withScreen / 6 - 2,
                            backgroundColor: 'blue',
                            position: 'relative',
                            marginLeft: 8,
                        }}
                    ></View>
                )}

                {active.video && (
                    <View
                        style={{
                            height: 2,
                            width: withScreen / 6 - 2,
                            backgroundColor: 'blue',
                            position: 'relative',
                            marginLeft: 8 + withScreen / 6,
                        }}
                    ></View>
                )}

                {active.friend && (
                    <View
                        style={{
                            height: 2,
                            width: withScreen / 6 - 6,
                            backgroundColor: 'blue',
                            position: 'relative',
                            marginLeft: 6 + (2 * withScreen) / 6,
                        }}
                    ></View>
                )}

                {active.market && (
                    <View
                        style={{
                            height: 2,
                            width: withScreen / 6 - 8,
                            backgroundColor: 'blue',
                            position: 'relative',
                            marginLeft: 4 + (3 * withScreen) / 6,
                        }}
                    ></View>
                )}

                {active.notification && (
                    <View
                        style={{
                            height: 2,
                            width: withScreen / 6 - 10,
                            backgroundColor: 'blue',
                            position: 'relative',
                            marginLeft: 2 + (4 * withScreen) / 6,
                        }}
                    ></View>
                )}

                {active.menu && (
                    <View
                        style={{
                            height: 2,
                            width: withScreen / 6 - 12,
                            backgroundColor: 'blue',
                            position: 'relative',
                            marginLeft: (5 * withScreen) / 6,
                        }}
                    ></View>
                )}
            </View>

            {active.home && (
                <FlatList
                    // ref={flatListRef}
                    data={listPost}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={<Header />}
                    renderItem={({ item }) => (
                        <View>
                            {/* <Post item={item} /> */}
                            {/* oncommentPress -> toggleComments */}
                            {/* <Post item={item} onCommentPress={toggleComments} /> */}
                            <Post item={item} />

                            <View style={styles.divLarge}></View>
                        </View>
                    )}
                    // onScroll={handleScroll}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={renderFooter}
                />
            )}
            {active.friend && <Friend />}
            {active.notification && <Notification />}
            {active.menu && <Menu />}
            {active.video && <VideoScreen />}

            {/* <View style={{ width: active.home ? 'auto' : 0 }}>
                <FlatList
                    data={listPost}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={<Header />}
                    renderItem={({ item }) => (
                        <View>
                            <Post item={item} />

                            <View style={styles.divLarge}></View>
                        </View>
                    )}
                    onScroll={handleScroll}
                />
            </View>
            <View style={{ width: active.friend ? 'auto' : 0 }}>
                <Friend />
            </View>
            <View style={{ width: active.notification ? 'auto' : 0 }}>
                <Notification />
            </View>
            <View style={{ width: active.menu ? 'auto' : 0 }}>
                <Menu />
            </View>

            <View style={{ width: active.video ? 'auto' : 0 }}>
                <VideoScreen />
            </View> */}

            {/* Khi showComments = true, thì hiện <Comment/> */}
            {/* <View style={styles.viewReport}>{showReport && <Report />}</View> */}
            {/* <View style={styles.viewcomment}> */}
            {showComments && (
                <Animated.View
                    style={[
                        styles.viewcomment,
                        {
                            transform: [
                                {
                                    translateY: animatedValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [800, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    {/* hiddenComment */}
                    {/* <Comment hiddenComment={toggleComments} /> */}
                </Animated.View>
            )}
            {/* </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: withScreen - 16,
        paddingTop: 20,
        marginLeft: 8,
        marginRight: 8,
    },

    logo: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0866ff',
    },

    rightButton: {
        flexDirection: 'row',
    },

    wrapIcon: {
        backgroundColor: '#e4e6eb',
        width: 40,
        height: 40,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },

    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: withScreen - 16,
        paddingTop: 20,
        marginLeft: 8,
        marginRight: 8,
    },

    divSmall: {
        height: 2,
        width: withScreen,
        backgroundColor: '#f0f2f5',
        marginTop: 10,
        position: 'relative',
    },

    active: {
        height: 2,
        width: withScreen / 6 - 2,
        backgroundColor: 'blue',
        position: 'relative',
        marginLeft: 8,
    },

    divLarge: {
        height: 10,
        width: withScreen,
        backgroundColor: '#f0f2f5',
        // marginTop: 10,
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

    newsList: {
        height: heightScreen * 0.28,
        backgroundColor: 'white',
    },

    newsItem: {
        height: heightScreen * 0.24,
        width: withScreen * 0.26,
        backgroundColor: '#eee',
        marginTop: heightScreen * 0.02,
        borderRadius: 12,
        marginLeft: withScreen * 0.02,
        position: 'relative',
    },

    imageNews: {
        height: heightScreen * 0.24,
        width: withScreen * 0.26,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },

    addNews: {
        height: heightScreen * 0.16,
        width: withScreen * 0.26,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        position: 'relative',
    },
    wrapIconNews: {
        position: 'absolute',
        marginTop: heightScreen * 0.136,
        left: withScreen * 0.08,
        backgroundColor: '#0866ff',
        width: 38,
        height: 38,
        borderRadius: 38,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewcomment: {
        height: '98%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },

    viewReport: {
        height: '90%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
});
