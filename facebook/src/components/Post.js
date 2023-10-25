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
} from "react-native";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import {
  HomeIcon,
  VideoIcon,
  FriendIcon,
  MarketIcon,
  MessageIcon,
} from "../assets/icons";
import { ScrollView } from "react-native-gesture-handler";
import { faEllipsis, faXmark } from "@fortawesome/free-solid-svg-icons";

withScreen = Dimensions.get("window").width;
heightScreen = Dimensions.get("window").height;

// const imageUrl = require("../assets/images/bg-intro.jpg");
// const imageSource = Image.resolveAssetSource(imageUrl);

// const widthImage = withScreen;
// const heightImage = (withScreen * imageSource.height) / imageSource.width;

export default function Post(props) {
//   console.log(props);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    Image.getSize(props.item.image, (width, height) => {
      const aspectRatio = width / height;
      const widthImage = withScreen; // Thay đổi kích thước theo nhu cầu
      const heightImage = widthImage / aspectRatio;
      setImageSize({ width: widthImage, height: heightImage });
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profile}>
          {/* <Image
            style={styles.wrapAvatar}
            source={require("../assets/images/avatar-sample.png")}
          ></Image> */}
          <Image
            style={styles.wrapAvatar}
            source={{
              uri:
                props.item.avatar ||
                "https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-1/356150905_221055794134074_7342427060415828020_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=qsmztDXjbrgAX-UdlbA&_nc_ht=scontent.fhan15-1.fna&oh=00_AfDT1VZf8gV7mZsMT07r4iENKWnEi-KoIXCYDju-9BcRlw&oe=653C4A7B",
            }}
          />

          <View style={{ maxWidth: withScreen * 0.72, marginLeft: 8 }}>
            <View>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{ fontWeight: 600, fontSize: 18 }}
              >
                {props.item.owner}
              </Text>
            </View>
            <View>
              <Text
                Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{ fontWeight: 600, fontSize: 14, color: "#65676b" }}
              >
                Gợi ý cho bạn - 18 giờ
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <FontAwesomeIcon icon={faEllipsis} size={24} color="#65676b" />
          <FontAwesomeIcon
            style={{ marginLeft: 12 }}
            icon={faXmark}
            size={24}
            color="#65676b"
          />
        </View>
      </View>
      <View style={{ margin: 8 }}>
        <Text
          Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{ fontWeight: 400, fontSize: 15, color: "#65676b" }}
        >
          {props.item.content}
        </Text>
      </View>
      <View>
        <Image
          style={[
            styles.wrapImage,
            { width: imageSize.width, height: imageSize.height },
          ]}
          contentFit="cover"
          source={{ uri: props.item.image }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: withScreen - 16,
          paddingTop: 8,
          marginLeft: 8,
          marginRight: 8,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ width: 20, height: 20 }}
            contentFit="cover"
            source={require("../assets/icons/likeIconColor.png")}
          />
          <Text style={{ fontSize: 16, marginLeft: 6, color: "#65676b" }}>
            1
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 16, marginLeft: 6, color: "#65676b" }}>
              55 bình luận
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, marginLeft: 6, color: "#65676b" }}>
              9 chia sẻ
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.divSmall}></View>

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Image
            style={{ width: 26, height: 26 }}
            contentFit="cover"
            source={require("../assets/icons/likeIcon.png")}
          />
          <Text style={{ marginLeft: 4, fontSize: 15, color: "#65676b" }}>
            Thích
          </Text>
        </View>
        <View style={styles.footerItem}>
          <Image
            style={{ width: 26, height: 26 }}
            contentFit="cover"
            source={require("../assets/icons/commentIcon.png")}
          />
          <Text style={{ marginLeft: 4, fontSize: 15, color: "#65676b" }}>
            Bình luận
          </Text>
        </View>
        <View style={styles.footerItem}>
          <Image
            style={{ width: 26, height: 26 }}
            contentFit="cover"
            source={require("../assets/icons/shareIcon.png")}
          />
          <Text style={{ marginLeft: 4, fontSize: 15, color: "#65676b" }}>
            Chia sẻ
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: withScreen,
    backgroundColor: "white",
    marginTop: 4,
    paddingBottom: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: withScreen - 16,
    paddingTop: 6,
    marginLeft: 8,
    marginRight: 8,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: withScreen - 64,
    paddingTop: 10,
    marginLeft: 32,
    marginRight: 32,
  },

  footerItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  profile: {
    flexDirection: "row",
  },

  wrapImage: {
    resizeMode: "cover",
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
    justifyContent: "space-between",
    width: withScreen - 16,
    paddingTop: 20,
    marginLeft: 8,
    marginRight: 8,
  },

  divSmall: {
    height: 1,
    width: withScreen,
    backgroundColor: "#f0f2f5",
    marginTop: 10,
    width: withScreen - 16,
    marginLeft: 8,
    marginRight: 8,
  },

  divLarge: {
    height: 10,
    width: withScreen,
    backgroundColor: "#f0f2f5",
    marginTop: 10,
  },

  wrapAvatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
