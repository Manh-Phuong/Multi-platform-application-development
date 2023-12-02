import { faArrowDown, faPen, faSearch, faArrowLeft, faCaretDown, faCamera, faEllipsis, faGraduationCap, faFootballBall, faFutbolBall, faClapperboard, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation, useRoute } from '@react-navigation/native';
import Post from "../components/Post";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const data = [
  {
    id: "1",
    owner: "Samsung",
    avatar:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/369910721_10160974400856815_2716180799949117069_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=CcXwFrZErvQAX_Yp-Xt&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfDx4w4M8XVDrGAsp3dkQyjJ_mHy4wdsEVlMhOgYWQ3KQg&oe=653D275E",
    content:
      "Ra mắt Bộ Fan Edition Galaxy S23 FE | Buds FE cho trải nghiệm kết nối hoàn hảo, thoả sức phiêu cùng thần tượng. ",
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/393720450_362399836141009_7541278015979169571_n.jpg?stp=dst-jpg_p843x403&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xm-IrbuMr5cAX9fq4cC&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfBPrAbhH3rAwCw9IUrAMZngZtFKewhEpzPCmFQI-pDX6Q&oe=653DB1CC",
  },
  {
    id: "2",
    owner: "XMEN - For Boss",
    avatar:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/358681064_279532781395858_6541355092957352746_n.png?stp=cp0_dst-png_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kV-SiG8f4OMAX_O3YIG&_nc_oc=AQkmR5EOt0tYta1-jW3qZK8Tdtl-mKXrOyxfq9TsdA4TIk2Rd0BZ2gebff6-sGCnftpbqAOEdPnTg4DerXWYApN3&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfAK_g3aTwWZUasEUQR0sWnh4rTCCj128MKzLRV8ZjHQFQ&oe=653C9C31",
    content:
      "BOSS BẢN LĨNH CÓ GU - CHOOSE LĂN XMEN FOR BOSS Sau nhiệm vụ làm thơ thả thính, AMY A.I tiếp nhận bài toán thứ 2 với nhiều mệnh đề khó:⚡Giải pháp nào cho mùi hương dưới cánh tay khó nói? ⚡Trấn yểm hương cánh” nhưng không quá nồng nặc, thể hiện cái gu chất Boss? 😎 Làm KHÓ AI chứ có AMY tôi, KHÓ thành KHOÁI ngay. ",
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t45.1600-4/381622252_23861468996010365_4203897755470830325_n.png?stp=cp0_dst-jpg_p526x296_q90_spS444&_nc_cat=105&ccb=1-7&_nc_sid=528f85&_nc_ohc=FI08_ji7SO4AX8bJois&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfCMpCCObcK8OdLtD7pu5HEsmvkM-_zPw8f5iXB0-7iDmg&oe=653CC10B",
  },
  {
    id: "3",
    owner: "Recent",
    avatar:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/309658071_134569009335886_1161259950930816405_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=MaK2p23PPr0AX8RKYbG&_nc_ht=scontent.fhan15-1.fna&oh=00_AfCERp7xiSlMLkrQ3eRjYyzThfMMHBaOZqodsAy2Y11OVg&oe=653D33B7",
    content:
      "Ra mắt Bộ Fan Edition Galaxy S23 FE | Buds FE cho trải nghiệm kết nối hoàn hảo, thoả sức phiêu cùng thần tượng. ",
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/393459962_305151942277591_5038326346084193573_n.jpg?stp=cp6_dst-jpg_s960x960&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=2TunSSKEXW4AX8H9dD4&_nc_ht=scontent.fhan15-1.fna&oh=00_AfBCy3r7mJ6UwDA5lQk9t971_4bxwUA1iVSfk3LIA8jlxQ&oe=653E7AC2",
  },
  {
    id: "4",
    owner: "Study With Me",
    avatar:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/241357309_106468151792976_3114688578357951904_n.jpg?stp=c80.0.320.320a_dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=yOpqaii7WM8AX_q0XQd&_nc_ht=scontent.fhan15-1.fna&oh=00_AfCrtyqfnW7f4byf6dmX8D7Vkndr8IOnyP9eC_SWPqYihQ&oe=653D5ED8",
    content: "Chúng ta luôn tốt lên từng ngày~",
    image:
      "https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/394179576_346763921199834_6889880587632515568_n.jpg?stp=dst-jpg_p843x403&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kcNxzMZrwwMAX_lP19i&_nc_ht=scontent.fhan15-2.fna&oh=00_AfDNBad6-w6oF0QbYxj2AEl2849Ly96Bczxa0UNlw0T3SA&oe=653D4E37",
  },
  {
    id: "5",
    owner: "Kiến Trúc Việt - Thiết Kế Thi Công Trọn Gói",
    avatar:
      "https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/305406546_1118571769035664_2586701446268501879_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=jXQa653iGm4AX-wxdnw&_nc_ht=scontent.fhan15-2.fna&oh=00_AfDCcCy-I1tMYiIl2B5Dy4tN6xaBmNLT_fR6fIqqgMuFjw&oe=653E1025",
    content: "Làm thiết kế xong ông bà không ưng 🥹",
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/395157047_816872920441944_5715739874155126527_n.jpg?stp=cp6_dst-jpg_p843x403&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=KOuOr_7ZVgQAX-heCI-&_nc_oc=AQmVCqIjkosQsaxTqJKCz78SI32umEZg0LFmBzCcFyz95YHEtqtTyJAA0A-0ZrklP4gvHltPc7B2GgJlX2RrdjLb&_nc_ht=scontent.fhan15-1.fna&oh=00_AfBE4ol7Y_jndIpLvr8rJ19xnuFzPkaz0lPDgyRkbnqaow&oe=653D2D58",
  },
  {
    id: "6",
    owner: "Một chút decor",
    avatar:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/329991810_565594582204694_5571908352438977267_n.jpg?stp=c53.0.320.320a_dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=2XIpav4JB7cAX8glJNM&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDzr56Qev1G0szwS0CvdqveLJcrhvm7Ky0Lp8mcbrQkAQ&oe=653D9A88",
    content: "Một chiếc phòng tui luôn mơ ước 🥰",
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/395132393_266120919757244_6341941126357122239_n.jpg?stp=cp6_dst-jpg_s960x960&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=DQRvecpHirQAX895Kgs&_nc_ht=scontent.fhan15-1.fna&oh=00_AfBchRtbaVZ_CLIbwTWcx8jW2LCgQdO8qzLbu8oIl4KAtQ&oe=653E2218",
  },
  {
    id: "7",
    owner: "Troll Cả Showbiz",
    avatar:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/380547481_740120898129984_7583509023442880520_n.jpg?stp=dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=0f_3pflO6kYAX_hONK1&_nc_ht=scontent.fhan15-1.fna&oh=00_AfAMGzDRvDgoIF6O5GVqzizIQbTlX-Piws7MRYEzgo87Sg&oe=653D0CBB",
    content: "Cảnh phim bị cắt trong The Shining 1980 👻",
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/393598280_759911739484233_1003366349818070723_n.jpg?stp=dst-jpg_s960x960&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=EZuOrZmj-GUAX-HU0HH&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDsKK7RW6ivMWc9q-qxnSHN2ITHQEqnJslNRdyTGzs2sQ&oe=653D7B6E",
  },
  {
    id: "8",
    owner: "Anh Tùng Design - Kiến Trúc Nội Thất Thông Minh",
    avatar:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/371098588_793859796077879_2506753863383987577_n.jpg?stp=dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_OAfq_YCLewAX-9aKgS&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDGvpwdGM9KrOLfQQfoiBFXQ422MBkNxNK2yvxF2CMjBQ&oe=653CE45D",
    content: `Bạn dám vẽ tôi dám làm 🤌
------------------ 
Nguồn: HUCE News`,
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/393267843_830931319037393_7019912536548327131_n.jpg?stp=cp6_dst-jpg_p843x403&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=NphvQTrNWXMAX_H-Hkj&_nc_ht=scontent.fhan15-1.fna&oh=00_AfBrh_PgYowAtaGrznElmmPoIBKJihf4N1bhhNfx5kksng&oe=653E3D1F",
  },
  {
    id: "9",
    owner: "Trương Toàn - IPHONE SÓC TRĂNG",
    avatar:
      "https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/377779680_784875696987100_6321804957547872809_n.jpg?stp=cp6_dst-jpg_p60x60&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3NB_RallAboAX-QUWdy&_nc_ht=scontent.fhan15-2.fna&oh=00_AfC913AkTF8p-abQK55X1XlARieUbdIZWT99IgtGbOkHXg&oe=653E76AE",
    content: "cuối tuần ròi nghỉ ngơi thoi",
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/394537012_810548441086492_4185753828941852292_n.jpg?stp=dst-jpg_s960x960&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=thPm4HsAJYAAX9aONiY&_nc_ht=scontent.fhan15-1.fna&oh=00_AfAHQW8o91PWku2DKV4McxMBNTkc8i68856Mqq86VVboBg&oe=653DA324",
  },
  {
    id: "10",
    owner: "Trương Toàn - IPHONE SÓC TRĂNG",
    avatar:
      "https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/377779680_784875696987100_6321804957547872809_n.jpg?stp=cp6_dst-jpg_p60x60&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3NB_RallAboAX-QUWdy&_nc_ht=scontent.fhan15-2.fna&oh=00_AfC913AkTF8p-abQK55X1XlARieUbdIZWT99IgtGbOkHXg&oe=653E76AE",
    content: "kém",
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/393689972_810200304454639_826145831067748735_n.jpg?stp=dst-jpg_s960x960&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=dxR-qklsdM0AX8SVQNH&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDSPGASGCDc6K_IgVfkqvvQVBOoOtRkKKaoe9cpRkLW0g&oe=653DA0DD",
  },
  {
    id: "11",
    owner: "Đà Lạt Review Tất Tần Tật",
    avatar:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/300433472_407878474778564_7824663035530571659_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=XGTjPsui3CUAX8AgEHn&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDUAyxFwrw8aDEZBLdqPmrfz1_EaGdDPFu3GWZum2cB_Q&oe=653D5E63",
    content: `Góc nhìn Đà Lạt về đêm 😍😍😍
    👉 Tham gia nhóm Đà Lạt Review 
    Ảnh 📷: Thành Công`,
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/395096585_666174282282314_5369529996375320568_n.jpg?stp=dst-jpg_p843x403&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=4HHeFRWwrbUAX-4Cpjp&_nc_ht=scontent.fhan15-1.fna&oh=00_AfAtyLffIIa8ZpRLW5r8MvGHnHmp8BRm_uGytPpqDvt_8A&oe=653CEC88",
  },
];
const ProfileDetail = () => {
  const navigation = useNavigation();
  const { width: screenWidth } = Dimensions.get('window');
  const [selectedButton, setSelectedButton] = useState('post');

  const handleButtonPress = (buttonType) => {
    setSelectedButton(buttonType);
  };
  return (
    <ScrollView style={styles.container}>

      <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} color="black" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ flexDirection: 'row', display: 'flex', marginLeft: 50 }}>
            <Text style={{ fontSize: 16, fontWeight: "500", marginRight: 12 }}>Tô  Tường</Text>
            <FontAwesomeIcon icon={faCaretDown} size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', display: 'flex', marginRight: 10 }}>
          <FontAwesomeIcon icon={faPen} size={24} color="black" style={{ marginRight: 10 }} />
          <FontAwesomeIcon icon={faSearch} size={24} color="black" />
        </View>

      </View>
      <View style={{ marginTop: 20, height: 290 }}>
        <Image style={{ height: 230, width: 'auto' }}
          source={require("../assets/images/bg-intro.jpg")}
        />
        <View style={styles.overlayContainer}>
          <Image
            style={styles.menuImg}
            source={{
              uri: "https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg",
            }}>
          </Image>
        </View>
        <View style={styles.cameraContainer1}>
          <FontAwesomeIcon icon={faCamera} size={16} color="black">
          </FontAwesomeIcon>
        </View>
        <View style={styles.cameraContainer2}>
          <FontAwesomeIcon icon={faCamera} size={26} color="black">
          </FontAwesomeIcon>
        </View>
      </View>
      <View >
        <Text style={{ fontSize: 20, fontWeight: '800', marginLeft: 20 }}>Tô Tường</Text>
        <View style={{ flexDirection: 'row', display: 'flex', marginTop: 10, marginLeft: 20 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', marginRight: 5 }}>400</Text>
          <Text style={{ fontSize: 14, opacity: 0.5 }}>bạn bè</Text>
        </View>
        <Text style={{ fontSize: 14, fontWeight: '500', marginTop: 4, marginLeft: 20 }}>Qua môn tặng thầy mì tôm thanh long</Text>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <TouchableOpacity style={styles.buttonAddInfo}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>+ Thêm vào tin</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
          <TouchableOpacity style={styles.buttonEdit}>
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
            style={[
              styles.button,
              selectedButton === 'post' && styles.selectedButton,
            ]}
            onPress={() => handleButtonPress('post')}
          >
            <Text style={[styles.buttonText, selectedButton === 'post' && styles.selectedText]}>Bài viết</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 'photo' && styles.selectedButton,
            ]}
            onPress={() => handleButtonPress('photo')}
          >
            <Text style={[styles.buttonText, selectedButton === 'photo' && styles.selectedText]}>Ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 'reels' && styles.selectedButton,
            ]}
            onPress={() => handleButtonPress('reels')}
          >
            <Text style={[styles.buttonText, selectedButton === 'reels' && styles.selectedText]}>Reels</Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          <View style={styles.horizontalView}></View>
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: '700', marginLeft: 14 }}>Chi tiết</Text>
          <View>
            <TouchableOpacity style={{ flexDirection: 'row', display: 'flex', marginTop: 10, marginLeft: 16, width: '90%' }} >
              <FontAwesomeIcon icon={faGraduationCap} size={20} color="#666" style={{ marginRight: 10 }} />
              <Text>
                <Text style={{ color: '#000', fontSize: 16, fontWeight: '300' }}>Học tại </Text>
                <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>Đại học Bách khoa Hà Nội - Hanoi University of Science and Technology</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={{ flexDirection: 'row', display: 'flex', marginTop: 10, marginLeft: 16, width: '90%' }} >
              <FontAwesomeIcon icon={faGraduationCap} size={20} color="#666" style={{ marginRight: 10 }} />
              <Text>
                <Text style={{ color: '#000', fontSize: 16, fontWeight: '300' }}>Đã học tại </Text>
                <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>lớp thầy Tú và thầy giáo Ba</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={{ flexDirection: 'row', display: 'flex', marginTop: 10, marginLeft: 16, width: '90%' }} >
              <FontAwesomeIcon icon={faEllipsis} size={20} color="#666" style={{ marginRight: 10 }} />
              <Text style={{ color: '#000', fontSize: 16, fontWeight: '300' }}>Xem thêm thông tin giới thiệu của bạn</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
          <TouchableOpacity style={styles.favarite}>
            <FontAwesomeIcon icon={faFutbolBall} size={18} color="#666" />
            <Text style={styles.buttonText}>Bóng đá</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.favarite}>
            <FontAwesomeIcon icon={faFutbolBall} size={18} color="#666" />
            <Text style={styles.buttonText}>Bóng đá</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.favarite}>
            <FontAwesomeIcon icon={faFutbolBall} size={18} color="#666" />
            <Text style={styles.buttonText}>Bóng đá</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.favarite}>
            <FontAwesomeIcon icon={faFutbolBall} size={18} color="#666" />
            <Text style={styles.buttonText}>Bóng đá</Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <TouchableOpacity style={{
            backgroundColor: '#ecf4ff', paddingVertical: 10,
            paddingHorizontal: 20,
            width: 340,
            borderRadius: 5,
            justifyContent: 'center', alignItems: 'center',
            height: 40
          }}>
            <Text style={{ color: '#006fd1', fontSize: 16, fontWeight: '600' }}>Chỉnh sửa chi tiết công khai</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
          <View style={{ marginLeft: 14 }}>
            <Text style={{ fontSize: 20, fontWeight: '700' }}>Bạn bè</Text>
            <Text style={{ fontSize: 14, opacity: 0.5 }}>400 người bạn</Text>
          </View>
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Text style={{ fontSize: 18, color: 'blue' }}>Tìm bạn bè</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listFriends}>
          <TouchableOpacity style={styles.friend}>
            <Image
              source={{
                uri: "https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg",
              }}
              style={styles.imgFriends}
            />
            <Text style={{ marginVertical: 4, fontSize: 16, fontWeight: '700' }}>Vợ bạn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.friend}>
            <Image
              source={{
                uri: "https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg",
              }}
              style={styles.imgFriends}
            />
            <Text style={{ marginVertical: 4, fontSize: 16, fontWeight: '700' }}>Vợ bạn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.friend}>
            <Image
              source={{
                uri: "https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg",
              }}
              style={styles.imgFriends}
            />
            <Text style={{ marginVertical: 4, fontSize: 16, fontWeight: '700' }}>Vợ bạn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.friend}>
            <Image
              source={{
                uri: "https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg",
              }}
              style={styles.imgFriends}
            />
            <Text style={{ marginVertical: 4, fontSize: 16, fontWeight: '700', }}>Vợ bạn</Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <TouchableOpacity style={{
            backgroundColor: '#e5e6ed', paddingVertical: 10,
            paddingHorizontal: 20,
            width: 340,
            borderRadius: 5,
            justifyContent: 'center', alignItems: 'center',
            height: 40
          }}>
            <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>Xem tất cả bạn bè</Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          <View style={styles.horizontalView}></View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
          <View style={{ marginLeft: 14 }}>
            <Text style={{ fontSize: 20, fontWeight: '700' }}>Bài viết của bạn</Text>
          </View>
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Text style={{ fontSize: 18, color: 'blue' }}>Bộ lọc</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.underNav}>
          <Image
            style={styles.wrapAvatar}
            source={{
              uri: "https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg",
            }}
          />
          <TouchableOpacity onPress={() => navigation.navigate("CreatePost")}>
            <View style={styles.youThink}>
              <Text style={{ fontSize: 16, fontWeight: 500 }}>
                Bạn đang nghĩ gì?
              </Text>
            </View>
          </TouchableOpacity>

          <Image
            style={{ height: 26, width: 26, objectFit: "cover" }}
            source={require("../assets/icons/iconImage.png")}
          ></Image>

        </View>
        <View style={{ backgroundColor: '#f5f7f9', flexDirection: 'row', marginTop: 5, height: 50,paddingVertical:8 }}>
          <TouchableOpacity style={styles.buttonPost}>
            <FontAwesomeIcon icon={faClapperboard} size={22} color="red" />
            <Text style={{ marginVertical: 4, fontSize: 16, fontWeight: '700',marginLeft:10 }}>Thước phim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPost}>
            <FontAwesomeIcon icon={faVideoCamera} size={22} color="red" />
            <Text style={{ marginVertical: 4, fontSize: 16, fontWeight: '700', marginLeft:10}}>Phát trực tiếp</Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <TouchableOpacity style={{
            backgroundColor: '#e5e6ed', paddingVertical: 10,
            paddingHorizontal: 20,
            width: 340,
            borderRadius: 5,
            justifyContent: 'center', alignItems: 'center',
            height: 40
          }}>
            <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>Quản lí bài viết</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: '#c9cad2', height: 8, marginVertical: 16 }} />
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}

            renderItem={({ item }) => (
              <View>
                {/* <Post item={item} /> */}
                {/* oncommentPress -> toggleComments */}
                {/* <Post item={item} onCommentPress={toggleComments} /> */}
                <Post item={item} />

                <View style={styles.divLarge}></View>
              </View>
            )}
          />
        </View>
      </View>

    </ScrollView>
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
    width: 100,
    height: 100,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6
  },
  cameraContainer1: {
    position: 'absolute',
    top: 240,
    left: 130,
    width: 30,
    height: 30,
    backgroundColor: "#e2e4eb",
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
    width: 360,
    borderRadius: 5,
    justifyContent: 'center', alignItems: 'center',
    height: 40
  },
  buttonEdit: {
    flexDirection: 'row', display: 'flex',
    backgroundColor: '#e5e6ed', // Màu nền của button
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 305,
    borderRadius: 5,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 10,
    height: 40
  },
  buttonMenu: {
    backgroundColor: '#e5e6ed', // Màu nền của button
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 45,
    borderRadius: 5,
    justifyContent: 'center', alignItems: 'center',
    height: 40
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
    marginLeft:10
  },
  cameraContainer2: {
    position: 'absolute',
    top: 180,
    left: 340,
    width: 40,
    height: 40,
    backgroundColor: "#e2e4eb",
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
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    paddingVertical: 10,
    justifyContent: 'center', alignItems: 'center',
    width: 'auto'
  },
  selectedButton: {
    backgroundColor: '#ecf4ff',
  },
  selectedText: {
    color: '#2571bc'
  },
  buttonText: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: '600'
  },
  horizontalView: {
    marginVertical: 8,
    width: '90%',
    height: 1, // Đây là chiều cao của dòng ngang, bạn có thể điều chỉnh theo ý muốn
    backgroundColor: 'black',
    opacity: 0.1
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
    justifyContent: 'center', alignItems: 'center',
  },
  listFriends: {
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "#fdfcfc"
  },
  friend: {
    marginHorizontal: 2, alignItems: 'center',
    height: 140,
    borderRadius: 6,
    backgroundColor: "#feffff",
    shadowColor: '#fdfcfc',
    borderWidth: 0.2,
    borderColor: '#bbb'
  },
  underNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: withScreen - 40,
    paddingTop: 20,
    marginLeft: 16,
    marginRight: 24,
  },
  wrapAvatar: {
    width: 46,
    height: 46,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  youThink: {
    borderColor: "#d0d0d0",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 8,
    width: withScreen * 0.66,
    borderRadius: 999,
    paddingLeft: 20,
  },

});

export default ProfileDetail;
