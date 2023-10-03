import * as React from "react";
import { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";

const ChooseNumberPhone = () => {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handlePasswordChange = (text) => {
    // Kiểm tra xem text có chứa khoảng trắng không
    if (!text.includes(' ')) {
      setPassword(text);
    }
  };

  return (
    <View style={styles.createName}>
      <Image
        style={[styles.vectorIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/images/vector.png")}
      />
      <Text style={[styles.bnTnG]}>Tạo mật khẩu</Text>
      <Text style={[styles.nhpTnBn1]}>
        Tạo mật khẩu gồm ít nhất 6 chữ cái hoặc chữ số. Bạn nên chọn mật khẩu
        thật khó đoán.
      </Text>
      <View>
        <KeyboardAvoidingView>
          <TextInput
            style={[styles.inputtextPosition1]}
            placeholder="Mật khẩu"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={handlePasswordChange}
          />
          {password.length > 0 && (
            <TouchableOpacity onPress={togglePasswordVisibility} style={[styles.iconEye]}>
              <Icon
                name={isPasswordVisible ? "eye" : "eye-slash"}
                size={20}
                color="black"
              />
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </View>

      <View style={styles.buttonprimary}>
        <Text style={styles.logIn}>Tiếp</Text>
      </View>

      <Text style={[styles.button]}>Bạn đã có tài khoản ư?</Text>
    </View>
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
  button: {
    position: "absolute",
    left: "32%",
    width: "100%",
    bottom: 18,
    color: "#0062e0",
    fontWeight: 600,
  },
  iconEye: {
    position: "relative",
    top: 165,
    left: 330,
  },
  bnTnGClr: {
    color: Color.colorBlack,
    textAlign: "center",
    position: "absolute",
  },
  inputtextPosition1: {
    height: 50,
    top: 148,
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
    fontFamily: FontFamily.uI16Medium,
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
    fontFamily: FontFamily.uI16Semi,
    fontWeight: "800",
  },
  logIn2: {
    color: Color.colorBlack,
    textAlign: "center",
    fontSize: FontSize.uI16Medium_size,
    fontFamily: FontFamily.uI16Semi,
    fontWeight: "800",
  },
  buttonprimary: {
    bottom: -220,
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
    fontSize: FontSize.size_xl,
    width: "100%",
    height: 30,
    fontFamily: FontFamily.uI16Semi,
    fontWeight: "800",
    color: Color.colorBlack,
  },
  nhpTnBn1: {
    top: 125,
    fontSize: 14,
    fontFamily: FontFamily.interRegular,
    left: 16,
    maxWidth: "100%",
    marginRight: 16,
  },
  nhpTnBn2: {
    top: 215,
    fontSize: 14,
    fontFamily: FontFamily.interRegular,
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
});

export default ChooseNumberPhone;
