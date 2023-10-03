import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from "react-native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const CreateName = () => {
  const navigation = useNavigation();

  const goBackHandler = () => {
    navigation.goBack(); // Quay lại màn hình trước đó
  };

  const goToNextScreen = () => {
    navigation.navigate('ChooseAge'); 
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

      <Text style={[styles.bnTnG, styles.bnTnGClr]}>Bạn tên gì?</Text>
      <Text style={[styles.nhpTnBn, styles.bnTnGClr]}>
        Nhập tên bạn sử dụng trong đời thực.
      </Text>
      <View>
        <KeyboardAvoidingView>
          <TextInput style={[styles.inputtextPosition1]} placeholder="Tên" />
        </KeyboardAvoidingView>
      </View>

      <View>
        <KeyboardAvoidingView>
          <TextInput style={[styles.inputtextPosition2]} placeholder="Họ" />
        </KeyboardAvoidingView>
      </View>

      <TouchableOpacity onPress={goToNextScreen}>
        <View style={styles.buttonprimary}>
          <Text style={styles.logIn}>Tiếp</Text>
        </View>
      </TouchableOpacity>
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
  bnTnGClr: {
    color: Color.colorBlack,
    textAlign: "center",
    position: "absolute",
  },
  inputtextPosition1: {
    height: 50,
    top: 208,
    left: 16,
    position: "absolute",
    minWidth: 170,
    maxWidth: 170,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingHorizontal: 15,
  },
  inputtextPosition2: {
    height: 50,
    top: 208,
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
    fontFamily: FontFamily.uI16Semi,
    fontWeight: "600",
    color: Color.colorBlack,
  },
  nhpTnBn: {
    top: 175,
    fontSize: 14,
    fontFamily: FontFamily.interRegular,
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
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    width: "100%",
  },
});

export default CreateName;