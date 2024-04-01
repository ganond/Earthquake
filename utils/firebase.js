import { initializeApp, } from "firebase/app"
import { initializeAuth, getReactNativePersistence, createUserWithEmailAndPassword,updateProfile   } from "firebase/auth"
import {ReactNativeAsyncStorage} from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: "AIzaSyAM-0xsf7V70NwQOg_-p5nxDAraatFXY_k",
  authDomain: "earthquakes-ee97b.firebaseapp.com",
  projectId: "earthquakes-ee97b",
  storageBucket: "earthquakes-ee97b.appspot.com",
  messagingSenderId: "585977384673",
  appId: "1:585977384673:web:bae144b9e901ca3cbf71a0",
  measurementId: "G-8K4TC9SCL6"
};

const appFirebase = initializeApp(firebaseConfig);
initializeAuth(appFirebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  
  
export default appFirebase

