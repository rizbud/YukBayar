import React, { useState, useEffect } from 'react'
import { View, StatusBar, Text, TouchableOpacity, BackHandler } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { RNCamera } from 'react-native-camera';

const Scan = ({ navigation }) => {
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off)

  useEffect(() => {
    const backButton = () => {
      navigation.goBack()
      return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backButton)
    return () => backHandler.remove()
  }, [])

  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#000" />
    <QRCodeScanner
      onRead={(e) => alert(e.data)}
      flashMode={flash}
      showMarker={true}
      containerStyle={{ backgroundColor: '#000' }}
      topContent={
        <Text style={{ fontFamily: 'Montserrat', color: '#fff', marginBottom: 50 }}>Scan barcode untuk pembayaran lebih mudah.</Text>
      }
      bottomContent={
        flash == RNCamera.Constants.FlashMode.off ? (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => alert('QR Code')} style={{ marginTop: 50, alignItems: 'center', flex: 1 }}>
              <Icon name="qrcode" size={30} color="#fff" />
              <Text style={{ color: '#fff', fontFamily: 'Montserrat', flexWrap: 'wrap', textAlign: 'center' }}>QR Code Saya</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFlash(RNCamera.Constants.FlashMode.torch)} style={{ marginTop: 50, alignItems: 'center', flex: 1 }}>
              <Icon name="bolt" size={30} color="#fff" />
              <Text style={{ color: '#fff', fontFamily: 'Montserrat', flexWrap: 'wrap', textAlign: 'center' }}>Flash off</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => alert('QR Code')} style={{ marginTop: 50, alignItems: 'center', flex: 1 }}>
              <Icon name="qrcode" size={30} color="#fff" />
              <Text style={{ color: '#fff', fontFamily: 'Montserrat', flexWrap: 'wrap', textAlign: 'center' }}>QR Code Saya</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFlash(RNCamera.Constants.FlashMode.off)} style={{ marginTop: 50, alignItems: 'center', flex: 1 }}>
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

export default Scan