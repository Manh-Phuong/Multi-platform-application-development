import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from "react-native";
import { SendIcon } from "../assets/icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";


const Comment = ({hiddenComment}) => {
  const [like, setLike] = useState(false);
  const toggleLike = () => {
    setLike(!like);
  };
  const [comments, setComments] = useState([
    {
      nickname: "Nguyễn Văn A",
      text: "Bình luận 1",
    },
    {
      nickname: "Nguyễn Văn B",
      text: "Bình luận 2",
    },
    {
      nickname: "Nguyễn Văn A",
      text: "Bình luận 1",
    },
    {
      nickname: "Nguyễn Văn B",
      text: "Bình luận 2",
    },
    {
      nickname: "Nguyễn Văn A",
      text: "Bình luận 1",
    },
    {
      nickname: "Nguyễn Văn B",
      text: "Bình luận 2",
    },
    {
      nickname: "Nguyễn Văn A",
      text: "Bình luận 1",
    },
    {
      nickname: "Nguyễn Văn B",
      text: "Bình luận 2",
    },
    {
      nickname: "Nguyễn Văn A",
      text: "Bình luận 1",
    },
    {
      nickname: "Nguyễn Văn B",
      text: "Bình luận 2",
    },
    // ...Thêm bình luận khác nếu cần
  ]);

  const [newComment, setNewComment] = useState("");

  const navigation = useNavigation();


  const addComment = () => {
    if (newComment) {
      setComments([...comments, { nickname: "Tuấn Bùi", text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : ""}>
      <View style={styles.container}>
        <View style={[styles.containerflex, styles.header]}>
          <View style={styles.containerflex}>
            <TouchableOpacity style={styles.angleleft} onPress={hiddenComment}>
              <Icon name="angle-left" size={30} color="#000" />
            </TouchableOpacity>
            <Image
              style={{ width: 20, height: 20, marginLeft: 20 }}
              contentFit="cover"
              source={require("../assets/icons/likeIconColor.png")}
            />
            <Text style={{ margin: 5 }}>146</Text>
          </View>
          <TouchableOpacity onPress={toggleLike}>
            {like ? (
              <Image
                style={{ width: 24, height: 24 }}
                contentFit="cover"
                source={require("../assets/icons/likedIcon.png")}
              />
            ) : (
              <Image
                style={{ width: 24, height: 24, marginTop: 2, marginBottom: -2 }}
                contentFit="cover"
                source={require("../assets/icons/likeIcon.png")}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <View style={styles.containerflex}>
            <Text style={styles.title}>Hiển thị bình luận trước...</Text>
            {/* <Icon style={styles.angledown} name="angle-down" size={20} /> */}
          </View>
          <FlatList
            data={comments}
            showsVerticalScrollIndicator={false} //ẩn thanh cuộn dọc
            renderItem={({ item }) => (
              <View style={[styles.containerflex, { marginTop: 10 }]}>
                {/* avatar user comment */}
                <Image
                  style={styles.accountImage}
                  source={require("../assets/images/avatar-sample.png")}
                ></Image>
                {/* phần text bình luận */}
                <View style={{ flex: 1 }}>
                  {/* phần bình luận */}
                  <View style={styles.textcomment}>
                    <Text style={styles.nickname}>{item.nickname}</Text>
                    <Text>{item.text}</Text>
                  </View>
                  {/* Biểu tượng thích, phản hồi */}
                  <View style={styles.containerflex}>
                    <Text>20p</Text>
                    <Text style={{ marginLeft: 20, marginRight: 20 }}>Thích</Text>
                    <Text>Phản hồi</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
        <View style={styles.commentinput}>
          <TouchableOpacity>
            <View style={styles.wrapIconNews}>
              <FontAwesomeIcon icon={faPlus} size={22} color="white" />
            </View>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Viết bình luận..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity style={styles.send} onPress={addComment}>
            <SendIcon
              width="24"
              height="24"
              fill={newComment.trim().length > 0 ? "#0866ff" : "#ccc"}
            />
          </TouchableOpacity>
        </View>
    </View>
    </KeyboardAvoidingView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 0,
    paddingBottom: 10,
    backgroundColor: "#fff",
    height: "100%",
    position: "relative",
  },
  main: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  commentContainer: {
    marginBottom: 8,
    padding: 12,
    backgroundColor: "white",
    borderRadius: 8,
  },
  commentText: {
    fontSize: 14,
  },
  input: {
    height: 40,
    borderRadius: 30,
    paddingLeft: 5,
    backgroundColor: "#F1F2F6",
    flex: 1,
    marginHorizontal: 3,
  },
  containerflex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    justifyContent: "space-between",
    marginTop: 10,
  },
  icon: {
    backgroundColor: "#0063e0",
    padding: 5,
    borderRadius: 20,
  },
  angledown: {
    marginBottom: 5,
    marginLeft: 5,
  },
  nickname: {
    fontWeight: "bold",
  },
  accountImage: {
    width: 40,
    height: 40,
    borderRadius: 999,
    marginRight: 10,
    alignSelf: "flex-start",
  },
  textcomment: {
    backgroundColor: "#F1F2F6",
    borderRadius: 10,
    padding: 10,
    paddingTop: 5,
  },
  commentinput: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  send: {
    right: 0,
  },
  addextens: {
    backgroundColor: "#0063e0",
    paddingHorizontal: 3,
    borderRadius: 90,
  },
  wrapIconNews: {
    backgroundColor: "#0866ff",
    width: 32,
    height: 32,
    borderRadius: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  angleleft:{
    paddingHorizontal: 8
  }
});

export default Comment;
