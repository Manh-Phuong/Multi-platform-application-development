import React, {useState, useRef, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
    Animated
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Chú ý: Icon set của bạn phải được import từ thư viện phù hợp.

const ChooseDateOfBirth = () => {
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [isFocusDate, setIsFocusDate] = useState(false);
    const dateInputRef = useRef(null);

    const translateY = useRef(new Animated.Value(100)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 1000, // Thời gian của hiệu ứng (1 giây)
            useNativeDriver: true, // Sử dụng native driver để tối ưu hiệu suất
        }).start();
    }, [translateY]);
    const handleFocusDate = () => {
        setIsFocusDate(true);
    };

    const handleBlurDate = () => {
        setIsFocusDate(false);
    };

    const handleChangeDate = (event, newDate) => {
        setDateOfBirth(newDate)
    }

    const formatCustomDate = (date) => {
        const months = [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12'
        ];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `Ngày ${day} ${month}, ${year}`;
    }
    return (<TouchableWithoutFeedback onPress={
            () => {
                Keyboard.dismiss();
                handleBlurDate();
            }
        }
        accessible={false}>
        <View style={
            styles.container
        }>
            <View style={
                {marginTop: 40}
            }>
                <Icon name="angle-left"
                    size={30}
                    color="#000"/>
            </View>
            <View style={
                styles.headerText
            }>
                <Text style={
                    styles.mainText
                }>Ngày sinh của bạn là khi nào?</Text>
                <Text style={
                    styles.subText
                }>Chọn ngày sinh của bạn. Bạn luôn có thể đặt thông tin này ở chế độ riêng tư vào lúc khác. Tại sao tôi cần cung cấp ngày sinh của mình?</Text>
            </View>
            <View>
                <Text style={
                    styles.textLabel
                }>Ngày sinh</Text>
                <View style={
                    [
                        styles.textInputContainer,
                        isFocusDate ? styles.focusedInput : null
                    ]
                }>
                    <TextInput style={
                            [styles.textInput]
                        }
                        placeholderTextColor="#888"
                        onFocus={
                            () => {
                                Keyboard.dismiss()
                                handleFocusDate()
                            }
                        }

                        value={
                            formatCustomDate(dateOfBirth)
                    }></TextInput>

            </View>
        </View>
        <View>
            <TouchableOpacity style={
                styles.primaryButton
            }>
                <Text style={
                    styles.buttonText
                }>Tiếp</Text>
            </TouchableOpacity>
        </View>

        {
        isFocusDate && <DateTimePicker style={
                styles.datePicker
            }
            mode="date"
            value={dateOfBirth}
            is24Hour={true}
            display="spinner"
            onChange={handleChangeDate}/>
        } 
        </View>
</TouchableWithoutFeedback>);
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "white",
        height: "100%",
        position: "relative"
    },
    textInputContainer: {
        borderColor: "#ccc",
        borderWidth: 1,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: "white",
        borderRadius: 16,
        marginBottom: 10,
        height: 56
    },
    textInput: {
        fontSize: 16
    },
    primaryButton: {
        backgroundColor: "#0063e0",
        width: "100%",
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%"
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"

    },
    subButton: {
        borderColor: "#0063e0", // Màu của viền
        borderWidth: 1, // Độ dày của viền
        padding: 10, // Khoảng cách giữa viền và văn bản
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 44
    },
    subButtonText: {
        color: "#0063e0",
        fontWeight: "bold"
    },
    icon: {
        width: 30,
        height: 30,
        backgroundColor: "#0063e0",
        borderRadius: 15,
        color: "white"

    },
    subButtonView: {
        position: "absolute",
        bottom: 50,
        left: 16,
        right: 16,
        width: "100%",
        height: 44
    },
    linkText: {
        paddingTop: 20,
        alignItems: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    textLabel: {
        fontSize: 16,
        marginBottom: 6,
        marginLeft: 12
    },
    headerText: {
        marginTop: 12,
        marginBottom: 20
    },
    mainText: {
        paddingBottom: 12,
        fontSize: 24,
        fontWeight: "bold"
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
        borderColor: "black"
    }
});

export default ChooseDateOfBirth;
