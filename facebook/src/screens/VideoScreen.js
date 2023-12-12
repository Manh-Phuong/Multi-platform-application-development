import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
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
    faCamera,
    faPuzzlePiece,
    faSearch,
    faUser,
    faUtensilSpoon,
    faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import Post from '../components/Post';
import * as PostServices from '../services/PostServices';

const data = [
    {
        id: '1',
        owner: 'Samsung',
        avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/369910721_10160974400856815_2716180799949117069_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=CcXwFrZErvQAX_Yp-Xt&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfDx4w4M8XVDrGAsp3dkQyjJ_mHy4wdsEVlMhOgYWQ3KQg&oe=653D275E',
        content:
            'Ra mắt Bộ Fan Edition Galaxy S23 FE | Buds FE cho trải nghiệm kết nối hoàn hảo, thoả sức phiêu cùng thần tượng. ',
        video: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
        id: '2',
        owner: 'Samsung',
        avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/369910721_10160974400856815_2716180799949117069_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=CcXwFrZErvQAX_Yp-Xt&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfDx4w4M8XVDrGAsp3dkQyjJ_mHy4wdsEVlMhOgYWQ3KQg&oe=653D275E',
        content:
            'Ra mắt Bộ Fan Edition Galaxy S23 FE | Buds FE cho trải nghiệm kết nối hoàn hảo, thoả sức phiêu cùng thần tượng. ',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
        id: '3',
        owner: 'Samsung',
        avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/369910721_10160974400856815_2716180799949117069_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=CcXwFrZErvQAX_Yp-Xt&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfDx4w4M8XVDrGAsp3dkQyjJ_mHy4wdsEVlMhOgYWQ3KQg&oe=653D275E',
        content:
            'Ra mắt Bộ Fan Edition Galaxy S23 FE | Buds FE cho trải nghiệm kết nối hoàn hảo, thoả sức phiêu cùng thần tượng. ',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    },
];

const Header = () => {
    return (
        <View
            style={{
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
                paddingBottom: 10,
                borderBottomWidth: 10,
                borderBottomColor: '#f0f2f5',
                backgroundColor: '#fff',
            }}
        >
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Watch</Text>
                </View>
                <View style={{ flexDirection: 'row', columnGap: 12 }}>
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 999,
                            backgroundColor: '#ddd',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <FontAwesomeIcon icon={faUser} size={20}></FontAwesomeIcon>
                    </View>
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 999,
                            backgroundColor: '#ddd',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <FontAwesomeIcon icon={faSearch} size={20}></FontAwesomeIcon>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12 }}>
                <View style={styles.options}>
                    <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
                    <Text style={{ fontSize: 16 }}>Trực tiếp</Text>
                </View>
                <View style={styles.options}>
                    <FontAwesomeIcon icon={faUtensils}></FontAwesomeIcon>
                    <Text style={{ fontSize: 16 }}>Ẩm thực</Text>
                </View>
                <View style={styles.options}>
                    <FontAwesomeIcon icon={faPuzzlePiece}></FontAwesomeIcon>
                    <Text style={{ fontSize: 16 }}>Chơi game</Text>
                </View>
            </View>
        </View>
    );
};

const VideoScreen = () => {
    // const [isMute, setIsMute] = useState(true);
    const [offsetY, setOffsetY] = useState(0);
    // const [clickVideo, setClickVideo] = useState(false);
    const [listPost, setListPost] = useState([]);

    const handleScroll = (event) => {
        // Handle scroll event here
        setOffsetY(event.nativeEvent.contentOffset.y);
        console.log('FlatList scrolled to offset:', offsetY);
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await PostServices.getListVideos({
                    user_id: null,
                    in_campaign: '1',
                    campaign_id: '1',
                    latitude: '1.0',
                    longitude: '1.0',
                    last_id: null,
                    index: '0',
                    count: '10',
                });

                setListPost(
                    result.data.data.post?.map((item) => {
                        return {
                            id: item?.id,
                            owner: item.author.name,
                            avatar: item.author.avatar,
                            content: item.described,
                            image: null,
                            video: item?.video?.url,
                            created: item?.created,
                            feel: item?.feel,
                            comment_mark: item?.comment_mark,
                            is_felt: item?.is_felt,
                            is_blocked: item?.is_blocked,
                            can_edit: item?.can_edit,
                            banned: item?.banned,
                            state: item?.state,
                        };
                    }),
                );
            } catch (error) {
                console.log('fetchApi PostServices ' + error);
            }
        };
        fetchApi();
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View>
                {/* <View
                    style={{
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 16,
                        paddingBottom: 10,
                        borderBottomWidth: 10,
                        borderBottomColor: '#f0f2f5',
                        backgroundColor: '#fff',
                    }}
                >
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Watch</Text>
                        </View>
                        <View style={{ flexDirection: 'row', columnGap: 12 }}>
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 999,
                                    backgroundColor: '#ddd',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <FontAwesomeIcon icon={faUser} size={20}></FontAwesomeIcon>
                            </View>
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 999,
                                    backgroundColor: '#ddd',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <FontAwesomeIcon icon={faSearch} size={20}></FontAwesomeIcon>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12 }}>
                        <View style={styles.options}>
                            <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
                            <Text style={{ fontSize: 16 }}>Trực tiếp</Text>
                        </View>
                        <View style={styles.options}>
                            <FontAwesomeIcon icon={faUtensils}></FontAwesomeIcon>
                            <Text style={{ fontSize: 16 }}>Ẩm thực</Text>
                        </View>
                        <View style={styles.options}>
                            <FontAwesomeIcon icon={faPuzzlePiece}></FontAwesomeIcon>
                            <Text style={{ fontSize: 16 }}>Chơi game</Text>
                        </View>
                    </View>
                </View> */}
                <View style={styles.videoContainer}>
                    <FlatList
                        data={listPost}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={<Header />}
                        contentContainerStyle={{ paddingBottom: 260 }}
                        renderItem={({ item }) => (
                            <View>
                                {/* <Post item={item} isMute={isMute} setIsMute={setIsMute} offsetY={offsetY} /> */}
                                <Post item={item} offsetY={offsetY} />
                                <View style={styles.divLarge}></View>
                            </View>
                        )}
                        onScroll={handleScroll}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};
export default VideoScreen;

const styles = StyleSheet.create({
    options: {
        flexDirection: 'row',
        columnGap: 6,
        alignItems: 'center',
        backgroundColor: '#e1e1e1',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    divLarge: {
        height: 10,
        width: withScreen,
        backgroundColor: '#f0f2f5',
        // marginTop: 10,
    },
});
