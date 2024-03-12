/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, StyleSheet, View, StatusBar} from 'react-native';
import React, {Fragment} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import GetStarted from './components/GetStarted';

export default function App() {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeAreaGreen} />
      <SafeAreaView style={styles.safeAreaBlack}>
        <LinearGradient
          colors={['#17694a', '#000000', '#000000']}
          start={{x: 0.5, y: 0.1}}
          style={styles.linearGradient}>
          <View style={{flex: 1}}>
            <GetStarted />
          </View>
        </LinearGradient>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: '100%',
  },
  safeAreaGreen: {
    flex: 1,
    backgroundColor: '#17694a',
  },
  safeAreaBlack: {
    backgroundColor: '#000000',
  },
});
