import * as React from "react";
import { useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Color, FontSize, Border, Padding } from "../GlobalStyles";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { setStoreNickname } from "../feature/account";
import { useDispatch } from "react-redux";

const windowHeight = Dimensions.get('window').height;
const customHeight = windowHeight - 50; 

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

  const dispatch = useDispatch()

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
      dispatch(setStoreNickname(surName + " " + name))
      navigation.navigate("ChooseDateOfBirth");
    }
  };

  const goBackHandler = () => {
    navigation.goBack(); // Quay lại màn hình trước đó
  };

  const goToNextScreen = () => {
    navigation.navigate("ChooseGender");
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

        <Text style={[styles.bnTnG, styles.bnTnGClr]}>Bạn tên gì?</Text>
        <Text style={[styles.nhpTnBn, styles.bnTnGClr]}>
          Nhập tên bạn sử dụng trong đời thực.
        </Text>
        <View style={[styles.wrapLabel]}>
          <Text>Tên</Text>
          <Text>Họ</Text>
        </View>
        <View style={[styles.wrapInput]}>
          <TextInput
            style={[styles.inputtextPosition1, inputBorderStyleName]}
            placeholder="Tên"
            ref={nameInputRef}
            // keyboardType="default"
            returnKeyType="next"
            onSubmitEditing={() => surNameInputRef.current.focus()}
            onChangeText={changeName}
            onFocus={handleFocusName}
            onBlur={handleBlurName}
            autoFocus
          />

          <TextInput
            style={[styles.inputtextPosition2, inputBorderStyleSurName]}
            placeholder="Họ"
            ref={surNameInputRef}
            // keyboardType="default"
            returnKeyType="done"
            // onSubmitEditing={() => surNameInputRef.current.focus()}
            onChangeText={changeSurName}
            onFocus={handleFocusSurName}
            onBlur={handleBlurSurName}
          />
        </View>

        <TouchableOpacity onPress={handleSummit}>
          <View style={styles.buttonprimary}>
            <Text style={styles.logIn}>Tiếp</Text>
          </View>
        </TouchableOpacity>
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
    marginTop: 40,
  },
  button: {
    position: "absolute",
    width: "100%",
    top: customHeight,
    color: "#0062e0",
    fontWeight: "600",
    textAlign: "center",

  },
  inputtextPosition1: {
    height: 50,
    minWidth: 180,
    maxWidth: 180,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingHorizontal: 15,
  },
  inputtextPosition2: {
    height: 50,
    minWidth: 180,
    maxWidth: 180,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingHorizontal: 15,
  },
  logIn: {
    color: Color.white,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonprimary: {
    borderRadius: Border.br_81xl,
    backgroundColor: Color.colorRoyalblue_200,
    paddingVertical: Padding.p_base,
    marginTop: 20,
  },
  vectorIcon: {
    width: 20,
    height: 20,
    objectFit: "cover",
  },
  bnTnG: {
    fontSize: 24,
    fontWeight: "600",
    color: Color.colorBlack,
    marginTop: 20,
  },
  nhpTnBn: {
    fontSize: 15,
  },
  inputtext: {
    right: 195,
    left: 16,
  },
  createName: {
    flex: 1,
    overflow: "hidden",
    width: "100%",
    paddingLeft: 12,
    paddingRight: 12,
  },
});

export default CreateName;
