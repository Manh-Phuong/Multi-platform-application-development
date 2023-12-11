import * as React from "react";
import { useRef } from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    Alert,
    Keyboard,
    TouchableWithoutFeedback
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Chú ý: Icon set của bạn phải được import từ thư viện phù hợp.
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faPuzzlePiece, faSearch, faUser, faUtensilSpoon, faUtensils } from "@fortawesome/free-solid-svg-icons";

const Video = () => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View>
                <View style={{paddingLeft:16, paddingRight: 16, paddingTop: 16, paddingBottom: 10, borderBottomWidth: 12, borderBottomColor: "#ccc"}}>
                    <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <View>
                            <Text style={{fontSize: 24, fontWeight: "bold"}}>Watch</Text>
                        </View>
                        <View style={{flexDirection: "row", columnGap: 12}}>
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 999,
                                    backgroundColor: '#ddd',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <FontAwesomeIcon icon={faUser} size={20}></FontAwesomeIcon>
                            </View>
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 999,
                                    backgroundColor: '#ddd',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <FontAwesomeIcon icon={faSearch} size={20}></FontAwesomeIcon>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingTop: 12}}>
                        <View style={styles.options}>
                            <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
                            <Text style={{fontSize: 16}}>Trực tiếp</Text>
                        </View>
                        <View style={styles.options}>
                            <FontAwesomeIcon icon={faUtensils}></FontAwesomeIcon>
                            <Text style={{fontSize: 16}}>Ẩm thực</Text>
                        </View>
                        <View style={styles.options}>
                            <FontAwesomeIcon icon={faPuzzlePiece}></FontAwesomeIcon>
                            <Text style={{fontSize: 16}}>Chơi game</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.videoContainer}>
                    
                </View>
            </View>
        </TouchableWithoutFeedback>                      
    );
}
export default Video;

const styles = StyleSheet.create({
    options: {
        flexDirection: "row", 
        columnGap: 6,
        alignItems: "center",
        backgroundColor: "#ccc",
        padding: 12,
        borderRadius: 20,
    }
});
