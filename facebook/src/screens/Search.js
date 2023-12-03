import React, { useState, useEffect } from 'react';
import {
    Button,
    Image,
    View,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Post from '../components/Post';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { HomeIcon, VideoIcon, FriendIcon, MarketIcon, MessageIcon, SendIcon } from '../assets/icons';
import { faAngleRight, faEllipsis, faLink, faPlus, faThumbTack, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
    faBell,
    faBookmark,
    faCircleQuestion,
    faClock,
    faRectangleXmark,
    faTrashCan,
} from '@fortawesome/free-regular-svg-icons';

export default function Search() {
    const [searchInput, setSearchInput] = useState('');
    const [dataRender, setDataRender] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const navigation = useNavigation();
    const data = [
        {
            id: '1',
            owner: 'Samsung',
            avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/369910721_10160974400856815_2716180799949117069_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=CcXwFrZErvQAX_Yp-Xt&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfDx4w4M8XVDrGAsp3dkQyjJ_mHy4wdsEVlMhOgYWQ3KQg&oe=653D275E',
            content:
                'Ra mắt Bộ Fan Edition Galaxy S23 FE | Buds FE cho trải nghiệm kết nối hoàn hảo, thoả sức phiêu cùng thần tượng. ',
            image: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/393720450_362399836141009_7541278015979169571_n.jpg?stp=dst-jpg_p843x403&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xm-IrbuMr5cAX9fq4cC&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfBPrAbhH3rAwCw9IUrAMZngZtFKewhEpzPCmFQI-pDX6Q&oe=653DB1CC',
        },
        {
            id: '2',
            owner: 'XMEN - For Boss',
            avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/358681064_279532781395858_6541355092957352746_n.png?stp=cp0_dst-png_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kV-SiG8f4OMAX_O3YIG&_nc_oc=AQkmR5EOt0tYta1-jW3qZK8Tdtl-mKXrOyxfq9TsdA4TIk2Rd0BZ2gebff6-sGCnftpbqAOEdPnTg4DerXWYApN3&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfAK_g3aTwWZUasEUQR0sWnh4rTCCj128MKzLRV8ZjHQFQ&oe=653C9C31',
            content:
                'BOSS BẢN LĨNH CÓ GU - CHOOSE LĂN XMEN FOR BOSS Sau nhiệm vụ làm thơ thả thính, AMY A.I tiếp nhận bài toán thứ 2 với nhiều mệnh đề khó:⚡Giải pháp nào cho mùi hương dưới cánh tay khó nói? ⚡Trấn yểm hương cánh” nhưng không quá nồng nặc, thể hiện cái gu chất Boss? 😎 Làm KHÓ AI chứ có AMY tôi, KHÓ thành KHOÁI ngay. ',
            image: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t45.1600-4/381622252_23861468996010365_4203897755470830325_n.png?stp=cp0_dst-jpg_p526x296_q90_spS444&_nc_cat=105&ccb=1-7&_nc_sid=528f85&_nc_ohc=FI08_ji7SO4AX8bJois&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfCMpCCObcK8OdLtD7pu5HEsmvkM-_zPw8f5iXB0-7iDmg&oe=653CC10B',
        },
        {
            id: '3',
            owner: 'Recent',
            avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/309658071_134569009335886_1161259950930816405_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=MaK2p23PPr0AX8RKYbG&_nc_ht=scontent.fhan15-1.fna&oh=00_AfCERp7xiSlMLkrQ3eRjYyzThfMMHBaOZqodsAy2Y11OVg&oe=653D33B7',
            content:
                'Ra mắt Bộ Fan Edition Galaxy S23 FE | Buds FE cho trải nghiệm kết nối hoàn hảo, thoả sức phiêu cùng thần tượng. ',
            image: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/393459962_305151942277591_5038326346084193573_n.jpg?stp=cp6_dst-jpg_s960x960&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=2TunSSKEXW4AX8H9dD4&_nc_ht=scontent.fhan15-1.fna&oh=00_AfBCy3r7mJ6UwDA5lQk9t971_4bxwUA1iVSfk3LIA8jlxQ&oe=653E7AC2',
        },
        {
            id: '4',
            owner: 'Study With Me',
            avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/241357309_106468151792976_3114688578357951904_n.jpg?stp=c80.0.320.320a_dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=yOpqaii7WM8AX_q0XQd&_nc_ht=scontent.fhan15-1.fna&oh=00_AfCrtyqfnW7f4byf6dmX8D7Vkndr8IOnyP9eC_SWPqYihQ&oe=653D5ED8',
            content: 'Chúng ta luôn tốt lên từng ngày~',
            image: 'https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/394179576_346763921199834_6889880587632515568_n.jpg?stp=dst-jpg_p843x403&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kcNxzMZrwwMAX_lP19i&_nc_ht=scontent.fhan15-2.fna&oh=00_AfDNBad6-w6oF0QbYxj2AEl2849Ly96Bczxa0UNlw0T3SA&oe=653D4E37',
        },
        {
            id: '5',
            owner: 'Kiến Trúc Việt - Thiết Kế Thi Công Trọn Gói',
            avatar: 'https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/305406546_1118571769035664_2586701446268501879_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=jXQa653iGm4AX-wxdnw&_nc_ht=scontent.fhan15-2.fna&oh=00_AfDCcCy-I1tMYiIl2B5Dy4tN6xaBmNLT_fR6fIqqgMuFjw&oe=653E1025',
            content: 'Làm thiết kế xong ông bà không ưng 🥹',
            image: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/395157047_816872920441944_5715739874155126527_n.jpg?stp=cp6_dst-jpg_p843x403&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=KOuOr_7ZVgQAX-heCI-&_nc_oc=AQmVCqIjkosQsaxTqJKCz78SI32umEZg0LFmBzCcFyz95YHEtqtTyJAA0A-0ZrklP4gvHltPc7B2GgJlX2RrdjLb&_nc_ht=scontent.fhan15-1.fna&oh=00_AfBE4ol7Y_jndIpLvr8rJ19xnuFzPkaz0lPDgyRkbnqaow&oe=653D2D58',
        },
        {
            id: '6',
            owner: 'Một chút decor',
            avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/329991810_565594582204694_5571908352438977267_n.jpg?stp=c53.0.320.320a_dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=2XIpav4JB7cAX8glJNM&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDzr56Qev1G0szwS0CvdqveLJcrhvm7Ky0Lp8mcbrQkAQ&oe=653D9A88',
            content: 'Một chiếc phòng tui luôn mơ ước 🥰',
            image: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/395132393_266120919757244_6341941126357122239_n.jpg?stp=cp6_dst-jpg_s960x960&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=DQRvecpHirQAX895Kgs&_nc_ht=scontent.fhan15-1.fna&oh=00_AfBchRtbaVZ_CLIbwTWcx8jW2LCgQdO8qzLbu8oIl4KAtQ&oe=653E2218',
        },
        {
            id: '7',
            owner: 'Troll Cả Showbiz',
            avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/380547481_740120898129984_7583509023442880520_n.jpg?stp=dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=0f_3pflO6kYAX_hONK1&_nc_ht=scontent.fhan15-1.fna&oh=00_AfAMGzDRvDgoIF6O5GVqzizIQbTlX-Piws7MRYEzgo87Sg&oe=653D0CBB',
            content: 'Cảnh phim bị cắt trong The Shining 1980 👻',
            image: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/393598280_759911739484233_1003366349818070723_n.jpg?stp=dst-jpg_s960x960&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=EZuOrZmj-GUAX-HU0HH&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDsKK7RW6ivMWc9q-qxnSHN2ITHQEqnJslNRdyTGzs2sQ&oe=653D7B6E',
        },
        {
            id: '8',
            owner: 'Anh Tùng Design - Kiến Trúc Nội Thất Thông Minh',
            avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/371098588_793859796077879_2506753863383987577_n.jpg?stp=dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_OAfq_YCLewAX-9aKgS&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDGvpwdGM9KrOLfQQfoiBFXQ422MBkNxNK2yvxF2CMjBQ&oe=653CE45D',
            content: `Bạn dám vẽ tôi dám làm 🤌
      ------------------ 
      Nguồn: HUCE News`,
            image: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/393267843_830931319037393_7019912536548327131_n.jpg?stp=cp6_dst-jpg_p843x403&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=NphvQTrNWXMAX_H-Hkj&_nc_ht=scontent.fhan15-1.fna&oh=00_AfBrh_PgYowAtaGrznElmmPoIBKJihf4N1bhhNfx5kksng&oe=653E3D1F',
        },
        {
            id: '9',
            owner: 'Trương Toàn - IPHONE SÓC TRĂNG',
            avatar: 'https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/377779680_784875696987100_6321804957547872809_n.jpg?stp=cp6_dst-jpg_p60x60&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3NB_RallAboAX-QUWdy&_nc_ht=scontent.fhan15-2.fna&oh=00_AfC913AkTF8p-abQK55X1XlARieUbdIZWT99IgtGbOkHXg&oe=653E76AE',
            content: 'cuối tuần ròi nghỉ ngơi thoi',
            image: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/394537012_810548441086492_4185753828941852292_n.jpg?stp=dst-jpg_s960x960&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=thPm4HsAJYAAX9aONiY&_nc_ht=scontent.fhan15-1.fna&oh=00_AfAHQW8o91PWku2DKV4McxMBNTkc8i68856Mqq86VVboBg&oe=653DA324',
        },
        {
            id: '10',
            owner: 'Trương Toàn - IPHONE SÓC TRĂNG',
            avatar: 'https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/377779680_784875696987100_6321804957547872809_n.jpg?stp=cp6_dst-jpg_p60x60&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3NB_RallAboAX-QUWdy&_nc_ht=scontent.fhan15-2.fna&oh=00_AfC913AkTF8p-abQK55X1XlARieUbdIZWT99IgtGbOkHXg&oe=653E76AE',
            content: 'kém',
            image: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/393689972_810200304454639_826145831067748735_n.jpg?stp=dst-jpg_s960x960&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=dxR-qklsdM0AX8SVQNH&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDSPGASGCDc6K_IgVfkqvvQVBOoOtRkKKaoe9cpRkLW0g&oe=653DA0DD',
        },
        {
            id: '11',
            owner: 'Đà Lạt Review Tất Tần Tật',
            avatar: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/300433472_407878474778564_7824663035530571659_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=XGTjPsui3CUAX8AgEHn&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDUAyxFwrw8aDEZBLdqPmrfz1_EaGdDPFu3GWZum2cB_Q&oe=653D5E63',
            content: `Góc nhìn Đà Lạt về đêm 😍😍😍
          👉 Tham gia nhóm Đà Lạt Review 
          Ảnh 📷: Thành Công`,
            image: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/395096585_666174282282314_5369529996375320568_n.jpg?stp=dst-jpg_p843x403&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=4HHeFRWwrbUAX-4Cpjp&_nc_ht=scontent.fhan15-1.fna&oh=00_AfAtyLffIIa8ZpRLW5r8MvGHnHmp8BRm_uGytPpqDvt_8A&oe=653CEC88',
        },
    ];
    // useEffect(() => {
    //   if (searchInput.length == 0) {
    //     setDataRender([]);
    //     setShowSearchResults(false)
    //     console.log(showSearchResults)
    //   }
    //   else {
    //     setDataRender(data);
    //     setShowSearchResults(true)
    //   }
    // }, [searchInput]);

    const [dataList, setDataList] = useState([
        { id: '1', name: 'Tuấn Bùi', info: 'Bạn bè', avatar: require('../assets/icons/searchIcon.png') },
        { id: '2', name: 'Jane', avatar: require('../assets/icons/searchIcon.png') },
        { id: '3', name: 'John', avatar: require('../assets/icons/searchIcon.png') },
        { id: '4', name: 'Jane', avatar: require('../assets/icons/searchIcon.png') },
        { id: '5', name: 'John', avatar: require('../assets/icons/searchIcon.png') },
        { id: '6', name: 'Jane', avatar: require('../assets/icons/searchIcon.png') },
        { id: '7', name: 'John', avatar: require('../assets/icons/searchIcon.png') },
        { id: '8', name: 'Jane', avatar: require('../assets/icons/searchIcon.png') },
        { id: '9', name: 'John', avatar: require('../assets/icons/searchIcon.png') },
        { id: '10', name: 'Jane', avatar: require('../assets/icons/searchIcon.png') },
        { id: '11', name: 'John', avatar: require('../assets/icons/searchIcon.png') },
        { id: '12', name: 'Jane', avatar: require('../assets/icons/searchIcon.png') },
    ]);

    const changTextSearch = (newValue) => {
        setSearchInput(newValue);
    };
    const handlePress = () => {
        setSearchInput('');
        setDataRender([]);
        setShowSearchResults(false);
    };
    const handleSearch = () => {
        if (searchInput.length == 0) {
            setDataRender([]);
            setShowSearchResults(false);
            console.log(showSearchResults);
        } else {
            setDataRender(data);
            setShowSearchResults(true);
        }
    };
    const toggleModal = () => {
        setIsShowModal(false);
    };
    const handleSearchOnClick = (value) => {
        setSearchInput(value);
        handleSearch()
    };
    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            style={styles.backIcon}
                            contentFit="cover"
                            source={require('../assets/images/vector.png')}
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.inputField}
                        value={searchInput}
                        onChangeText={changTextSearch}
                        placeholder="Tìm kiếm trên Facebook"
                        onSubmitEditing={handleSearch}
                        returnKeyType="done"
                        returnKeyLabel="Tìm"
                    ></TextInput>
                    {searchInput && (
                        <TouchableOpacity
                            style={{ position: 'absolute', bottom: 20, right: 24, zIndex: 1 }}
                            onPress={handlePress}
                        >
                            <Image
                                style={{ width: 24, height: 24 }}
                                contentFit="cover"
                                source={require('../assets/images/close-icon.png')}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                {!showSearchResults && (
                    <View>
                        <View style={styles.title}>
                            <Text style={styles.titleLeft}>Gần đây</Text>
                            <Text style={styles.titleRight} onPress={() => navigation.navigate('ActivityLog')}>
                                Chỉnh sửa
                            </Text>
                        </View>

                        <FlatList
                            data={dataList}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSearchOnClick(item.name)}>
                                    <View style={styles.itemContainer}>
                                        <View style={styles.itemLeft}>
                                            <Image source={item.avatar} style={styles.avatar} />
                                            <Text style={styles.menuText}>{item.name}</Text>
                                        </View>
                                        <View style={styles.itemRight}>
                                            <Icon
                                                name="ellipsis-h"
                                                size={20}
                                                color="black"
                                                onPress={() => setIsShowModal(true)}
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
                {showSearchResults && (
                    <FlatList
                        data={dataRender}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View>
                                {/* <Post item={item} /> */}
                                {/* oncommentPress -> toggleComments */}
                                <Post item={item} />

                                <View style={styles.divLarge}></View>
                            </View>
                        )}
                    />
                )}

                <Modal
                    isVisible={isShowModal}
                    onSwipeComplete={toggleModal}
                    swipeDirection={['down']}
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            height: heightScreen * 0.25,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            paddingTop: 12,
                        }}
                    >
                        <View
                            style={{
                                height: 6,
                                width: withScreen * 0.16,
                                backgroundColor: '#ccc',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                borderRadius: 4,
                                marginBottom: 8,
                            }}
                        ></View>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <View style={styles.flexRow}>
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
                                        <FontAwesomeIcon icon={faTrashCan} size={22} color="black" />
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>Xóa</Text>
                                        <Text style={{ fontSize: 14, fontWeight: 400, marginLeft: 16 }}>
                                            Gỡ khỏi lịch sử tìm kiếm của bạn
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <View style={styles.flexRow}>
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
                                        <FontAwesomeIcon icon={faThumbTack} size={20} color="black" />
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>
                                            Ghim nội dung tìm kiếm này
                                        </Text>
                                        <Text style={{ fontSize: 14, fontWeight: 400, marginLeft: 16 }}>
                                            Bạn chỉ có thể ghim 3 nội dung tìm kiếm cùng lúc.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {},
    header: {
        width: '100%',
        height: 100,
        // backgroundColor: ",
        paddingTop: 32,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        paddingLeft: 16,
        paddingRight: 16,
        columnGap: 12,
    },
    backIcon: {
        width: 16,
        height: 16,
    },
    inputField: {
        fontSize: 16,
        backgroundColor: '#cccccc',
        flex: 1,
        borderRadius: 30,
        height: 42,
        alignItems: 'center',
        paddingLeft: 16,
        position: 'relative',
    },
    title: {
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleLeft: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    titleRight: {
        fontSize: 18,
    },
    itemContainer: {
        height: 40,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        columnGap: 16,
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24,
        justifyContent: 'space-between',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 999,
    },
    menuText: {
        fontSize: 20,
        fontWeight: '600',
    },
    itemLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 16,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: withScreen,
        height: heightScreen * 0.08,
        // backgroundColor: "#ccc",
        padding: 8,
        paddingLeft: 16,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
