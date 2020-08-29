import React, { useState, useEffect } from 'react'
import { View, StatusBar, TouchableOpacity, Text, TextInput, StyleSheet, BackHandler } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Format from '../Lib/formatMoney'

import firestore from "@react-native-firebase/firestore"
import { set } from 'react-native-reanimated'

const Kirim = props => {
  const { navigation } = props
  const { params } = props.route

  const [saldo, setSaldo] = useState(0)
  const [nominal, setNominal] = useState('')
  const [email, setEmail] = useState('')
  const [emailText, setEmailText] = useState('')
  const [emailValid, setEmailValid] = useState(false)

  useEffect(() => {
    firestore().collection('users').doc(params.uid).get()
    .then((res) => setSaldo(res.data().saldo))

    const backButton = () => {
      navigation.goBack()
      return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backButton)
    return () => backHandler.remove()
  }, [])

  const onTopUp = () => {
    const nom = Number(nominal)
    if(emailValid) {
      firestore().collection('users').doc(params.uid).update({
        saldo: saldo-nom
      })
      .then(() => {
        firestore().collection('users').doc(params.uid).get()
        .then((res) => setSaldo(res.data().saldo))
      })
    }
  }

  //Email Validator
  const validEmail = (text) => {
    const val = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setEmailText(text)
    if(val.test(text) === true) {
      setEmailValid(true)
      setEmail(text)
    } else {
      setEmailValid(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.sectionA}>
        <View style={styles.saldo}>
          <View style={styles.saldoIcon}>
            <Icon name='money' size={30} color='#4c84ad' />
          </View>
          <View>
            <Text style={styles.saldoLabel}>Saldo Utama</Text>
            <Text style={styles.mySaldo}>Rp{Format(saldo)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.sectionB}>
        <View style={styles.inputStyle}>
          <Text style={styles.inputLabel}>E-mail penerima</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.inputNominal}
              placeholder='sahabat@mail.com'
              onChangeText={(text) => validEmail(text)}
              value={emailText}
              keyboardType='number-pad'
              inputContainerStyle={{borderBottomWidth:0}}
              underlineColorAndroid="transparent"
            />
          </View>
          <Text style={styles.warning}>{!emailValid ? 'Format e-mail salah' : ''}</Text>
        </View>
        <Text style={styles.inputLabel}>Nominal</Text>
        <View style={styles.input}>
          <Text style={styles.rp}>Rp</Text>
          <TextInput
            style={styles.inputNominal}
            placeholder='Minimal Rp10.000'
            onChangeText={(value) => setNominal(value)}
            value={nominal}
            keyboardType='number-pad'
            inputContainerStyle={{borderBottomWidth:0}}
            underlineColorAndroid="transparent"
          />
        </View>
        <Text style={styles.warning}>{nominal < 10000 && nominal != 0 ? 'Minimal Kirim Rp10.000' : ''}{nominal > saldo ? 'Saldo tidak cukup' : ''}</Text>
      </View>
      <TouchableOpacity
        onPress={() => onTopUp()}
        style={styles.btnTopUp}
        activeOpacity={0.8}
      >
        <Text style={styles.btnTopUpLabel}>Kirim Saldo</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0'
  },
  sectionA: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10
  },
  saldo: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center'
  },
  saldoIcon: {
    marginRight: 15
  },
  saldoLabel: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18
  },
  mySaldo: {
    fontFamily: 'Montserrat'
  },
  sectionB: {
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 10
  },
  inputStyle: {
    marginBottom: 15
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 0.2,
    borderRadius: 5,
    marginTop: 5
  },
  rp: {
    fontFamily: 'Montserrat'
  },
  inputLabel: {
    fontFamily: 'Montserrat'
  },
  inputNominal: {
    fontFamily: 'Montserrat',
    paddingVertical: 10,
    paddingHorizontal: 3,
    flex: 1,
  },
  warning: {
    fontFamily: 'Montserrat',
    color: '#e2474b',
    marginHorizontal: 10
  },
  btnTopUp: {
    backgroundColor: '#4c84ad',
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 999999
  },
  btnTopUpLabel: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    textAlign: 'center'
  }
})

export default Kirim