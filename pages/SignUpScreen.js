// pages/SignUpScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation} from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="shopping-cart" size={55} color="#fff" />
      </View>
      <Text style={styles.header}>Sign Up</Text>
      <View style={styles.nameContainer}>
        <TextInput style={[styles.input, styles.halfInput]} placeholder="First Name" placeholderTextColor="#aaa" />
        <TextInput style={[styles.input, styles.halfInput]} placeholder="Last Name" placeholderTextColor="#aaa" />
      </View>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#aaa" />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="#aaa" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Create an Account</Text>
      </TouchableOpacity>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={[styles.socialButton, styles.facebook]} onPress={() => Linking.openURL('https://facebook.com')}>
          <Icon name="facebook" size={20} color="#fff" />
          <Text style={styles.socialText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialButton, styles.google]} onPress={() => Linking.openURL('https://google.com')}>
          <Icon name="google" size={20} color="#fff" />
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signInText}>Have an account? Sign in</Text>
      </TouchableOpacity>
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>Terms of Use and Privacy Policy</Text>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00aaff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00aaff',
    padding: 20,
  },
  iconContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  header: {
    fontWeight:'bold',
    fontSize: 30,
    color: '#fff',
    marginBottom: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  halfInput: {
    width: '48%',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius:18,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius:18,
    marginBottom: 10,
    height: 40,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 16,
    top:5,

  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#003e7f',
    borderRadius:18,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 40,
    borderRadius: 5,
  },
  facebook: {
    backgroundColor: '#0099e6',
    borderRadius:18,

  },
  google: {
    backgroundColor: '#001133',
    borderRadius:18,

  },
  socialText: {
    color: '#fff',
    marginLeft: 10,
  },
  signInText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  termsContainer: {
    position: 'absolute',
    bottom: 20,
  },
  termsText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
