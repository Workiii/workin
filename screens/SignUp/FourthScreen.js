import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, {useContext, useState, useEffect} from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";

import SignInContext from '../../context/SignInContext'

import * as  Notification from 'expo-notifications'

import {createUserWithEmailAndPassword} from 'firebase/auth'
import {setDoc, doc} from 'firebase/firestore'
import {auth, db} from '../../firebase/config'

import { useNavigation } from '@react-navigation/native';

import Animated, {FadeInUp} from 'react-native-reanimated'

import terms from '../../terms';
import CustomText from '../../components/Texts/CustomText';


export default function FourthScreen() {

  const navigation = useNavigation()

  const {loading, nome, email, endereco, password, phone, image, setSignInContext} = useContext(SignInContext)
  const[check, setCheck] = useState(false)
  const[token, setToken] = useState(null)

  useEffect(()=>{
    handleNotificationsPermissions()
  }, [])

  Notification.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true
    })
  })

  const handleNotificationsPermissions = async () =>{
    const {status} = await Notification.getPermissionsAsync()

    if(status != 'granted'){
      console.log('notificação não aceita')
      return
    }

    await Notification.getExpoPushTokenAsync().then((token)=>{
       setToken(token.data)
    })
  }

  const finishSignUp = () =>{

    setSignInContext({
      loading: true
    })


    const userObj = {
      nome: nome,
      email: email,
      endereco: endereco,
      senha: password,
      telefone: phone,
      pedidos:[],
      favoritos:[],
      isWorker: false,
      image: image,
      token: token
    }

    createUserWithEmailAndPassword(auth, userObj.email, userObj.senha)
      .then((userCred)=> {

          const docRef = doc(db, 'users', userCred.user.uid)

          const objCopy = {...userObj}
          console.log(objCopy)

            delete objCopy.email
            delete objCopy.senha
            
            setDoc(docRef, objCopy)
              .then(()=> {
                console.log('Criado')
                setSignInContext({
                  loading: false,
                  count: 1,
                  nome: nome,
                  endereco: endereco,
                  telefone: phone,
                  contador: 0 
                })
              })
              .catch((error)=> console.log(error))
      })
      .catch((err)=> console.log(err))


  }


  return (
    <View style={styles.containerAll}>

        <Animated.View 
          style={styles.form}
          entering={FadeInUp.duration(1000).springify()}
        >
        <ScrollView style={{width:'100%', height: 210, marginBottom: 20, paddingHorizontal: 8}}>
          <CustomText text={terms}/>
        </ScrollView>

        <View style={{flexDirection:'row', alignItems:'center'}}>
          <BouncyCheckbox
            size={23}
            fillColor="#4F80FF"
            unfillColor="#FFFFFF"
            onPress={(isChecked) => {setCheck(isChecked)}}
            innerIconStyle={{borderRadius: 5, borderColor:'#4F80FF'}}
            iconStyle={{borderRadius: 5}}
          />

          <View style={{flexDirection:'row'}}>
            <Text style={{color:'#001240'}}>Li e concordo com os</Text>
            <Text style={{color:'#4F80FF', fontWeight:'bold'}}> Termos</Text>
            <Text style={{color:'#001240'}}> e</Text>
            <Text style={{color:'#4F80FF', fontWeight:'bold'}}> Condições</Text>
          </View>
        </View>
      </Animated.View>

      <TouchableOpacity style={[styles.button, {opacity: check ? 1 : 0.5}]} disabled={check ? false : true} onPress={finishSignUp}>
        <Text style={styles.textButton}>FINALIZAR</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  containerAll:{
    flex:1,
    padding: 25
  },

  title:{
    fontSize:36,
    color:'#001240',
    fontWeight:'bold',
 },

 subtitle:{
    fontSize: 20,
    color:'#001240',
    fontWeight: '100',
    marginLeft: 5
 },

 progress:{
  width: '100%',
  height: 5,
  backgroundColor:'#4F80FF',
  opacity: 0.2,
  borderRadius: 10,
  marginTop: 20,
  marginBottom: 70
 },

 form:{
  width:'100%',
  height: 250,
 },

 button:{
  width:'100%',
  height: 57, 
  backgroundColor:'#4F80FF',
  borderRadius: 10,
  alignItems:'center',
  justifyContent:'center',
  shadowColor: "#000",
  marginTop: 100
},

textButton:{
  fontSize: 20,
  fontWeight:'bold',
  color:'white',
},

terms:{
  color:'#001240',
  textAlign:'justify'
}

})