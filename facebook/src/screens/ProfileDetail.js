import {
    faArrowDown,
    faPen,
    faSearch,
    faArrowLeft,
    faCaretDown,
    faCamera,
    faEllipsis,
    faGraduationCap,
    faFootballBall,
    faFutbolBall,
    faClapperboard,
    faVideoCamera,
    faBell,
    faLink,
    faWandMagicSparkles,
    faArrowUpFromBracket,
    faTableCellsLarge,
    faHouse,
    faLocationDot,
    faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import Post from '../components/Post';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import * as ProfileServices from '../services/ProfileServices';
import * as PostServices from '../services/PostServices';
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
    setStoreProfile,
} from '../feature/profile';
import { setStoreListUser } from '../feature/listPost';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTimeAgo } from '../components/Convert';

withScreen = Dimensions.get('window').width;
heightScreen = Dimensions.get('window').height;

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

const Header = ({
    setModalVisible,
    selectedButton,
    setSelectedButton,
    handleButtonPress,
    setIsModalAvatar,
    profile,
}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const listFriend = useSelector((state) => state.friend.listUserFriend);

    return (
        <View>
            <View style={{ marginTop: 20, height: 290 }}>
                <Image
                    style={{ height: 230, width: 'auto' }}
                    source={{
                        uri: profile.imageBackground,
                    }}
                />
                <View style={styles.overlayContainer}>
                    <Image
                        style={styles.menuImg}
                        source={{
                            uri: profile.avatar,
                        }}
                    ></Image>
                </View>
                <View style={styles.cameraContainer1}>
                    <TouchableOpacity onPress={() => setIsModalAvatar(true)}>
                        <FontAwesomeIcon icon={faCamera} size={16} color="black"></FontAwesomeIcon>
                    </TouchableOpacity>
                </View>
                <View style={styles.cameraContainer2}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <FontAwesomeIcon icon={faCamera} size={26} color="black"></FontAwesomeIcon>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <Text style={{ fontSize: 20, fontWeight: '800', marginLeft: 20 }}>{profile.name}</Text>
                <View style={{ flexDirection: 'row', display: 'flex', marginTop: 10, marginLeft: 20 }}>
                    <Text style={{ fontSize: 14, fontWeight: '700', marginRight: 5 }}>{listFriend.total}</Text>
                    <Text style={{ fontSize: 14, opacity: 0.5 }}>bạn bè</Text>
                </View>
                <Text style={{ fontSize: 14, fontWeight: '500', marginTop: 4, marginLeft: 20 }}>
                    {profile.description}
                </Text>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <TouchableOpacity style={styles.buttonAddInfo}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>+ Thêm vào tin</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 8,
                        width: withScreen - 32,
                        marginLeft: 16,
                    }}
                >
                    <TouchableOpacity style={styles.buttonEdit} onPress={() => navigation.navigate('EditProfile')}>
                        <FontAwesomeIcon icon={faPen} size={16} color="black" style={{ marginRight: 10 }} />
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>Chỉnh sửa trang cá nhân</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonMenu}>
                        <FontAwesomeIcon icon={faEllipsis} size={16} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#c9cad2', height: 8, marginVertical: 16 }} />

                <View style={styles.buttonHeaderContainer}>
                    <TouchableOpacity
                        style={[styles.button, selectedButton === 'post' && styles.selectedButton]}
                        onPress={() => handleButtonPress('post')}
                    >
                        <Text style={[styles.buttonText, selectedButton === 'post' && styles.selectedText]}>
                            Bài viết
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selectedButton === 'photo' && styles.selectedButton]}
                        onPress={() => handleButtonPress('photo')}
                    >
                        <Text style={[styles.buttonText, selectedButton === 'photo' && styles.selectedText]}>Ảnh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selectedButton === 'reels' && styles.selectedButton]}
                        onPress={() => handleButtonPress('reels')}
                    >
                        <Text style={[styles.buttonText, selectedButton === 'reels' && styles.selectedText]}>
                            Reels
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.horizontalView}></View>
                </View>
                <View style={{ marginTop: 4 }}>
                    <Text style={{ fontSize: 20, fontWeight: '700', marginLeft: 14 }}>Chi tiết</Text>
                    <View>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                display: 'flex',
                                marginTop: 10,
                                width: withScreen - 32,
                                marginLeft: 16,
                                paddingVertical: 4,
                            }}
                        >
                            <FontAwesomeIcon icon={faHouse} size={20} color="#666" style={{ marginRight: 10 }} />
                            <Text>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: '300' }}>Địa chỉ </Text>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>
                                    {profile.address}{' '}
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                display: 'flex',
                                marginTop: 10,
                                width: withScreen - 32,
                                marginLeft: 16,
                                paddingVertical: 4,
                            }}
                        >
                            <FontAwesomeIcon icon={faLocationDot} size={20} color="#666" style={{ marginRight: 10 }} />
                            <Text>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: '300' }}>Sống tại </Text>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: '600', marginLeft: 16 }}>
                                    {profile.city}
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                display: 'flex',
                                marginTop: 10,
                                width: withScreen - 32,
                                marginLeft: 16,
                                paddingVertical: 4,
                            }}
                        >
                            <FontAwesomeIcon icon={faGlobe} size={20} color="#666" style={{ marginRight: 10 }} />
                            <Text>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: '300' }}>Ở </Text>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>
                                    {profile.country}
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        display: 'flex',
                        flexWrap: 'wrap',
                        marginTop: 8,
                        marginLeft: 16,
                        width: withScreen - 32,
                        justifyContent: 'space-around',
                    }}
                >
                    <TouchableOpacity style={styles.favarite}>
                        {/* <FontAwesomeIcon icon={faFutbolBall} size={18} color="#666" /> */}
                        <Text style={[styles.buttonText, , { paddingHorizontal: 6 }]}>⚽ Bóng đá</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.favarite}>
                        {/* <FontAwesomeIcon icon={faFutbolBall} size={18} color="#666" /> */}
                        <Text style={[styles.buttonText, { paddingHorizontal: 6 }]}>🎧 Nghe nhạc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.favarite}>
                        {/* <FontAwesomeIcon icon={faFutbolBall} size={18} color="#666" /> */}
                        <Text style={[styles.buttonText, { paddingHorizontal: 6 }]}>🌏 Du lịch</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.favarite}>
                        {/* <FontAwesomeIcon icon={faFutbolBall} size={18} color="#666" /> */}
                        <Text style={[styles.buttonText, { paddingHorizontal: 6 }]}>🍕 Ăn uống</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditProfile')}
                        style={{
                            backgroundColor: '#ecf4ff',
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            width: withScreen - 32,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40,
                        }}
                    >
                        <Text style={{ color: '#006fd1', fontSize: 16, fontWeight: '600' }}>
                            Chỉnh sửa chi tiết công khai
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 16,
                        width: withScreen - 32,
                        marginLeft: 16,
                    }}
                >
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: '700' }}>Bạn bè</Text>
                        <Text style={{ fontSize: 14, opacity: 0.5 }}>{listFriend.total} người bạn</Text>
                    </View>
                    <TouchableOpacity style={{ marginRight: 10 }}>
                        <Text style={{ fontSize: 16, color: '#0064d1' }}>Tìm bạn bè</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.listFriends}>
                    {listFriend.friends?.slice(0, 6).map((item, index) => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('ProfileOtherDetail', { props: item?.id });
                            }}
                            style={styles.friend}
                            key={index}
                        >
                            <Image
                                source={{
                                    uri: item?.image,
                                }}
                                style={styles.imgFriends}
                            />
                            <Text style={{ marginVertical: 4, fontSize: 16, fontWeight: '700' }}>{item?.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('FriendLists')}
                        style={{
                            backgroundColor: '#e5e6ed',
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            width: withScreen - 32,
                            // marginLeft: 16,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40,
                        }}
                    >
                        <Text
                            style={{
                                color: '#000',
                                fontSize: 16,
                                fontWeight: '700',
                            }}
                        >
                            Xem tất cả bạn bè
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: '#c9cad2', height: 8, marginVertical: 16 }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginLeft: 14 }}>
                        <Text style={{ fontSize: 20, fontWeight: '700' }}>Bài viết của bạn</Text>
                    </View>
                    <TouchableOpacity style={{ marginRight: 10 }}>
                        <Text style={{ fontSize: 16, color: '#0064d1' }}>Bộ lọc</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.underNav}>
                    <Image
                        style={styles.wrapAvatar}
                        source={{
                            uri: profile.avatar,
                        }}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
                        <View style={styles.youThink}>
                            <Text style={{ fontSize: 16, fontWeight: 500 }}>Bạn đang nghĩ gì?</Text>
                        </View>
                    </TouchableOpacity>

                    <Image
                        style={{ height: 26, width: 26, objectFit: 'cover' }}
                        source={require('../assets/icons/iconImage.png')}
                    ></Image>
                </View>
                <View
                    style={{
                        backgroundColor: '#f5f7f9',
                        flexDirection: 'row',
                        marginTop: 5,
                        height: 50,
                        paddingVertical: 8,
                    }}
                >
                    <TouchableOpacity style={styles.buttonPost}>
                        <FontAwesomeIcon icon={faClapperboard} size={22} color="red" />
                        <Text style={{ marginVertical: 4, fontSize: 16, fontWeight: '700', marginLeft: 10 }}>
                            Thước phim
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonPost}>
                        <FontAwesomeIcon icon={faVideoCamera} size={22} color="red" />
                        <Text style={{ marginVertical: 4, fontSize: 16, fontWeight: '700', marginLeft: 10 }}>
                            Phát trực tiếp
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#e5e6ed',
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            width: withScreen - 32,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 40,
                        }}
                    >
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>Quản lí bài viết</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: '#c9cad2', height: 8, marginVertical: 16 }} />
            </View>
        </View>
    );
};

const ProfileDetail = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user_id = useSelector((state) => state.profile.user_id);
    const [selectedButton, setSelectedButton] = useState('post');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalAvatar, setIsModalAvatar] = useState(false);
    // const [imageAvatar, setImageAvatar] = useState('');
    // const [imageBackground, setImageBackground] = useState('');
    const [outTiming, setOutTiming] = useState(0);

    const name = useSelector((state) => state.profile.name);
    const avatar = useSelector((state) => state.profile.avatar);
    const imageBackground = useSelector((state) => state.profile.imageBackground);
    const description = useSelector((state) => state.profile.description);
    const address = useSelector((state) => state.profile.address);
    const city = useSelector((state) => state.profile.city);
    const country = useSelector((state) => state.profile.country);
    const link = useSelector((state) => state.profile.link);
    const temp = useSelector((state) => state.profile.temp);
    const profile = {
        name: name,
        avatar: avatar,
        imageBackground: imageBackground,
        description: description,
        address: address,
        city: city,
        country: country,
        link: link,
        temp: temp,
    };

    const listPostUser = useSelector((state) => state.listPost.listPostUser);

    const handleButtonPress = (buttonType) => {
        setSelectedButton(buttonType);
    };

    const toggleModal = () => {
        setModalVisible(false);
        setOutTiming(0);
    };

    const toggleModalAvatar = () => {
        setIsModalAvatar(false);
        setOutTiming(0);
    };

    const handleBackdropPress = () => {
        setModalVisible(false);
        setIsModalAvatar(false);
        setOutTiming(1500);
    };

    const pickImageAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            allowsMultipleSelection: false,
            allowsEditing: true,
            // aspect: [4, 3],
            // quality: 1,
        });

        if (!result.canceled) {
            const mediaType = result.assets[0].type;

            if (mediaType === 'image') {
                const selectedImage = result.assets[0].uri;
                // setImageAvatar([selectedImage]);
                // console.log(selectedImage);
                dispatch(setStoreTemp(selectedImage));
                navigation.navigate('PreviewImage', { props: 'ImageAvatar' });
            }
        }
    };

    const pickImageBackground = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            allowsMultipleSelection: false,
            allowsEditing: true,
            // aspect: [4, 3],
            // quality: 1,
        });

        if (!result.canceled) {
            const mediaType = result.assets[0].type;

            if (mediaType === 'image') {
                const selectedImage = result.assets[0].uri;
                // setImageBackground([selectedImage]);
                // console.log(selectedImage);
                dispatch(setStoreTemp(selectedImage));
                navigation.navigate('PreviewImage', { props: 'ImageBackground' });
            }
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await ProfileServices.getUserInfo({ user_id: '762' });
                // console.log('profile', result.data.data);
                if (result.data.code == '1000') {
                    dispatch(setStoreProfile(result.data.data));
                }
            } catch (error) {
                console.log('fetchApi ProfileServices getUserInfo' + error);
            }
        };
        fetchApi();
    }, []);

    const [lastId, setLastId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [hasData, setHasData] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await PostServices.getListPost({
                user_id: user_id,
                in_campaign: '1',
                campaign_id: '1',
                latitude: '1.0',
                longitude: '1.0',
                last_id: lastId,
                index: '0',
                count: '10',
            });

            setLastId(response.data.data.last_id);

            // console.log(response.data.data.post);

            setData((prevData) => [
                ...prevData,
                ...response.data.data.post?.map((item) => {
                    return {
                        id: item?.id,
                        owner: item.author.name,
                        owner_id: item.author.id,
                        avatar: item.author.avatar,
                        content: item.described,
                        images: item?.image,
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
            ]);

            setHasData(response.data.data.post?.length > 0);

            // dispatch(
            //     setStoreListUser((prevData) => [
            //         ...prevData,
            //         ...response.data.data.post?.map((item) => {
            //             return {
            //                 id: item?.id,
            //                 owner: item.author.name,
            //                 avatar: item.author.avatar,
            //                 content: item.described,
            //                 images: item?.image,
            //                 video: item?.video?.url,
            //                 created: item?.created,
            //                 feel: item?.feel,
            //                 comment_mark: item?.comment_mark,
            //                 is_felt: item?.is_felt,
            //                 is_blocked: item?.is_blocked,
            //                 can_edit: item?.can_edit,
            //                 banned: item?.banned,
            //                 state: item?.state,
            //             };
            //         }),
            //     ]),
            // );
        } catch (error) {
            console.error('Error fetching data4', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEndReached = () => {
        if (!loading && hasData) {
            fetchData();
        }
    };

    const renderFooter = () => {
        return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', paddingBottom: 8 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon icon={faArrowLeft} size={24} color="black" style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', display: 'flex', marginLeft: 50 }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', marginRight: 12 }}>{name}</Text>
                            <FontAwesomeIcon icon={faCaretDown} size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', display: 'flex', marginRight: 10 }}>
                        <FontAwesomeIcon icon={faPen} size={24} color="black" style={{ marginRight: 16 }} />
                        <FontAwesomeIcon icon={faSearch} size={24} color="black" style={{ marginRight: 8 }} />
                    </View>
                </View>

                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <Header
                            setModalVisible={setModalVisible}
                            selectedButton={selectedButton}
                            setSelectedButton={setSelectedButton}
                            handleButtonPress={handleButtonPress}
                            setIsModalAvatar={setIsModalAvatar}
                            profile={profile}
                        />
                    }
                    renderItem={({ item }) => (
                        <View>
                            <Post item={item} />
                            <View style={styles.divLarge}></View>
                        </View>
                    )}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={renderFooter}
                />
            </View>

            <Modal
                isVisible={isModalVisible}
                onSwipeComplete={toggleModal}
                swipeDirection={['down']}
                onBackdropPress={handleBackdropPress}
                animationOutTiming={outTiming}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        height: heightScreen * 0.44,
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
                                <View style={styles.wrapIcon}>
                                    <FontAwesomeIcon icon={faImage} size={20} color="black" />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>Xem ảnh bìa</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <View style={styles.wrapIcon}>
                                    <FontAwesomeIcon icon={faWandMagicSparkles} size={20} color="black" />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>
                                        Tạo ảnh bìa bằng avatar
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickImageBackground}>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <View style={styles.wrapIcon}>
                                    <FontAwesomeIcon icon={faArrowUpFromBracket} size={20} color="black" />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>Tải ảnh lên</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <View style={styles.wrapIcon}>
                                    <FontAwesomeIcon icon={faFacebook} size={20} color="black" />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>
                                        Chọn ảnh trên Facebook
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <View style={styles.wrapIcon}>
                                    <FontAwesomeIcon icon={faTableCellsLarge} size={20} color="black" />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>
                                        Tạo nhóm ảnh bìa
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal
                isVisible={isModalAvatar}
                onSwipeComplete={toggleModalAvatar}
                swipeDirection={['down']}
                onBackdropPress={handleBackdropPress}
                animationOutTiming={outTiming}
                style={{ justifyContent: 'flex-end', margin: 0 }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        height: heightScreen * 0.366,
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
                                <View style={styles.wrapIcon}>
                                    <FontAwesomeIcon icon={faImage} size={20} color="black" />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>
                                        Xem ảnh đại diện
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('CameraScreen', {upAvatar: true})}>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <View style={styles.wrapIcon}>
                                    <FontAwesomeIcon icon={faCamera} size={20} color="black" />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>Chụp ảnh</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickImageAvatar}>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <View style={styles.wrapIcon}>
                                    <FontAwesomeIcon icon={faArrowUpFromBracket} size={20} color="black" />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>
                                        Chọn ảnh đại diện
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <View style={styles.flexRow}>
                                <View style={styles.wrapIcon}>
                                    <FontAwesomeIcon icon={faFacebook} size={20} color="black" />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 600, marginLeft: 16 }}>
                                        Chọn ảnh trên Facebook
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: '#fdfcfc',
        paddingTop: 40,
    },
    menuImg: {
        width: 160,
        height: 160,
    },
    imgFriends: {
        width: (withScreen - 64) / 3,
        height: (withScreen - 64) / 3,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
    },
    cameraContainer1: {
        position: 'absolute',
        top: 240,
        left: 130,
        width: 30,
        height: 30,
        backgroundColor: '#e2e4eb',
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'white',
    },
    buttonAddInfo: {
        backgroundColor: '#0c64fe', // Màu nền của button
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: withScreen - 32,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    buttonEdit: {
        flexDirection: 'row',
        display: 'flex',
        backgroundColor: '#e5e6ed', // Màu nền của button
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: withScreen * 0.75,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        height: 40,
    },
    buttonMenu: {
        backgroundColor: '#e5e6ed', // Màu nền của button
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: withScreen * 0.13,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    buttonPost: {
        flexDirection: 'row',
        display: 'flex',
        width: 100,
        backgroundColor: '#feffff',
        height: 34,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        marginLeft: 10,
    },
    cameraContainer2: {
        position: 'absolute',
        top: 180,
        left: 340,
        width: 40,
        height: 40,
        backgroundColor: '#e2e4eb',
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'white',
    },
    overlayContainer: {
        position: 'absolute',
        top: 110,
        left: 10,
        borderRadius: 999,
        overflow: 'hidden',
        borderWidth: 4,
        borderColor: 'white',
    },
    buttonHeaderContainer: {
        flexDirection: 'row',
        display: 'flex',
        // marginHorizontal: 4,
        width: withScreen - 32,
        marginLeft: 16,
    },
    button: {
        backgroundColor: 'transparent',
        borderRadius: 16,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        marginRight: 8,
    },
    selectedButton: {
        backgroundColor: '#ecf4ff',
    },
    selectedText: {
        color: '#2571bc',
    },
    buttonText: {
        // marginHorizontal: 8,
        fontSize: 16,
        fontWeight: '600',
        paddingHorizontal: 12,
        // marginRight: 8,
        textAlign: 'center',
    },
    horizontalView: {
        marginVertical: 8,
        width: withScreen,
        height: 1,
        backgroundColor: 'black',
        opacity: 0.1,
    },
    favarite: {
        flexDirection: 'row',
        display: 'flex',
        marginTop: 10,
        marginLeft: 5,
        backgroundColor: '#e2e4eb',
        width: 120,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listFriends: {
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        // marginVertical: 10,
        marginTop: 12,
        marginHorizontal: 20,
        backgroundColor: '#fdfcfc',
    },
    friend: {
        marginHorizontal: 2,
        marginBottom: 6,
        alignItems: 'center',
        height: (withScreen - 64) / 3 + 32,
        borderRadius: 6,
        backgroundColor: '#feffff',
        shadowColor: '#fdfcfc',
        borderWidth: 0.2,
        borderColor: '#bbb',
    },
    underNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: withScreen - 40,
        paddingTop: 20,
        marginLeft: 16,
        marginRight: 24,
    },
    wrapAvatar: {
        width: 46,
        height: 46,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    youThink: {
        borderColor: '#d0d0d0',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 8,
        width: withScreen * 0.66,
        borderRadius: 999,
        paddingLeft: 20,
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
    wrapIcon: {
        backgroundColor: '#e1e1e1',
        borderRadius: 999,
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ProfileDetail;
