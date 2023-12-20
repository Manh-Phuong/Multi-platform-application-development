import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  FlatList,
  Animated,
  Easing,
  BackHandler,
} from "react-native";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCamera,
  faComment,
  faPen,
  faPlus,
  faStore,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { faBell, faImage } from "@fortawesome/free-regular-svg-icons";
import {
  HomeIcon,
  VideoIcon,
  FriendIcon,
  MarketIcon,
  MessageIcon,
} from "../assets/icons";
import { ScrollView } from "react-native-gesture-handler";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import Post from "../components/Post";
import Comment from "../components/Comment";
import Menu from "./Menu";

withScreen = Dimensions.get("window").width;
heightScreen = Dimensions.get("window").height;

const data = [
  {
    id: "1",
    name: "Samsung",
    avatar:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/369910721_10160974400856815_2716180799949117069_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=CcXwFrZErvQAX_Yp-Xt&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfDx4w4M8XVDrGAsp3dkQyjJ_mHy4wdsEVlMhOgYWQ3KQg&oe=653D275E",
    content:
      "Ra mắt Bộ Fan Edition Galaxy S23 FE | Buds FE cho trải nghiệm kết nối hoàn hảo, thoả sức phiêu cùng thần tượng. ",
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/393720450_362399836141009_7541278015979169571_n.jpg?stp=dst-jpg_p843x403&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=xm-IrbuMr5cAX9fq4cC&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfBPrAbhH3rAwCw9IUrAMZngZtFKewhEpzPCmFQI-pDX6Q&oe=653DB1CC",
  },
  {
    id: "2",
    name: "XMEN - For Boss",
    avatar:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/358681064_279532781395858_6541355092957352746_n.png?stp=cp0_dst-png_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kV-SiG8f4OMAX_O3YIG&_nc_oc=AQkmR5EOt0tYta1-jW3qZK8Tdtl-mKXrOyxfq9TsdA4TIk2Rd0BZ2gebff6-sGCnftpbqAOEdPnTg4DerXWYApN3&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfAK_g3aTwWZUasEUQR0sWnh4rTCCj128MKzLRV8ZjHQFQ&oe=653C9C31",
    content:
      "BOSS BẢN LĨNH CÓ GU - CHOOSE LĂN XMEN FOR BOSS Sau nhiệm vụ làm thơ thả thính, AMY A.I tiếp nhận bài toán thứ 2 với nhiều mệnh đề khó:⚡Giải pháp nào cho mùi hương dưới cánh tay khó nói? ⚡Trấn yểm hương cánh” nhưng không quá nồng nặc, thể hiện cái gu chất Boss? 😎 Làm KHÓ AI chứ có AMY tôi, KHÓ thành KHOÁI ngay. ",
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t45.1600-4/381622252_23861468996010365_4203897755470830325_n.png?stp=cp0_dst-jpg_p526x296_q90_spS444&_nc_cat=105&ccb=1-7&_nc_sid=528f85&_nc_ohc=FI08_ji7SO4AX8bJois&_nc_ht=scontent.fhan15-1.fna&_nc_e2o=f&oh=00_AfCMpCCObcK8OdLtD7pu5HEsmvkM-_zPw8f5iXB0-7iDmg&oe=653CC10B",
  },
  {
    id: "3",
    name: "Recent",
    avatar:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/309658071_134569009335886_1161259950930816405_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=MaK2p23PPr0AX8RKYbG&_nc_ht=scontent.fhan15-1.fna&oh=00_AfCERp7xiSlMLkrQ3eRjYyzThfMMHBaOZqodsAy2Y11OVg&oe=653D33B7",
    content:
      "Ra mắt Bộ Fan Edition Galaxy S23 FE | Buds FE cho trải nghiệm kết nối hoàn hảo, thoả sức phiêu cùng thần tượng. ",
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/393459962_305151942277591_5038326346084193573_n.jpg?stp=cp6_dst-jpg_s960x960&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=2TunSSKEXW4AX8H9dD4&_nc_ht=scontent.fhan15-1.fna&oh=00_AfBCy3r7mJ6UwDA5lQk9t971_4bxwUA1iVSfk3LIA8jlxQ&oe=653E7AC2",
  },
  {
    id: "4",
    name: "Study With Me",
    avatar:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/241357309_106468151792976_3114688578357951904_n.jpg?stp=c80.0.320.320a_dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=yOpqaii7WM8AX_q0XQd&_nc_ht=scontent.fhan15-1.fna&oh=00_AfCrtyqfnW7f4byf6dmX8D7Vkndr8IOnyP9eC_SWPqYihQ&oe=653D5ED8",
    content: "Chúng ta luôn tốt lên từng ngày~",
    image:
      "https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/394179576_346763921199834_6889880587632515568_n.jpg?stp=dst-jpg_p843x403&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kcNxzMZrwwMAX_lP19i&_nc_ht=scontent.fhan15-2.fna&oh=00_AfDNBad6-w6oF0QbYxj2AEl2849Ly96Bczxa0UNlw0T3SA&oe=653D4E37",
  },
  {
    id: "5",
    name: "Kiến Trúc Việt - Thiết Kế Thi Công Trọn Gói",
    avatar:
      "https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/305406546_1118571769035664_2586701446268501879_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=jXQa653iGm4AX-wxdnw&_nc_ht=scontent.fhan15-2.fna&oh=00_AfDCcCy-I1tMYiIl2B5Dy4tN6xaBmNLT_fR6fIqqgMuFjw&oe=653E1025",
    content: "Làm thiết kế xong ông bà không ưng 🥹",
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/395157047_816872920441944_5715739874155126527_n.jpg?stp=cp6_dst-jpg_p843x403&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=KOuOr_7ZVgQAX-heCI-&_nc_oc=AQmVCqIjkosQsaxTqJKCz78SI32umEZg0LFmBzCcFyz95YHEtqtTyJAA0A-0ZrklP4gvHltPc7B2GgJlX2RrdjLb&_nc_ht=scontent.fhan15-1.fna&oh=00_AfBE4ol7Y_jndIpLvr8rJ19xnuFzPkaz0lPDgyRkbnqaow&oe=653D2D58",
  },
  {
    id: "6",
    name: "Một chút decor",
    avatar:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/329991810_565594582204694_5571908352438977267_n.jpg?stp=c53.0.320.320a_dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=2XIpav4JB7cAX8glJNM&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDzr56Qev1G0szwS0CvdqveLJcrhvm7Ky0Lp8mcbrQkAQ&oe=653D9A88",
    content: "Một chiếc phòng tui luôn mơ ước 🥰",
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/395132393_266120919757244_6341941126357122239_n.jpg?stp=cp6_dst-jpg_s960x960&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=DQRvecpHirQAX895Kgs&_nc_ht=scontent.fhan15-1.fna&oh=00_AfBchRtbaVZ_CLIbwTWcx8jW2LCgQdO8qzLbu8oIl4KAtQ&oe=653E2218",
  },
  {
    id: "7",
    name: "Troll Cả Showbiz",
    avatar:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/380547481_740120898129984_7583509023442880520_n.jpg?stp=dst-jpg_p320x320&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=0f_3pflO6kYAX_hONK1&_nc_ht=scontent.fhan15-1.fna&oh=00_AfAMGzDRvDgoIF6O5GVqzizIQbTlX-Piws7MRYEzgo87Sg&oe=653D0CBB",
    content: "Cảnh phim bị cắt trong The Shining 1980 👻",
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/393598280_759911739484233_1003366349818070723_n.jpg?stp=dst-jpg_s960x960&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=EZuOrZmj-GUAX-HU0HH&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDsKK7RW6ivMWc9q-qxnSHN2ITHQEqnJslNRdyTGzs2sQ&oe=653D7B6E",
  },
  {
    id: "8",
    name: "Anh Tùng Design - Kiến Trúc Nội Thất Thông Minh",
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
    name: "Trương Toàn - IPHONE SÓC TRĂNG",
    avatar:
      "https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-1/377779680_784875696987100_6321804957547872809_n.jpg?stp=cp6_dst-jpg_p60x60&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3NB_RallAboAX-QUWdy&_nc_ht=scontent.fhan15-2.fna&oh=00_AfC913AkTF8p-abQK55X1XlARieUbdIZWT99IgtGbOkHXg&oe=653E76AE",
    content: "cuối tuần ròi nghỉ ngơi thoi",
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/394537012_810548441086492_4185753828941852292_n.jpg?stp=dst-jpg_s960x960&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=thPm4HsAJYAAX9aONiY&_nc_ht=scontent.fhan15-1.fna&oh=00_AfAHQW8o91PWku2DKV4McxMBNTkc8i68856Mqq86VVboBg&oe=653DA324",
  },
  
  {
    id: "10",
    name: "Đà Lạt Review Tất Tần Tật",
    avatar:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/300433472_407878474778564_7824663035530571659_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=XGTjPsui3CUAX8AgEHn&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDUAyxFwrw8aDEZBLdqPmrfz1_EaGdDPFu3GWZum2cB_Q&oe=653D5E63",
    content: `Góc nhìn Đà Lạt về đêm 😍😍😍
      👉 Tham gia nhóm Đà Lạt Review 
      Ảnh 📷: Thành Công`,
    image:
      "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/395096585_666174282282314_5369529996375320568_n.jpg?stp=dst-jpg_p843x403&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=4HHeFRWwrbUAX-4Cpjp&_nc_ht=scontent.fhan15-1.fna&oh=00_AfAtyLffIIa8ZpRLW5r8MvGHnHmp8BRm_uGytPpqDvt_8A&oe=653CEC88",
  },
  
  
];

const listNews = [
  {
    id: "1",
    name: "Thu Phương",
    image:
      "https://bloggiaima.com/wp-content/uploads/2023/03/hinh-anh-gai-sinh-vien-sexy-khoe-noi-y-nong-bong-bloggiaima-10-576x1024.jpg",
  },
  {
    id: "2",
    name: "Thu Trang",
    image:
      "https://kenh14cdn.com/thumb_w/660/2018/11/17/photo-1-15424548896091911165278.jpg",
  },
  {
    id: "3",
    name: "Bảo Ngọc",
    image:
      "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-gai-xinh-viet-nam-mac-vay-hoa.jpg",
  },
  {
    id: "4",
    name: "Ngọc Đặng",
    image:
      "https://khoinguonsangtao.vn/wp-content/uploads/2022/09/hinh-anh-gai-trung-quoc.jpg",
  },
  {
    id: "5",
    name: "Phương Thảo",
    image:
      "https://keomoi.com/wp-content/uploads/2019/05/anh-gai-xinh-toc-ngan-de-thuong.jpg",
  },
  ,
  {
    id: "6",
    name: "Trà My",
    image:
      "https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg",
  },
];

const Header = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.underNav}>
        <TouchableOpacity>
          <View style={styles.youThink}>
            <Icon name="search" size={20} color="#65676b" />
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: "#65676b",
                marginLeft: 12,
              }}
            >
              Tìm kiếm
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.newsList}
        >
          {listNews?.map((item) => {
            return (
              <View key={item.id} style={styles.newsItem}>
                <Image
                  style={styles.imageNews}
                  source={{
                    uri: item.image,
                  }}
                ></Image>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    textAlign: "center",
                    marginTop: 4,
                    fontSize: 15,
                    fontWeight: '400',
                    width: withScreen * 0.22 - 8,
                    color: "#000",
                  }}
                >
                  {item.name}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const Message = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex:1}}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Header />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("MessagePrimary")}>
            <View style={styles.messageItem}>
              <Image
                style={styles.imageMessage}
                source={{
                  uri: item.avatar,
                }}
              ></Image>
              <View style={styles.contentMessage}>
                <View>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      marginTop: 4,
                      fontSize: 15,
                      fontWeight: '700',
                      width: withScreen * 0.7 - 8,
                      color: "#000",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    // justifyContent: "space-between",
                    maxWidth: withScreen * 0.86 - 24,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      maxWidth: withScreen * 0.6,
                      marginTop: 4,
                      fontSize: 15,
                      fontWeight: '400',
  
                      // width: withScreen * 0.7 - 8,
                      color: "#65676b",
                    }}
                  >
                    {item.content}
                  </Text>
  
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      maxWidth: withScreen * 0.2,
                      marginTop: 4,
                      fontSize: 15,
                      fontWeight: '400',
                      marginLeft: 12,
                      color: "#65676b",
                    }}
                  >
                    11 thg 9
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        // ItemSeparatorComponent={() => <View style={styles.separator} />}
        // style={{paddingBottom: -2000}}
      />
    </View>
  );
};

export default function MessageHome() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastOffset, setLastOffset] = useState(0);
  const navigation = useNavigation();

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const isScrollingUp = currentOffset < lastOffset;
    setShowHeader(isScrollingUp);
    setLastOffset(currentOffset);
  };
  const animatedValue = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      {/* <Collapsible collapsed={!showHeader}> */}
      <Collapsible collapsed={false}>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("MessageProfile")}>
              <Image
                style={styles.wrapAvatar}
                source={{
                  uri: "https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg",
                }}
              />
            </TouchableOpacity>
            <Text style={styles.logo}>Chat</Text>
          </View>
          <View style={styles.rightButton}>
            <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")}>
              <View style={styles.wrapIcon}>
                <FontAwesomeIcon icon={faCamera} size={18} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("MessageNew")}>
              <View style={styles.wrapIcon}>
                <FontAwesomeIcon icon={faPen} size={18} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Collapsible>

      {/* <Header /> */}

      <Message />

      <View style={styles.bottom}>
        <View style={styles.wrapIconBottom}>
          <FontAwesomeIcon icon={faComment} size={20} color="#373737" />
          <Text style={{textAlign: "center", fontSize: 14, fontWeight: '500'}}>Chat</Text>
        </View>
        <View style={styles.wrapIconBottom}>
          <FontAwesomeIcon icon={faUserGroup} size={20} color="#a2a1a1" />
          <Text style={{textAlign: "center", fontSize: 14, fontWeight: '500', color: "#a2a1a1"}}>Danh bạ</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: withScreen,
    padding: 8,
  },

  logo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#000",
    marginLeft: 16,
  },

  rightButton: {
    flexDirection: "row",
  },

  wrapIcon: {
    backgroundColor: "#e4e6eb",
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },

  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: withScreen - 16,
    paddingTop: 20,
    marginLeft: 8,
    marginRight: 8,
  },

  divSmall: {
    height: 2,
    width: withScreen,
    backgroundColor: "#f0f2f5",
    marginTop: 10,
    position: "relative",
  },

  active: {
    height: 2,
    width: withScreen / 6 - 2,
    backgroundColor: "blue",
    position: "relative",
    marginLeft: 8,
  },

  divLarge: {
    height: 10,
    width: withScreen,
    backgroundColor: "#f0f2f5",
    // marginTop: 10,
  },

  underNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: withScreen - 40,
    paddingTop: 12,
    marginLeft: 8,
    marginRight: 24,
  },

  wrapAvatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  youThink: {
    borderColor: "#d0d0d0",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#f0f2f5",
    padding: 8,
    width: withScreen - 16,
    borderRadius: 999,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "row",
  },

  newsList: {
    height: heightScreen * 0.18,
    marginLeft: withScreen * 0.02,
    // marginBottom: 8,
    // backgroundColor: '#ccc'
  },

  newsItem: {
    height: heightScreen * 0.18,
    width: withScreen * 0.2,
    // backgroundColor: "#bbb",
    // marginTop: heightScreen * 0.02,
    borderRadius: 12,
    marginLeft: withScreen * 0.01,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  imageNews: {
    height: withScreen * 0.16,
    width: withScreen * 0.16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },

  addNews: {
    height: heightScreen * 0.16,
    width: withScreen * 0.26,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    position: "relative",
  },
  wrapIconNews: {
    position: "absolute",
    marginTop: heightScreen * 0.136,
    left: withScreen * 0.08,
    backgroundColor: "#0866ff",
    width: 38,
    height: 38,
    borderRadius: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  colorChange: {
    backgroundColor: "#333",
  },
  imageMessage: {
    height: withScreen * 0.14,
    width: withScreen * 0.14,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },
  messageItem: {
    height: withScreen * 0.16,
    width: withScreen - 16,
    marginLeft: 8,
    // backgroundColor: "#ccc",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  contentMessage: {
    marginLeft: 8,
  },
  bottom: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: withScreen * 0.12,
    width: withScreen,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    borderTopWidth: 0.4,
    borderTopColor: "#ccc",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
  },
  wrapIconBottom: {
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  separator: {
    height: 10,
    backgroundColor: "transparent",
  },
});
