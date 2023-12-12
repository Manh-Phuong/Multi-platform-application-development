import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, FlatList } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setStoreStatus } from '../feature/post';

const DetailAcitvity = ({ route }) => {
    const props = route.params?.data || null;
    const navigation = useNavigation();
    const [searchInput, setSearchInput] = useState('');
    const [listActivityRender, setListActivityRender] = useState(props.list);
    const dispatch = useDispatch();
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            dispatch(setStoreStatus(item.icon + ' ' + item.title));
            navigation.navigate('CreatePost');
        }}>
            <View
                style={{
                    width: '100%',
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
                <Text style={{ fontSize: 30 }}>{item.icon}</Text>
                <Text style={{ fontSize: 16 }}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    const changTextSearch = (newValue) => {
        setSearchInput(newValue);
        setListActivityRender(props.list.filter((item) => item.title.toLowerCase().includes(newValue.toLowerCase())));
    };

    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20}></FontAwesomeIcon>
                </TouchableOpacity>
                <Text style={{ fontSize: 20 }}>{props.title}</Text>
            </View>
            <TextInput
                style={styles.inputField}
                placeholder="Tìm kiếm"
                value={searchInput}
                onChangeText={changTextSearch}
                returnKeyType="done"
                returnKeyLabel="Tìm"
            ></TextInput>
            <FlatList
                data={listActivityRender}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
                numColumns={1} // Hiển thị 2 cột
            />
        </View>
    );
};

export default DetailAcitvity;

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
