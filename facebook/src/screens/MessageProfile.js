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
  Switch,
} from "react-native";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
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
import { height } from "@fortawesome/free-solid-svg-icons/faSquareCheck";

withScreen = Dimensions.get("window").width;
heightScreen = Dimensions.get("window").height;

export default function MessageProfile() {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const animatedValue = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 24,
            textAlign: "center",
            fontSize: 18,
            fontWeight: '600',
          }}
        >
          Tôi
        </Text>
      </View>
      <View
        style={{
          width: withScreen,
          display: "flex",
          justifyContent: "center",
          height: withScreen * 0.35,
          //   backgroundColor: "#ccc",
          alignItems: "center",
        }}
      >
        <Image
          style={styles.wrapAvatar}
          source={{
            uri: "https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg",
          }}
        />
        <Text style={{ marginTop: 8, fontSize: 18, fontWeight: '600' }}>
          Mạnh Phương
        </Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.item}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginLeft: 2
            }}
          >
            <Image
              style={{ height: 32, width: 32, objectFit: "cover" }}
              source={require("../assets/icons/darkModeIcon.png")}
            ></Image>
            <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 16 }}>
              Chế độ tối
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#8cbae8" }}
            thumbColor={isEnabled ? "#1976d2" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{marginRight: 32}}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("MessageWaiting")}>
          <View style={styles.item}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image
                style={{ height: 36, width: 36, objectFit: "cover" }}
                source={require("../assets/icons/messageWaitingIcon2.jpg")}
              ></Image>
              <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 16 }}>
                Tin nhắn đang chờ
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* <Text style={{fontSize: 15, color: "#a2a1a1", fontWeight: '500', marginTop: 8 }}>Trang cá nhân</Text> */}
        <Text style={{marginBottom: 8, fontSize: 15, color: "#a2a1a1", fontWeight: '500', marginTop: 8 }}>Trang cá nhân</Text>

        <View style={styles.item}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Image
              style={{ height: 36, width: 36, objectFit: "cover" }}
              source={require("../assets/icons/statusActionIcon.jpg")}
            ></Image>
            <View>
                <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 16 }}>
                  Trạng thái hoạt động
                </Text>
                <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: 16, color: "#65676b" }}>
                  Bật
                </Text>
            </View>
          </View>
        </View>

        <View style={styles.item}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Image
              style={{ height: 36, width: 36, objectFit: "cover" }}
              source={require("../assets/icons/messageUserNameIcon.jpg")}
            ></Image>
            <View>
                <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 16 }}>
                  Tên người dùng
                </Text>
                <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: 16, color: "#65676b" }}>
                  m.me/manhphuongg
                </Text>
            </View>
          </View>
        </View>

        <Text style={{marginBottom: 8, fontSize: 15, color: "#a2a1a1", fontWeight: '500', marginTop: 8 }}>Tùy chọn</Text>

        <View style={styles.item}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Image
              style={{ height: 36, width: 36, objectFit: "cover" }}
              source={require("../assets/icons/privacyIcon.jpg")}
            ></Image>
            <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 16 }}>
              Quyền riêng tư
            </Text>
          </View>
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
    paddingLeft: 8,
    paddingRight: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    width: withScreen,
    padding: 8,
  },
  wrapAvatar: {
    width: withScreen * 0.25,
    height: withScreen * 0.25,
    borderRadius: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: withScreen - 16,
    height: heightScreen * 0.1,
    // backgroundColor: "#ccc",
  },
});
