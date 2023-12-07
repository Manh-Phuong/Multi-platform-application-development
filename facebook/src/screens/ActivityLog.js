import * as React from "react";
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
  FlatList
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from 'react-native-vector-icons/FontAwesome';

const ActivityLog = () => {
  const navigation = useNavigation();

  const goBackHandler = () => {
    navigation.goBack(); // Quay lại màn hình trước đó
  };

  const goToNextScreen = () => {
    navigation.navigate("ChooseGender");
  };

  const dataSearch = [
    {
        date: "24/11/2023",
        listSearch: ['Toán học và đời sống', 'Truyện cổ Grimes']
    },
    {
        date: "23/11/2023",
        listSearch: ['Toán học và đời sống', 'Truyện cổ Grimes']
    },
    {
        date: "22/11/2023",
        listSearch: ['Toán học và đời sống', 'Truyện cổ Grimes']
    },{
        date: "21/11/2023",
        listSearch: ['Toán học và đời sống', 'Truyện cổ Grimes']
    }
  ]

  return (
    <TouchableWithoutFeedback>
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBackHandler}>
                    <Image style={styles.backIcon}
                    contentFit="cover"
                    source={require("../assets/images/vector.png")}
                    />
                </TouchableOpacity>
                <Text style={{fontSize: 20}}>Nhật ký hoạt động</Text>
            </View>
            <Text style={{paddingTop: 12, paddingBottom: 12, textAlign: "center", 
                color: "blue", fontSize: 18, 
                borderBottomColor: "#ccc", borderBottomWidth: 1}}>
                Xóa các tìm kiếm
            </Text>

            <View style={styles.historyView}>
                {dataSearch.map((item, index) => (
                    <View key={index}>
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginTop: 10}}>{item.date}</Text>
                        <FlatList
                            data={item.listSearch}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Image source={require('../assets/icons/searchIcon.png')} style={styles.iconSearch} />
                                <View style={styles.itemText}>
                                    <Text style={{fontSize:16, fontWeight: '700'}}>Bạn đã tìm kiếm trên FakeBook</Text>
                                    <Text style={{fontSize:16}}>{`"${item}"`}</Text>            
                                    <View style={styles.privateText}>
                                        <Icon name="lock" size={16} color="grey" />
                                        <Text>Chỉ mình tôi - Đã ẩn khỏi dòng thời gian</Text>
                                    </View>                    
                                </View>
                                <Image source={require('../assets/images/close-icon.png')} style={styles.icon} />
                            </View>
                            )}
                        />
                    </View>
                ))}
            </View>
        </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 92,
        // backgroundColor: "red",
        paddingTop: 32,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingLeft: 16,
        paddingRight: 16,
        columnGap: 12,
    },
    backIcon:{
        width: 16,
        height: 16,
        
    },
    historyView: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20
    },
    iconSearch: {
        width: 48,
        height: 48
    },
    icon: {
        width: 24,
        height: 24
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 16,
        marginTop: 10,
        marginBottom: 10
    },
    itemText: {
        flex: 1,
        rowGap: 2
    },
    privateText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 6
    }
});

export default ActivityLog;
