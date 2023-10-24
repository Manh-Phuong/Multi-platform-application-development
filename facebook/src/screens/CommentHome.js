import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Comment from "./Comment";

const CommentHome = () => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.viewcommentbtn}>
        <Button title="View Comments" onPress={toggleComments} />
      </View>
      <View style={styles.viewcomment}>
        {showComments && <Comment/>}
      </View>
    </View>
  );
};

export default CommentHome;

const styles = StyleSheet.create({
  container: {
    // top: 400,
    backgroundColor: "#666",
    height: "100%",
    position: "relative"
  },
  viewcommentbtn: {
    top: 100,
  },
  viewcomment: {
    height: "55%",
    width: "100%",
    position: "absolute",
    bottom: 50,
  }
});
