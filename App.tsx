/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import React, {Fragment} from 'react';
import GetStarted from './components/GetStarted';
import useGetStartedStore from './store/getStartedStore';
import Dashboard from './components/Dashboard';

export default function App() {
  const {isStarted} = useGetStartedStore();
  return (
    <Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView
        style={
          isStarted
            ? {flex: 1, backgroundColor: '#000000'}
            : styles.safeAreaGreen
        }>
        {!isStarted && <GetStarted />}
        {isStarted && <Dashboard />}
      </SafeAreaView>
      <SafeAreaView
        style={isStarted ? {backgroundColor: '#071f16'} : styles.safeAreaBlack}
      />
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
