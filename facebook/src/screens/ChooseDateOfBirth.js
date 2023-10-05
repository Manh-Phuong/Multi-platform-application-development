import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import DateTimePicker from "@react-native-community/datetimepicker";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; 
import { LinearGradient } from "expo-linear-gradient";

const ChooseDateOfBirth = () => {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [isFocusDate, setIsFocusDate] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  const translateY = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  const handleFocusDate = () => {
    setIsFocusDate(true);
    setShowDatePicker(true);
  };

  const handleBlurDate = () => {
    setIsFocusDate(false);
  };

  const handleChangeDate = (event, newDate) => {
    setShowDatePicker(false);
    if (event.type === "set") {
      setDateOfBirth(newDate);
    }
  };

  const goBackHandler = () => {
    navigation.goBack();
  };

  const goToNextScreen = () => {
    navigation.navigate("ChooseGender");
  };

  const formatCustomDate = (date) => {
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `Ngày ${day} ${month}, ${year}`;
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        handleBlurDate();
        setShowDatePicker(false);
      }}
      accessible={false}
    >
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

        <View style={styles.headerText}>
          <Text style={styles.mainText}>Ngày sinh của bạn là khi nào?</Text>
          <Text style={styles.subText}>
            Chọn ngày sinh của bạn. Bạn luôn có thể đặt thông tin này ở chế độ
            riêng tư vào lúc khác. Tại sao tôi cần cung cấp ngày sinh của mình?
          </Text>
        </View>
        <View>
          <Text style={styles.textLabel}>Ngày sinh</Text>
          <View
            style={[
              styles.textInputContainer,
              isFocusDate ? styles.focusedInput : null,
            ]}
          >
            <Text
              style={[styles.textInput]}
              selectable={false}
              onPress={() => {
                handleFocusDate();
              }}
              
            >{formatCustomDate(dateOfBirth)}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={goToNextScreen}
          >
            <Text style={styles.buttonText}>Tiếp</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            style={styles.datePicker}
            mode="date"
            value={dateOfBirth}
            is24Hour={true}
            display="spinner"
            onChange={handleChangeDate}/>) } 
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    height: "100%",
    position: "relative",
  },
  textInputContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 56
  },
  primaryButton: {
    backgroundColor: "#0063e0",
    width: "100%",
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  subButton: {
    borderColor: "#0063e0", // Màu của viền
    borderWidth: 1, // Độ dày của viền
    padding: 10, // Khoảng cách giữa viền và văn bản
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 44,
  },
  subButtonText: {
    color: "#0063e0",
    fontWeight: "bold",
  },
  icon: {
    width: 30,
    height: 30,
    backgroundColor: "#0063e0",
    borderRadius: 15,
    color: "white",
  },
  subButtonView: {
    position: "absolute",
    bottom: 50,
    left: 16,
    right: 16,
    width: "100%",
    height: 44,
  },
  linkText: {
    paddingTop: 20,
    alignItems: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textLabel: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "bold",
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
  datePicker: {
    position: "absolute",
    bottom: 0,
    left: -17,
    right: -17,
    backgroundColor: "#cfd4d9",
    height: 300,
  },
  focusedInput: {
    borderColor: "black",
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
  subText: {
    fontSize: 15,
  },
});

export default ChooseDateOfBirth;