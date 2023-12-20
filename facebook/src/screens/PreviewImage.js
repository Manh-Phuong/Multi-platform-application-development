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
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
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

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

export default function PreviewImage() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { props } = route.params || '';

    const name = useSelector((state) => state.profile.name);
    const avatar = useSelector((state) => state.profile.avatar);
    const imageBackground = useSelector((state) => state.profile.imageBackground);
    const description = useSelector((state) => state.profile.description);
    const temp = useSelector((state) => state.profile.temp);

    const handleSave = async () => {
        if (props == 'ImageAvatar') {
            await dispatch(setStoreAvatar(temp));
        } else if (props == 'ImageBackground') {
            await dispatch(setStoreImageBackground(temp));
        }

        try {
            const formData = new FormData();
            formData.append('username', name);
            formData.append('description', description);
            if (props == 'ImageAvatar') {
                formData.append('avatar', { uri: temp, type: 'image/jpeg', name: 'image.jpg' });
            } else if (props == 'ImageBackground') {
                formData.append('cover_image', { uri: temp, type: 'image/jpeg', name: 'image.jpg' });
            }
            const result = await ProfileServices.setUserInfo(formData);
            console.log('Preview ProfileServices setUserInfo', result.data);
        } catch (error) {
            console.log('fetchApi Preview ProfileServices setUserInfo' + error);
        }

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header]}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faArrowLeft} size={24} color="black" />
                    </TouchableOpacity>

                    {props == 'ImageAvatar' && (
                        <Text
                            style={{
                                marginLeft: 24,
                                textAlign: 'center',
                                fontSize: 18,
                                fontWeight: '600',
                            }}
                        >
                            Xem trước ảnh đại diện
                        </Text>
                    )}

                    {props == 'ImageBackground' && (
                        <Text
                            style={{
                                marginLeft: 24,
                                textAlign: 'center',
                                fontSize: 18,
                                fontWeight: '600',
                            }}
                        >
                            Xem trước ảnh đại diện
                        </Text>
                    )}
                </View>
                <TouchableOpacity onPress={handleSave}>
                    <View
                        style={{
                            backgroundColor: '#0866ff',
                            paddingHorizontal: 18,
                            paddingVertical: 8,
                            borderRadius: 6,
                        }}
                    >
                        <Text style={{ color: '#fff', fontSize: 16 }}>LƯU</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {props == 'ImageAvatar' && (
                <View>
                    <Image
                        style={styles.imagePreview}
                        source={{
                            uri: temp,
                        }}
                    />
                </View>
            )}

            {props == 'ImageBackground' && (
                <>
                    <View style={{ marginTop: 20, height: 290 }}>
                        <Image
                            style={{ height: 230, width: 'auto' }}
                            source={{
                                uri: temp,
                            }}
                        />
                        <View style={styles.overlayContainer}>
                            <Image
                                style={styles.menuImg}
                                source={{
                                    uri: avatar,
                                }}
                            ></Image>
                        </View>
                    </View>

                    <View>
                        <Text style={{ fontSize: 20, fontWeight: '800', marginLeft: 20 }}>{name}</Text>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: withScreen,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderBottomStyle: 'solid',
    },
    imagePreview: {
        width: withScreen,
        height: withScreen,
        borderRadius: 999,
        overlayColor: '#e1e1e1',
        marginTop: 24,
    },
    menuImg: {
        width: 160,
        height: 160,
    },
    overlayContainer: {
        position: 'absolute',
        top: 110,
        left: 10,
        borderRadius: 999,
        overflow: 'hidden',
        borderWidth: 4,
        borderColor: 'white',
    },
});
