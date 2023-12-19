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
import { useDispatch, useSelector } from 'react-redux';


const data = [
    {
        id: '1',
        owner: 'VideoActive',
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

const VideoActive = () => {
    const navigation = useNavigation();
    const [clickVideo, setClickVideo] = useState(false);
    const listPost = useSelector((state) => state.listPost.listVideoActive);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View
                    style={{
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 24,
                        paddingBottom: 8,
                        // borderBottomWidth: 10,
                        // borderBottomColor: '#0d0d0d',
                        backgroundColor: '#191919',
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <FontAwesomeIcon icon={faArrowLeft} size={24} color="white" />
                        </TouchableOpacity>
                        <View>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 500 }}>Video khác</Text>
                        </View>
                        <View style={{ flexDirection: 'row', columnGap: 12 }}>
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 999,
                                    // backgroundColor: '#ddd',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <FontAwesomeIcon icon={faSearch} size={20} color="white"></FontAwesomeIcon>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.videoContainer}>
                    <FlatList
                        data={listPost}
                        keyExtractor={(item) => item.id}
                        // ListHeaderComponent={<Header />}
                        contentContainerStyle={{ paddingBottom: 110 }}
                        renderItem={({ item }) => (
                            <View>
                                <Post item={item} darkMode={true} activeVideo={true} />
                                <View style={styles.divLarge}></View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};
export default VideoActive;

const styles = StyleSheet.create({
    container: {
        backfaceVisibility: '#242526',
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
