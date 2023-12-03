import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const Header = () => {
    const navigation = useNavigation();
    return (
        <>
            <View>
                <View style={[styles.flexRow, styles.flexBetween, { marginTop: 8 }]}>
                    <View>
                        <Text style={styles.headerText}>Bạn bè</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={styles.wrapIcon}>
                            <Icon name="search" size={20} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.flexRow, { marginVertical: 8 }]}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("FriendSuggest")}
                    >
                        <View>
                            <Text style={styles.textBtn}>Gợi ý</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("FriendLists")}
                    >
                        <View>
                            <Text style={styles.textBtn}>Bạn bè</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.divLarge}></View>
            <View>
                <View style={[styles.flexRow, styles.flexBetween]}>
                    <View style={styles.flexRow}>
                        <Text style={styles.attend}>Lời mời kết bạn</Text>
                        <Text style={styles.amount}>10</Text>
                    </View>
                </View>
            </View>
        </>
    );
};
const Friend = () => {
    const requests = [
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/371824586_1472820440139153_2000382313469213263_n.jpg?stp=dst-jpg_s320x320&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=8A-50Z6oAn8AX9V5eKx&_nc_ht=scontent.fhan20-1.fna&oh=00_AfBFDilWw9xyATPgpw5TN6NAut8Uq6YQX2Ovb6_4JbyZjQ&oe=6570718A',
            name: 'Bùi Thức Nam',
            time: '1 tuần',
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-1/59157513_545334009326831_3799570276132323328_n.jpg?stp=c0.0.320.320a_dst-jpg_p320x320&_nc_cat=104&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=r2sHRcuvjGoAX8zBsh3&_nc_ht=scontent.fhan20-1.fna&oh=00_AfDG4-i33DGSKsqUwhSWCOJ2KjSDTNLDg0uoAdEvDBHWIw&oe=65920523',
            name: 'Mạnh Phương ',
            time: '1 tuần',
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/397658152_3484813825152306_2903554531250512188_n.jpg?stp=dst-jpg_s320x320&_nc_cat=109&ccb=1-7&_nc_sid=5740b7&_nc_ohc=c1pMHP64Al8AX-JNCer&_nc_ht=scontent.fhan20-1.fna&oh=00_AfA9BLQ8bPfIvdJqCSBHIHFVCtCMrjaa9SjJbVLmGuBp9Q&oe=656F4ECF',
            name: 'Tuấn Bùi ',
            time: '1 tuần',
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=yqBGltvodl8AX8stmSh&_nc_ht=scontent.fhan20-1.fna&oh=00_AfABJwlV4svFYzEIPVI9wmXKIp00-A4jsWOE6kUaeiYEsg&oe=659229B8',
            name: 'Tô Tường',
            time: '1 tuần',
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/371824586_1472820440139153_2000382313469213263_n.jpg?stp=dst-jpg_s320x320&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=8A-50Z6oAn8AX9V5eKx&_nc_ht=scontent.fhan20-1.fna&oh=00_AfBFDilWw9xyATPgpw5TN6NAut8Uq6YQX2Ovb6_4JbyZjQ&oe=6570718A',
            name: 'Bùi Thức Nam',
            time: '1 tuần',
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-1/59157513_545334009326831_3799570276132323328_n.jpg?stp=c0.0.320.320a_dst-jpg_p320x320&_nc_cat=104&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=r2sHRcuvjGoAX8zBsh3&_nc_ht=scontent.fhan20-1.fna&oh=00_AfDG4-i33DGSKsqUwhSWCOJ2KjSDTNLDg0uoAdEvDBHWIw&oe=65920523',
            name: 'Mạnh Phương ',
            time: '1 tuần',
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/397658152_3484813825152306_2903554531250512188_n.jpg?stp=dst-jpg_s320x320&_nc_cat=109&ccb=1-7&_nc_sid=5740b7&_nc_ohc=c1pMHP64Al8AX-JNCer&_nc_ht=scontent.fhan20-1.fna&oh=00_AfA9BLQ8bPfIvdJqCSBHIHFVCtCMrjaa9SjJbVLmGuBp9Q&oe=656F4ECF',
            name: 'Tuấn Bùi ',
            time: '1 tuần',
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=yqBGltvodl8AX8stmSh&_nc_ht=scontent.fhan20-1.fna&oh=00_AfABJwlV4svFYzEIPVI9wmXKIp00-A4jsWOE6kUaeiYEsg&oe=659229B8',
            name: 'Tô Tường',
            time: '1 tuần',
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/371824586_1472820440139153_2000382313469213263_n.jpg?stp=dst-jpg_s320x320&_nc_cat=101&ccb=1-7&_nc_sid=5740b7&_nc_ohc=8A-50Z6oAn8AX9V5eKx&_nc_ht=scontent.fhan20-1.fna&oh=00_AfBFDilWw9xyATPgpw5TN6NAut8Uq6YQX2Ovb6_4JbyZjQ&oe=6570718A',
            name: 'Bùi Thức Nam',
            time: '1 tuần',
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.6435-1/59157513_545334009326831_3799570276132323328_n.jpg?stp=c0.0.320.320a_dst-jpg_p320x320&_nc_cat=104&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=r2sHRcuvjGoAX8zBsh3&_nc_ht=scontent.fhan20-1.fna&oh=00_AfDG4-i33DGSKsqUwhSWCOJ2KjSDTNLDg0uoAdEvDBHWIw&oe=65920523',
            name: 'Mạnh Phương ',
            time: '1 tuần',
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/397658152_3484813825152306_2903554531250512188_n.jpg?stp=dst-jpg_s320x320&_nc_cat=109&ccb=1-7&_nc_sid=5740b7&_nc_ohc=c1pMHP64Al8AX-JNCer&_nc_ht=scontent.fhan20-1.fna&oh=00_AfA9BLQ8bPfIvdJqCSBHIHFVCtCMrjaa9SjJbVLmGuBp9Q&oe=656F4ECF',
            name: 'Tuấn Bùi ',
            time: '1 tuần',
        },
        {
            image: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=yqBGltvodl8AX8stmSh&_nc_ht=scontent.fhan20-1.fna&oh=00_AfABJwlV4svFYzEIPVI9wmXKIp00-A4jsWOE6kUaeiYEsg&oe=659229B8',
            name: 'Tô Tường',
            time: '1 tuần',
        },
    ];

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={requests}
                    showsVerticalScrollIndicator={false} //ẩn thanh cuộn dọc
                    ListHeaderComponent={<Header />}
                    renderItem={({ item }) => (
                        <View style={[styles.flexRow, styles.itemFriend]}>
                            {/* avatar */}
                            <Image
                                style={styles.accountImage}
                                source={{
                                    uri: item.image,
                                }}
                            ></Image>
                            <View style={{ flex: 1 }}>
                                <View style={[styles.flexRow, styles.flexBetween, styles.title]}>
                                    <Text style={styles.userName}>{item.name}</Text>
                                    <Text>{item.time}</Text>
                                </View>
                                <View style={[styles.flexRow, styles.flexBetween, { width: '100%' }]}>
                                    <TouchableOpacity>
                                        <View style={[styles.reply, styles.replyAccess]}>
                                            <Text style={[styles.textReply, { color: '#fff' }]}>Chấp nhận</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <View style={[styles.reply, styles.replyRefuse]}>
                                            <Text style={styles.textReply}>Xóa</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
        //   paddingTop: 40,
        paddingHorizontal: 12,
    },
    divLarge: {
        height: 1.5,
        width: withScreen,
        backgroundColor: '#f0f2f5',
        marginVertical: 8,
    },
    headerText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 24,
    },
    wrapIcon: {
        backgroundColor: '#e4e6eb',
        width: 32,
        height: 32,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexBetween: {
        justifyContent: 'space-between',
    },
    textBtn: {
        fontWeight: 'bold',
        backgroundColor: '#e4e6eb',
        padding: 8,
        borderRadius: 20,
        marginRight: 12,
    },
    textReply: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    reply: {
        width: 110,
        paddingVertical: 10,
        borderRadius: 10,
    },
    replyAccess: {
        backgroundColor: '#0866ff',
    },
    replyRefuse: {
        backgroundColor: '#e4e6eb',
    },
    accountImage: {
        width: 100,
        height: 100,
        borderRadius: 999,
        marginRight: 10,
        alignSelf: 'flex-start',
    },
    userName: {
        fontWeight: 'bold',
    },
    title: {
        marginBottom: 12,
    },
    itemFriend: {
        marginVertical: 8,
        flex: 1,
    },
    attend: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    amount: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 4,
    },
});
export default Friend;
