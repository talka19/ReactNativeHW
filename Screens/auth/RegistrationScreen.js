import { useState } from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import { AntDesign } from "@expo/vector-icons";
import { authSignUpUser } from "../../redux/operations";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const  RegistrationForm = ({ navigation }) => {
  const userSchema = object({
    name: string().required("Обязательное поле").min(3, "Не мение 3 символов"),
    email: string()
      .email("Invalid Email")
      .min(6, "Не мение 6 символов")
      .required("Обязательное поле"),
    password: string()
      .required("Обязательное поле")
      .min(6, "Не мение 6 символов"),
  });

  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const [showPass, setShowPass] = useState(true);
  const [userImg, setUserImg] = useState(
    "https://w7.pngwing.com/pngs/555/703/png-transparent-computer-icons-avatar-woman-user-avatar-face-heroes-service-thumbnail.png"
  );

  const image = require("../../assets/Images/PhotoBG.png");

  const onSubmit = async ({ name, email, password }) => {
    Keyboard.dismiss();
    dispatch(
      authSignUpUser({ name, userEmail: email, password, avatar: userImg })
    );
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const ref = await uploadPhotoToServer(result.assets[0].uri);
      setUserImg(ref);
    }
  };
 
  const uploadPhotoToServer = async (img) => {
    const response = await fetch(img);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const storageRef = await ref(storage, `userImage/${uniquePostId}`);
    await uploadBytes(storageRef, file);
    const procesedPhoto = await getDownloadURL(storageRef);
    return procesedPhoto;
  };

  const onShowPass = () => {
    setShowPass(false);
    setTimeout(() => {
      setShowPass(true);
    }, 1000);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ImageBackground style={styles.imageBacgr} source={image}>
        <KeyboardAvoidingView
          style={styles.containerKeyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View style={styles.formContainer}>
              <View style={styles.avatar}>
                <Image
                  source={{ uri: userImg }}
                  style={{
                    width: 120,
                    height: 120,
                    margin: 0,
                    padding: 0,
                    top: 12,
                  }}
                />
                <TouchableOpacity
                  style={styles.imgAdd}
                  onPress={() => {
                    pickImage();
                  }}
                >
                  <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                </TouchableOpacity>
              </View>
              <Text style={styles.h1}>Реєстрація</Text>
              <Formik
                onSubmit={(values, action) => {
                  onSubmit(values);
                  action.resetForm();
                }}
                validationSchema={userSchema}
                initialValues={{ name: "", email: "", password: "" }}
              >
                {(props) => {
                  return (
                    <View style={styles.formikStyle}>
                      <TextInput
                        value={props.values.name}
                        onChangeText={props.handleChange("name")}
                        placeholder="Логін"
                        style={styles.input}
                      />
                      {props.errors.name && (
                        <Text style={styles.errorText}>
                          {props.errors.name}
                        </Text>
                      )}
                      <TextInput
                        value={props.values.email}
                        onChangeText={props.handleChange("email")}
                        placeholder="Адреса електронної пошти"
                        style={styles.input}
                      />
                      {props.errors.email && (
                        <Text style={styles.errorText}>
                          {props.errors.email}
                        </Text>
                      )}
                      <View>
                        <TextInput
                          value={props.values.password}
                          onChangeText={props.handleChange("password")}
                          placeholder="Пароль"
                          style={styles.input}
                          secureTextEntry={showPass}
                        />
                        {props.errors.password && (
                          <Text style={styles.errorText}>
                            {props.errors.password}
                          </Text>
                        )}
                        {props.values.password !== "" && (
                          <TouchableOpacity
                            style={styles.openPass}
                            onPress={onShowPass}
                          >
                            <Text style={styles.showPassText}>Показати</Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={props.handleSubmit}
                      >
                        <Text style={styles.buttonText}>
                          Зареєструватися
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              </Formik>
              <TouchableOpacity
                style={styles.login}
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text style={styles.login}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
  imageBacgr: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  containerKeyboardAvoidingView: {
    justifyContent: "flex-end",
  },
  h1: {
    // fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    fontFamily: "Roboto-Bold",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 16,
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    padding: 16,
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
    paddingVertical: 16,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
  },
  login: {
    color: "#1B4371",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
    alignItems: "center",
    marginBottom: 45,
  },
  openPass: {
    alignItems: "flex-end",
    bottom: 65,
    right: 20,
  },
  showPassText: {
    color: "#1B4371",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
  },
//   errorText: {
//     color: "#ff0000",
//     textAlign: "center",
//     marginTop: 4,
//   },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    bottom: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  formikStyle: {
    paddingHorizontal: 16,
    width: "100%",
  },
  imgAdd: {
    top: -25,
    left: 60,
  },
});

export default RegistrationForm;