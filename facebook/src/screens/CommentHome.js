import React, { useState, useEffect } from "react";
import { View, BackHandler, Button, StyleSheet } from "react-native";
import Comment from "../components/Comment";

const CommentHome = () => {
  const [showComments, setShowComments] = useState(false);
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  useEffect(() => {
    const handleBackPress = () => {
      if (showComments) {
        // Nếu giao diện comment đang hiển thị, ẩn nó và ngăn sự kiện "Quay lại" mặc định
        setShowComments(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => {
      backHandler.remove();
    };
  }, [showComments]);

  return (
    <View style={styles.container}>
      <View style={styles.viewcommentbtn}>
        <Button title="View Comments" onPress={toggleComments} />
      </View>
      <View style={styles.viewcomment}>{showComments && <Comment toggleComments={toggleComments}/>}</View>
    </View>
  );
};

export default CommentHome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#666",
    height: "100%",
    position: "relative",
  },
  viewcommentbtn: {
    top: 100,
  },
  viewcomment: {
    height: "95%",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});
