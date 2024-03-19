/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import useTranscriptionStore from '../store/transcriptionControlStore';

interface TranscriptionProps {
  back: () => void;
}

const Transcription = ({back}: TranscriptionProps) => {
  const {
    transcript,
    pauseTranscription,
    setPauseTranscription,
    setStopTranscription,
    setStartTranscription,
    stopTranscription
  } = useTranscriptionStore();

  const scrollViewRef = useRef<ScrollView>(null);

  const handlePause = () => {
    if (pauseTranscription) {
      setStartTranscription(true);
      setPauseTranscription(false);
      console.log(pauseTranscription);
    } else {
      setStartTranscription(false);
      setPauseTranscription(true);
      console.log('paused', pauseTranscription);
    }
  };

  useEffect(() => {
    // Scroll to bottom when transcript updates
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [transcript]);
  return (
    <LinearGradient
      colors={['#000000', '#000000', '#071f16']}
      start={{x: 0.5, y: 0.5}}
      style={styles.linearGradient}>
      <TouchableOpacity onPress={back}>
        <Text style={{color: 'white', fontSize: 21, fontWeight: '800'}}>
          &lt; Back
        </Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Feed from ninti.Mic</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitleText}>
              Its the preview from ninti.Glass
            </Text>
          </View>
        </View>
        <View style={styles.qrContainer}>
          <Image source={require('../assets/icons/recording.png')} />
        </View>
        <View style={{paddingTop: 20, gap: 20, alignItems: 'center'}}>
          <View
            style={{
              height: 50,
              borderRadius: 20,
              backgroundColor: 'grey',
              minWidth: '90%',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 26,
                fontWeight: '500',
                color: 'white',
                textAlign: 'center',
              }}>
              Live Preview - Transcription
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            }}>
            <Button
              title={pauseTranscription ? 'Resume' : 'Pause'}
              onPress={handlePause}
            />
            <Button title={stopTranscription? "Stopped" : "Stop"} onPress={() => setStopTranscription(true)} />
          </View>
          <Image source={require('../assets/icons/bars.png')} />
        </View>
        <View style={{height: 330, paddingVertical: 20}}>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{
              flexGrow: 1,
              minHeight: 300,
              width: '100%',
              paddingVertical: 5,
            }}>
            <View style={{paddingHorizontal: 6}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: 'white',
                  textAlign: 'auto',
                }}>
                {transcript}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Transcription;

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
    height: 150,
    justifyContent: 'center',
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
