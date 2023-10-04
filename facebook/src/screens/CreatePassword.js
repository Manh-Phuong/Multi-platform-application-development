import * as React from "react";
import { useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { Color, FontSize, Border, Padding } from "../GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const windowHeight = Dimensions.get("window").height;
const customHeight = windowHeight - 30;

const CreatePassword = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const passWordInputRef = useRef(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleFocusPassword = () => {
    setIsFocusedPassword(true);
  };

  const handleBlurPassword = () => {
    setIsFocusedPassword(false);
  };

  const handlePasswordChange = (text) => {
    // Kiểm tra xem text có chứa khoảng trắng không
    if (!text?.includes(" ")) {
      setPassword(text);
    }
  };

  function validatePassword(password) {
    // Kiểm tra xem chuỗi có ít nhất 6 ký tự không và chứa cả chữ và số không
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  }

  const handleSubmit = () => {
    validateData();
  };

  const goBackHandler = () => {
    navigation.goBack(); // Quay lại màn hình trước đó
  };

  const validateData = () => {
    if (!password.trim()) {
      Alert.alert("Cần có mật khẩu", "Nhập mật khẩu của bạn để tiếp tục.", [
        {
          text: "OK",
          onPress: () => {
            passWordInputRef.current.focus();
          },
        },
      ]);
    } else if (password.trim() && !validatePassword(password)) {
      Alert.alert(
        "Mật khẩu quá ngắn.",
        "Hãy tạo mật khẩu dài hơn gồm ít nhất 6 chữ số và chữ cái.",
        [
          {
            text: "OK",
            onPress: () => {
              passWordInputRef.current.focus();
            },
          },
        ]
      );
    } else {
      navigation.navigate("SaveInfoConfirm");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={["#fffaf2", "#eef4fd", "#f0f3fb", "#ecf5fb"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.createName}
      >
        <TouchableOpacity onPress={goBackHandler}>
          <Image
            style={[styles.vectorIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/images/vector.png")}
          />
        </TouchableOpacity>
        <Text style={[styles.bnTnG]}>Tạo mật khẩu</Text>
        <Text style={[styles.nhpTnBn1]}>
          Tạo mật khẩu gồm ít nhất 6 chữ cái hoặc chữ số. Bạn nên chọn mật khẩu
          thật khó đoán.
        </Text>
        <Text style={[styles.label]}>Mật khẩu</Text>
        <View>
          <View style={styles.textInputContainer}>
            <TextInput
              ref={passWordInputRef}
              style={[
                styles.inputtextPosition1,
                isFocusedPassword ? styles.focusedInput : null,
              ]}
              placeholder="Mật khẩu"
              secureTextEntry={!isPasswordVisible}
              value={password}
              returnKeyType="done"
              onChangeText={handlePasswordChange}
              onFocus={handleFocusPassword}
              onBlur={handleBlurPassword}
            />
            {(isFocusedPassword || password.trim()) && (
              <Icon
                onPress={togglePasswordVisibility}
                style={[styles.iconEye]}
                name={isPasswordVisible ? "eye" : "eye-slash"}
                size={20}
                color="black"
              />
            )}
          </View>
        </View>

        <View>
          <TouchableOpacity style={styles.buttonprimary} onPress={handleSubmit}>
            <Text style={styles.logIn}>Tiếp</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.button]}>Bạn đã có tài khoản ư?</Text>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "relative",
    top: 90,
    left: 16,
    overflow: "hidden",
  },

  buttonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 18,
    padding: 16, // Điều chỉnh khoảng cách từ bàn phím đến nút văn bản
    backgroundColor: "transparent", // Đảm bảo nút văn bản không che kín màn hình
  },
  button: {
    position: "absolute",
    left: "32%",
    width: "100%",
    top: customHeight,
    color: "#0062e0",
    fontWeight: "600",
  },
  textInputContainer: {
    postion: "relative",
  },
  iconEye: {
    position: "absolute",
    top: 172,
    right: 32,
  },
  bnTnGClr: {
    color: Color.colorBlack,
    textAlign: "center",
    position: "absolute",
  },
  label: {
    top: 148,
    fontSize: 16,
    marginLeft: 16,
  },
  inputtextPosition1: {
    height: 50,
    top: 158,
    left: 16,
    position: "absolute",
    width: "92%",
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
    fontSize: 16,
    fontWeight: "700",
  },
  buttonprimary: {
    bottom: -230,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.colorRoyalblue_200,
    alignItems: "center",
    paddingHorizontal: Padding.p_13xl,
    paddingVertical: Padding.p_base,
    marginLeft: 16,
    marginRight: 16,
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
    marginLeft: 16,
    marginRight: 16,
    position: "relative",
  },
  vectorIcon: {
    width: 20,
    height: 20,
    objectFit: "cover",
  },
  bnTnG: {
    top: 117,
    left: 16,
    fontSize: 24,
    width: "100%",
    height: 30,
    fontWeight: "800",
    color: Color.colorBlack,
  },
  nhpTnBn1: {
    top: 125,
    fontSize: 15,
    left: 16,
    maxWidth: "100%",
    marginRight: 16,
  },
  nhpTnBn2: {
    top: 215,
    fontSize: 15,
    left: 16,
    maxWidth: "100%",
    marginRight: 16,
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
    left: 16,
  },
  show: {
    color: Color.greenPrimary,
    textAlign: "right",
    display: "none",
    right: 16,
  },
  inputtext: {
    right: 195,
    left: 16,
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
  },
  focusedInput: {
    borderColor: "black",
  },
});

export default CreatePassword;
