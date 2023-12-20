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
    ScrollView,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Video, ResizeMode } from 'expo-av';
import * as PostServices from '../services/PostServices';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faCamera, faEllipsis, faLeftLong, faPlug, faShare } from '@fortawesome/free-solid-svg-icons';
import { SendIcon } from '../assets/icons';
import { faComment, faShareFromSquare, faShareSquare, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { deleteFeel, getListComment, setComment, setFeel } from '../services/CommentServices';
import post from '../feature/post';

const Header = ({ post, type, handleFocusInput, listCmt }) => {
    const [displayEmoji, setDisplayEmoji] = useState(false);
    const [isChooseEmoji, setIsChooseEmoji] = useState(-1);
    const [totalEmoji, setTotalEmoji] = useState('');
    const [reselect, setReselect] = useState('');
    const [type_, setType_] = useState(type);
    // const [images, setImages] = useState(post?.images);
    let pressTimer;

    const handlePressIn = () => {
        setDisplayEmoji(true);
    };

    const handlePressOut = () => {
        clearTimeout(pressTimer);
        setDisplayEmoji(false);
    };

    const handleChooseEmoji = async (type) => {
        const res = await setFeel({ id: post.id, type });
        if (res.code == 1000) {
            setIsChooseEmoji(type);
            setDisplayEmoji(false);
            setReselect(true);
            setTotalEmoji(parseInt(res.data.kudos, 10) + parseInt(res.data.disappointed, 10));
        }
    };
    const handleRemoveEmoji = async () => {
        const res = await deleteFeel({ id: post.id });
        if (res.code == 1000) {
            setIsChooseEmoji(-1);
            setDisplayEmoji(false);
            setType_(-1);
            setReselect(true);
            setTotalEmoji(parseInt(res.data.kudos, 10) + parseInt(res.data.disappointed, 10));
        }
    };
    useEffect(() => {
        // setImages(post.images)
    }, []);
    return (
        <TouchableWithoutFeedback onPress={handlePressOut}>
            <View style={{ borderTopWidth: 1, borderTopColor: '#ddd', paddingTop: 8 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingLeft: 16,
                        paddingRight: 16,
                    }}
                >
                    <View style={{ flexDirection: 'row', columnGap: 8, alignItems: 'center' }}>
                        <View>
                            <Image
                                style={{ width: 48, height: 48, borderRadius: 999 }}
                                contentFit="cover"
                                source={{
                                    uri:
                                        post?.avatar ||
                                        'https://res.cloudinary.com/manhphuong/image/upload/v1702483093/default_avatar_orhez1.jpg',
                                }}
                            />
                        </View>
                        <View>
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{post?.owner}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 14 }}>Công khai</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon>
                    </View>
                </View>
                <View>
                    <Text style={{ paddingLeft: 16, marginTop: 16, fontSize: 16, marginBottom: 4 }}>
                        {post.content}
                    </Text>

                    {post && post?.images && post?.images.length == 4 && (
                        <View style={styles.imagePart_4}>
                            {post.images &&
                                post.images.map((item, index) => (
                                    <View
                                        key={index}
                                        style={{ width: '50%', height: 200, paddingRight: 4, marginBottom: 4 }}
                                    >
                                        <Image
                                            source={{ uri: item.url }}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </View>
                                ))}
                        </View>
                    )}
                    {post && post?.images && post?.images.length == 3 && (
                        <View style={styles.imagePart_3}>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 400 }}>
                                <View style={{ width: '50%', height: 400, paddingRight: 4, marginBottom: 4 }}>
                                    <Image
                                        source={{ uri: post.images[0].url }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </View>
                                <View style={{ display: 'flex', rowGap: 4, width: '50%', height: 198 }}>
                                    <Image
                                        source={{ uri: post.images[1].url }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <Image
                                        source={{ uri: post.images[2].url }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                    {post && post?.images && post?.images.length == 2 && (
                        <View style={styles.imagePart_2}>
                            {post.images &&
                                post.images.map((item, index) => (
                                    <View
                                        key={index}
                                        style={{ width: '50%', height: 400, paddingRight: 4, marginBottom: 4 }}
                                    >
                                        <Image
                                            source={{ uri: item.url }}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </View>
                                ))}
                        </View>
                    )}
                    {post && post?.images && post?.images.length == 1 && (
                        <View style={styles.imagePart_1}>
                            <View style={{ width: '100%', height: 400, marginBottom: 4 }}>
                                <Image
                                    source={{ uri: post.images[0].url }}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </View>
                        </View>
                    )}

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingLeft: 16,
                            paddingRight: 16,
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderColor: '#ddd',
                            paddingTop: 8,
                            paddingBottom: 8,
                        }}
                    >
                        <TouchableOpacity onPress={handleRemoveEmoji} onLongPress={handlePressIn} delayLongPress={500}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    columnGap: 8,
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'center',
                                }}
                            >
                                {type_ == 1 && (
                                    <View style={{ flexDirection: 'row', columnGap: 8, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18 }}>😊</Text>
                                        <Text style={{ fontSize: 18, color: '#ffc83d' }}>Kudos</Text>
                                    </View>
                                )}
                                {type_ == 0 && (
                                    <View style={{ flexDirection: 'row', columnGap: 8, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18 }}>😔</Text>
                                        <Text style={{ fontSize: 18, color: '#ffc83d' }}>Disappoint</Text>
                                    </View>
                                )}
                                {type_ == '-1' && (
                                    <View style={{ flexDirection: 'row', columnGap: 8, alignItems: 'center' }}>
                                        {isChooseEmoji == -1 && (
                                            <Image
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                }}
                                                contentFit="cover"
                                                source={require('../assets/icons/likeIcon.png')}
                                            />
                                        )}
                                        {isChooseEmoji == -1 && <Text style={{ fontSize: 18 }}>Cảm xúc</Text>}
                                        {isChooseEmoji == 1 && <Text style={{ fontSize: 18 }}>😊</Text>}
                                        {isChooseEmoji == 1 && (
                                            <Text style={{ fontSize: 18, color: '#ffc83d' }}>Kudos</Text>
                                        )}
                                        {isChooseEmoji == 0 && <Text style={{ fontSize: 18 }}>😔</Text>}
                                        {isChooseEmoji == 0 && (
                                            <Text style={{ fontSize: 18, color: '#ffc83d' }}>Disappoint</Text>
                                        )}
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', columnGap: 8, alignItems: 'center' }}>
                            <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                }}
                                contentFit="cover"
                                source={require('../assets/icons/commentIcon.png')}
                            />

                            <TouchableOpacity onPress={() => handleFocusInput(0)}>
                                <Text style={{ fontSize: 18 }}>Bình luận</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', columnGap: 8, alignItems: 'center' }}>
                            <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                }}
                                contentFit="cover"
                                source={require('../assets/icons/shareIcon.png')}
                            />
                            <Text style={{ fontSize: 18 }}>Chia sẻ</Text>
                        </View>
                        {displayEmoji && (
                            <View
                                style={{
                                    position: 'absolute',
                                    left: 20,
                                    top: -44,
                                    backgroundColor: 'white',
                                    padding: 8,
                                    borderRadius: 20,
                                    flexDirection: 'row',
                                    columnGap: 16,
                                    shadowColor: '#333333',
                                    shadowOffset: {
                                        width: 4,
                                        height: 4,
                                    },
                                    shadowOpacity: 0.6,
                                    shadowRadius: 4,
                                }}
                            >
                                <TouchableOpacity onPress={() => handleChooseEmoji(1)}>
                                    <Text style={{ fontSize: 20 }}>😊</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleChooseEmoji(0)}>
                                    <Text style={{ fontSize: 20 }}>😔</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <View>
                        {!reselect && (
                            <Text
                                style={{ paddingLeft: 8, fontSize: 20, paddingTop: 8, paddingBottom: 8 }}
                            >{`😊😔 ${post.feel}`}</Text>
                        )}
                        {reselect && (
                            <Text
                                style={{ paddingLeft: 8, fontSize: 20, paddingTop: 8, paddingBottom: 8 }}
                            >{`😊😔 ${totalEmoji}`}</Text>
                        )}
                    </View>
                    <View>
                        {0 < listCmt.length && listCmt.length > 9 && (
                            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 8 }}>
                                Tất cả bình luận...
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const DetailPost = ({ route }) => {
    const navigation = useNavigation();
    const [listCmt, setListCmt] = useState([]);
    const [postInfo, setPostInfo] = useState({});
    const [selectedReply, setSelectedReply] = useState(-1);
    const [newComment, setNewComment] = useState('');
    const [typeOfCmt, setTypeOfCmt] = useState(0);
    const [idMark, setIdMark] = useState(0);
    const inputRef = React.useRef(null);

    useEffect(() => {
        const { postInfo, listCmt } = route.params;
        setPostInfo(postInfo);
        setListCmt(listCmt);
    }, []);

    const GenerateTime = ({ date }) => {
        const inputDate = new Date(date);
        const currentDate = new Date();
        const timeDifference = (currentDate - inputDate) / 1000; // Chuyển đổi sang giây

        if (timeDifference < 60) {
            return <Text>Vừa xong</Text>;
        } else if (timeDifference < 3600) {
            const minutes = Math.floor(timeDifference / 60);
            return <Text>{minutes} phút trước</Text>;
        } else if (timeDifference < 86400) {
            const hours = Math.floor(timeDifference / 3600);
            return <Text>{hours} giờ trước</Text>;
        } else {
            const days = Math.floor(timeDifference / 86400);
            return <Text>{days} ngày trước</Text>;
        }
    };
    const handleFocusInput = (type, idMark) => {
        inputRef.current.focus();
        setTypeOfCmt(type);
        setIdMark(idMark);
    };
    const handleComment = async () => {
        if (typeOfCmt == 0) {
            const res = await setComment({ id: postInfo.id, content: newComment, type: '1' });
            if (res.code == 1000) {
                setListCmt(res?.data);
                setNewComment('');
                inputRef.current.blur();
            }
        } else if (typeOfCmt == 1) {
            const res = await setComment({ id: postInfo.id, content: newComment, mark_id: idMark, type: '' });
            if (res.code == 1000) {
                setListCmt(res?.data);
                setNewComment('');
                inputRef.current.blur();
            }
        }
    };
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{ height: '100%' }}>
                    <View
                        style={{
                            marginTop: 40,
                            flexDirection: 'row',
                            paddingTop: 20,
                            paddingLeft: 16,
                            paddingBottom: 20,
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <FontAwesomeIcon icon={faArrowLeft} size={20}></FontAwesomeIcon>
                        </TouchableOpacity>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: '600' }}>Bài viết của {postInfo?.owner}</Text>
                        </View>
                    </View>

                    <FlatList
                        data={listCmt}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <Header
                                post={postInfo}
                                type={route.params.type}
                                handleFocusInput={handleFocusInput}
                                listCmt={listCmt}
                            />
                        }
                        contentContainerStyle={{ paddingBottom: 50 }}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: 'row', columnGap: 16, paddingLeft: 16 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (route.params.postInfo.owner_id == item?.poster?.id) {
                                            navigation.navigate('ProfileDetail');
                                        } else navigation.navigate('ProfileOtherDetail', { props: item?.poster?.id });
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri:
                                                item?.poster?.avatar ||
                                                'https://res.cloudinary.com/manhphuong/image/upload/v1702483093/default_avatar_orhez1.jpg',
                                        }}
                                        style={{
                                            width: 36,
                                            height: 36,
                                            objectFit: 'cover',
                                            borderRadius: 999,
                                            marginTop: 12,
                                        }}
                                    ></Image>
                                </TouchableOpacity>

                                <View>
                                    <View
                                        style={{
                                            backgroundColor: '#ddd',
                                            marginRight: 16,
                                            borderRadius: 12,
                                            padding: 8,
                                            maxWidth: '90%',
                                        }}
                                    >
                                        <Text style={{ fontWeight: 'bold' }}>{item?.poster?.name}</Text>
                                        <Text>{item.mark_content}</Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            columnGap: 12,
                                            marginTop: 4,
                                            marginBottom: 8,
                                            paddingLeft: 4,
                                        }}
                                    >
                                        <Text>{<GenerateTime date={item.created} />}</Text>
                                        <Text>Thích</Text>
                                        <TouchableOpacity onPress={() => handleFocusInput(1, item.id)}>
                                            <Text>Phản hồi</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        {item?.comments?.length > 1 && selectedReply != index && (
                                            <TouchableOpacity onPress={() => setSelectedReply(index)}>
                                                <Text style={{ paddingBottom: 6, fontWeight: '700' }}>
                                                    Xem tất cả trả lời...
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                        {item.comments &&
                                            selectedReply == index &&
                                            item.comments.map((cmt, index) => {
                                                return (
                                                    <View key={index}>
                                                        <View
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                columnGap: 12,
                                                                width: '80%',
                                                            }}
                                                        >
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    if (
                                                                        route.params.postInfo.owner_id ==
                                                                        cmt?.poster?.id
                                                                    ) {
                                                                        navigation.navigate('ProfileDetail');
                                                                    } else
                                                                        navigation.navigate('ProfileOtherDetail', {
                                                                            props: cmt?.poster?.id,
                                                                        });
                                                                }}
                                                            >
                                                                <Image
                                                                    source={{
                                                                        uri:
                                                                            cmt?.poster.avatar ||
                                                                            'https://res.cloudinary.com/manhphuong/image/upload/v1702483093/default_avatar_orhez1.jpg',
                                                                    }}
                                                                    style={{
                                                                        width: 36,
                                                                        height: 36,
                                                                        borderRadius: 999,
                                                                        objectFit: 'cover',
                                                                    }}
                                                                ></Image>
                                                            </TouchableOpacity>

                                                            <View
                                                                style={{
                                                                    backgroundColor: '#ddd',
                                                                    borderRadius: 12,
                                                                    paddingTop: 6,
                                                                    paddingBottom: 6,
                                                                    paddingLeft: 10,
                                                                    paddingRight: 10,
                                                                }}
                                                            >
                                                                <Text style={{ fontWeight: 'bold' }}>
                                                                    {cmt?.poster.name}
                                                                </Text>
                                                                <Text>{cmt?.content}</Text>
                                                            </View>
                                                        </View>
                                                        <View
                                                            style={{
                                                                flexDirection: 'row',
                                                                columnGap: 12,
                                                                paddingLeft: 44,
                                                                paddingTop: 4,
                                                                paddingBottom: 4,
                                                            }}
                                                        >
                                                            <Text>{<GenerateTime date={cmt.created} />}</Text>
                                                            <Text>Thích</Text>
                                                            <Text>Phản hồi</Text>
                                                        </View>
                                                    </View>
                                                );
                                            })}
                                    </View>
                                </View>
                            </View>
                        )}
                    />

                    <View style={[styles.commentInput, { position: 'absolute', bottom: 0 }]}>
                        <TouchableOpacity>
                            <View style={styles.wrapIconNews}>
                                <FontAwesomeIcon icon={faCamera} size={22} color="white" />
                            </View>
                        </TouchableOpacity>
                        <TextInput
                            ref={inputRef}
                            style={styles.input}
                            placeholder="Viết bình luận..."
                            value={newComment}
                            onChangeText={setNewComment}
                        />
                        <TouchableOpacity style={{ marginRight: 8, marginLeft: 8 }} onPress={() => handleComment()}>
                            <SendIcon width="24" height="24" />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    commentInput: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        backgroundColor: 'white',
        paddingBottom: 6,
        paddingLeft: 4,
        paddingRight: 4,
    },
    wrapIconNews: {
        backgroundColor: '#0866ff',
        width: 32,
        height: 32,
        borderRadius: 38,
        justifyContent: 'center',
        alignItems: 'center',
    },
    send: {
        right: 0,
    },
    input: {
        height: 40,
        borderRadius: 30,
        paddingLeft: 5,
        backgroundColor: '#F1F2F6',
        flex: 1,
        marginHorizontal: 3,
        paddingLeft: 8,
    },
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
});

export default DetailPost;
