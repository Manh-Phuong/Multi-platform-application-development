import * as React from "react";
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
import { Color, FontSize, Border, Padding } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const IntroCreateAccount = () => {
  const navigation = useNavigation();

  const goBackHandler = () => {
    navigation.goBack(); // Quay lại màn hình trước đó
  };

  const goToNextScreen = () => {
    navigation.navigate("CreateName");
  };

  return (
    <View style={styles.createName}>
      <TouchableOpacity onPress={goBackHandler}>
        <Image
          style={[styles.vectorIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/images/vector.png")}
        />
      </TouchableOpacity>

      <Text style={[styles.bnTnG]}>Tham gia Facebook</Text>

      <View style={[styles.wrapIntro]}>
        <Image
            style={[styles.bgIntro]}
            contentFit="cover"
            source={require("../assets/images/bg-intro.jpg")}
          />
      </View>

      <Text style={[styles.nhpTnBn2]}>
        Tạo tài khoản để kết nối với bạn bè, người thân và cộng đồng có chung sở
        thích.
      </Text>

      <TouchableOpacity onPress={goToNextScreen}>
        <View style={styles.buttonprimary}>
          <Text style={styles.logIn}>Bắt đầu</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.buttonSub}>
        <Text style={styles.logIn2}>Tôi có tài khoản rồi</Text>
      </View>
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
  wrapIntro: {
    position: 'relative',
    top: 140,
  },
  bgIntro: {
    width: 376,
    height: 200,
    objectFit: "cover",
    borderRadius: 16,
    marginLeft: 16,
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
    bottom: -190,
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
    bottom: -210,
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
    fontWeight: "800",
    color: Color.colorBlack,
  },
  nhpTnBn1: {
    top: 125,
    fontSize: 14,
    left: 16,
    maxWidth: "100%",
    marginRight: 16,
  },
  nhpTnBn2: {
    top: 165,
    fontSize: 14,
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

export default IntroCreateAccount;
