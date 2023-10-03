import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Chú ý: Icon set của bạn phải được import từ thư viện phù hợp.
import { Button, CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const ChooseGender = () => {
  const navigation = useNavigation();

  const goBackHandler = () => {
    navigation.goBack(); // Quay lại màn hình trước đó
  };

  const goToNextScreen = () => {
    navigation.navigate("ChooseNumberPhone");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBackHandler}>
        <View style={{ marginTop: 40 }}>
          <Icon name="angle-left" size={30} color="#000" />
        </View>
      </TouchableOpacity>

      <View style={styles.headerText}>
        <Text style={styles.mainText}>Giới tính của bạn là gì?</Text>
        <Text style={styles.subText}>
          Bạn có thể thay đổi người nhìn thấy giới tính của mình trên trang cá
          nhân vào lúc khác.
        </Text>
      </View>
      <View style={styles.checkboxField}>
        <View style={styles.field}>
          <Text style={styles.fieldText}>Nữ</Text>
          <CheckBox checkedIcon="dot-circle-o" uncheckedIcon="circle-o" />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldText}>Nam</Text>
          <CheckBox checkedIcon="dot-circle-o" uncheckedIcon="circle-o" />
        </View>
        <View style={[styles.field, styles.lastField]}>
          <Text
            style={{
              ...styles.fieldText,
              maxWidth: "80%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* <View>
                            <Text style= {
                                {
                                    fontWeight: "bold",
                                }
                            }>Tùy chọn khác</Text>

                        </View>
                        <View>
                            <Text>Chọn tùy chọn khác nếu bạn thuộc giới tính khác hoặc không muốn tiết lộ.</Text>

                        </View> */}
            <Text>Khác</Text>
          </Text>

          <CheckBox checkedIcon="dot-circle-o" uncheckedIcon="circle-o" />
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.primaryButton} onPress={goToNextScreen}>
          <Text style={styles.buttonText}>Tiếp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fdf5f7",
    height: "100%",
    position: "relative",
    fontSize: 16,
  },
  headerText: {
    marginTop: 12,
    marginBottom: 20,
  },
  mainText: {
    paddingBottom: 12,
    fontSize: 24,
    fontWeight: "bold",
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
    paddingTop: 12,
    paddingBottom: 12,
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
  },
});

export default ChooseGender;
