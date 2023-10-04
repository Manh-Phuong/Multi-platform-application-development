import { React, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Chú ý: Icon set của bạn phải được import từ thư viện phù hợp.
import { CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const PolicyConfirm = () => {
  const [positionCheckbox, setPositionCheckbox] = useState(-1);
  const navigation = useNavigation();

  const goBackHandler = () => {
    navigation.goBack(); // Quay lại màn hình trước đó
  };

  const goToNextScreen = () => {
    if (validateCheckbox()) {
      navigation.navigate("ChooseNumberPhone");
    }
  };
  const handleCheckbox = (index) => {
    setPositionCheckbox(index);
  };
  const validateCheckbox = () => {
    if (positionCheckbox == -1) {
      Alert.alert("Giới tính trống.", "Vui lòng chọn giới tính.", [
        {
          text: "OK",
        },
      ]);
      return false;
    }
    return true;
  };
  return (
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
      {/* <TouchableOpacity onPress={goBackHandler}>
        <View style={{ marginTop: 40 }}>
          <Icon name="angle-left" size={30} color="#000" />
        </View>
      </TouchableOpacity> */}

      <View style={styles.headerText}>
        <Text style={styles.mainText}>
          Đồng ý với điều khoản và chính sách của Facebook
        </Text>
        <Text style={styles.subText}>
          Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ
          của bạn lên Facebook.
        </Text>
        <Text style={[styles.subText, styles.marginTop12]}>
          Bạn đồng ý với Điều khoản, Chính sách và Quyền riêng tư của chúng tôi
          nhé.
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.primaryButton} onPress={goToNextScreen}>
          <Text style={styles.buttonText}>Tôi đồng ý</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f2f5",
    height: "100%",
    position: "relative",
    fontSize: 16,
  },
  headerText: {
    marginTop: 100,
    marginBottom: 20,
  },
  mainText: {
    paddingBottom: 12,
    fontSize: 24,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 15,
  },
  checkboxField: {
    borderRadius: 16,
    backgroundColor: "white",
  },
  field: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "rgb(204, 204, 204)",
    borderBottomWidth: 1,
    paddingLeft: 20,
  },
  fieldText: {
    fontSize: 18,
  },
  lastField: {
    borderBottomWidth: 0,
  },
  primaryButton: {
    backgroundColor: "#0063e0",
    width: "100%",
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  vectorIcon: {
    width: 20,
    height: 20,
    objectFit: "cover",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "relative",
    top: 70,
    overflow: "hidden",
  },
  marginTop12: {
    marginTop: 12, // Khoảng cách giữa đoạn văn bản và phần trên nó
  },
});

export default PolicyConfirm;
