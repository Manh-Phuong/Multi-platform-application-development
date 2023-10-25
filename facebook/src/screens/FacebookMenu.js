import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const FacebookMenu = () => {
  const data = [
    { id: "1", title: "Video", icon: "play" },
    { id: "2", title: "Nhóm", icon: "group" },
    { id: "3", title: "Đã lưu", icon: "bookmark" },
    { id: "4", title: "Maketplace", icon: "home" },
    { id: "5", title: "Bạn bè", icon: "user" },
    { id: "6", title: "Kỷ niệm", icon: "history" },
    { id: "7", title: "Bảng feed", icon: "list-alt" },
    { id: "8", title: " Sự kiện", icon: "calendar" },
  ];
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
            <Image
              source={require("../assets/images/avatar.jpg")}
              style={styles.menuImg}
            />
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Bùi Thức Nam</Text>
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
              <Icon style={{ color: "#228CE6" }} name={item.icon} size={20} />
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
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
            <Text style={{marginLeft: 10, fontWeight: 'bold'}}>Đăng xuất</Text>
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
    borderRadius: "50%",
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
    borderRadius: "50%",
    padding: 8,
    marginTop: 14,
    marginRight: 6,
    backgroundColor: "#CFCFCF",
  },
  iconPlus: {
    marginLeft: 10,
    borderRadius: "50%",
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
    justifyContent: 'center',
    padding: 5,
  }
});

export default FacebookMenu;
