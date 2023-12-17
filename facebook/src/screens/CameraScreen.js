import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setStoreTemp } from '../feature/profile';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function CameraScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const { upAvatar } = route.params || false;
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImage(data.uri);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const savePicture = async () => {
        if (image) {
            try {
                const asset = await MediaLibrary.createAssetAsync(image);
                setImage(null);
                if (!upAvatar) {
                    alert('Lưu ảnh thành công! 🎉');
                } else {
                    dispatch(setStoreTemp(image));
                    navigation.navigate('PreviewImage', { props: 'ImageAvatar' });
                }
                console.log('saved successfully');
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (hasCameraPermission === false) {
        return <Text>Không thể kết nối tới camera</Text>;
    }

    return (
        <View style={styles.container}>
            {!image ? (
                <Camera style={styles.camera} type={type} ref={cameraRef} flashMode={flash}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 30,
                        }}
                    >
                        <Button
                            title=""
                            icon="retweet"
                            onPress={() => {
                                setType(type === CameraType.back ? CameraType.front : CameraType.back);
                            }}
                        />
                        <Button
                            onPress={() =>
                                setFlash(
                                    flash === Camera.Constants.FlashMode.off
                                        ? Camera.Constants.FlashMode.on
                                        : Camera.Constants.FlashMode.off,
                                )
                            }
                            icon="flash"
                            color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
                        />
                    </View>
                </Camera>
            ) : (
                <Image source={{ uri: image }} style={styles.camera} />
            )}

            <View style={styles.controls}>
                {image ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 50,
                            marginTop: 12,
                        }}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} size={24} color="white" />
                        <Button title="chụp lại" onPress={() => setImage(null)} icon="retweet" />
                        <Button title="Lưu" onPress={savePicture} icon="check" />
                    </View>
                ) : (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 50,
                            marginTop: 12,
                        }}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} size={24} color="white" />
                        <View style={{ marginLeft: 100 }}>
                            <Button title="" onPress={takePicture} icon="camera" />
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#000',
        padding: 8,
    },
    controls: {
        flex: 0.5,
    },
    button: {
        height: 40,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#E9730F',
        marginLeft: 10,
    },
    camera: {
        flex: 5,
        borderRadius: 20,
    },
    topControls: {
        flex: 1,
    },
});
