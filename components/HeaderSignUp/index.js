import { View,  StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import SignInContext from '../../context/SignInContext';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../Texts/CustomText';


export default function HeaderSignUp({subtitle, progress}) {

   const {count, setSignInContext} = useContext(SignInContext)
   const navigation = useNavigation()

   const back = () =>{

      if(count == 1){ 
         navigation.navigate('Login')
         return 
      }

      setSignInContext({
         count: count - 1
      })
   }
   
   return (
   <View style={{paddingHorizontal: 25}}>

      <TouchableOpacity onPress={back}>
         <Image source={require('../../assets/backSignUp.png')} style={{marginTop: 40, marginBottom: 20}}/>
      </TouchableOpacity>

      <View style={{ width:'100%', paddingTop: 0}}>
         <CustomText text='Cadastre-se!' type='bold' style={styles.title}/>
         <CustomText text={
            count == 1 ? 'Informações básicas' : 
            count == 2 ? 'Endereço': 
            count == 3 ? 'Foto de perfil' : 
            count == 4 ? 'Termos de uso' : null}
            style={styles.subtitle}

         />
         {/* <Text style={styles.subtitle}>{
            count == 1 ? 'Informações básicas' : 
            count == 2 ? 'Endereço.' :
            count == 3 ? 'Termos da Workin' : null
         }</Text> */}
      </View>

      <Progress.Bar 
         progress={progress} 
         width={null} 
         height={2} 
         style={{marginBottom: 40, marginHorizontal: 3, marginTop: 20}}
         borderWidth={0}
         unfilledColor='rgba(79, 128, 255, 0.2)'
         color='#4F80FF'
      />
   </View>
  )
}

const styles = StyleSheet.create({
   title:{
      fontSize:36,
      color:'#001240',
      fontWeight:'bold',
   },
  
   subtitle:{
      fontSize: 20,
      color:'#001240',
      fontWeight: '100',
      marginLeft: 3
   },
  
   progress:{
    width: '100%',
    height: 5,
    backgroundColor:'blue',
    opacity: 0.2,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 60
   },
})