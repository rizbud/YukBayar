import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDYzW342yYfibvtv3bqglIdxsAw6S0EpIE",
  authDomain: "yuk-bayar.firebaseapp.com",
  databaseURL: "https://yuk-bayar.firebaseio.com",
  projectId: "yuk-bayar",
  storageBucket: "yuk-bayar.appspot.com",
  messagingSenderId: "1073900025639",
  appId: "1:1073900025639:web:09cfb1207f28cbda7adb02",
  measurementId: "G-KVE5042E6B"
}

firebase.initializeApp(firebaseConfig)

firebase.firestore()

firebase.auth()

export default firebase