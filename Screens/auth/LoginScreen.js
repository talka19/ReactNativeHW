import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import React, { useState, useEffect} from 'react';
import { Pressable, StyleSheet, 
    Text, TextInput, TouchableOpacity, 
    View,  Dimensions, TouchableWithoutFeedback, 
    Keyboard, ImageBackground, KeyboardAvoidingView
} from 'react-native';

const intialState = {
    email: "",
    password: "",
};

const width = Dimensions.get("window").width;

const LoginForm = ({navigation})=> {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [registration, setRegistration] = useState(intialState);
    const [isSecureEntry, setIsSecureEntry] = useState(true);

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
    });

    const closeKeyboard = () => {setIsShowKeyboard(false);
        Keyboard.dismiss();
    }
      
    useEffect(() => {
        setIsShowKeyboard(false);
    }, [handleSubmit]);
    
    const handleSubmit = () => {
        Keyboard.dismiss();
        setIsShowKeyboard(false);
        console.log(registration);
        setRegistration(intialState);
        
    };
    
    if (!fontsLoaded) {
      return null;
    }

    return(
        <TouchableWithoutFeedback onPress={closeKeyboard}>
        <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('../../assets/Images/PhotoBG.png')}>
        <KeyboardAvoidingView  style={styles.containerKeyboardAvoidingView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{...styles.form, paddingBottom: isShowKeyboard ? 0 : 100 }}>
                  <Text style={styles.title}>Увійти</Text>
                  <View style={{ ...styles.inputWrapper }}>
                    <View>
                    <TextInput 
                        style={styles.input} 
                        fontSize={16}
                        autoCapitalize="none"
                        value={registration.email}
                        placeholder='Адреса електроної пошти'
                        backgroundColor='#F6F6F6'
                        onFocus={() => {setIsShowKeyboard(true)}}
                        onChangeText={(value) => setRegistration((prevState) => ({...prevState, email: value}))}
                    />
                    </View>
                    <View>
                        <TextInput 
                             secureTextEntry={isSecureEntry} 
                             style={styles.input} 
                             fontSize={16}
                             value={registration.password}
                             autoCapitalize="none"
                             autoCorrect={false}
                             placeholder='Пароль'
                             backgroundColor='#F6F6F6'
                             onFocus={() => {setIsShowKeyboard(true)}}
                             onChangeText={(value) =>
                                setRegistration((prevState) => ({
                                  ...prevState,
                                  password: value,
                                }))
                              }
                             />
                        <Text
                            onPress={() => {
                                setIsSecureEntry((prev) => !prev);
                                }}
                            style={[{
                                position: 'absolute',
                                fontSize: 16,
                                right: 30,
                                marginVertical: 13,
                                color: '#1B4371',                
                            }]}>{isSecureEntry ? 'Показати' : 'Приховати'}
                        </Text>
                    </View>
                    </View>
                   <TouchableOpacity
                        style={{ ...styles.button, width: width - 32 }}
                        activeOpacity={0.8}
                        onPress={handleSubmit}
                    >
                    <Text style={styles.button_text}>Увійти</Text>
                    </TouchableOpacity>
                    <View style={{ 
                        alignItems: 'center',
                        display: 'flex',
                        }}>
                        <Text style={styles.text}>Немає акаунта?
                        <Text> </Text>
                            <Text style={styles.text_link}
                            onPress={() => navigation.navigate("Registration")}
                            >Зареєструватися</Text></Text>
                    </View>
                  
            </View>
        </KeyboardAvoidingView>
        </ImageBackground>
        </View>
        </TouchableWithoutFeedback>
    )
}

export default LoginForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    containerKeyboardAvoidingView: {
        justifyContent: "flex-end",
    },
    form: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: "center",
    },
    title: {
        fontFamily: 'Roboto_500Medium',
        textAlign: "center",
        color: "#212121",
        paddingTop: 32,
        fontSize: 30,
        fontWeight: 500,
    },
    inputWrapper: {
        paddingRight: 16,
        paddingLeft: 16,
        paddingTop: 33,
        paddingBottom: 43,
        gap: 16,
    },
    input: {
        width: 343,
        height: 50,
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#E8E8E8',
    },
    button: {
        marginRight: 16,
        marginLeft: 16,
        height: 51,
        backgroundColor: "#FF6C00",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
    },
    button_text:{
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        color: '#FFFFFF',
    },
    text: {
        marginTop: 16,
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 19,
        textAlign: "center",
        color: "#1B4371",
        fontFamily: 'Roboto_400Regular',
    },
    text_link: {
        fontSize: 16,
        lineHeight: 19,
        color: "#1B4371",
        textDecorationLine: 'underline',
    },
})


  