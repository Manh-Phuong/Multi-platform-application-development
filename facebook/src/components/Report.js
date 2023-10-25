import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image
} from "react-native";

withScreen = Dimensions.get("window").width;
heightScreen = Dimensions.get("window").height;

const Report = () => {
  return (<View style={styles.container}>
    <View>
      <View style={[styles.backGround, { marginTop: 20 }]}>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/images/add.png")} />
          </View>
          <View>
            <Text style={styles.textTop}>Hiển thị thêm</Text>
            <Text style={styles.textBottom}>Bạn sẽ nhìn thấy nhiều bài viết tương tự hơn</Text>
          </View>
        </View>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/minus.png")} />
          </View>
          <View>
            <Text style={styles.textTop}>Ẩn bớt</Text>
            <Text style={styles.textBottom}>Tại sao tôi nhìn thấy bài viết này?</Text>
          </View>
        </View>
      </View>
      <View style={styles.backGround}>
          <View>
            <Text style={[styles.textNothing, {marginLeft: 20}]}>Tại sao tôi nhìn thấy bào viết này</Text>
            <Text style={{marginLeft: 20}}>Bạn là  thành viên của Cafe Đường phố</Text>
          </View>
      </View>
      <View style={styles.backGround}>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/save.png")} />
          </View>
          <View>
            <Text style={styles.textTop}>Lưu bài viết</Text>
            <Text style={styles.textBottom}>Thêm vào danh sách các mục đã lưu</Text>
          </View>
        </View>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/share.png")} />
          </View>
          <View>
            <Text style={styles.textTop}>Sao chép liên kết</Text>
          </View>
        </View>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/delete.png")} />
          </View>
          <View>
            <Text style={styles.textTop}>Ẩn bài viết</Text>
            <Text style={styles.textBottom}>Ẩn bớt các bài viết tương tự</Text>
          </View>
        </View>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/warning.png")} />
          </View>
          <View>
            <Text style={styles.textTop}>Báo cáo bài viết</Text>
            <Text style={styles.textBottom}>Chúng tôi sẽ không cho Tiến biết ai đã báo cáo</Text>
          </View>
        </View>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/notification.png")} />
          </View>
          <View>
            <Text style={styles.textTop}>Bật thông báo bài viết này</Text>
          </View>
        </View>
      </View>
      <View style={styles.backGround}>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/logout.png")} />
          </View>
          <View>
            <Text style={styles.textTop}>Rời khỏi Cafe đường phố</Text>
            <Text style={styles.textBottom}>Không nhìn thấy bài viết nữa và rời khỏi nhóm</Text>
          </View>
        </View>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/delete.png")} />
          </View>
          <View>
            <Text style={styles.textTop}>Ẩn tất cả từ Tiến</Text>
            <Text style={styles.textBottom}>Không xem bài viết từ người này nữa</Text>
          </View>
        </View>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/time.png")} />
          </View>
          <View>
            <Text style={styles.textTop}>Tạm ẩn Cafe đường phố trong 30 ngày</Text>
            <Text style={styles.textBottom}>Tạm thời không xem bài viết nữa nhưng vẫn ở trong nhóm</Text>
          </View>
        </View>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/delete.png")} />
          </View>
          <View>
            <Text style={styles.textTop}>Bỏ theo dõi Cafe đường phố </Text>
            <Text style={styles.textBottom}>Không xem bài viết nữa nhưng vẫn ở trong nhóm</Text>
          </View>
        </View>
      
      </View>

      <View style={styles.backGround}>
           <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/checklist.png")} />
          </View>
          <View>
            <Text style={styles.textTop}>Quản lí Bảng feed </Text>
          </View>
        </View>
      </View>
    </View>
    <View>

    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef1f4",
    paddingTop: 12,
    borderRadius: 10
  },
  backGround: {
    backgroundColor: '#fff',
    borderRadius: 10,

    marginBottom: 10,
    marginHorizontal: 15
  },
  boxA:{
    flexDirection: "row",
    // alignItems: "center",
  },
  imageIcon: {
    width: 10,
    height: 10,
    marginLeft: 20
  },
  textTop: {
    fontSize:16,
    fontWeight: "bold"
  },
  textBottom: {
    fontSize:14,
    opacity: 0.5
  },
  // leftContainer: {
  //   flex: 1,
  // },
  textNothing:{
    color:"blue"
  }
});

export default Report;