import { useNavigation, useRoute } from '@react-navigation/native';
import { faPen, faSearch, faArrowLeft, faCaretDown, faExclamationCircle, faCircleExclamation, faToggleOff, faGraduationCap, faFutbolBall, faUser, faUserAlt, faUserShield, faUserEdit, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Switch
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { width } from '@fortawesome/free-solid-svg-icons/faSquareCheck';

const EditProfile = () => {
    const navigation = useNavigation();
    const { width: screenWidth } = Dimensions.get('window');
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={{ flex: 1, backgroundColor: '#fefefe', height: "100%" }}>
            <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', marginTop: 50, backgroundColor: "fefefe", borderBottomWidth: 0.2, borderBottomColor: "#ddd", height: 50 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: "500", marginRight: 12 }}>Chỉnh sửa trang cá nhân</Text>
                </View>
            </View>
            <ScrollView style={styles.container}>


                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <View style={styles.horizontalView}></View>
                </View>
                <View style={{ marginHorizontal: 16 }}>
                    <View>
                        <View style={styles.miniHeader}>
                            <Text style={styles.textLeft}>Ảnh đại diện</Text>
                            <TouchableOpacity>
                                <Text style={styles.textRight}>Thêm</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.avatar}>
                            <TouchableOpacity>
                                <Image
                                    style={styles.menuImg}
                                    source={{
                                        uri: "https://hinhnen4k.com/wp-content/uploads/2023/02/anh-gai-xinh-vn-2.jpg",
                                    }}>
                                </Image>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <View style={styles.horizontalView}></View>
                    </View>
                    <View>
                        <View style={styles.miniHeader}>
                            <Text style={styles.textLeft}>Avatar</Text>
                            <TouchableOpacity>
                                <Text style={styles.textRight}>Chỉnh sửa</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.avatar}>
                            <TouchableOpacity>
                                <Image
                                    style={[styles.menuImg, style = { marginTop: 50 }]}
                                    source={require("../assets/images/avatar-carton.png")}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: "500" }}>Hiển thị trên trang cá nhân </Text>
                            <TouchableOpacity>
                                <FontAwesomeIcon icon={faExclamationCircle} color='#696969'></FontAwesomeIcon>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', display: 'flex' }}>
                            <Text style={{ fontSize: 14, opacity: 0.8, width: 280 }}>Avatar động hiển thị khi bạn vuột qua ảnh đại diện của mình. </Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                                style={styles.switchStyle}
                            />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <View style={styles.horizontalView}></View>
                    </View>
                    <View>
                        <View style={styles.miniHeader}>
                            <Text style={styles.textLeft}>Ảnh bìa</Text>
                            <TouchableOpacity>
                                <Text style={styles.textRight}>Chỉnh sửa</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 20, height: 230 }}>
                            <TouchableOpacity>
                                <Image style={{ height: 230, width: 'auto', borderRadius: 8 }}
                                    source={require("../assets/images/bg-intro.jpg")}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <View style={styles.horizontalView}></View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.miniHeader}>
                            <Text style={styles.textLeft}>Chi tiết</Text>
                            <TouchableOpacity>
                                <Text style={styles.textRight}>Chỉnh sửa</Text>
                            </TouchableOpacity>

                        </View>
                        <View>
                            <TouchableOpacity style={{ flexDirection: 'row', display: 'flex', marginTop: 10, width: '90%' }} >
                                <FontAwesomeIcon icon={faGraduationCap} size={20} color="#666" style={{ marginRight: 10 }} />
                                <Text>
                                    <Text style={{ color: '#000', fontSize: 16, fontWeight: '300' }}>Học tại </Text>
                                    <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>Đại học Bách khoa Hà Nội - Hanoi University of Science and Technology</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={{ flexDirection: 'row', display: 'flex', marginTop: 10, width: '90%' }} >
                                <FontAwesomeIcon icon={faGraduationCap} size={20} color="#666" style={{ marginRight: 10 }} />
                                <Text>
                                    <Text style={{ color: '#000', fontSize: 16, fontWeight: '300' }}>Đã học tại </Text>
                                    <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>lớp thầy Tú và thầy giáo Ba</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <View style={styles.horizontalView}></View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.miniHeader}>
                            <Text style={styles.textLeft}>Sở thích</Text>
                            <TouchableOpacity>
                                <Text style={styles.textRight}>Chỉnh sửa</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
                            <TouchableOpacity style={styles.favarite}>
                                <FontAwesomeIcon icon={faFutbolBall} size={18} color="#666" />
                                <Text style={styles.buttonText}>Bóng đá</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.favarite}>
                                <FontAwesomeIcon icon={faFutbolBall} size={18} color="#666" />
                                <Text style={styles.buttonText}>Bóng đá</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.favarite}>
                                <FontAwesomeIcon icon={faFutbolBall} size={18} color="#666" />
                                <Text style={styles.buttonText}>Bóng đá</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.favarite}>
                                <FontAwesomeIcon icon={faFutbolBall} size={18} color="#666" />
                                <Text style={styles.buttonText}>Bóng đá</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <View style={styles.horizontalView}></View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.miniHeader}>
                            <Text style={styles.textLeft}>Liên kết</Text>
                            <TouchableOpacity>
                                <Text style={styles.textRight}>Thêm</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <View style={styles.horizontalView}></View>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity style={{
                            backgroundColor: '#ecf4ff', paddingVertical: 10,
                            paddingHorizontal: 20,
                            width: 340,
                            borderRadius: 5,
                            justifyContent: 'center', alignItems: 'center',
                            height: 40,
                            flexDirection: 'row'
                        }}>
                            <FontAwesomeIcon icon={faUserPen}  color='#006fd1' size={20}></FontAwesomeIcon>
                            <Text style={{ color: '#006fd1', fontSize: 16, fontWeight: '700' }}> Chỉnh sửa thông tin giới thiệu</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 100 }}>

                    </View>
                </View>

            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
    },
    menuImg: {
        width: 140,
        height: 140,
        borderRadius: 999,
    },
    horizontalView: {
        marginVertical: 14,
        width: '100%',
        height: 1, // Đây là chiều cao của dòng ngang, bạn có thể điều chỉnh theo ý muốn
        backgroundColor: 'black',
        opacity: 0.1
    },
    miniHeader: {
        justifyContent: "space-between",
        display: "flex",
        flexDirection: 'row',
    },
    textLeft: {
        fontSize: 20,
        fontWeight: "700",

    },
    textRight: {
        fontSize: 16,
        fontWeight: "500",
        color: "#376cdb",
        paddingTop: 5
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    switchStyle: {
        marginLeft: 10,
    },
    favarite: {
        flexDirection: 'row',
        display: 'flex',
        marginTop: 10,
        marginLeft: 5,
        backgroundColor: '#e2e4eb',
        width: 110,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center', alignItems: 'center',
    },
    buttonText: {
        marginHorizontal: 8,
        fontSize: 16,
        fontWeight: '600'
    },
});

export default EditProfile;
