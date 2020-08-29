import React, {Component} from "react";
import { 
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  BackHandler,
  ToastAndroid
} from "react-native";

import auth from '@react-native-firebase/auth'
import firestore from "@react-native-firebase/firestore";

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      confirm: '',
      emailValid: false,
      passValid: false,
      loading: false,
      date: null
    }
  }

  backButton() {
    BackHandler.exitApp();
    return true
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backButton)

    
    const dt = new Date()
    const date = dt.getDate()
    const m = new Array('Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember');
    const year = dt.getFullYear()
    const month = m[dt.getMonth()]
    
    this.setState({date: date+" "+month+" "+year})
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backButton)
  }

  //Email Validator
  validEmail = (text) => {
    const {email, emailValid} = this.state
    const val = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(val.test(text) === true) {
      this.setState({emailValid: true})
      this.setState({email: text})
    } else {
      this.setState({emailValid: false})
    }
  }
  //Password Validator
  validPass = (pass) => {
    const {password, passValid} = this.state
    const val = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(val.test(pass) === true) {
      this.setState({passValid: true})
      this.setState({password: pass})
    } else {
      this.setState({passValid: false})
    }
  }

  onRegister = () => {
    const {name, email, confirm, password, emailValid, passValid, date} = this.state

    if(name == '' || email == '' || password == '' || confirm == '') {
      Alert.alert('Oopss...', 'You must fill all column')
    } else if(password < 8) {
      Alert.alert('Oopss...', 'Your password must contain at least 8 characters, 1 letter, and 1 number!')
    } else if(!emailValid) {
      Alert.alert('Oopss...', 'Incorrect email address')
    } else if(!passValid) {
      Alert.alert('Oopss...', 'Your password must contain at least 8 characters, 1 letter, and 1 number!')
    } else if(password != confirm) {
      Alert.alert('Oops...', 'Your password doesn\'t match')
    } else {
      this.setState({loading: true})
      auth().createUserWithEmailAndPassword(email,password)
      .then((res) => {
        res.user.updateProfile({
          displayName: name
        })
        firestore().collection('users').doc(res.user.uid).set({
          id: res.user.uid,
          name: name,
          email: email,
          password: password,
          registerDate: date,
          saldo: 0
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error))
        ToastAndroid.show('Berhasil registrasi!', ToastAndroid.SHORT)
      })
      .catch((err) => {
        this.setState({
          name: '',
          email: '',
          password: '',
          confirm: '',
          emailValid: false,
          passValid: false,
          loading: false,
        })
        if(err.code == 'auth/email-already-in-use') {
          Alert.alert('Oopss...', 'Email already in use')
        } else {
          Alert.alert('', err.message)
        }
      })
    }
  }

  onLogin = () => {
    this.props.navigation.navigate('Login')
  }

  render() {
    if(this.state.loading) {
      return (
        <>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <ScrollView style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.caption}>Buat akun baru dan mulai bayar keperluan anda dengan mudah.</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.input}>
                <Text type style={styles.label}>Nama</Text>
                <TextInput editable={false} underlineColorAndroid="#6c6c6c" autoCapitalize="words" style={styles.textInput} value={this.state.name} placeholder="John Doe" label="Name" />
              </View>
              <View style={styles.input}>
                <Text type style={styles.label}>E-mail</Text>
                <TextInput editable={false} underlineColorAndroid="#6c6c6c" autoCapitalize="none" style={styles.textInput} value={this.state.email} placeholder="your@mail.com" label="E-mail" keyboardType="email-address" />
              </View>
              <View style={styles.input}>
                <Text style={styles.label}>Password</Text>
                <TextInput editable={false} underlineColorAndroid="#6c6c6c" autoCapitalize="none" style={styles.textInput} value={this.state.password} placeholder="********" label="Password" secureTextEntry={true} />
              </View>
              <View style={styles.input}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput editable={false} underlineColorAndroid="#6c6c6c" autoCapitalize="none" style={styles.textInput} value={this.state.confirm} placeholder="********" label="Password" secureTextEntry={true} />
              </View>
              <TouchableOpacity disabled={true} onPress={this.onRegister} activeOpacity={0.5} style={styles.register}>
                <ActivityIndicator size="small" color="#fff" />
              </TouchableOpacity>
              <Text style={styles.littleCaption}>Dengan mendaftar, anda menyetujui Syarat & Ketentuan yang berlaku.</Text>
            </View>
            <View style={{marginTop: 20, width: "100%"}}>
              <Text style={styles.caption}>Sudah punya akun?</Text>
              <TouchableOpacity disabled={true} activeOpacity={0.5} style={styles.loginButton} onPress={this.onLogin}>
                <Text style={styles.text}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )
    }
    return (
      <>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.caption}>Buat akun baru dan mulai bayar keperluan anda dengan mudah.</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text type style={styles.label}>Nama</Text>
              <TextInput underlineColorAndroid="#6c6c6c" autoCapitalize="words" style={styles.textInput} onChangeText={(name) => this.setState({name})} placeholder="John Doe" label="Name" />
            </View>
            <View style={styles.input}>
              <Text type style={styles.label}>E-mail</Text>
              <TextInput underlineColorAndroid="#6c6c6c" autoCapitalize="none" style={styles.textInput} onChangeText={(text) => this.validEmail(text)} placeholder="your@mail.com" label="E-mail" keyboardType="email-address" />
            </View>
            <View style={styles.input}>
              <Text style={styles.label}>Password</Text>
              <TextInput underlineColorAndroid="#6c6c6c" autoCapitalize="none" style={styles.textInput} onChangeText={(text) => this.validPass(text)} placeholder="********" label="Password" secureTextEntry={true} />
            </View>
            <View style={styles.input}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput underlineColorAndroid="#6c6c6c" autoCapitalize="none" style={styles.textInput} onChangeText={(confirm) => this.setState({confirm})} placeholder="********" label="Password" secureTextEntry={true} />
            </View>
            <TouchableOpacity onPress={this.onRegister} activeOpacity={0.5} style={styles.register}>
              <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
            <Text style={styles.littleCaption}>Dengan mendaftar, anda menyetujui Syarat & Ketentuan yang berlaku.</Text>
          </View>
          <View style={{marginTop: 20, width: "100%"}}>
            <Text style={styles.caption}>Sudah punya akun?</Text>
            <TouchableOpacity activeOpacity={0.5} style={styles.loginButton} onPress={this.onLogin}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    )
  }
}

const styles = StyleSheet.create ({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff"
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20
  },
  header: {
    alignItems: "center",
    marginBottom: 20
  },
  caption: {
    fontSize: 14,
    color: "#6c6c6c",
    textAlign: "center",
    marginHorizontal: 10,
    fontFamily: "Montserrat"
  },
  littleCaption: {
    fontSize: 13,
    color: "#6c6c6c",
    marginBottom: 20,
    fontFamily: "Montserrat"
  },
  form: {
    width: "100%",
    borderBottomColor: "#6c6c6c",
    borderBottomWidth: 0.5
  },
  input: {
    marginVertical: 5
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Montserrat"
  },
  textInput: {
    borderColor: "#6c6c6c",
    fontFamily: "Montserrat"
  },
  loginButton: {
    backgroundColor: "#e2474b",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: "center"
  },
  text: {    
    fontFamily: "Montserrat",
    color: "#fff"
  },
  register: {
    backgroundColor: "#0e2449",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    marginBottom: 10,
    alignItems: "center"
  }
})

export default Register;