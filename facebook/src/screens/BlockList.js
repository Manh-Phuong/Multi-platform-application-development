import { useNavigation, useRoute } from '@react-navigation/native';
import {
    faArrowLeft,
    faExclamationCircle,
    faUserPen,
    faLocationDot,
    faHouse,
    faGlobe,
    faPen,
    faClockRotateLeft,
    faBars,
    faList,
    faMagnifyingGlass,
    faPhone,
    faVideo,
    faUserGroup,
    faUserXmark,
    faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Switch,
    TextInput,
    Alert,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { width } from '@fortawesome/free-solid-svg-icons/faSquareCheck';
import * as ImagePicker from 'expo-image-picker';
import {
    setStoreName,
    setStoreAvatar,
    setStoreImageBackground,
    setStoreDescription,
    setStoreAddress,
    setStoreCity,
    setStoreCountry,
    setStoreLink,
    setStoreTemp,
} from '../feature/profile';
import { useDispatch, useSelector } from 'react-redux';
import * as BlockServices from '../services/BlockServices';
import Autolink from 'react-native-autolink';
import { faBookmark, faEye, faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { setStoreListBlock } from '../feature/block';

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

const BlockList = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    // const [listBlock, setListBlock] = useState([]);
    const listBlock = useSelector((state) => state.block.listBlock);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await BlockServices.getListBlock({
                    index: '0',
                    count: '999',
                });

                console.log(result.data.data);

                dispatch(setStoreListBlock(result.data.data));

                // setListBlock(result.data.data);
            } catch (error) {
                console.log('fetchApi BlockList.js BlockServices getListBlock ' + error);
            }
        };
        fetchApi();
    }, []);

    const handleUnkUser = async (item) => {
        try {
            Alert.alert(
                `Bỏ chặn ${item?.name}`,
                `Bạn có chắc chắn muốn bỏ chặn ${item?.name} không?`,
                [
                    {
                        text: 'Hủy',
                        style: 'cancel',
                    },
                    {
                        text: 'Bỏ chặn',
                        onPress: async () => {
                            try {
                                const result = await BlockServices.setUnBlockUser({ user_id: item?.id });
                                // yourArray.filter(item => item.id !== 11);
                                dispatch(setStoreListBlock(listBlock.filter((it) => it.id !== item?.id)));
                                console.log(result.data);
                            } catch (error) {
                                console.log('handleBlockUser BlockList.js BlockServices setUnBlockUser 1', error);
                            }
                        },
                    },
                ],
                { cancelable: false },
            );
        } catch (error) {
            console.log('handleBlockUser BlockList.js BlockServices setUnBlockUser 2', error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fefefe', height: '100%' }}>
            <View
                style={{
                    flexDirection: 'row',
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 50,
                    backgroundColor: 'fefefe',
                    borderBottomWidth: 4,
                    borderBottomColor: '#ddd',
                    height: 50,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color="black" style={{ marginLeft: 16 }} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: '500', marginRight: 12 }}>Danh sách chặn người dùng</Text>
                </View>
            </View>

            {listBlock.length == 0 && (
                <View style={{ marginTop: 100, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 12 }}>
                        Bạn chưa chặn người dùng nào.
                    </Text>
                    <Image source={require('../assets/images/folder.png')} style={{ width: 64, height: 64 }} />
                </View>
            )}

            <FlatList
                data={listBlock}
                keyExtractor={(item, index) => index}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity onPress={() => handleUnkUser(item)}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginVertical: 8,
                                    marginHorizontal: 16,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        display: 'flex',
                                        alignItems: 'center',
                                        columnGap: 16,
                                    }}
                                >
                                    <Image
                                        style={styles.wrapAvatar}
                                        source={{
                                            uri:
                                                item?.avatar ||
                                                'https://res.cloudinary.com/manhphuong/image/upload/v1702483093/default_avatar_orhez1.jpg',
                                        }}
                                    />

                                    <Text style={{ fontSize: 16, fontWeight: 600 }}>{item.name}</Text>
                                </View>
                                <View>
                                    <Text>BỎ CHẶN</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {},
    menuImg: {
        width: 140,
        height: 140,
        borderRadius: 999,
    },

    item: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingHorizontal: 16,
        height: 50,
    },

    horizontalView: {
        marginVertical: 14,
        width: withScreen - 32,
        height: 1,
        backgroundColor: 'black',
        opacity: 0.1,
    },

    wrapAvatar: {
        width: 40,
        height: 40,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BlockList;
