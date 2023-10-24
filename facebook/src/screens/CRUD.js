import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import * as Sharing from 'expo-sharing';

const db = SQLite.openDatabase("mydata.db");

export default function CRUD() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState(false);

  // Hàm đọc dữ liệu từ cơ sở dữ liệu SQLite
  const readDataFromDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM items;",
        [],
        (_, { rows }) => {
          const data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
        //setItems(getDefaultItems().concat(data)); // Thiết lập các trường mặc định không thể xóa
          setItems(data);
        },
        (_, error) => console.error("Lỗi đọc dữ liệu: ", error)
      );
    });
  };

  // Hàm thêm các mục mặc định ban đầu khi tạo bảng
  const addDefaultItems = () => {
    db.transaction((tx) => {
      const defaultItems = getDefaultItems();
      defaultItems.forEach((item) => {
        tx.executeSql(
          "INSERT INTO items (title, value) VALUES (?, ?);",
          [item.title, item.value],
          (_, result) => {
            console.log("Dữ liệu mặc định đã được thêm");
          },
          (_, error) => console.error("Lỗi thêm dữ liệu mặc định: ", error)
        );
      });
    });
  };

  // Hàm trả về các trường mặc định
  const getDefaultItems = () => [
    {
      id: null,
      title: "ID Primary",
      value: "",
      edit: false,
    },
    {
      id: null,
      title: "Name",
      value: "",
      edit: false,
    },
    {
      id: null,
      title: "Address",
      value: "",
      edit: false,
    },
    {
      id: null,
      title: "Class",
      value: "",
      edit: false,
    },
    {
      id: null,
      title: "GPA",
      value: "",
      edit: false,
    },
  ];

  // Tạo bảng nếu chưa tồn tại và đọc dữ liệu khi ứng dụng khởi chạy
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, value TEXT);",
        [],
        () => {
          console.log("Bảng đã được tạo");
          addDefaultItems();
          readDataFromDatabase(); // Đọc dữ liệu sau khi tạo bảng
        },
        (_, error) => console.error("Lỗi tạo bảng: ", error)
      );
    }, []);
  }, []);

  // Hàm thêm dữ liệu mới
  const addItem = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO items (title, value) VALUES (?, ?);",
        [title, value],
        (_, result) => {
          console.log("Dữ liệu đã được thêm");
          setTitle("");
          setValue("");
          readDataFromDatabase();
        },
        (_, error) => console.error("Lỗi thêm dữ liệu: ", error)
      );
    });
  };

  // Hàm cập nhật dữ liệu
  const updateItem = (id, newTitle, newValue) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE items SET title = ?, value = ? WHERE id = ?;",
        [newTitle, newValue, id],
        (_, result) => {
          console.log("Dữ liệu đã được cập nhật");
          readDataFromDatabase();
        },
        (_, error) => console.error("Lỗi cập nhật dữ liệu: ", error)
      );
    });
  };

  // Hàm xóa dữ liệu
  const deleteItem = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM items WHERE id = ?;",
        [id],
        (_, result) => {
          console.log("Dữ liệu đã được xóa");
          readDataFromDatabase();
        },
        (_, error) => console.error("Lỗi xóa dữ liệu: ", error)
      );
    });
  };

  // Hàm xuất dữ liệu ra tệp
  const exportDb = async () => {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(
          FileSystem.documentDirectory + 'SQLite/mydata.db',
          {
            encoding: FileSystem.EncodingType.Base64
          }
        );

        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'mydata.db', 'application/octet-stream')
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64, { encoding : FileSystem.EncodingType.Base64 });
        })
        .catch((e) => console.log(e));
      } else {
        console.log("Permission not granted");
      }
    } else {
      await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/mydata.db');
    }
  }

  return (
    <View style={styles.wrap}>
      <ScrollView>
        <View style={{ marginTop: 100 }}>
          <TextInput
            placeholder="Nhập tên trường"
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={[
              styles.input,
              {
                marginBottom: 12,
                height: 46,
                paddingHorizontal: 16,
                paddingVertical: 8,
              },
            ]}
          />
          <TextInput
            placeholder="Nhập giá trị"
            value={value}
            onChangeText={(text) => setValue(text)}
            style={[
              styles.input,
              {
                marginBottom: 12,
                height: 46,
                paddingHorizontal: 16,
                paddingVertical: 8,
              },
            ]}
          />
          <Button title="Thêm" onPress={addItem} />
          <Button title="Xuất Dữ liệu" onPress={exportDb} />
        </View>
        <Text>Dữ liệu trong cơ sở dữ liệu SQLite:</Text>
        {items?.map((item, index) => (
          <View key={index} style={styles.rowContainer}>
            {item.edit ? (
              <View style={styles.row}>
                <TextInput
                  placeholder="Nhập tên trường"
                  value={item.title}
                  onChangeText={(text) => {
                    const newItems = [...items];
                    newItems[index].title = text;
                    setItems(newItems);
                  }}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Nhập giá trị"
                  value={item.value}
                  onChangeText={(text) => {
                    const newItems = [...items];
                    newItems[index].value = text;
                    setItems(newItems);
                  }}
                  style={styles.input}
                />
                <Button
                  title="Xác nhận"
                  onPress={() => {
                    updateItem(item.id, item.title, item.value);
                    const newItems = [...items];
                    newItems[index].edit = false;
                    setItems(newItems);
                  }}
                />
                <Button
                  title="Hủy"
                  onPress={() => {
                    const newItems = [...items];
                    newItems[index].edit = false;
                    setItems(newItems);
                    setEdit((prev) => !prev);
                  }}
                />
              </View>
            ) : (
              <View style={styles.row}>
                <Text style={styles.cell}>{item.title}</Text>
                <Text style={styles.cell}>{item.value}</Text>
                <Button
                  title="Sửa"
                  onPress={() => {
                    const newItems = [...items];
                    newItems[index].edit = true;
                    setItems(newItems);
                    setEdit((prev) => !prev);
                  }}
                />
              </View>
            )}
            <Button
              title="Xóa"
              onPress={() => deleteItem(item.id)}
              style={styles.deleteButton}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    margin: 10,
  },
  input: {
    // height: 46,
    // paddingHorizontal: 16,
    // paddingVertical: 8,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 6,
    // marginBottom: 12
    flex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    marginRight: 46,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  cell: {
    flex: 1,
  },
  deleteButton: {
    marginLeft: 10,
  },
});
