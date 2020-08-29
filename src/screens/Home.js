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
  FlatList,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import BtnMenu from '../components/BtnMenu'
import Loading from './Loading'

import Format from '../Lib/formatMoney'

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: auth().currentUser.displayName,
      email: auth().currentUser.email,
      uid: auth().currentUser.uid,
      saldo: 0,
      salam : 'Halo,',
      date: null,
      promo: [
        'https://a.m.dana.id/danaweb/promo/1598348247-theshonet_thumb.png',
        'https://a.m.dana.id/danaweb/promo/1598004956-bni2.png',
        'https://a.m.dana.id/danaweb/promo/1597844489-blibli_thumb.png',
        'https://a.m.dana.id/danaweb/promo/1597376230-apple_thumb.png',
        'https://a.m.dana.id/danaweb/promo/1597311106-tsel_thumb.png'
      ],
      loading: true,
      refreshing: true
    }
  }

  onBack() {
    BackHandler.exitApp()
    return true
  }

  componentDidMount() {
    this.getSaldo()
    this.props.navigation.addListener('didFocus', payload => {this.forceUpdate()})
    BackHandler.addEventListener('hardwareBackPress', this.onBack)
    this.getJam()
    this.setState({ refreshing: false })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBack)
  }

  getSaldo() {
    firestore().collection('users').doc(this.state.uid).get()
    .then((res) => {
      this.setState({ saldo: res.data().saldo, loading: false })
    })
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

  onRefresh = () => {
    this.setState({refreshing: true})
    this.componentDidMount()
  }

  renderItem({ item, index }) {
    return (
      <Image style={styles.promoImg} source={{ uri: item }} resizeMode="cover" />
    )
  }

  render() {
    const { navigate } = this.props.navigation
    if(this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )
    }
    return (
      <SafeAreaView style={styles.container} refr>
      <StatusBar backgroundColor="#4c84ad" barStyle="light-content" />
        <View style={styles.header}>
          <View style={styles.left}>
            <Text style={styles.salam}>{this.state.salam}</Text>
            <Text style={styles.nama}>{this.state.name}</Text>
          </View>
          <View style={styles.right}>
            <View style={styles.saldoSaya}>
              <Text style={styles.rp}>Rp </Text>
              <Text style={styles.nominal}>{Format(this.state.saldo)}</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.body} refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
        }>
          <View style={styles.headerMenu}>
            <BtnMenu icon="qrcode" iconSize={30} iconColor="#fff" style={styles.btnMenuHeader} textStyle={styles.btnMenuHeaderLabel} text="Scan" onPress={() => navigate('Scan')} />
            <BtnMenu icon="plus-circle" iconSize={30} iconColor="#fff" style={styles.btnMenuHeader} textStyle={styles.btnMenuHeaderLabel} text="Top Up" onPress={() => navigate('TopUp', {uid: this.state.uid})} />
            <BtnMenu icon="arrow-circle-up" iconSize={30}  iconColor="#fff" style={styles.btnMenuHeader} textStyle={styles.btnMenuHeaderLabel} text="Kirim" onPress={() => navigate('Kirim', {uid: this.state.uid})} />
            <BtnMenu icon="arrow-circle-down" iconSize={30} iconColor="#fff" style={styles.btnMenuHeader} textStyle={styles.btnMenuHeaderLabel} text="Minta" onPress={() => alert('')} />
          </View>
          <View style={styles.purchaseMenu}>
            <View style={styles.purchaseMenu1}>
              <BtnMenu icon="mobile" iconSize={25} iconColor="#4c84ad" text="Pulsa" style={styles.btnPurchaseMenu} textStyle={styles.btnPurchaseMenuLabel} />
              <BtnMenu icon="globe" iconSize={25} iconColor="#09238A" text="Internet" style={styles.btnPurchaseMenu} textStyle={styles.btnPurchaseMenuLabel} />
              <BtnMenu icon="bolt" iconSize={25} iconColor="#F8C010" text="Listrik" style={styles.btnPurchaseMenu} textStyle={styles.btnPurchaseMenuLabel} />
              <BtnMenu icon="medkit" iconSize={25} iconColor="#0EBC68" text="BPJS Kesehatan" style={styles.btnPurchaseMenu} textStyle={styles.btnPurchaseMenuLabel} />
            </View>
            <View style={styles.purchaseMenu2}>
              <BtnMenu icon="umbrella" iconSize={25} iconColor="#6E0F7B" text="Asuransi" style={styles.btnPurchaseMenu} textStyle={styles.btnPurchaseMenuLabel} />
              <BtnMenu icon="shopping-bag" iconSize={25} iconColor="#931025" text="Belanja" style={styles.btnPurchaseMenu} textStyle={styles.btnPurchaseMenuLabel} />
              <BtnMenu icon="money" iconSize={25} iconColor="#85BC1A" text="Tarik Tunai" style={styles.btnPurchaseMenu} textStyle={styles.btnPurchaseMenuLabel} />
              <BtnMenu icon="credit-card" iconSize={25} iconColor="#E84D1B" text="E-Money" style={styles.btnPurchaseMenu} textStyle={styles.btnPurchaseMenuLabel} />
            </View>
          </View>
          <View style={styles.promo}>
            <Text style={styles.promoText}>Promo Terkini</Text>
            <FlatList
              data={this.state.promo}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={this.renderItem}
            />
          </View>
        </ScrollView>
            <TouchableOpacity onPress={this.onLogout} style={{ alignItems: 'center', justifyContent: 'flex-end', margin: 25 }}>
              <Text style={{ fontFamily: 'Montserrat', color: '#e2474b' }}>KELUAR</Text>
            </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  container: {
    backgroundColor: "#e0e0e0",
    flex: 1
  },
  header: {
    backgroundColor: "#4c84ad",
    flexDirection: 'row',
    padding: 10
  },
  left: {
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
    justifyContent: 'flex-end'
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
  headerMenu: {
    flexDirection: 'row',
    backgroundColor: '#4c84ad',
    padding: 5,
    paddingVertical: 10
  },
  btnMenuHeader: {
    flex: 1,
    marginHorizontal: 5,
    padding: 5,
    alignItems: 'center',
  },
  btnMenuHeaderLabel: {
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 5
  },
  purchaseMenu: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 8,
    padding: 5,
    paddingVertical: 10,
    marginVertical: 20
  },
  purchaseMenu1: {
    flexDirection: 'row',
    marginBottom: 20
  },
  purchaseMenu2: {
    flexDirection: 'row'
  },
  btnPurchaseMenu: {
    flex: 1,
    alignItems: 'center',
  },
  btnPurchaseMenuLabel: {
    color: '#000',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    marginTop: 5,
    justifyContent: 'center'
  },
  promo: {
    marginHorizontal: 10
  },
  promoText: {
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 5
  },
  promoImg: {
    width: 250,
    height: 150,
    borderRadius: 10,
    margin: 5
  }
})

export default Home