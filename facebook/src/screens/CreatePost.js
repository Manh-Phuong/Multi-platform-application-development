import * as React from "react";
import { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; 
import {launchImageLibrary} from 'react-native-image-picker';

const CreatePost = () => {
  const [selectedImage, setSelectedImage] = React.useState('');
  const [isShowTagPart, setIsShowTagPart] = useState(true)
  const [isShowKeyBoard, setIsShowKeyBoard] = useState(false)
  const showAlert = () => {
    Alert.alert(
      'Lưu bài viết này dưới dạng bản nháp?',
      'Nếu bỏ bây giờ, bạn sẽ mất bài viết này.',
      [
        { text: 'Lưu bản nháp', onPress: () => console.log('Nút 1 được nhấn') },
        { text: 'Bỏ bài viết', onPress: () => console.log('Nút 2 được nhấn') },
        { text: 'Tiếp tục chỉnh sửa', onPress: () => console.log('Nút 3 được nhấn') },
      ],
      { cancelable: false } // Cho phép người dùng nhấn bất kỳ nơi nào để đóng thông báo
    );
  };

  const imagePicker = () => {
    let options = {
      storageOptions: {
        path: 'images'
      }
    }
    launchImageLibrary(options, res => {
      setSelectedImage(res.assets[0].uri)
    });
  }

  const toggleTagPart = () => {
    setIsShowTagPart(!isShowTagPart)
  }

  const hideTagPart = () => {
    setIsShowTagPart(false)
  }

  const toggleShowKeyBoard = () => {
    setIsShowKeyBoard(!isShowKeyBoard)
    setIsShowTagPart(!isShowTagPart)
  }
  
  return (
    <KeyboardAvoidingView behavior="padding">
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, isShowKeyBoard && styles.showKeyBoard]}>
        <View style={styles.header}>
          <Icon name="close" size={24} color="black" onPress={showAlert}/>
          <Text style={styles.textBigBold}>Tạo bài viết</Text>
          <TouchableOpacity><Text style={styles.textBigBold}>Đăng</Text></TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.bodyHead}>
              <Image
                style={styles.accountImage}
                source={require("../assets/images/avatar-sample.png")}
              ></Image>
              <View style={styles.right}>
                  <View><Text style={styles.textMediumBold}>Tuấn Bùi</Text></View>
                  <View style={styles.rightPublic}>
                      <Icon name="globe" size={12} color="#676669" />
                      <Text style={styles.textSmall}>Công khai</Text>
                      <Icon name="caret-down" size={12} color="#676669" />
                  </View>
              </View>
          </View>
          <TextInput style={styles.input} placeholder="Bạn đang nghĩ gì?" multiline={true} onPressIn={hideTagPart} >
          </TextInput>          
        </View>

        {/* <View style={styles.modal} onTouchEnd={showAlert}>
          <Text>Bạn muốn hoàn thành bài viết của mình sau?</Text>
          <Text>Lưu bản nháp hoặc bạn có thể tiếp tục chỉnh sửa</Text>
        </View> */}
        <View style={[styles.boxShadowContainer,styles.boxShadow]}>
            <View style={[styles.tagPart]}>
              <View style={{display: "flex", justifyContent: "center", flexDirection: "row" }} onTouchEnd={toggleTagPart}>
                {isShowTagPart && <Icon name="caret-up" size={28} color="black"/>}
                {!isShowTagPart && <Icon name="caret-down" size={28} color="black"/>}
              </View>
              {isShowTagPart && <View>
              <View style={[styles.groupIcon, styles.firstGroupIcon]} onTouchEnd={imagePicker}> 
                <Icon name="image" size={20} color="#41bd5f" />
                <Text style={styles.textMedium}>Ảnh/video</Text>
              </View>
              <View style={styles.groupIcon}>
                <Icon name="user" size={24} color="#1278ef" />
                <Text style={styles.textMedium}>Gắn thẻ người khác</Text>
              </View>
              <View style={styles.groupIcon}>
                <Image
                  style={styles.icon}
                  source={require("../assets/images/icon-smile.png")}
                ></Image>            
                <Text style={styles.textMedium}>Cảm xúc/hoạt động</Text>
              </View>
              <View style={styles.groupIcon}>
              <Image
                  style={styles.icon}
                  source={require("../assets/images/location.png")}
                ></Image>
                <Text style={styles.textMedium}>Check in</Text>
              </View>
              <View style={styles.groupIcon}>
                <Icon name="camera" size={20} color="#1278ef" />
                <Text style={styles.textMedium}>Video trực tiếp</Text>
              </View>
              </View>}
              {!isShowTagPart && <View style={{display: 'flex', flexDirection: "row", justifyContent: "space-between", paddingLeft: 24, paddingRight: 24, paddingBottom: 16}}>
                <Icon name="image" size={20} color="#41bd5f" />
                <Icon name="user" size={24} color="#1278ef" />
                <Image
                  style={styles.icon}
                  source={require("../assets/images/icon-smile.png")}
                ></Image>  
                <Image
                  style={styles.icon}
                  source={require("../assets/images/location.png")}
                ></Image>  
                <Icon name="camera" size={20} color="#1278ef" /> 
              </View>}
            </View>
          </View>
      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
    //   paddingLeft: 16,
    //   paddingRight: 16  
      backgroundColor: "white",
      height: '100%',
    },  
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingBottom: 20,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: "rgba(162,162,164,0.2)"
    },
    textBigBold: {
        fontSize: 18,
        fontWeight: '600'
    },

    accountImage: {
        width: 42,
        height: 42,
        borderRadius: 999,
    },
    bodyHead: {
        display: 'flex',
        flexDirection: 'row',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        paddingTop: 10,
        paddingLeft: 16,
        paddingRight: 16    
    },
    textMediumBold: {
        fontWeight: 'bold',
        fontSize: 15
    },
    right: {
        marginLeft: 12
    },
    rightPublic: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 8,
        borderWidth: 1,
        borderColor: '#676669',
        borderRadius: 4,
        paddingTop: 3,
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 3,
        marginTop: 6
    },
    textSmall: {
        fontSize: 12
    },
    input: {
        marginTop: 24,
        fontSize: 18,
        height: 350 ,
        paddingLeft: 16,
        paddingRight: 16,
    },
    icon: {
      width: 20,
      height: 20
    },
    groupIcon: {
      display: "flex",
      flexDirection: "row",
      marginLeft: 12,
      marginTop: 20,
      marginBottom: 20,
      columnGap: 12,
      alignItems: 'center'
    },
    textMedium: {
      fontSize: 16,
      fontWeight: '500'
    },
    tagPart: {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    boxShadow: {
      shadowColor: "#333333",
      shadowOpacity: 0.6,
      shadowRadius: 4,
    },
    boxShadowContainer: {
      backgroundColor: "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      // height: 500
      position: "absolute",
      bottom: 0,
      width: "100%"
    },
    firstGroupIcon: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modal: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    // showKeyBoard: {
    //   height: customHeight
    // }
});

export default CreatePost;
