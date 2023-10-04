import * as React from "react";
import { useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import { Color, FontSize, Border, Padding } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const CreatePassword = () => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate("PolicyConfirm");
  };

  const goBackHandler = () => {
    navigation.goBack(); // Quay lại màn hình trước đó
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={["#fffaf2", "#eef4fd", "#f0f3fb", "#ecf5fb"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <TouchableOpacity onPress={goBackHandler}>
          <Image
            style={[styles.vectorIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/images/vector.png")}
          />
        </TouchableOpacity>
        <Text style={[styles.bnTnG]}>Lưu thông tin đăng nhập?</Text>
        <Text style={[styles.nhpTnBn1]}>
          Chúng tôi sẽ lưu thông tin đăng nhập để bạn không cần nhập vào lần
          sau.
        </Text>

        <View>
          <TouchableOpacity style={styles.buttonprimary} onPress={handleSubmit}>
            <Text style={styles.logIn}>Lưu</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.buttonSub} onPress={handleSubmit}>
            <Text style={styles.logIn2}>Lúc khác</Text>
          </TouchableOpacity>
        </View>
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
  button: {
    position: "absolute",
    left: "32%",
    width: "100%",
    bottom: 18,
    color: "#0062e0",
    fontWeight: "600",
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
    fontSize: 16,
    fontWeight: "700",
  },
  logIn2: {
    color: Color.colorBlack,
    textAlign: "center",
    fontSize: FontSize.uI16Medium_size,
    fontWeight: "700",
  },
  buttonprimary: {
    bottom: -150,
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
    bottom: -170,
    borderRadius: Border.br_81xl,
    borderColor: "#ccc",
    color: "black",
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
    fontSize: 16,
    left: 16,
    maxWidth: "100%",
    marginRight: 16,
  },
  nhpTnBn2: {
    top: 215,
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
  container: {
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
