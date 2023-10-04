import React, {useState, useRef} from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback, Keyboard
} from "react-native";
import { Color, FontSize, Border, Padding } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const ChooseNumberPhone = () => {
  const [email, setEmail] = useState('')
  const [isFocusEmail, setIsFocusEmail] = useState(false)
  const navigation = useNavigation();
  const emailInputRef = useRef(null)

  const handleFocusEmail = () => {
    setIsFocusEmail(true)
  };

  const handleBlurEmail = () => {
    setIsFocusEmail(false)
  };

  const goBackHandler = () => {
    navigation.goBack(); // Quay lại màn hình trước đó
  };

  const goToNextScreen = () => {
    if (validateData()) {
      navigation.navigate('CreatePassword'); 
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateData = () => {
    if (!email.trim()) {
      Alert.alert("Cần có email", 'Nhập email của bạn để tiếp tục.', [{
        text: 'OK',
        onPress: () => {
          emailInputRef.current.focus()
        }
    },])
    return false
    }
    else if (!isEmailValid(email.trim())) {
      Alert.alert("Email không đúng định dạng", 'Nhập email đúng định dạng.', [{
        text: 'OK',
        onPress: () => {
          emailInputRef.current.focus()
        }
    },])
    return false
    }
    return true
  }
  return (
    <TouchableWithoutFeedback onPress={
      Keyboard.dismiss
    }
    accessible={false}
    >
      <View style={styles.createName}>
        <TouchableOpacity onPress={goBackHandler}>
          <Image
            style={[styles.vectorIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/images/vector.png")}
          />
        </TouchableOpacity>

        <Text style={[styles.bnTnG]}>Địa chỉ email của bạn là gì?</Text>
        <Text style={[styles.nhpTnBn1]}>
          Nhập địa chỉ email có thể dùng để liên hệ với bạn. Thông tin này sẽ không
          hiển thị với ai khác trên trang cá nhân của bạn.
        </Text>
        <View>
          <KeyboardAvoidingView>
            <TextInput
              ref={emailInputRef}
              style={[styles.inputtextPosition1, isFocusEmail ? styles.focusedInput : null]}
              placeholder="Địa chỉ email"
              onChangeText={setEmail}
              onFocus={handleFocusEmail}
              onBlur={handleBlurEmail}
            />
          </KeyboardAvoidingView>
        </View>

        <Text style={[styles.nhpTnBn2]}>
          Bạn cũng sẽ nhận được thông báo của chúng tôi qua email và có thể chọn
          không nhận bất cứ lúc nào.{" "}
          <Text style={{ color: "#0062e0", fontWeight: 600 }}>Tìm hiểu thêm</Text>
        </Text>

        <TouchableOpacity onPress={goToNextScreen}>
          <View style={styles.buttonprimary}>
            <Text style={styles.logIn}>Tiếp</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.buttonSub}>
          <Text style={styles.logIn2}>Đăng ký bằng số điện thoại</Text>
        </View>

        <Text style={[styles.button]}>Bạn đã có tài khoản ư?</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "relative",
    top: 90,
    overflow: "hidden",
  },
  button: {
    position: "absolute",
    left: "32%",
    width: "100%",
    bottom: 18,
    color: "#0062e0",
    fontWeight: 600,
  },
  bnTnGClr: {
    color: Color.colorBlack,
    textAlign: "center",
    position: "absolute",
  },
  inputtextPosition1: {
    height: 50,
    top: 148,
    position: "absolute",
    width: "100%",
    maxWidth: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingHorizontal: 15,
  },
  inputtextPosition2: {
    height: 50,
    top: 148,
    left: 206,
    position: "absolute",
    minWidth: 170,
    maxWidth: 170,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingHorizontal: 15,
  },
  showTypo: {
    fontWeight: "500",
    top: "50%",
    marginTop: -9,
    fontSize: FontSize.uI16Medium_size,
    position: "absolute",
  },
  logIn: {
    color: Color.white,
    textAlign: "center",
    fontSize: FontSize.uI16Medium_size,
    fontWeight: "800",
  },
  logIn2: {
    color: Color.colorBlack,
    textAlign: "center",
    fontSize: FontSize.uI16Medium_size,
    fontWeight: "800",
  },
  buttonprimary: {
    bottom: -240,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.colorRoyalblue_200,
    alignItems: "center",
    paddingHorizontal: Padding.p_13xl,
    paddingVertical: Padding.p_base,
    position: "relative",
  },
  buttonSub: {
    bottom: -260,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.white,
    borderColor: "#ccc",
    borderWidth: 1,
    alignItems: "center",
    paddingHorizontal: Padding.p_13xl,
    paddingVertical: Padding.p_base,
    position: "relative",
  },
  vectorIcon: {
    width: 20,
    height: 20,
    objectFit: "cover",
  },
  bnTnG: {
    top: 117,
    fontSize: FontSize.size_xl,
    width: "100%",
    height: 30,
    fontWeight: "800",
    color: Color.colorBlack,
  },
  nhpTnBn1: {
    top: 125,
    fontSize: 14,
    maxWidth: "100%",
  },
  nhpTnBn2: {
    top: 215,
    fontSize: 14,
    maxWidth: "100%",
  },
  bgIcon: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_5xs,
    width: "100%",
    maxWidth: "100%",
  },
  email: {
    color: Color.gray03,
    textAlign: "left",
  },
  show: {
    color: Color.greenPrimary,
    textAlign: "right",
    display: "none",
    right: 16,
  },
  inputtext: {
    right: 195,
  },
  inputtext1: {
    right: 14,
    left: 197,
  },
  createName: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
  },
  focusedInput: {
    borderColor: "black"
  }
});

export default ChooseNumberPhone;
