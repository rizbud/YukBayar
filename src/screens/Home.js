import React, { Component } from "react";
import { 
  View,
  ScrollView,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import Icon from 'react-native-vector-icons/FontAwesome'

const format = amount => {
  return Number(amount)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: auth().currentUser.displayName,
      email: auth().currentUser.email,
      uid: auth().currentUser.uid,
      saldo: 0,
      salam : 'Halo,',
      date: null
    }
  }

  onBack() {
    BackHandler.exitApp()
    return true
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBack)
    this.getJam()
  }

  getJam() {
    const date = new Date()
    const jam = date.getHours()
    const menit = date.getMinutes()

    if(jam<=3) {
      this.setState({salam: 'Selamat Malam,'})
    } else if(jam<=10) {
      this.setState({salam: 'Selamat Pagi,'})
    } else if(jam<=14) {
      this.setState({salam: 'Selamat Siang,'})
    } else if(jam<=18) {
      this.setState({salam: 'Selamat Sore,'})
    } else if(jam<=24) {
      this.setState({salam: 'Selamat Malam,'})
    }
  }

  onLogout = () => {
    auth().signOut()
    .catch((err) => {
      Alert.alert(err.code, err.message)
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4c84ad" barStyle="light-content" />
        <View style={styles.header}>
          <View style={styles.left}>
            <Text style={styles.salam}>{this.state.salam}</Text>
            <Text style={styles.nama}>{this.state.name}</Text>
          </View>
          <View style={styles.right}>
            <View style={styles.saldoSaya}>
              <Text style={styles.rp}>Rp </Text>
              <Text style={styles.nominal}>{format(this.state.saldo)}</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.body}>
          <View style={styles.menu1}>
            <TouchableOpacity style={styles.list} onPress={() => alert('Scan')}>
              <Icon name="qrcode" size={45} color="#fff" />
              <Text style={styles.menu1Text}>Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.list} onPress={() => alert('Tambah saldo')}>
              <Icon name="plus-circle" size={45} color="#fff" />
              <Text style={styles.menu1Text}>Top Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.list}  onPress={() => alert('Kirim saldo')}>
              <Icon name="arrow-circle-up" size={45} color="#fff" />
              <Text style={styles.menu1Text}>Kirim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.list}  onPress={() => alert('Minta saldo')}>
              <Icon name="arrow-circle-down" size={45} color="#fff" />
              <Text style={styles.menu1Text}>Minta</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.onLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0e0e0",
    flex: 1
  },
  header: {
    backgroundColor: "#4c84ad",
    flexDirection: 'row'
  },
  left: {
    padding: 10,
    flex: 1
  },
  salam: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Montserrat-SemiBold"
  },
  nama: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Montserrat"
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 10
  },
  saldoSaya: {
    flexDirection: 'row'
  },
  rp: {
    fontSize: 14,
    fontFamily: "Montserrat",
    color: "#fff"
  },
  nominal: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 20,
    color: "#fff"
  },
  menu1: {
    flexDirection: 'row',
    backgroundColor: '#4c84ad',
    padding: 5,
    paddingVertical: 10
  },
  list: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  menu1Text: {
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold'
  }
})

export default Home