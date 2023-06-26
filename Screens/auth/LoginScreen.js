import { Formik } from "formik";
import { object, string } from "yup";
import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/operations";

const  LoginForm = ({ navigation }) => {
  const image = require("../../assets/Images/PhotoBG.png");

  const [showPass, setShowPass] = useState(true);

  const userSchema = object({
    email: string()
      .email("Invalid Email")
      .min(6, "Не мение 6 символов")
      .required("Обязательное поле"),
    password: string()
      .required("Обязательное поле")
      .min(6, "Не мение 6 символов"),
  });

  const dispathc = useDispatch();
  const onSubmit = ({ email, password }) => {
    Keyboard.dismiss();
    console.log(`E-mail: ${email} Password: ${password}`);
    dispathc(authSignInUser({ email, password }));
  };

  const onShowPass = () => {
    setShowPass(false);
    setTimeout(() => {
      console.log("ddd");
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
              <Text style={styles.h1}>Увійти</Text>
              <Formik
                onSubmit={(values, action) => {
                  onSubmit(values);
                  action.resetForm();
                }}
                validationSchema={userSchema}
                initialValues={{ email: "", password: "" }}
              >
                {(props) => {
                  return (
                    <View>
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
                        <TouchableOpacity
                          style={styles.openPass}
                          onPress={onShowPass}
                        >
                          {props.values.password !== "" && (
                            <Text style={styles.showPassText}>Показати</Text>
                          )}
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={props.handleSubmit}
                      >
                        <Text style={styles.buttonText}>Увійти</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              </Formik>
              <TouchableOpacity
                style={styles.login}
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate("Registration");
                }}
              >
                <Text style={styles.login}>
                  Немає акаунту? Зареєструватися
                </Text>
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
  },
  containerKeyboardAvoidingView: {
    justifyContent: "flex-end",
  },
  imageBacgr: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  h1: {
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: 92,
  },
  input: {
    marginHorizontal: 32,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 16,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    padding: 16,
  },
  inputActiv: {
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginHorizontal: 32,
    marginBottom: 16,
    paddingHorizontal: 32,
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
    color: "#1B4371",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
    position: "absolute",
    top: 36,
    left: 270,
  },
  showPassText: {
    color: "#1B4371",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
  },
  errorText: {
    color: "#ff0000",
    textAlign: "center",
    marginTop: 4,
  },
});

export default LoginForm;