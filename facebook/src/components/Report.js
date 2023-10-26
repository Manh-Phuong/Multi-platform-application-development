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
  return (
  <View style={styles.container}>
    <View style={styles.iconTop}>
     <Image style={styles.iconInside} source={require("../assets/icons/ngang.png")}></Image>
    </View>
    
    <View>
      <View style={[styles.backGround, { marginTop: 20 }]}>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/images/add.png")} />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.textTop}>Hiển thị thêm</Text>
            <Text style={styles.textBottom}>Bạn sẽ nhìn thấy nhiều bài viết tương tự hơn</Text>
          </View>
        </View>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/minus.png")} />
          </View>
          <View style={styles.rightContainer}>
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
          <View style={styles.rightContainer}>
            <Text style={styles.textTop}>Lưu bài viết</Text>
            <Text style={styles.textBottom}>Thêm vào danh sách các mục đã lưu</Text>
          </View>
        </View>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/share.png")} />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.textTop}>Sao chép liên kết</Text>
          </View>
        </View>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/delete.png")} />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.textTop}>Ẩn bài viết</Text>
            <Text style={styles.textBottom}>Ẩn bớt các bài viết tương tự</Text>
          </View>
        </View>
        {/* <TouchableOpacity onPress={() => {}}> */}
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/warning.png")} />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.textTop}>Báo cáo bài viết</Text>
            <Text style={styles.textBottom}>Chúng tôi sẽ không cho Tiến biết ai đã báo cáo</Text>
          </View>
        </View>
         {/* </TouchableOpacity> */}
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/notification.png")} />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.textTop}>Bật thông báo bài viết này</Text>
          </View>
        </View>
      </View>
      <View style={styles.backGround}>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/logout.png")} />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.textTop}>Rời khỏi Cafe đường phố</Text>
            <Text style={styles.textBottom}>Không nhìn thấy bài viết nữa và rời khỏi nhóm</Text>
          </View>
        </View>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/delete.png")} />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.textTop}>Ẩn tất cả từ Tiến</Text>
            <Text style={styles.textBottom}>Không xem bài viết từ người này nữa</Text>
          </View>
        </View>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/time.png")} />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.textTop}>Tạm ẩn Cafe đường phố trong 30 ngày</Text>
            <Text style={styles.textBottom}>Tạm thời không xem bài viết nữa</Text>
          </View>
        </View>
        <View style={styles.boxA}>
          <View style={styles.leftContainer}>
            <Image style={styles.imageIcon} source={require("../assets/icons/delete.png")} />
          </View>
          <View style={styles.rightContainer}>
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
          <View style={styles.rightContainer}>
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
  
  iconTop:{
    display: 'flex',
    flexDirection:'row',
    textAlign:'center',
    justifyContent:"center",
    alignContent:"center",
    paddingTop:1,
    height:10
    
  },
  iconInside:{
    // color:"#423647"
  },
  boxA:{
    flexDirection: "row",
    alignItems: "center",
    marginBottom:8
  },
  leftContainer:{
      height:40,
      width:40,
      justifyContent:"center",
      alignContent:"center"
  },
  rightContainer:{
    marginLeft:10
  },
  imageIcon: {
    width: 25,
    height: 25,
    marginLeft: 10,
    justifyContent:'center',
    alignContent:'center'
    
  },
  textTop: {
    fontSize:16,
    fontWeight: "bold"
  },
  textBottom: {
    fontSize:14,
    opacity: 0.5
  },
  textNothing:{
    color:"blue"
  }
});

export default Report;