import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { format } from "date-fns";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,image 
} from "react-native";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
// import * as ImagePicker from 'expo-image-picker';
import { collection, query, doc, addDoc, onSnapshot } from "firebase/firestore";

const state = {
    userId: null,
    displayName: null,
    stateChange: false,
    displayImg: null,
    email: null,
    error: null,
};

const CommentsScreen = ({ route}) => {
  const titleTextHandler = (text) => setText(text);
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const height = useHeaderHeight();
  const { photoRef, id } = route.params;

    // const pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // })};

  const { userId, displayName, displayImg } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = async () => {
    const q = query(collection(doc(db, "post", id), "comments"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push({ ...doc.data(), id: doc.id });
      });
      setComments(cities);
    });
  };

  const onAddComment = async () => {
    const data = format(new Date(), "dd MMMM yyyy | HH : mm");
    const comment = {
      text,
      data,
      displayName,
      userId,
      displayImg,
    };

    const docRef = await addDoc(
      collection(doc(db, "post", id), "comments"),
      comment
    );
    setText("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={height + 10}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.postContainer}>
          {/* <TouchableOpacity onPress={pickImage}>
                   {image && <Image source={{ uri: image }} style={{ width: 120, height: 120, borderRadius: 16 }} />}
                   {!image && <Image
                    fadeDuration={0}
                    style={styles.add}
                    source={require("../../assets/Images/add.png")}
                />}
              
                   { image && <Image
                      fadeDuration={0}
                      style={styles.remove} source={require('../../assets/Images/addremove.png')} />}
                 </TouchableOpacity> */}
            <Image style={styles.img} source={{ uri: photoRef }} />
          </View>
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={
                  item.userId === userId
                    ? { flexDirection: "row" }
                    : { flexDirection: "row-reverse" }
                }
              >
                <View
                  style={
                    item.userId === userId
                      ? styles.myCommentContainer
                      : styles.commentContainerRevers
                  }
                >
                  <Text style={styles.comment}>{item.text}</Text>
                  <Text style={styles.data}>{item.data}</Text>
                </View>
                <View>
                {/* <TouchableOpacity onPress={pickImage}>
                   {image && <Image source={{ uri: image }} style={{ width: 120, height: 120, borderRadius: 16 }} />}
                   {!image && <Image
                    fadeDuration={0}
                    style={styles.add}
                    source={require("../../assets/Images/add.png")}
                />}
              
                   { image && <Image
                      fadeDuration={0}
                      style={styles.remove} source={require('../../assets/Images/addremove.png')} />}
                 </TouchableOpacity>  */}
                  <Image
                    source={{ uri: item.displayImg }}
                    style={{ width: 28, height: 28, marginTop: 16 }}
                  />
                </View>
              </View>
            )}
          />

          <View>
            <TextInput
              placeholder={"Коментувати..."}
              value={text}
              style={styles.input}
              onChangeText={titleTextHandler}
            />
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={onAddComment}
              >
                <AntDesign name="arrowup" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  img: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  postContainer: {
    width: "100%",
    marginTop: 32,
    // marginHorizontal: 16,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 16,
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    padding: 16,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 50,
    top: -42,
    left: 10,
  },
  inputContainer: {
    flexDirection: "row-reverse",
  },
  myCommentContainer: {
    width: 300,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    margin: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
  },
  commentContainerRevers: {
    width: 300,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    margin: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  userImg: {},
  comment: {
    fontFamily: "Roboto-Regulat",
    fontSize: 13,
    color: "#212121",
    textAlign: "left",
  },
  data: {
    fontFamily: "Roboto-Regulat",
    fontSize: 10,
    color: "#BDBDBD",
    textAlign: "right",
  },
});