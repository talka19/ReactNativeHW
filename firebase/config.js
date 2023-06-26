// import * as firebase from "firebase"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// /*
// // Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// Функція для підключення авторизації в проект
// // Функція для підключення бази даних у проект
// // Функція для підключення сховища файлів в проект
// import AsyncStorage from '@react-native-community/async-storage';
// import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyD01q0KLkO0lhJm4QiqeO8mkwvMpBhrhwk",
    authDomain: "reactnativehw-78eb4.firebaseapp.com",
    projectId: "reactnativehw-78eb4",
    storageBucket: "reactnativehw-78eb4.appspot.com",
    messagingSenderId: "778181602709",
    appId: "1:778181602709:web:53e5b5793daf60f4989a9c",
    measurementId: "G-7QNKXKST51"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// console.log(storage, 'firstore')

// export default firebase;

// */