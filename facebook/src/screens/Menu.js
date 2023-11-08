import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../contexts/AuthContext";
import Constants from "expo-constants";

const deviceId = Constants.installationId;


const Menu = () => {
  const { logoutUser } = useAuth();

  const data = [
    {
      id: "1",
      title: "Video",
      iconLink: require("../assets/icons/videoIcon.png"),
    },
    {
      id: "2",
      title: "Nhóm",
      iconLink: require("../assets/icons/groupIcon.png"),
    },
    {
      id: "3",
      title: "Đã lưu",
      iconLink: require("../assets/icons/savedIcon.png"),
    },
    {
      id: "4",
      title: "Maketplace",
      iconLink: require("../assets/icons/marketPlaceIcon.png"),
    },
    {
      id: "5",
      title: "Bạn bè",
      iconLink: require("../assets/icons/timBanBeIcon.png"),
    },
    {
      id: "6",
      title: "Kỷ niệm",
      iconLink: require("../assets/icons/kyNiemIcon.png"),
    },
    {
      id: "7",
      title: "Bảng feed",
      iconLink: require("../assets/icons/bangFeedIcon.png"),
    },
    {
      id: "8",
      title: " Sự kiện",
      iconLink: require("../assets/icons/suKienIcon.png"),
    },
  ];

  const handleLogout = () => {
    logoutUser(deviceId);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Menu</Text>
        <View style={styles.viewIcon}>
          <Icon
            style={styles.searchIcon}
            name="search"
            size={20}
            color="#000"
          />
        </View>
      </View>
      <ScrollView>
        <View style={styles.menuContainer}>
          <View style={styles.menuItem}>
            {/* <Image
              source={require("../assets/images/avatar-sample.png")}
              style={styles.menuImg}
            /> */}
            <Image
              style={styles.menuImg}
              source={{
                uri: "https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg",
              }}
            />
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Tuấn Bùi</Text>
          </View>
          <View style={styles.shortcutDivider} />
          <View style={styles.shortcutHeader}>
            <View style={styles.iconPlus}>
              <Icon name="plus" size={15} color="#fff" />
            </View>
            <View style={styles.textIconsPlus}>
              <Text style={{ color: "#828282", fontSize: 16, fontWeight: 500 }}>
                Tạo trang cá nhân khác
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.textLT}>
          <Text>Lối tắt của bạn</Text>
        </View>

        <FlatList
          style={styles.flatList}
          data={data}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.menuItemLT}>
              {/* <Icon style={{ color: "#228CE6" }} name={item.icon} size={20} /> */}
              <Image source={item.iconLink} style={{ width: 26, height: 26 }} />
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
        {/* <View style={{width: "100%", height: 200, backgroundColor: "red", display: 'flex', flexDirection: "row"}}>
          {data && data.map((item) => ( 
            <View style={styles.menuItemLT} key={item.id}>
             <Icon style={{ color: "#228CE6" }} name={item.icon} size={20} />
             <Text style={styles.menuText}>{item.title}</Text>
            </View>))}
        </View> */}
        <View style={styles.menuContainer}>
          <View style={styles.menuItem}>
            <Icon name="question" size={20} />
            <Text style={styles.menuText}>Trợ giúp hỗ trợ</Text>
          </View>
          <View style={styles.shortcutDivider} />
          <View style={styles.menuItem}>
            <Icon name="gear" size={20} />
            <Text style={styles.menuText}>Cài đặt quyền riêng tư</Text>
          </View>
          <View style={styles.shortcutDivider} />
          <View style={styles.menuItem}>
            <Icon name="lock" size={20} />
            <Text style={styles.menuText}>Quyền truy cập chuyên nghiệp</Text>
          </View>
          <View style={styles.shortcutDivider} />
          <View style={styles.menuItem}>
            <Icon name="sliders" size={20} />
            <Text style={styles.menuText}>Cũng từ Meta</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuItemR}>
            <Image
              source={{
                uri: "https://img.icons8.com/ios/50/000000/logout-rounded-up.png",
              }}
              style={styles.menuIcon}
            />
            <TouchableOpacity onPress={handleLogout}>
              <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
                Đăng xuất
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: "#f3f2f7",
  },
  header: {
    padding: 15,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  headerText: {
    paddingTop: 15,
    color: "black",
    fontWeight: "bold",
    fontSize: 28,
  },
  menuContainer: {
    padding: 10,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  menuImg: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 999,
  },
  menuIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  shortcutDivider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
  shortcutHeader: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    color: "#828282",
    flexDirection: "row",
    alignItems: "center",
  },
  viewIcon: {
    borderRadius: 999,
    padding: 8,
    marginTop: 14,
    marginRight: 6,
    backgroundColor: "#CFCFCF",
  },
  iconPlus: {
    marginLeft: 10,
    borderRadius: 999,
    backgroundColor: "#696969",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  textIconsPlus: {
    marginLeft: 10,
  },
  textLT: {
    marginLeft: 20,
    marginTop: 15,
  },
  flatList: {
    marginLeft: 15,
    marginRight: 5,
  },
  menuItemLT: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 20,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  menuIcon: {
    width: 20,
    height: 20,
  },
  menuText: {
    marginLeft: 10,
  },
  menuItemR: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
});

export default Menu;
