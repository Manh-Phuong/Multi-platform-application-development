import * as React from "react";
import { useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Color, FontSize, Border, Padding } from "../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
// import { WebView } from "expo-web-browser";
import { WebView } from "react-native-webview";

const Policy = () => {
  const navigation = useNavigation();

  const goBackHandler = () => {
    navigation.goBack(); // Quay lại màn hình trước đó
  };

  const apiEndpoint =
    "https://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&entry=0";

  const handleWebViewLoad = () => {
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log("Dữ liệu từ API:", data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };

  return (
    <LinearGradient
      colors={["#fffaf2", "#eef4fd", "#f0f3fb", "#ecf5fb"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.createName}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.wrapHeader}>
          <TouchableOpacity onPress={goBackHandler}>
            <Image
              style={[styles.vectorIcon, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/images/vector.png")}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Điều khoản và quyền riêng tư</Text>
        </View>
        <WebView
          source={{
            uri: "https://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&entry=0",
          }}
          onLoad={handleWebViewLoad}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "relative",
    top: 24,
    left: 16,
    overflow: "hidden",
  },
  wrapHeader: {
    height: 60,
    backgroundColor: 'white',
  },
  textHeader: {
    fontSize:20,
    left: 46,
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
  wrapInput: {
    top: 208,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginLeft: 16,
  },
  inputtextPosition1: {
    height: 50,
    minWidth: 170,
    maxWidth: 170,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingHorizontal: 15,
  },
  inputtextPosition2: {
    height: 50,
    minWidth: 170,
    maxWidth: 170,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingHorizontal: 15,
    marginRight: 32,
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
    fontWeight: "600",
  },
  buttonprimary: {
    bottom: -290,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.colorRoyalblue_200,
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
    top: 137,
    left: -8,
    fontSize: FontSize.size_xl,
    width: 142,
    height: 30,
    fontWeight: "600",
    color: Color.colorBlack,
  },
  nhpTnBn: {
    top: 175,
    fontSize: 16,
    left: 16,
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
    // backgroundColor: "#f0f2f5",
    flex: 1,
    overflow: "hidden",
    width: "100%",
    marginTop: 70
  },
});

export default Policy;
