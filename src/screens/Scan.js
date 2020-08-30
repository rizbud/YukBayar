import React, { useState, useEffect } from 'react'
import { View, StatusBar, Text, TouchableOpacity, BackHandler, Modal, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import QRCodeScanner from 'react-native-qrcode-scanner'
import QRCode from 'react-native-qrcode-svg'
import { RNCamera } from 'react-native-camera'

import auth from '@react-native-firebase/auth'

const Scan = ({ navigation }) => {
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off)
  const [modal, setModal] = useState(false)
  const [email, setEmail] = useState(auth().currentUser.email)

  useEffect(() => {
    const backButton = () => {
      navigation.goBack()
      return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backButton)
    return () => backHandler.remove()
  }, [])

  const onScanned = e => {
    navigation.goBack()
    navigation.navigate('Kirim', { email: e.data })
  }

  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#000" />
    <Modal visible={modal} transparent={true} animationType='slide' onRequestClose={() => setModal(false)}>
      <View style={styles.modal}>
        <View style={styles.cos}>
          <Text style={{ fontFamily: 'Montserrat', marginBottom: 20 }}>{email}</Text>
          <QRCode value={email} size={200} />
          <TouchableOpacity onPress={() => setModal(false)} style={styles.modalBtn}>
            <Text style={styles.modalBtnLabel}>TUTUP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    <QRCodeScanner
      onRead={(e) => onScanned(e)}
      flashMode={flash}
      showMarker={true}
      reactivate={true}
      containerStyle={{ backgroundColor: '#000' }}
      topContent={
        <>
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()} style={{ position: "absolute", top: 10, left: 10, flexDirection:'row', alignItems: 'center', alignSelf: 'flex-start' }}>
          <Icon name="chevron-left" size={23} color="#fff" />
          <Text style={{ color: '#fff', fontSize: 15, fontFamily: 'Montserrat', flexWrap: 'wrap', marginLeft: 10 }}>Kembali</Text>
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Montserrat', color: '#fff', marginBottom: 20 }}>Scan barcode untuk pembayaran lebih mudah.</Text>
        </>
      }
      bottomContent={
        flash == RNCamera.Constants.FlashMode.off ? (
          <View style={{ position: 'absolute', bottom: 30, flexDirection: 'row', }}>
            <TouchableOpacity onPress={() => setModal(true)} style={{ alignItems: 'center', flex: 1 }}>
              <Icon name="qrcode" size={30} color="#fff" />
              <Text style={{ color: '#fff', fontFamily: 'Montserrat', flexWrap: 'wrap', textAlign: 'center' }}>QR Code Saya</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFlash(RNCamera.Constants.FlashMode.torch)} style={{ alignItems: 'center', flex: 1 }}>
              <Icon name="bolt" size={30} color="#fff" />
              <Text style={{ color: '#fff', fontFamily: 'Montserrat', flexWrap: 'wrap', textAlign: 'center' }}>Flash off</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ position: 'absolute', bottom: 30, flexDirection: 'row', }}>
            <TouchableOpacity onPress={() => setModal(true)} style={{ alignItems: 'center', flex: 1 }}>
              <Icon name="qrcode" size={30} color="#fff" />
              <Text style={{ color: '#fff', fontFamily: 'Montserrat', flexWrap: 'wrap', textAlign: 'center' }}>QR Code Saya</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFlash(RNCamera.Constants.FlashMode.off)} style={{ alignItems: 'center', flex: 1 }}>
              <Icon name="bolt" size={30} color="#fff" />
              <Text style={{ color: '#fff', fontFamily: 'Montserrat', flexWrap: 'wrap', textAlign: 'center' }}>Flash on</Text>
            </TouchableOpacity>
          </View>
        )
      }
    />
    </>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center'
  },
  cos: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    alignItems: 'center'
  },
  modalBtn: {
    marginTop: 20,
    backgroundColor: '#4c84ad',
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    borderRadius: 999999
  },
  modalBtnLabel: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    fontSize: 14
  }
})

export default Scan