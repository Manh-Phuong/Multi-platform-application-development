import { useNavigation, useRoute } from '@react-navigation/native';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
import * as SettingServices from '../services/SettingServices';
import Autolink from 'react-native-autolink';
import { setStoreCoins } from '../feature/profile';

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

const Header = () => {
    const coinsBalance = useSelector((state) => state.profile.coins);

    return (
        <View style={{ marginTop: 12, alignItems: 'center', marginBottom: 24 }}>
            <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 12, fontWeight: '800' }}>Xu hiện tại</Text>
            <View
                style={{
                    flexDirection: 'row',
                    columnGap: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image source={require('../assets/icons/dollar.png')} style={{ width: 36, height: 36 }} />
                <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: '800' }}>{coinsBalance}</Text>
            </View>
        </View>
    );
};

const BuyCoins = ({ hiddenHeader }) => {
    const route = useRoute();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const coinsBalance = useSelector((state) => state.profile.coins);
    // const { hiddenHeader } = route.params || { hiddenHeader: false };
    const [listCoins, setListCoins] = useState([
        {
            id: 1,
            value: '65',
            price: '1.49',
        },
        {
            id: 2,
            value: '130',
            price: '2.96',
        },
        {
            id: 3,
            value: '270',
            price: '4.88',
        },
        {
            id: 4,
            value: '330',
            price: '9.66',
        },
        {
            id: 5,
            value: '680',
            price: '18.88',
        },
        {
            id: 6,
            value: '1321',
            price: '27.99',
        },

        {
            id: 6,
            value: '3303',
            price: '76.98',
        },
        {
            id: 7,
            value: '6607',
            price: '1 468',
        },
    ]);

    const handleBuyCoins = async (item) => {
        try {
            Alert.alert(
                `Mua ${item?.value} xu`,
                `Bạn có chắc chắn muốn mua ${item?.value} với giá ${item?.price} $ không?`,
                [
                    {
                        text: 'Hủy',
                        style: 'cancel',
                    },
                    {
                        text: 'Mua',
                        onPress: async () => {
                            try {
                                const result = await SettingServices.BuyCoins({
                                    code: `mua ${item?.value} xu`,
                                    coins: item?.value,
                                });
                                // yourArray.filter(item => item.id !== 11);
                                if (result.data.code == '1000') {
                                    Alert.alert('Giao dịch thành công', `Đã mua thành công ${item?.value} xu`, [
                                        {
                                            text: 'OK',
                                        },
                                    ]);
                                    dispatch(setStoreCoins(parseInt(coinsBalance) + parseInt(item?.value)));
                                }

                                console.log('res mua coi', result.data);
                            } catch (error) {
                                console.log('handleBuyCoins BuyCoins.js SettingServices BuyCoins 1', error);
                            }
                        },
                    },
                ],
                { cancelable: false },
            );
        } catch (error) {
            console.log('handleBuyCoins BuyCoins.js SettingServices BuyCoins 2', error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fefefe', height: '100%' }}>
            {!hiddenHeader && (
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
                        <Text style={{ fontSize: 18, fontWeight: '500', marginRight: 12 }}>Cửa hàng xu</Text>
                    </View>
                </View>
            )}

            <FlatList
                data={listCoins}
                keyExtractor={(item, index) => index}
                ListHeaderComponent={<Header />}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity onPress={() => handleBuyCoins(item)}>
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
                                        source={require('../assets/icons/dollar.png')}
                                        style={{ width: 24, height: 24 }}
                                    />

                                    <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.value} xu</Text>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: '#fe2c55',
                                        paddingVertical: 8,
                                        paddingHorizontal: 12,
                                        borderRadius: 6,
                                        width: 90,
                                    }}
                                >
                                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff', textAlign: 'center' }}>
                                        {item.price} $
                                    </Text>
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

export default BuyCoins;
