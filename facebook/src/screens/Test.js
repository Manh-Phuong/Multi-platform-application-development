import * as React from 'react';
import { useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Chú ý: Icon set của bạn phải được import từ thư viện phù hợp.
import { useNavigation } from '@react-navigation/native';
import { Color, FontFamily, FontSize } from '../GlobalStyles';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faArrowLeft,
    faCamera,
    faPuzzlePiece,
    faSearch,
    faUser,
    faUtensilSpoon,
    faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import Post from '../components/Post';
import { useState } from 'react';

const data = [
    {
        id: 1,
        content: '1',
    },
    {
        id: 2,
        content: '2',
    },
    {
        id: 3,
        content: '3',
    },
    {
        id: 4,
        content: '4',
    },
    {
        id: 5,
        content: '5',
    },
    {
        id: 6,
        content: '6',
    },
    {
        id: 7,
        content: '7',
    },
    {
        id: 8,
        content: '8',
    },
    {
        id: 9,
        content: '9',
    },
    {
        id: 10,
        content: '10',
    },
    {
        id: 11,
        content: '11',
    },
    {
        id: 12,
        content: '12',
    },
];

const Test = () => {
    const navigation = useNavigation();
    const [clickVideo, setClickVideo] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View
                    style={{
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 8,
                        paddingBottom: 8,
                        marginTop: 60,
                        opacity: 1,
                        width: 0,
                        height: 0
                        // pointerEvents: 'none',
                        // borderBottomWidth: 10,
                        // borderBottomColor: '#0d0d0d',
                        // backgroundColor: '#191919',
                    }}
                >
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        // ListHeaderComponent={<Header />}
                        contentContainerStyle={{ paddingBottom: 110 }}
                        renderItem={({ item }) => (
                            <View>
                                <Post item={item} darkMode={true} />
                                <View style={styles.divLarge}></View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};
export default Test;

const styles = StyleSheet.create({
    container: {
        // backfaceVisibility: '#242526',
    },
    options: {
        flexDirection: 'row',
        columnGap: 6,
        alignItems: 'center',
        backgroundColor: '#ccc',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    divLarge: {
        height: 10,
        width: withScreen,
        backgroundColor: '#0d0d0d',
        // marginTop: 10,
    },
});
