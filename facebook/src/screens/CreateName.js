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
// import LinearGradient from "react-native-linear-gradient";
import {LinearGradient} from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";

const CreateName = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [isFocusedName, setIsFocusedName] = useState(true);
  const [isFocusedSurName, setIsFocusedSurName] = useState(false);

  const nameInputRef = useRef(null);
  const surNameInputRef = useRef(null);

  const inputBorderStyleName = isFocusedName
    ? { borderColor: "black", borderWidth: 1 }
    : {};
  const inputBorderStyleSurName = isFocusedSurName
    ? { borderColor: "black", borderWidth: 1 }
    : {};

  const changeName = (newName) => {
    setName(newName);
  };

  const changeSurName = (newSurName) => {
    setSurName(newSurName);
  };

  const handleFocusSurName = () => {
    setIsFocusedSurName(true);
    setIsFocusedName(false);
  };

  const handleBlurSurName = () => {
    setIsFocusedSurName(false);
  };
  const handleFocusName = () => {
    setIsFocusedName(true);
  };

  const handleBlurName = () => {
    setIsFocusedName(false);
  };

  const handleSummit = () => {
    if (!name.trim()) {
      Alert.alert(
        "Tên không được để trống",
        "Hãy nhập tên của bạn để tiếp tục.",
        [
          {
            text: "OK",
            onPress: () => {
              nameInputRef.current.focus();
            },
          },
        ]
      );
    } else if (!surName.trim()) {
      Alert.alert(
        "Họ không được để trống",
        "Hãy nhập họ của bạn để tiếp tục.",
        [
          {
            text: "OK",
            onPress: () => {
              surNameInputRef.current.focus();
            },
          },
        ]
      );
    } else {
      navigation.navigate("ChooseNumberPhone");
    }
  };

  const goBackHandler = () => {
    navigation.goBack(); // Quay lại màn hình trước đó
  };

  const goToNextScreen = () => {
    navigation.navigate("ChooseGender");
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

      <Text style={[styles.bnTnG, styles.bnTnGClr]}>Bạn tên gì?</Text>
      <Text style={[styles.nhpTnBn, styles.bnTnGClr]}>
        Nhập tên bạn sử dụng trong đời thực.
      </Text>
      <View style={[styles.wrapInput]}>
        <View>
          <KeyboardAvoidingView>
            <TextInput
              style={[styles.inputtextPosition1, inputBorderStyleName]}
              placeholder="Tên"
              ref={nameInputRef}
              // keyboardType="default"
              returnKeyType="next"
              onSubmitEditing={() => nameInputRef.current.focus()}
              onChangeText={changeName}
              onFocus={handleFocusName}
              onBlur={handleBlurName}
              autoFocus
            />
          </KeyboardAvoidingView>
        </View>

        <View>
          <KeyboardAvoidingView>
            <TextInput
              style={[styles.inputtextPosition2, inputBorderStyleSurName]}
              placeholder="Họ"
              ref={surNameInputRef}
              // keyboardType="default"
              returnKeyType="next"
              // onSubmitEditing={() => surNameInputRef.current.focus()}
              onChangeText={changeSurName}
              onFocus={handleFocusSurName}
              onBlur={handleBlurSurName}
            />
          </KeyboardAvoidingView>
        </View>
      </View>

      <TouchableOpacity onPress={handleSummit}>
        <View style={styles.buttonprimary}>
          <Text style={styles.logIn}>Tiếp</Text>
        </View>
      </TouchableOpacity>
      <Text style={[styles.button]}>Bạn đã có tài khoản ư?</Text>
    </LinearGradient>
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
    fontSize: 14,
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
  },
});

export default CreateName;
