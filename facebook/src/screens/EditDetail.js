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

export default function EditDetail() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { props } = route.params || '';

    const address = useSelector((state) => state.profile.address);
    const city = useSelector((state) => state.profile.city);
    const country = useSelector((state) => state.profile.country);

    const [inputAddress, setInputAddress] = useState(address);
    const [inputCity, setInputCity] = useState(city);
    const [inputCountry, setInputCountry] = useState(country);

    const handleSave = async () => {
        dispatch(setStoreAddress(inputAddress));
        dispatch(setStoreCity(inputCity));
        dispatch(setStoreCountry(inputCountry));

        try {
            const formData = new FormData();
            formData.append('address', inputAddress);
            formData.append('city', inputCity);
            formData.append('country', inputCountry);
            const result = await ProfileServices.setUserInfo(formData);
        } catch (error) {
            console.log('fetchApi EditDetail ProfileServices setUserInfo' + error);
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

                    <View style={{ width: withScreen - 56 }}>
                        <Text
                            style={{
                                // marginLeft: 24,
                                textAlign: 'center',
                                fontSize: 18,
                                fontWeight: '600',
                            }}
                        >
                            Chỉnh sửa chi tiết
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={handleSave}
                style={{
                    backgroundColor: '#0866ff',
                    paddingHorizontal: 18,
                    paddingVertical: 8,
                    borderRadius: 6,
                    position: 'absolute',
                    width: withScreen - 32,
                    bottom: 20,
                    left: 16,
                }}
            >
                <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>Lưu</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 16 }}>
                <View style={{ marginLeft: 16, marginBottom: 16 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Địa chỉ</Text>
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
                        value={inputAddress}
                        onChangeText={(text) => setInputAddress(text)}
                        placeholder="Địa chỉ..."
                        placeholderTextColor="#888"
                    ></TextInput>
                </View>

                <View style={{ marginLeft: 16, marginBottom: 16 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Thành phố</Text>
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
                        value={inputCity}
                        onChangeText={(text) => setInputCity(text)}
                        placeholder="Thành phố..."
                        placeholderTextColor="#888"
                    ></TextInput>
                </View>

                <View style={{ marginLeft: 16, marginBottom: 16 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Quốc gia</Text>
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
                        value={inputCountry}
                        onChangeText={(text) => setInputCountry(text)}
                        placeholder="Quốc gia..."
                        placeholderTextColor="#888"
                    ></TextInput>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: heightScreen,
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
});
