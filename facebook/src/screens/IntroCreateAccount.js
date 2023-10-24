import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Color, FontSize, Border, Padding } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const IntroCreateAccount = () => {
  const navigation = useNavigation();

  const goBackHandler = () => {
    navigation.goBack(); // Quay lại màn hình trước đó
  };

  const goToNextScreen = () => {
    navigation.navigate("CreateName");
  };

  return (
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    marginTop: 90,
  },
  wrapIntro: {
    marginTop: 20,
  },
  bgIntro: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 16,
  },
  logIn: {
    color: Color.white,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  logIn2: {
    color: Color.colorBlack,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonprimary: {
    marginTop: 20,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.colorRoyalblue_200,
    alignItems: "center",
    paddingHorizontal: Padding.p_13xl,
    paddingVertical: Padding.p_base,
  },
  buttonSub: {
    borderRadius: Border.br_81xl,
    backgroundColor: Color.white,
    borderColor: "#ccc",
    borderWidth: 1,
    alignItems: "center",
    paddingHorizontal: Padding.p_13xl,
    paddingVertical: Padding.p_base,
    marginTop: 15,
  },
  vectorIcon: {
    width: 20,
    height: 20,
    objectFit: "cover",
  },
  bnTnG: {
    marginTop: 20,
    fontSize: 24,
    width: "100%",
    fontWeight: "800",
    color: Color.colorBlack,
  },
  nhpTnBn2: {
    fontSize: 15,
    maxWidth: "100%",
    marginTop: 20,
  },
  createName: {
    padding: 10,
    height: "100%"
  },
});

export default IntroCreateAccount;
