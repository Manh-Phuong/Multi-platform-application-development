import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, FlatList, Touchable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { setStoreStatus } from '../feature/post';
import { useDispatch, useSelector } from 'react-redux';

const Emoji = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [searchEmoji, setSearchEmoji] = useState('');
    const listEmoji = [
        {
            icon: '😊',
            title: 'Hạnh phúc',
        },
        {
            icon: '😇',
            title: 'Có phúc',
        },
        {
            icon: '😘',
            title: 'loved',
        },
        {
            icon: '😥',
            title: 'Buồn',
        },
        {
            icon: '😃',
            title: 'Biết ơn',
        },
        {
            icon: '🥰',
            title: 'Đáng yêu',
        },
        {
            icon: '🤩',
            title: 'Hào hứng',
        },
        {
            icon: '😜',
            title: 'Điên',
        },
        {
            icon: '😍',
            title: 'Đang yêu',
        },
        {
            icon: '😉',
            title: 'Cảm kích',
        },
        {
            icon: '🤗',
            title: 'Sung sướng',
        },
        {
            icon: '😋',
            title: 'Tuyệt vời',
        },
        {
            icon: '😮',
            title: 'Silly',
        },
        {
            icon: '😆',
            title: 'Vui vẻ',
        },
        {
            icon: '😮',
            title: 'Thú vị',
        },
        {
            icon: '😎',
            title: 'Thật phong cách',
        },
        {
            icon: '😗',
            title: 'Thư giãn',
        },
    ];
    const [listEmojiRender, setListEmojiRender] = useState(listEmoji); // Khởi tạo state với giá trị mặc định
    const renderItem = ({ item }) => (
        <View
            style={{
                width: '50%',
                paddingLeft: 8,
                paddingTop: 16,
                paddingBottom: 16,
                borderColor: '#ccc',
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 8,
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    dispatch(setStoreStatus(item.icon + ' ' + item.title));
                    navigation.navigate('CreatePost');
                }}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 8,
                    justifyContent: 'space-between',
                    paddingRight: 8,
                }}
            >
                <Text style={{ fontSize: 30 }}>{item.icon}</Text>
                <Text style={{ fontSize: 16 }}>{item.title}</Text>
            </TouchableOpacity>
        </View>
    );

    const changTextSearch = (newValue) => {
        setSearchEmoji(newValue);
        setListEmojiRender(listEmoji.filter((item) => item.title.toLowerCase().includes(newValue.toLowerCase())));
    };

    return (
        <View>
            <TextInput
                style={styles.inputField}
                placeholder="Tìm kiếm"
                value={searchEmoji}
                onChangeText={changTextSearch}
                returnKeyType="done"
                returnKeyLabel="Tìm"
            ></TextInput>
            <FlatList
                data={listEmojiRender}
                renderItem={renderItem}
                keyExtractor={(item) => item.icon}
                numColumns={2} // Hiển thị 2 cột
            />
        </View>
    );
};

const Activity = () => {
    const navigation = useNavigation();
    const listActivity = [
        {
            icon: '🎉',
            title: 'Đang chúc mừng...',
            listSubActivity: [
                {
                    icon: '👫',
                    title: 'Tình bạn',
                },
                {
                    icon: '🎂',
                    title: 'Sinh nhật',
                },
                {
                    icon: '🎉',
                    title: 'Ngày đặc biệt của bạn',
                },
                {
                    icon: '🎄',
                    title: 'Giáng sinh',
                },
                {
                    icon: '🎉',
                    title: 'Giao thừa',
                },
            ],
        },
        {
            icon: '👓',
            title: 'Đang xem...',
        },
        {
            icon: '🎂',
            title: 'Đang ăn...',
        },
        {
            icon: '🍺',
            title: 'Đang uống...',
        },
        {
            icon: '📅',
            title: 'Đang tham gia...',
        },
        {
            icon: '✈',
            title: 'Đang đến...',
        },
        {
            icon: '🎧',
            title: 'Đang nghe...',
        },
        {
            icon: '🔎',
            title: 'Đang tìm...',
        },
        {
            icon: '☁',
            title: 'Đang nghĩ về...',
        },
        {
            icon: '📖',
            title: 'Đang đọc...',
        },
        {
            icon: '🎮',
            title: 'Đang chơi...',
        },
        {
            icon: '🙌',
            title: 'Đang ủng hộ...',
        },
    ];
    const [listActivityRender, setListActivityRender] = useState(listActivity);
    const [searchActivity, setSearchActivity] = useState('');

    const renderItem = ({ item }) => (
        <View
            style={{
                width: '50%',
                paddingLeft: 8,
                paddingTop: 16,
                paddingBottom: 16,
                borderColor: '#e1e1e1',
                borderWidth: 1,
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('DetailActivity', {
                        data: {
                            title: item.title,
                            list: item.listSubActivity,
                        },
                    });
                }}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 8,
                    justifyContent: 'space-between',
                    paddingRight: 8,
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 8 }}>
                    <Text style={{ fontSize: 30 }}>{item.icon}</Text>
                    <View style={{ width: '60%' }}>
                        <Text style={{ fontSize: 16 }}>{item.title}</Text>
                    </View>
                </View>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
            </TouchableOpacity>
        </View>
    );
    const changTextSearch = (newValue) => {
        setSearchActivity(newValue);
        setListActivityRender(listActivity.filter((item) => item.title.toLowerCase().includes(newValue.toLowerCase())));
    };
    return (
        <View>
            <TextInput
                style={styles.inputField}
                placeholder="Tìm kiếm"
                value={searchActivity}
                onChangeText={changTextSearch}
                returnKeyType="done"
                returnKeyLabel="Tìm"
            ></TextInput>
            <FlatList
                data={listActivityRender}
                renderItem={renderItem}
                keyExtractor={(item) => item.icon}
                numColumns={2} // Hiển thị 2 cột
            />
        </View>
    );
};
const ChooseEmoji = () => {
    const [active, setActive] = useState({
        emoji: true,
        activity: false,
    });

    const handleActive = (detailName) => {
        setActive((prevState) => ({
            emoji: false,
            activity: false,
            [detailName]: true,
        }));
    };

    return (
        <View>
            <View style={styles.header}>
                <FontAwesomeIcon icon={faArrowLeft} size={20}></FontAwesomeIcon>
                <Text style={{ fontSize: 20 }}>Bạn cảm thấy thế nào?</Text>
            </View>
            <View style={styles.options}>
                <View style={[styles.option, active.emoji ? styles.active : null]}>
                    <TouchableOpacity
                        onPress={() => {
                            handleActive('emoji');
                        }}
                    >
                        <Text style={[styles.text, active.emoji ? styles.activeText : null]}>Cảm xúc</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.option, active.activity ? styles.active : null]}>
                    <TouchableOpacity
                        onPress={() => {
                            handleActive('activity');
                        }}
                    >
                        <Text style={[styles.text, active.activity ? styles.activeText : null]}>Hoạt động</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {active.emoji && <Emoji></Emoji>}
            {active.activity && <Activity></Activity>}
        </View>
    );
};

export default ChooseEmoji;

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 54,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: 'rgba(162,162,164,0.1)',
        alignItems: 'center',
        columnGap: 20,
    },
    options: {
        flexDirection: 'row',
        // backgroundColor: "blue",
        width: '100%',

        // justifyContent: "space-between"
    },
    option: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    active: {
        borderBottomColor: '#0063e0',
        borderBottomWidth: 2,
    },
    activeText: {
        color: '#0063e0',
    },
    text: {
        fontSize: 16,
    },
    inputField: {
        fontSize: 16,
        backgroundColor: '#e1e1e1',
        borderRadius: 30,
        height: 42,
        alignItems: 'center',
        paddingLeft: 16,
        position: 'relative',
        margin: 6,
    },
});
