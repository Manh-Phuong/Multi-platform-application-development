// CommentsComponent.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Comment = () => {
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
    // ...Thêm bình luận khác nếu cần
  ]);

  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (newComment) {
      setComments([...comments, { id: comments.length + 1, text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.containerflex, styles.header]}>
        <View style={styles.containerflex}>
          <View style={styles.icon}>
            <Icon name="thumbs-up" size={15} color="#fff" />
          </View>
          <Text style={{ margin: 5 }}>146</Text>
          <Icon name="angle-right" size={30} color="#000" />
        </View>
        <View>
          <Icon name="thumbs-up" size={40} color="#646668" />
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.containerflex}>
          <Text style={styles.title}>Phù hợp nhất</Text>
          <Icon style={styles.angledown} name="angle-down" size={20} />
        </View>
        <FlatList
          data={comments}
          showsVerticalScrollIndicator={false} //ẩn thanh cuộn dọc
          renderItem={({ item }) => (
            <View style={styles.containerflex}>
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

            //   <View style={styles.commentContainer}>
            //     <Text style={styles.commentText}>{item.text}</Text>
            //   </View>
          )}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Thêm bình luận..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <Button title="Gửi" onPress={addComment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    height: "100%",
    display: "flex"
    // overflow: "scroll"
    // top: "5%",
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  containerflex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    justifyContent: "space-between",
    // backgroundColor: "#857877",
  },
  icon: {
    backgroundColor: "#319FFE",
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
  },
});

export default Comment;
