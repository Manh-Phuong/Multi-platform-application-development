import React, { useState, useRef } from "react";
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
} from "react-native";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faStore, faUserGroup } from "@fortawesome/free-solid-svg-icons";
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

withScreen = Dimensions.get("window").width;
heightScreen = Dimensions.get("window").height;

const data = [
  { id: "1", content: "Bài viết 1" },
  { id: "2", content: "Bài viết 2" },
  { id: "3", content: "Bài viết 3" },
  { id: "4", content: "Bài viết 1" },
  { id: "5", content: "Bài viết 2" },
  { id: "6", content: "Bài viết 3" },
  { id: "7", content: "Bài viết 1" },
  { id: "8", content: "Bài viết 2" },
  { id: "9", content: "Bài viết 3" },
  { id: "10", content: "Bài viết 1" },
  { id: "11", content: "Bài viết 2" },
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
];

const Header = () => (
  <View>
    <View style={styles.underNav}>
      <Image
        style={styles.wrapAvatar}
        source={{
          uri: "https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg",
        }}
      />
      {/* <Image
        style={styles.wrapAvatar}
        source={require("../assets/images/avatar-sample.png")}
      ></Image> */}

      <View style={styles.youThink}>
        <Text style={{ fontSize: 16, fontWeight: 500 }}>Bạn đang nghĩ gì?</Text>
      </View>

      <Image
        style={{ height: 26, width: 26, objectFit: "cover" }}
        source={require("../assets/icons/iconImage.png")}
      ></Image>
    </View>

    <View style={styles.divLarge}></View>

    <View>
      <ScrollView horizontal={true} style={styles.newsList}>
        <View style={styles.newsItem}>
          <Image
            style={styles.addNews}
            source={{
              uri: "https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg",
            }}
          ></Image>
          <View style={styles.wrapIconNews}>
            {/* <Icon name="plus" size={24} color="white" /> */}
            <FontAwesomeIcon icon={faPlus} size={22} color="white" />
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: heightScreen * 0.03,
            }}
          >
            <Text style={{ fontWeight: 600, fontSize: 18 }}>Tạo tin</Text>
          </View>
        </View>

        {listNews?.map((item) => {
          return (
            <View style={styles.newsItem}>
              <Image
                style={styles.imageNews}
                source={{
                  uri: item.image,
                }}
              ></Image>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  position: "absolute",
                  bottom: 8,
                  left: 8,
                  fontSize: 16,
                  fontWeight: 600,
                  width: withScreen * 0.26 - 8,
                  color: "white",
                }}
              >
                {item.name}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
    <View style={styles.divLarge}></View>
  </View>
);

export default function Home() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastOffset, setLastOffset] = useState(0);
  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const isScrollingUp = currentOffset < lastOffset;
    setShowHeader(isScrollingUp);
    setLastOffset(currentOffset);
  };

  return (
    <View style={styles.container}>
      <Collapsible collapsed={!showHeader}>
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>facebook</Text>
          </View>
          <View style={styles.rightButton}>
            <View style={styles.wrapIcon}>
              <Icon name="plus" size={24} color="black" />
            </View>
            <View style={styles.wrapIcon}>
              <Icon name="search" size={22} color="black" />
            </View>
            <View style={styles.wrapIcon}>
              <MessageIcon width="24" height="24" fill="#000" />
            </View>
          </View>
        </View>
      </Collapsible>

      <View style={styles.nav}>
        <View style={styles.wrapIconNav}>
          <HomeIcon fill="#0866ff" />
        </View>
        <View style={styles.wrapIconNav}>
          <VideoIcon fill="#65676b" />
        </View>
        <View style={styles.wrapIconNav}>
          <FriendIcon fill="#65676b" />
        </View>
        <View style={styles.wrapIconNav}>
          <MarketIcon fill="#65676b" />
        </View>
        <View style={styles.wrapIconNav}>
          <FontAwesomeIcon icon={faBell} size={26} color="#65676b" />
        </View>
        <View style={styles.wrapIconNav}>
          <Icon name="bars" size={26} color="#65676b" />
        </View>
      </View>

      <View style={styles.divSmall}>
        <View style={styles.active}></View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Header />}
        renderItem={({ item }) => (
          <View>
            <Post />
            <View style={styles.divLarge}></View>
          </View>
        )}
        onScroll={handleScroll}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: withScreen - 16,
    paddingTop: 20,
    marginLeft: 8,
    marginRight: 8,
  },

  logo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0866ff",
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
    position: "relative"
  },

  active: {
    height: 2,
    width: withScreen/6 - 2,
    backgroundColor: "blue",
    position: "relative",
    marginLeft: 8
  },

  divLarge: {
    height: 10,
    width: withScreen,
    backgroundColor: "#f0f2f5",
    marginTop: 10,
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

  newsList: {
    height: heightScreen * 0.28,
    backgroundColor: "white",
  },

  newsItem: {
    height: heightScreen * 0.24,
    width: withScreen * 0.26,
    backgroundColor: "#eee",
    marginTop: heightScreen * 0.02,
    borderRadius: 12,
    marginLeft: withScreen * 0.02,
    position: "relative",
  },

  imageNews: {
    height: heightScreen * 0.24,
    width: withScreen * 0.26,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
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
});