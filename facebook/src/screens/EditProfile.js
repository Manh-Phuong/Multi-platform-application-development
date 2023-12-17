import { useNavigation, useRoute } from '@react-navigation/native';
import {
    faPen,
    faSearch,
    faArrowLeft,
    faCaretDown,
    faExclamationCircle,
    faCircleExclamation,
    faToggleOff,
    faGraduationCap,
    faFutbolBall,
    faUser,
    faUserAlt,
    faUserShield,
    faUserEdit,
    faUserPen,
    faLocationDot,
    faHouse,
    faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useRef, useState } from 'react';
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
import * as ProfileServices from '../services/ProfileServices';
import Autolink from 'react-native-autolink';

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { props } = route.params || '';

    const name = useSelector((state) => state.profile.name);
    const avatar = useSelector((state) => state.profile.avatar);
    const imageBackground = useSelector((state) => state.profile.imageBackground);
    const description = useSelector((state) => state.profile.description);
    const address = useSelector((state) => state.profile.address);
    const city = useSelector((state) => state.profile.city);
    const country = useSelector((state) => state.profile.country);
    const link = useSelector((state) => state.profile.link);
    const temp = useSelector((state) => state.profile.temp);

    const [isEnabled, setIsEnabled] = useState(false);
    const [isEditDescription, setIsEditDescription] = useState(false);
    const [isEditLink, setIsEditLink] = useState(false);
    const [inputDescription, setInputDescription] = useState(description);
    const [inputLink, setInputLink] = useState(link);

    const [isFocusedAccount, setIsFocusedAccount] = useState(false);

    const inputRef = useRef(null);

    const changeAccount = (newAccount) => {
        setInputDescription(newAccount);
    };

    const handleFocusAccount = () => {
        setIsFocusedAccount(true);
    };

    const handleBlurAccount = () => {
        setIsFocusedAccount(false);
    };

    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    const pickImageAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            allowsMultipleSelection: false,
            allowsEditing: true,
            // aspect: [4, 3],
            // quality: 1,
        });

        if (!result.canceled) {
            const mediaType = result.assets[0].type;

            if (mediaType === 'image') {
                const selectedImage = result.assets[0].uri;
                dispatch(setStoreTemp(selectedImage));
                navigation.navigate('PreviewImage', { props: 'ImageAvatar' });
            }
        }
    };

    const pickImageBackground = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            allowsMultipleSelection: false,
            allowsEditing: true,
            // aspect: [4, 3],
            // quality: 1,
        });

        if (!result.canceled) {
            const mediaType = result.assets[0].type;

            if (mediaType === 'image') {
                const selectedImage = result.assets[0].uri;
                dispatch(setStoreTemp(selectedImage));
                navigation.navigate('PreviewImage', { props: 'ImageBackground' });
            }
        }
    };

    const handleSaveDescription = async () => {
        setIsEditDescription(false);
        dispatch(setStoreDescription(inputDescription));

        try {
            const formData = new FormData();
            formData.append('description', inputDescription);
            const result = await ProfileServices.setUserInfo(formData);
        } catch (error) {
            console.log('fetchApi EditProfile ProfileServices setUserInfo' + error);
        }
    };

    const handleSaveLink = async () => {
        setIsEditLink(false);
        dispatch(setStoreLink(inputLink));

        try {
            const formData = new FormData();
            formData.append('link', inputLink);
            const result = await ProfileServices.setUserInfo(formData);
        } catch (error) {
            console.log('fetchApi EditProfile ProfileServices setUserInfo' + error);
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
                    borderBottomWidth: 0.2,
                    borderBottomColor: '#ddd',
                    height: 50,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: '500', marginRight: 12 }}>Chỉnh sửa trang cá nhân</Text>
                </View>
            </View>
            <ScrollView style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}></View>
                <View style={{ marginHorizontal: 16 }}>
                    <View>
                        <View style={styles.miniHeader}>
                            <Text style={styles.textLeft}>Ảnh đại diện</Text>
                            <TouchableOpacity onPress={pickImageAvatar}>
                                {avatar == '' ? (
                                    <Text style={styles.textRight}>Thêm</Text>
                                ) : (
                                    <Text style={styles.textRight}>Chỉnh sửa</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.avatar}>
                            <TouchableOpacity>
                                <Image
                                    style={styles.menuImg}
                                    source={{
                                        uri: avatar,
                                    }}
                                ></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <View style={styles.horizontalView}></View>
                    </View>
                    <View>
                        <View style={styles.miniHeader}>
                            <Text style={styles.textLeft}>Avatar</Text>
                            <TouchableOpacity>
                                <Text style={styles.textRight}>Chỉnh sửa</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.avatar}>
                            <TouchableOpacity>
                                <Image
                                    style={[styles.menuImg, (style = { marginTop: 50 })]}
                                    source={require('../assets/images/avatar-carton.png')}
                                ></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>Hiển thị trên trang cá nhân </Text>
                            <TouchableOpacity>
                                <FontAwesomeIcon icon={faExclamationCircle} color="#696969"></FontAwesomeIcon>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, opacity: 0.8, width: withScreen * 0.75 }}>
                                Avatar động hiển thị khi bạn vuột qua ảnh đại diện của mình.{' '}
                            </Text>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                                style={styles.switchStyle}
                            />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <View style={styles.horizontalView}></View>
                    </View>
                    <View>
                        <View style={styles.miniHeader}>
                            <Text style={styles.textLeft}>Ảnh bìa</Text>
                            <TouchableOpacity onPress={pickImageBackground}>
                                {imageBackground == '' ? (
                                    <Text style={styles.textRight}>Thêm</Text>
                                ) : (
                                    <Text style={styles.textRight}>Chỉnh sửa</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 20, height: 230 }}>
                            <TouchableOpacity>
                                <Image
                                    style={{ height: 230, width: 'auto', borderRadius: 8 }}
                                    source={{
                                        uri: imageBackground,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <View style={styles.horizontalView}></View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.miniHeader}>
                            <Text style={styles.textLeft}>Tiểu sử</Text>

                            {isEditDescription ? (
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={handleSaveDescription}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: '500',
                                                color: '#376cdb',
                                                paddingVertical: 4,
                                                paddingHorizontal: 8,
                                                backgroundColor: '#eee',
                                                borderRadius: 6,
                                            }}
                                        >
                                            Lưu
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setIsEditDescription(false);
                                            dispatch(setStoreDescription(''));
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: '500',
                                                color: '#fe2c55',
                                                paddingVertical: 4,
                                                paddingHorizontal: 8,
                                                backgroundColor: '#eee',
                                                marginLeft: 12,
                                                borderRadius: 6,
                                            }}
                                        >
                                            Xóa
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity onPress={() => setIsEditDescription(true)}>
                                    {description == '' ? (
                                        <Text style={styles.textRight}>Thêm</Text>
                                    ) : (
                                        <Text style={styles.textRight}>Chỉnh sửa</Text>
                                    )}
                                </TouchableOpacity>
                            )}
                        </View>

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                marginTop: 12,
                                marginBottom: 12,
                            }}
                        >
                            {isEditDescription ? (
                                <TextInput
                                    style={{
                                        fontSize: 16,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 8,
                                        paddingHorizontal: 10,
                                        paddingVertical: 8,
                                        width: withScreen - 32,
                                    }}
                                    ref={inputRef}
                                    value={inputDescription}
                                    onChangeText={changeAccount}
                                    onFocus={handleFocusAccount}
                                    onBlur={handleBlurAccount}
                                    placeholder="Mô tả bản thân..."
                                    placeholderTextColor="#888"
                                ></TextInput>
                            ) : (
                                <>
                                    <View>
                                        {description == '' ? (
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 8,
                                                    width: withScreen - 32,
                                                    textAlign: 'center',
                                                }}
                                            >
                                                Mô tả bản thân...
                                            </Text>
                                        ) : (
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 8,
                                                    width: withScreen - 32,
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {description}
                                            </Text>
                                        )}
                                    </View>
                                    <View style={styles.horizontalView}></View>
                                </>
                            )}
                        </View>
                    </View>
                    <View>
                        <View style={styles.miniHeader}>
                            <Text style={styles.textLeft}>Chi tiết</Text>

                            <TouchableOpacity onPress={() => navigation.navigate('EditDetail')}>
                                {address == '' && city == '' && country == '' ? (
                                    <Text style={styles.textRight}>Thêm</Text>
                                ) : (
                                    <Text style={styles.textRight}>Chỉnh sửa</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', display: 'flex', marginTop: 10, width: '90%' }}
                            >
                                <FontAwesomeIcon icon={faHouse} size={20} color="#666" style={{ marginRight: 10 }} />
                                <Text>
                                    <Text style={{ color: '#000', fontSize: 16, fontWeight: '300' }}>Địa chỉ </Text>
                                    <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>{address} </Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', display: 'flex', marginTop: 10, width: '90%' }}
                            >
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    size={20}
                                    color="#666"
                                    style={{ marginRight: 10 }}
                                />
                                <Text>
                                    <Text style={{ color: '#000', fontSize: 16, fontWeight: '300' }}>Sống tại </Text>
                                    <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', marginLeft: 16 }}>
                                        {city}
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', display: 'flex', marginTop: 10, width: '90%' }}
                            >
                                <FontAwesomeIcon icon={faGlobe} size={20} color="#666" style={{ marginRight: 10 }} />
                                <Text>
                                    <Text style={{ color: '#000', fontSize: 16, fontWeight: '300' }}>Ở </Text>
                                    <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>{country}</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <View style={styles.horizontalView}></View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.miniHeader}>
                            <Text style={styles.textLeft}>Sở thích</Text>
                            <TouchableOpacity>
                                <Text style={styles.textRight}>Chỉnh sửa</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
                            <TouchableOpacity style={styles.favarite}>
                                <Text style={styles.buttonText}>⚽ Bóng đá</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.favarite}>
                                <Text style={styles.buttonText}>🎧 Nghe nhạc</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.favarite}>
                                <Text style={styles.buttonText}>🌏 Du lịch</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.favarite}>
                                <Text style={styles.buttonText}>🍕 Ăn uống</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <View style={styles.horizontalView}></View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.miniHeader}>
                            <Text style={styles.textLeft}>Liên kết</Text>
                            {isEditLink ? (
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={handleSaveLink}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: '500',
                                                color: '#376cdb',
                                                paddingVertical: 4,
                                                paddingHorizontal: 8,
                                                backgroundColor: '#eee',
                                                borderRadius: 6,
                                            }}
                                        >
                                            Lưu
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setIsEditLink(false);
                                            dispatch(setStoreLink(''));
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: '500',
                                                color: '#fe2c55',
                                                paddingVertical: 4,
                                                paddingHorizontal: 8,
                                                backgroundColor: '#eee',
                                                marginLeft: 12,
                                                borderRadius: 6,
                                            }}
                                        >
                                            Xóa
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity onPress={() => setIsEditLink(true)}>
                                    {link == '' ? (
                                        <Text style={styles.textRight}>Thêm</Text>
                                    ) : (
                                        <Text style={styles.textRight}>Chỉnh sửa</Text>
                                    )}
                                </TouchableOpacity>
                            )}
                        </View>

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                marginTop: 12,
                                marginBottom: 12,
                            }}
                        >
                            {isEditLink ? (
                                <TextInput
                                    style={{
                                        fontSize: 16,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 8,
                                        paddingHorizontal: 10,
                                        paddingVertical: 8,
                                        width: withScreen - 32,
                                    }}
                                    value={inputLink}
                                    onChangeText={(text) => setInputLink(text)}
                                    placeholder="Liên kết tài khoản..."
                                    placeholderTextColor="#888"
                                ></TextInput>
                            ) : (
                                <>
                                    <View>
                                        {link == '' ? (
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 8,
                                                    width: withScreen - 32,
                                                    textAlign: 'center',
                                                }}
                                            >
                                                Liên kết tài khoản...
                                            </Text>
                                        ) : (
                                            <Autolink
                                                text={link}
                                                linkStyle={{
                                                    fontSize: 16,
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 8,
                                                    width: withScreen - 32,
                                                    textAlign: 'center',
                                                    textDecorationLine: 'underline',
                                                }}
                                                linkText={(url, type, props, children, urlHref) => {
                                                    if (type === 'url') {
                                                        return (
                                                            <Text
                                                                {...props}
                                                                onPress={() => Linking.openURL(url)}
                                                                style={{
                                                                    textDecorationLine: 'underline',
                                                                }}
                                                            >
                                                                {children}
                                                            </Text>
                                                        );
                                                    } else {
                                                        return (
                                                            <Text {...props} style={{ fontSize: 16 }}>
                                                                {children}
                                                            </Text>
                                                        );
                                                    }
                                                }}
                                            />
                                        )}
                                    </View>
                                </>
                            )}
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <View style={styles.horizontalView}></View>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#ecf4ff',
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                width: 340,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 40,
                                flexDirection: 'row',
                            }}
                        >
                            <FontAwesomeIcon icon={faUserPen} color="#006fd1" size={20}></FontAwesomeIcon>
                            <Text style={{ color: '#006fd1', fontSize: 16, fontWeight: '700' }}>
                                {' '}
                                Chỉnh sửa thông tin giới thiệu
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 100 }}></View>
                </View>
            </ScrollView>
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
    horizontalView: {
        marginVertical: 14,
        width: withScreen - 32,
        height: 1,
        backgroundColor: 'black',
        opacity: 0.1,
    },
    miniHeader: {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
    },
    textLeft: {
        fontSize: 20,
        fontWeight: '700',
    },
    textRight: {
        fontSize: 16,
        fontWeight: '500',
        color: '#376cdb',
        paddingTop: 5,
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    switchStyle: {
        marginLeft: 10,
    },
    favarite: {
        flexDirection: 'row',
        display: 'flex',
        marginTop: 10,
        marginLeft: 5,
        backgroundColor: '#e2e4eb',
        // width: 110,
        // height: 40,
        paddingHorizontal: 4,
        paddingVertical: 8,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        marginHorizontal: 8,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default EditProfile;
