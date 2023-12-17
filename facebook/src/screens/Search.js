import React, { useState, useEffect } from 'react';
import {
    Button,
    Image,
    View,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Post from '../components/Post';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { HomeIcon, VideoIcon, FriendIcon, MarketIcon, MessageIcon, SendIcon } from '../assets/icons';
import { faAngleRight, faEllipsis, faLink, faPlus, faThumbTack, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
    faBell,
    faBookmark,
    faCircleQuestion,
    faClock,
    faRectangleXmark,
    faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import { deleteHistory, getListHistory, search } from '../services/SearchServices';
import { setLoading } from '../feature/loading';
import { useDispatch, useSelector } from 'react-redux';

export default function Search() {
    const [searchInput, setSearchInput] = useState('');
    const [dataRender, setDataRender] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [dataList, setDataList] = useState([]);
    const [idSelect, setIdSelect] = useState('');
    const [isLogining, setIsLogining] = useState(true);
    const [isHasHistory, setIsHasHistory] = useState(false);

    const isLoadingApi = useSelector((state) => state.loading.isLoadingApi);

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setLoading(true));
                const res = await getListHistory({});
                dispatch(setLoading(false));
                if (res.code == 1000) {
                    if (res.data.length > 0) {
                        setDataList(res.data);
                    } else {
                        setIsHasHistory(true);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const changTextSearch = (newValue) => {
        setSearchInput(newValue);
    };
    const handlePress = async () => {
       
        setSearchInput('');
        setDataRender([]);
        setShowSearchResults(false);
        try {
            dispatch(setLoading(true));
            const res = await getListHistory({});
            dispatch(setLoading(false));
            if (res.code == 1000) {
                if (res.data.length > 0) {
                    setDataList(res.data);
                } else {
                    setIsHasHistory(true);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleSearch = async () => {
        if (searchInput.length == 0) {
            setDataRender([]);
            setShowSearchResults(false);
        } else {
            try {
                dispatch(setLoading(true));
                const res = await search({ keyword: searchInput });
                dispatch(setLoading(false));
                if (res.code == '1000') {
                    const newData = res.data.map((item) => {
                        var imageArray = null;
                        if (item?.image.length > 0) {
                            imageArray = Array.isArray(item?.image) ? item.image.map((image) => image.url) : null;
                        } else {
                            console.log('rong', item?.image);
                        }

                        return {
                            id: item?.id,
                            owner: item.author.name,
                            avatar: item.author.avatar,
                            content: item.described,
                            // image: imageArray,
                            image: null,
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
                    });

                    setDataRender(newData);
                    setShowSearchResults(true);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };
    const toggleModal = () => {
        setIsShowModal(false);
    };
    const handleSearchOnClick = async (value) => {
        setSearchInput(value);
        await handleSearch();
    };
    const handleDelete = async () => {
        const res = await deleteHistory({ search_id: idSelect, all: 0 });

        const updatedDataList = dataList.filter((item) => item.id != idSelect);
        setDataList(updatedDataList);
        setIsShowModal(false);
    };
    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                {isLoadingApi && (
                    <ActivityIndicator
                        size="large"
                        color="#0063e0"
                        style={{ position: 'absolute', top: '50%', left: '50%' }}
                    />
                )}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={styles.backIcon}
                            contentFit="cover"
                            source={require('../assets/images/vector.png')}
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.inputField}
                        value={searchInput}
                        onChangeText={changTextSearch}
                        placeholder="Tìm kiếm trên Facebook"
                        onSubmitEditing={handleSearch}
                        returnKeyType="done"
                        returnKeyLabel="Tìm"
                    ></TextInput>
                    {searchInput && (
                        <TouchableOpacity
                            style={{ position: 'absolute', bottom: 20, right: 24, zIndex: 1 }}
                            onPress={handlePress}
                        >
                            <Image
                                style={{ width: 24, height: 24 }}
                                contentFit="cover"
                                source={require('../assets/images/close-icon.png')}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                {!showSearchResults && (
                    <View>
                        <View style={styles.title}>
                            <Text style={styles.titleLeft}>Gần đây</Text>
                            <Text style={styles.titleRight} onPress={() => navigation.navigate('ActivityLog')}>
                                Chỉnh sửa
                            </Text>
                        </View>

                        {!isLoadingApi && (
                            <FlatList
                                data={dataList}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleSearchOnClick(item.keyword)}>
                                        <View style={styles.itemContainer}>
                                            <View style={styles.itemLeft}>
                                                <Image
                                                    source={require('../assets/icons/searchIcon.png')}
                                                    style={styles.avatar}
                                                />
                                                <Text style={styles.menuText}>{item.keyword}</Text>
                                            </View>
                                            <View style={styles.itemRight}>
                                                <Icon
                                                    name="ellipsis-h"
                                                    size={20}
                                                    color="black"
                                                    onPress={() => {
                                                        setIsShowModal(true);
                                                        setIdSelect(item.id);
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
                        {isHasHistory && (
                            <Text style={{ paddingLeft: 16, paddingTop: 20, fontSize: 20, fontWeight: 600 }}>
                                Không có lịch sử tìm kiếm
                            </Text>
                        )}
                    </View>
                )}
                {showSearchResults && (
                    <FlatList
                        data={dataRender}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View>
                                {/* <Post item={item} /> */}
                                {/* oncommentPress -> toggleComments */}
                                <Post item={item} />

                                <View style={styles.divLarge}></View>
                            </View>
                        )}
                    />
                )}

                <Modal
                    isVisible={isShowModal}
                    onSwipeComplete={toggleModal}
                    swipeDirection={['down']}
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            height: heightScreen * 0.25,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            paddingTop: 12,
                        }}
                    >
                        <View
                            style={{
                                height: 6,
                                width: withScreen * 0.16,
                                backgroundColor: '#ccc',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                borderRadius: 4,
                                marginBottom: 8,
                            }}
                        ></View>
                        <TouchableOpacity
                            onPress={() => {
                                handleDelete();
                            }}
                        >
                            <View style={styles.item}>
                                <View style={styles.flexRow}>
                                    <View
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 999,
                                            backgroundColor: '#ddd',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} size={22} color="black" />
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>Xóa</Text>
                                        <Text style={{ fontSize: 14, fontWeight: 400, marginLeft: 16 }}>
                                            Gỡ khỏi lịch sử tìm kiếm của bạn
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <View style={styles.flexRow}>
                                    <View
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 999,
                                            backgroundColor: '#ddd',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faThumbTack} size={20} color="black" />
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>
                                            Ghim nội dung tìm kiếm này
                                        </Text>
                                        <Text style={{ fontSize: 14, fontWeight: 400, marginLeft: 16 }}>
                                            Bạn chỉ có thể ghim 3 nội dung tìm kiếm cùng lúc.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: 100,
        // backgroundColor: ",
        paddingTop: 32,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        paddingLeft: 16,
        paddingRight: 16,
        columnGap: 12,
    },
    backIcon: {
        width: 16,
        height: 16,
    },
    inputField: {
        fontSize: 16,
        backgroundColor: '#cccccc',
        flex: 1,
        borderRadius: 30,
        height: 42,
        alignItems: 'center',
        paddingLeft: 16,
        position: 'relative',
    },
    title: {
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleLeft: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    titleRight: {
        fontSize: 18,
    },
    itemContainer: {
        height: 40,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        columnGap: 16,
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24,
        justifyContent: 'space-between',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 999,
    },
    menuText: {
        fontSize: 20,
        fontWeight: '600',
    },
    itemLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 16,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: withScreen,
        height: heightScreen * 0.08,
        // backgroundColor: "#ccc",
        padding: 8,
        paddingLeft: 16,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
