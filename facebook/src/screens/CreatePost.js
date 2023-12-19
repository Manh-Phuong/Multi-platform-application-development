import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Video, ResizeMode } from 'expo-av';
import * as PostServices from '../services/PostServices';

const CreatePost = () => {
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = React.useState('');
    const [isShowTagPart, setIsShowTagPart] = useState(true);
    const [isShowKeyBoard, setIsShowKeyBoard] = useState(false);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [textInput, setTextInput] = useState('');

    const status = useSelector((state) => state.post.status);

    const showAlert = () => {
        Alert.alert(
            'Lưu bài viết này dưới dạng bản nháp?',
            'Nếu bỏ bây giờ, bạn sẽ mất bài viết này.',
            [
                { text: 'Lưu bản nháp', onPress: () => console.log('Nút 1 được nhấn') },
                { text: 'Bỏ bài viết', onPress: () => navigation.goBack() },
                {
                    text: 'Tiếp tục chỉnh sửa',
                    onPress: () => console.log('Nút 3 được nhấn'),
                },
            ],
            { cancelable: false }, // Cho phép người dùng nhấn bất kỳ nơi nào để đóng thông báo
        );
    };

    const imagePicker = () => {
        let options = {
            storageOptions: {
                path: 'images',
            },
        };
        launchImageLibrary(options, (res) => {
            setSelectedImage(res.assets[0].uri);
        });
    };

    const toggleTagPart = () => {
        setIsShowTagPart(!isShowTagPart);
    };

    const hideTagPart = () => {
        setIsShowTagPart(false);
    };

    const toggleShowKeyBoard = () => {
        setIsShowKeyBoard(!isShowKeyBoard);
        setIsShowTagPart(!isShowTagPart);
    };

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access media library is required!');
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            allowsMultipleSelection: true,
            // allowsEditing: true,
            // aspect: [4, 3],
            // quality: 1,
        });

        if (!result.canceled && result.assets.length > 4) {
            alert('Bạn chỉ có thể chọn tối đa 4 ảnh.');
            return;
        }

        if (!result.canceled) {
            // console.log(result.assets[0].uri);
            // const selectedImages = result.assets.map((asset) => asset.uri);
            // setImage(selectedImages);
            // Tại đây, bạn có thể tải lên ảnh lên máy chủ hoặc làm gì bạn cần với ảnh này.
            const mediaType = result.assets[0].type;

            if (mediaType === 'image') {
                const selectedImages = result.assets.map((asset) => asset.uri);
                setImage(selectedImages);
                console.log(selectedImages);
                // console.log(result);
            } else if (mediaType === 'video') {
                const selectedVideo = result.assets[0].uri;
                setVideo(selectedVideo);
                console.log(selectedVideo);
            }
        }
    };

    const changeInput = (newInput) => {
        setTextInput(newInput);
    };

    const handlePost = async () => {
        try {
            const formData = new FormData();
            if (image) {
                for (let i = 0; i < image.length; i++) {
                    formData.append('image', {
                        uri: image[i],
                        type: 'image/jpeg',
                        name: 'image.jpg',
                    });
                }
            } else {
                formData.append('image', null);
            }

            if (video) {
                formData.append('video', {
                    uri: video,
                    type: 'video/mp4',
                    name: 'video.mp4',
                });
            } else {
                formData.append('video', null);
            }

            formData.append('described', textInput);
            formData.append('status', status || 'Hyped');
            formData.append('auto_accept', '1.0');

            const result = await PostServices.addPost(formData);
        } catch (error) {
            console.log('handlePost PostServices addPost', error);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={[styles.container, isShowKeyBoard && styles.showKeyBoard]}>
                    <View style={styles.header}>
                        <Image
                            onTouchEnd={showAlert}
                            source={require('../assets/icons/closeicon.png')}
                            style={{ width: 20, height: 20 }}
                        />
                        {/* <Icon name="close" size={24} color="black" onPress={showAlert} /> */}
                        <Text style={styles.textBigBold}>Tạo bài viết</Text>
                        <TouchableOpacity
                            style={[
                                !textInput.length || !(image && image.length) ? styles.buttonDisable : '',
                                textInput.length || (image && image.length) ? styles.buttonNotDisable : '',
                            ]}
                            disabled={!textInput.length && !(image && image.length)}
                            onPress={handlePost}
                        >
                            <Text
                                style={[
                                    styles.textBigBold,
                                    !textInput.length && !(image && image.length)
                                        ? styles.textDisable
                                        : { color: 'white' },
                                ]}
                            >
                                Đăng
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.bodyHead}>
                            <Image
                                style={styles.accountImage}
                                source={require('../assets/images/avatar-sample.png')}
                            ></Image>
                            <View style={styles.right}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.textMediumBold}>Tuấn Bùi</Text>
                                    <Text style={{ fontSize: 16 }}> hiện đang cảm thấy {status}</Text>
                                </View>
                                <View style={styles.rightPublic}>
                                    <Icon name="globe" size={12} color="#676669" />
                                    <Text style={styles.textSmall}>Công khai</Text>
                                    <Icon name="caret-down" size={12} color="#676669" />
                                </View>
                            </View>
                        </View>
                        <TextInput
                            onChangeText={changeInput}
                            style={styles.input}
                            placeholder={
                                image && image.length > 0 ? 'Hãy nói gì đó về bức ảnh này...' : 'Bạn đang nghĩ gì?'
                            }
                            editable
                            multiline
                            numberOfLines={4}
                            onPressIn={hideTagPart}
                        ></TextInput>
                    </View>

                    {image && image.length == 4 && (
                        <View style={styles.imagePart_4}>
                            {image &&
                                image?.map((item, index) => (
                                    <View
                                        key={index}
                                        style={{ width: '50%', height: 200, paddingRight: 4, marginBottom: 4 }}
                                    >
                                        <Image
                                            source={{ uri: item }}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </View>
                                ))}
                        </View>
                    )}
                    {image && image.length == 3 && (
                        <View style={styles.imagePart_3}>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 400 }}>
                                <View style={{ width: '50%', height: 400, paddingRight: 4, marginBottom: 4 }}>
                                    <Image
                                        source={{ uri: image[0] }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </View>
                                <View style={{ display: 'flex', rowGap: 4, width: '50%', height: 198 }}>
                                    <Image
                                        source={{ uri: image[1] }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <Image
                                        source={{ uri: image[2] }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                    {image && image.length == 2 && (
                        <View style={styles.imagePart_2}>
                            {image &&
                                image?.map((item, index) => (
                                    <View
                                        key={index}
                                        style={{ width: '50%', height: 400, paddingRight: 4, marginBottom: 4 }}
                                    >
                                        <Image
                                            source={{ uri: item }}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </View>
                                ))}
                        </View>
                    )}
                    {image && image.length == 1 && (
                        <View style={styles.imagePart_1}>
                            <View style={{ width: '100%', height: 400, marginBottom: 4 }}>
                                <Image
                                    source={{ uri: image[0] }}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </View>
                        </View>
                    )}

                    {video && (
                        <View style={styles.imagePart_1}>
                            <View style={{ width: '100%', height: 400, marginBottom: 4 }}>
                                <Video
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    source={{
                                        uri: video,
                                    }}
                                    rate={1.0}
                                    volume={1.0}
                                    resizeMode="cover"
                                    shouldPlay={false}
                                    isLooping
                                    useNativeControls
                                />
                            </View>
                        </View>
                    )}

                    {/* <View style={styles.modal} onTouchEnd={showAlert}>
          <Text>Bạn muốn hoàn thành bài viết của mình sau?</Text>
          <Text>Lưu bản nháp hoặc bạn có thể tiếp tục chỉnh sửa</Text>
        </View> */}
                    {/* <View style={{position: 'relative', bottom: 0}}> */}
                    {/* <Shadow style={{width: '100%', position: 'absolute', bottom: 0, backgroundColor: 'red'}}> */}
                    <View style={[styles.boxShadowContainer, styles.boxShadow]}>
                        <View style={[styles.tagPart]}>
                            <View
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                }}
                                onTouchEnd={toggleTagPart}
                            >
                                {isShowTagPart && <Icon name="caret-up" size={28} color="black" />}
                                {!isShowTagPart && <Icon name="caret-down" size={28} color="black" />}
                            </View>
                            {isShowTagPart && (
                                <View>
                                    <TouchableOpacity>
                                        <View style={[styles.groupIcon, styles.firstGroupIcon]} onTouchEnd={pickImage}>
                                            {/* <Icon name="image" size={20} color="#41bd5f" /> */}
                                            <Image
                                                style={{ height: 24, width: 24, objectFit: 'cover' }}
                                                source={require('../assets/icons/iconImage.png')}
                                            ></Image>
                                            <Text style={styles.textMedium}>Ảnh/video</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <View style={styles.groupIcon}>
                                        {/* <Icon name="user" size={24} color="#1278ef" /> */}
                                        <Image
                                            style={{ height: 24, width: 24, objectFit: 'cover' }}
                                            source={require('../assets/icons/tagIcon.png')}
                                        ></Image>
                                        <Text style={styles.textMedium}>Gắn thẻ người khác</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.groupIcon}
                                        onPress={() => {
                                            navigation.navigate('ChooseEmoji');
                                        }}
                                    >
                                        <Image
                                            style={{ height: 24, width: 24, objectFit: 'cover' }}
                                            source={require('../assets/icons/smileIcon.png')}
                                        ></Image>
                                        <Text style={styles.textMedium}>Cảm xúc/hoạt động</Text>
                                    </TouchableOpacity>
                                    <View style={styles.groupIcon}>
                                        <Image
                                            style={{ height: 24, width: 24, objectFit: 'cover' }}
                                            source={require('../assets/icons/checkInIcon.png')}
                                        ></Image>
                                        <Text style={styles.textMedium}>Check in</Text>
                                    </View>
                                    <View style={styles.groupIcon}>
                                        {/* <Icon name="camera" size={20} color="#1278ef" /> */}
                                        <Image
                                            style={{ height: 24, width: 24, objectFit: 'cover' }}
                                            source={require('../assets/icons/streamIcon.png')}
                                        ></Image>
                                        <Text style={styles.textMedium}>Video trực tiếp</Text>
                                    </View>
                                </View>
                            )}
                            {!isShowTagPart && (
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingLeft: 24,
                                        paddingRight: 24,
                                        paddingBottom: 12,
                                        paddingTop: 12,
                                        borderColor: '#dfe1e4',
                                        borderTopWidth: 1,
                                    }}
                                >
                                    <TouchableOpacity onPress={pickImage}>
                                        <Image
                                            style={{ height: 24, width: 24, objectFit: 'cover' }}
                                            source={require('../assets/icons/iconImage.png')}
                                        />
                                    </TouchableOpacity>
                                    <Image
                                        style={{ height: 24, width: 24, objectFit: 'cover' }}
                                        source={require('../assets/icons/tagIcon.png')}
                                    ></Image>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('ChooseEmoji');
                                        }}
                                    >
                                        <Image
                                            style={{ height: 24, width: 24, objectFit: 'cover' }}
                                            source={require('../assets/icons/smileIcon.png')}
                                        ></Image>
                                    </TouchableOpacity>
                                    <Image
                                        style={{ height: 24, width: 24, objectFit: 'cover' }}
                                        source={require('../assets/icons/checkInIcon.png')}
                                    ></Image>
                                    <Image
                                        style={{ height: 24, width: 24, objectFit: 'cover' }}
                                        source={require('../assets/icons/streamIcon.png')}
                                    ></Image>
                                </View>
                            )}
                        </View>
                    </View>
                    {/* </Shadow> */}
                </View>
                {/* </View> */}
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        //   paddingLeft: 16,
        //   paddingRight: 16
        backgroundColor: 'white',
        height: '100%',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 54,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: 'rgba(162,162,164,0.1)',
        alignItems: 'center',
    },
    textBigBold: {
        fontSize: 18,
        fontWeight: '600',
    },

    accountImage: {
        width: 42,
        height: 42,
        borderRadius: 999,
    },
    bodyHead: {
        display: 'flex',
        flexDirection: 'row',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        paddingTop: 10,
        paddingLeft: 16,
        paddingRight: 16,
    },
    textMediumBold: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    right: {
        marginLeft: 12,
    },
    rightPublic: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 8,
        borderWidth: 1,
        borderColor: '#676669',
        borderRadius: 4,
        paddingTop: 3,
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 3,
        marginTop: 6,
        width: 106,
    },
    textSmall: {
        fontSize: 12,
    },
    input: {
        marginTop: 24,
        fontSize: 18,
        // height: 350,
        paddingLeft: 16,
        paddingRight: 16,
    },
    icon: {
        width: 20,
        height: 20,
    },
    groupIcon: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 12,
        paddingTop: 14,
        paddingBottom: 14,
        columnGap: 12,
        alignItems: 'center',
        borderWidth: 0.6,
        borderColor: '#dfe1e4',
    },
    textMedium: {
        fontSize: 16,
        fontWeight: '500',
    },
    tagPart: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    boxShadow: {
        // shadowColor: "#333333",
        // shadowOpacity: 0.2,
        // shadowRadius: 4,
        //   shadowColor: 'black',
        // shadowOpacity: 1,
        // shadowOffset: { width: 4, height: 8},
        // shadowRadius: 20,
        // elevation: 10,
        // backgroundColor: 'white'
    },
    boxShadowContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // height: 500
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    firstGroupIcon: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modal: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    // showKeyBoard: {
    //   height: customHeight
    // }
    imagePart_4: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginRight: -4,
        marginTop: 12,
    },
    imagePart_3: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginRight: -4,
        marginTop: 12,
    },
    imagePart_2: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginRight: -4,
        marginTop: 12,
    },
    imagePart_1: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginRight: -4,
        marginTop: 12,
    },
    backgroundImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain', // Đảm bảo rằng hình ảnh không bị căng hoặc co khi thay đổi kích thước
        position: 'absolute',
        left: -22, // Dịch chuyển hình ảnh sang trái 22px
        top: -110, // Dịch chuyển hình ảnh lên trên 110px
    },
    buttonDisable: {
        backgroundColor: 'rgba(166, 167, 171, 0.4)',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 14,
        paddingRight: 14,
        borderRadius: 8,
    },
    buttonNotDisable: {
        backgroundColor: '#0866ff',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 14,
        paddingRight: 14,
        borderRadius: 8,
    },
    textDisable: {
        color: '#8b8d91',
    },
});

export default CreatePost;
