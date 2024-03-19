/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useTranscriptionStore from '../store/transcriptionControlStore';

interface NintiDocProps {
  back: () => void;
}

const NintiDoc = ({back}: NintiDocProps) => {
  const {setStartTranscription} = useTranscriptionStore();
  return (
    <LinearGradient
      colors={['#000000', '#000000', '#071f16']}
      start={{x: 0.5, y: 0.5}}
      style={styles.linearGradient}>
      <ScrollView>
        <TouchableOpacity onPress={back}>
          <Text style={{color: 'white', fontSize: 21, fontWeight: '800'}}>
            &lt; Back
          </Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Connect to NintiDoc</Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitleText}>You can either connect</Text>
              <Text style={styles.subtitleText}>NintiMic / NintiGlass</Text>
            </View>
          </View>
          <Text style={styles.bigTitleText}>ninti.Glass</Text>
          <Text style={styles.subtitleText}>
            Open Ninti app in AR glass and show below pattern to join the
            meeting
          </Text>
          <View style={styles.qrContainer}>
            <Image
              source={require('../assets/icons/qr.png')}
              style={styles.qrImage}
            />
            <Image
              source={require('../assets/icons/scan.png')}
              style={styles.scanImage}
            />
            <Image source={require('../assets/icons/instrument.png')} />
          </View>
          <View style={{paddingTop: 20}}>
            <Text style={styles.bigTitleText}>ninti.Mic</Text>
            <Text style={styles.subtitleText}>
              Turn on the device Say “Hello Ninti Connect”
            </Text>
            <TouchableOpacity onPress={() => setStartTranscription(true)}>
              <Image
                source={require('../assets/icons/mic-btn.png')}
                style={{marginTop: -20}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  titleContainer: {
    gap: 4,
    alignItems: 'center',
    paddingBottom: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  subtitleText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'grey',
    textAlign: 'center',
    maxWidth: '70%',
  },
  bigTitleText: {
    fontSize: 32,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
  },
  qrContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  qrImage: {
    marginBottom: 10,
  },
  scanImage: {
    position: 'absolute',
    top: '40%',
  },
});

export default NintiDoc;
