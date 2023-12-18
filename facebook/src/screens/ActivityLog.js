import * as React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteHistory, getListHistory } from '../services/SearchServices';
import { setLoading } from '../feature/loading';
import { useDispatch, useSelector } from 'react-redux';
const ActivityLog = () => {
    const navigation = useNavigation();
    const [dataSearch, setDataSearch] = React.useState('');
    const dispatch = useDispatch();
    const isLoadingApi = useSelector((state) => state.loading.isLoadingApi);

    const goBackHandler = () => {
        navigation.goBack(); // Quay lại màn hình trước đó
    };
    const goToNextScreen = () => {
        navigation.navigate('ChooseGender');
    };
    const handleDeleteAll = async () => {
        const res = await deleteHistory({ search_id: '999', all: 1 });
        setDataSearch([]);
    };
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setLoading(true));
                const res = await getListHistory({});
                dispatch(setLoading(false));
                if (res.code == 1000) {
                    const groupedData = [];
                    res.data.forEach((item) => {
                        const date = item.created.split('T')[0]; // Extracting date from the timestamp
                        const check = groupedData.find((item) => item.date == date);
                        if (!check) {
                            groupedData.push({
                                date: date,
                                listSearch: [item.keyword],
                            });
                        } else {
                            check.listSearch.push(item.keyword);
                        }
                    });
                    setDataSearch(groupedData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <TouchableWithoutFeedback>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={goBackHandler}>
                        <Image
                            style={styles.backIcon}
                            contentFit="cover"
                            source={require('../assets/images/vector.png')}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20 }}>Nhật ký hoạt động</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        handleDeleteAll();
                    }}
                >
                    <Text
                        style={{
                            paddingTop: 12,
                            paddingBottom: 12,
                            textAlign: 'center',
                            color: 'blue',
                            fontSize: 18,
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                        }}
                    >
                        Xóa các tìm kiếm
                    </Text>
                </TouchableOpacity>

                {isLoadingApi && <ActivityIndicator size="large" color="#0063e0" style={{position: "absolute", top: "100%", left: "50%"}}/>}
                <FlatList
                    data={dataSearch}
                    keyExtractor={(item) => item.date}
                    contentContainerStyle={{ paddingBottom: 150 }}
                    renderItem={({ item }) => (
                        <View style={{ paddingRight: 20, paddingLeft: 20 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginTop: 10 }}>
                                {item.date}
                            </Text>
                            <FlatList
                                data={item.listSearch}
                                keyExtractor={(subItem, subIndex) => subIndex.toString()}
                                contentContainerStyle={{ paddingBottom: 50 }}
                                renderItem={({ item: subItem }) => (
                                    <View style={styles.itemContainer}>
                                        <Image
                                            source={require('../assets/icons/searchIcon.png')}
                                            style={styles.iconSearch}
                                        />
                                        <View style={styles.itemText}>
                                            <Text style={{ fontSize: 16, fontWeight: '700' }}>
                                                Bạn đã tìm kiếm trên FakeBook
                                            </Text>
                                            <Text style={{ fontSize: 16 }}>{`"${subItem}"`}</Text>
                                            <View style={styles.privateText}>
                                                <Icon name="lock" size={16} color="grey" />
                                                <Text>Chỉ mình tôi - Đã ẩn khỏi dòng thời gian</Text>
                                            </View>
                                        </View>
                                        <Image
                                            source={require('../assets/images/close-icon.png')}
                                            style={styles.icon}
                                        />
                                    </View>
                                )}
                            />
                        </View>
                    )}
                />
                {/* </View> */}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 92,
        // backgroundColor: "red",
        paddingTop: 32,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingLeft: 16,
        paddingRight: 16,
        columnGap: 12,
    },
    backIcon: {
        width: 16,
        height: 16,
    },
    historyView: {
        paddingLeft: 20,
        paddingTop: 20,
    },
    iconSearch: {
        width: 48,
        height: 48,
    },
    icon: {
        width: 24,
        height: 24,
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 16,
        marginTop: 10,
        marginBottom: 10,
    },
    itemText: {
        flex: 1,
        rowGap: 2,
    },
    privateText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 6,
    },
});

export default ActivityLog;
