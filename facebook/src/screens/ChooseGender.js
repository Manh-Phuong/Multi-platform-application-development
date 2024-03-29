import { React, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Chú ý: Icon set của bạn phải được import từ thư viện phù hợp.
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ChooseGender = () => {
    const [positionCheckbox, setPositionCheckbox] = useState(-1);
    const navigation = useNavigation();

    const goBackHandler = () => {
        navigation.goBack(); // Quay lại màn hình trước đó
    };

    const goToNextScreen = () => {
        if (validateCheckbox()) {
            navigation.navigate('ChooseNumberPhone');
        }
    };
    const handleCheckbox = (index) => {
        setPositionCheckbox(index);
    };
    const validateCheckbox = () => {
        if (positionCheckbox == -1) {
            Alert.alert('Giới tính trống.', 'Vui lòng chọn giới tính.', [
                {
                    text: 'OK',
                },
            ]);
            return false;
        }
        return true;
    };
    return (
        <LinearGradient
            colors={['#fffaf2', '#eef4fd', '#f0f3fb', '#ecf5fb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <TouchableOpacity onPress={goBackHandler} style={{ marginTop: 60 }}>
                <FontAwesomeIcon icon={faArrowLeft} size={20}></FontAwesomeIcon>
            </TouchableOpacity>

            <View style={styles.headerText}>
                <Text style={styles.mainText}>Giới tính của bạn là gì?</Text>
                <Text style={styles.subText}>
                    Bạn có thể thay đổi người nhìn thấy giới tính của mình trên trang cá nhân vào lúc khác.
                </Text>
            </View>
            <View style={styles.checkboxField}>
                <View style={styles.field}>
                    <Text style={styles.fieldText}>Nữ</Text>
                    <CheckBox
                        checkedIcon="dot-circle-o"
                        onPress={() => {
                            handleCheckbox(1);
                        }}
                        checked={positionCheckbox == 1}
                        uncheckedIcon="circle-o"
                    />
                </View>
                <View style={styles.field}>
                    <Text style={styles.fieldText}>Nam</Text>
                    <CheckBox
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        onPress={() => {
                            handleCheckbox(2);
                        }}
                        checked={positionCheckbox == 2}
                    />
                </View>
                <View style={[styles.field, styles.lastField]}>
                    <Text style={styles.fieldText}>Khác</Text>
                    <CheckBox
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        onPress={() => {
                            handleCheckbox(0);
                        }}
                        checked={positionCheckbox == 0}
                    />
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.primaryButton} onPress={goToNextScreen}>
                    <Text style={styles.buttonText}>Tiếp</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f0f2f5',
        height: '100%',
        position: 'relative',
        fontSize: 16,
    },
    headerText: {
        marginTop: 20,
        marginBottom: 20,
    },
    mainText: {
        paddingBottom: 12,
        fontSize: 24,
        fontWeight: 'bold',
    },
    checkboxField: {
        borderRadius: 16,
        backgroundColor: 'white',
    },
    field: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'rgb(204, 204, 204)',
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
        backgroundColor: '#0063e0',
        width: '100%',
        height: 54,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
        marginTop: 20,
        fontSize: 16,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    vectorIcon: {
        width: 20,
        height: 20,
        objectFit: 'cover',
    },
    iconLayout: {
        maxHeight: '100%',
        maxWidth: '100%',
        position: 'relative',
        top: 70,
        overflow: 'hidden',
    },
    subText: {
        fontSize: 15,
    },
});

export default ChooseGender;
