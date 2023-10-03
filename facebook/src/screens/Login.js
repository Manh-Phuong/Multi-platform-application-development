import * as React from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Pressable,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Chú ý: Icon set của bạn phải được import từ thư viện phù hợp.

const Login = () => {
    return (

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
                {
                    width: "100%",
                    paddingTop: 80,
                    paddingBottom: 100,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }>
                <View style={
                    {
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: "#0063e0",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                }>
                    <Icon name="facebook"
                        size={40}
                        color="white"/>
                </View>
            </View>
            <View>
                <TextInput style={
                        styles.textInput
                    }
                    placeholder="Số di động hoặc email"
                    placeholderTextColor="#888"
                    // Màu sắc của placeholder
                ></TextInput>
            </View>
            <View>
                <TextInput style={
                        styles.textInput
                    }
                    placeholder="Mật khẩu"
                    placeholderTextColor="#888"
                    // Màu sắc của placeholder
                />
            </View>
            <View>
                <TouchableOpacity style={
                    styles.primaryButton
                }>
                    <Text style={
                        styles.buttonText
                    }>Đăng nhập</Text>
                </TouchableOpacity>
            </View>

            <View style={
                styles.linkText
            }>
                <Text>Quên mật khẩu?</Text>
            </View>

            <View style={
                styles.subButtonView
            }>
                <TouchableOpacity style={
                    styles.subButton
                }>
                    <Text style={
                        styles.subButtonText
                    }>Tạo tài khoản mới</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "white",
        height: "100%",
        position: "relative"
    },
    textInput: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 16,
        fontSize: 16,
        backgroundColor: "white",
        borderRadius: 16,
        marginBottom: 10
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
    }
    // inputtextPosition: {
    //     height: 50,
    //     position: "absolute",
    //     left: 16,
    //     right: 16
    // },
    // iconLayout: {
    //     maxHeight: "100%",
    //     maxWidth: "100%",
    //     position: "absolute",
    //     overflow: "hidden"
    // },
    // buttonprimarySpaceBlock: {
    //     paddingVertical: Padding.p_base,
    //     paddingHorizontal: Padding.p_13xl,
    //     alignItems: "center",
    //     borderRadius: Border.br_81xl,
    //     position: "absolute"
    // },
    // logTypo: {
    //     textAlign: "center",
    //     fontWeight: "600",
    //     fontSize: FontSize.uI16Semi_size
    // },
    // bgIcon: {
    //     height: "100%",
    //     top: "0%",
    //     right: "0%",
    //     bottom: "0%",
    //     left: "0%",
    //     borderRadius: Border.br_5xs,
    //     width: "100%",
    //     maxHeight: "100%",
    //     maxWidth: "100%"
    // },
    // email: {
    //     color: Color.gray03,
    //     textAlign: "left",

    //     fontWeight: "500",
    //     fontSize: FontSize.uI16Semi_size,
    //     top: "50%",
    //     marginTop: -9,
    //     left: 16,
    //     position: "absolute"
    // },
    // show: {
    //     color: Color.greenPrimary,
    //     textAlign: "right",
    //     display: "none",

    //     fontWeight: "500",
    //     fontSize: FontSize.uI16Semi_size,
    //     top: "50%",
    //     marginTop: -9,
    //     right: 16,
    //     position: "absolute"
    // },
    // inputtext: {
    //     top: 256
    // },
    // inputtext1: {
    //     top: 322
    // },
    // logIn1: {
    //     color: Color.white
    // },
    // buttonprimary: {
    //     bottom: 350,
    //     backgroundColor: Color.colorRoyalblue_200,
    //     left: 16,
    //     right: 16,
    //     paddingVertical: Padding.p_base,
    //     paddingHorizontal: Padding.p_13xl,
    //     alignItems: "center",
    //     borderRadius: Border.br_81xl
    // },
    // logIn2: {
    //     color: Color.colorRoyalblue_200
    // },
    // buttonprimary1: {
    //     right: 15,
    //     bottom: 114,
    //     left: 15,
    //     borderStyle: "solid",
    //     borderColor: Color.colorRoyalblue_200,
    //     borderWidth: 1,
    //     paddingVertical: Padding.p_base,
    //     paddingHorizontal: Padding.p_13xl,
    //     alignItems: "center",
    //     borderRadius: Border.br_81xl,
    //     backgroundColor: Color.white
    // },
    // qunMtKhu: {
    //     marginLeft: -62.5,
    //     bottom: 315,
    //     left: "50%",
    //     color: Color.colorBlack,

    //     fontWeight: "600",
    //     textAlign: "left",
    //     fontSize: FontSize.uI16Semi_size,
    //     position: "absolute"
    // },
    // vectorIcon: {
    //     height: "8.5%",
    //     width: "18.4%",
    //     top: "15.27%",
    //     right: "40.8%",
    //     bottom: "76.23%",
    //     left: "40.8%"
    // },
    // vectorIcon1: {
    //     height: "2.63%",
    //     width: "3.45%",
    //     top: "4.19%",
    //     right: "92.28%",
    //     bottom: "93.19%",
    //     left: "4.27%"
    // },
    // logIn: {
    //     flex: 1,
    //     height: 812,
    //     overflow: "hidden",
    //     width: "100%",
    //     backgroundColor: Color.white
    // },
    // input: {
    //     borderWidth: 1, // Độ dày của viền
    //     borderColor: 'black', // Màu sắc của viền
    //     padding: 20,
    //     borderRadius: 10
    // }

});

export default Login;
