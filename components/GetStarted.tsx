import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function GetStarted() {
  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.imgwrapper}>
        <Image
          source={require('../assets/icons/Logo.png')}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.title}>ninti.ai</Text>
      </View>
      <View>
        <Text style={[styles.content, styles.wrapper]}>Delivers Unmached</Text>
      </View>
      <View>
        <Text style={[styles.content1, styles.wrapper]}>
          Precision & Insight for
        </Text>
      </View>
      <View>
        <Text style={[styles.content2, styles.wrapper]}>Superior Medical</Text>
      </View>
      <View>
        <Text style={[styles.content3, styles.wrapper]}>Outcomes</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginTop: 150,
    position: 'relative',
    padding: 10,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    zIndex: 1,
    width: 167,
    height: 173,
    marginLeft: 10,
  },
  image: {
    width: 183,
    height: 190,
    zIndex: 2,
  },
  imgwrapper: {
    width: 167,
    height: 173,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  title: {
    fontSize: 41,
    fontWeight: '700',
    fontFamily: 'Anek Bangla',
    color: '#F0FFF7',
    marginLeft: 10,
  },
  content: {
    width: '100%',
    fontSize: 33,
    fontWeight: '400',
    fontFamily: 'Anek Bangla',
    color: '#F0FFF7',
  },
  content1: {
    width: '100%',
    fontSize: 33,
    fontWeight: '400',
    fontFamily: 'Anek Bangla',
    color: '#d9d9d9',
  },
  content2: {
    width: '100%',
    fontSize: 33,
    fontWeight: '400',
    fontFamily: 'Anek Bangla',
    color: '#a6a6a6',
  },
  content3: {
    width: '100%',
    fontSize: 33,
    fontWeight: '400',
    fontFamily: 'Anek Bangla',
    color: '#8c8c8c',
  },
  wrapper: {
    marginVertical: 5,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#FFF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 100,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: '#000',
  },
});
