import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Padding, Border, FontFamily, FontSize, Color } from "../GlobalStyles";

const Login = () => {
  return (
    <View style={styles.logIn}>
      <View style={[styles.inputtext, styles.inputtextPosition]}>
        <Image
          style={[styles.bgIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/images/bg.jpg")}
        />
        <Text style={styles.email}>Số di động hoặc email</Text>
        <Text style={styles.show}>Show</Text>
      </View>
      <View style={[styles.inputtext1, styles.inputtextPosition]}>
        <Image
          style={[styles.bgIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/images/bg.jpg")}
        />
        <Text style={styles.email}>Mật khẩu</Text>
        <Text style={styles.show}>Show</Text>
      </View>
      <View style={[styles.buttonprimary, styles.buttonprimarySpaceBlock]}>
        <Text style={[styles.logIn1, styles.logTypo]}>Đăng nhập</Text>
      </View>
      <View style={[styles.buttonprimary1, styles.buttonprimarySpaceBlock]}>
        <Text style={[styles.logIn2, styles.logTypo]}>Tạo tài khoản mới</Text>
      </View>
      <Text style={styles.qunMtKhu}>Quên mật khẩu?</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  inputtextPosition: {
    height: 50,
    position: "absolute",
    left: 16,
    right: 16,
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  buttonprimarySpaceBlock: {
    paddingVertical: Padding.p_base,
    paddingHorizontal: Padding.p_13xl,
    alignItems: "center",
    borderRadius: Border.br_81xl,
    position: "absolute",
  },
  logTypo: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: FontSize.uI16Semi_size,
  },
  bgIcon: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    borderRadius: Border.br_5xs,
    width: "100%",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  email: {
    color: Color.gray03,
    textAlign: "left",
    
    fontWeight: "500",
    fontSize: FontSize.uI16Semi_size,
    top: "50%",
    marginTop: -9,
    left: 16,
    position: "absolute",
  },
  show: {
    color: Color.greenPrimary,
    textAlign: "right",
    display: "none",
    
    fontWeight: "500",
    fontSize: FontSize.uI16Semi_size,
    top: "50%",
    marginTop: -9,
    right: 16,
    position: "absolute",
  },
  inputtext: {
    top: 256,
  },
  inputtext1: {
    top: 322,
  },
  logIn1: {
    color: Color.white,
  },
  buttonprimary: {
    bottom: 350,
    backgroundColor: Color.colorRoyalblue_200,
    left: 16,
    right: 16,
    paddingVertical: Padding.p_base,
    paddingHorizontal: Padding.p_13xl,
    alignItems: "center",
    borderRadius: Border.br_81xl,
  },
  logIn2: {
    color: Color.colorRoyalblue_200,
  },
  buttonprimary1: {
    right: 15,
    bottom: 114,
    left: 15,
    borderStyle: "solid",
    borderColor: Color.colorRoyalblue_200,
    borderWidth: 1,
    paddingVertical: Padding.p_base,
    paddingHorizontal: Padding.p_13xl,
    alignItems: "center",
    borderRadius: Border.br_81xl,
    backgroundColor: Color.white,
  },
  qunMtKhu: {
    marginLeft: -62.5,
    bottom: 315,
    left: "50%",
    color: Color.colorBlack,
   
    fontWeight: "600",
    textAlign: "left",
    fontSize: FontSize.uI16Semi_size,
    position: "absolute",
  },
  vectorIcon: {
    height: "8.5%",
    width: "18.4%",
    top: "15.27%",
    right: "40.8%",
    bottom: "76.23%",
    left: "40.8%",
  },
  vectorIcon1: {
    height: "2.63%",
    width: "3.45%",
    top: "4.19%",
    right: "92.28%",
    bottom: "93.19%",
    left: "4.27%",
  },
  logIn: {
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.white,
  },
});

export default Login;
