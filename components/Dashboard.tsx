/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import DateContainer from './DateContainer';
import JobCard from './JobCard';
import {jobDetails} from '../utils/JobDetails';
import useSubMenuedStore from '../store/subMenuStore';
import NintiDoc from './NintiDoc';
import 'react-native-get-random-values';
import 'node-libs-react-native/globals';
import {
  AudioConfig,
  AudioInputStream,
  AudioStreamFormat,
  CancellationDetails,
  CancellationReason,
  NoMatchDetails,
  NoMatchReason,
  ResultReason,
  SpeechConfig,
  SpeechRecognizer,
} from 'microsoft-cognitiveservices-speech-sdk';
import {LogBox} from 'react-native';
import AudioRecord from 'react-native-live-audio-stream';
import useTranscriptionStore from '../store/transcriptionControlStore';
import Transcription from './Transcription';
LogBox.ignoreLogs(['new NativeEventEmitter']);

export default function Dashboard() {
  const key = process.env.SPEECH_SDK_KEY;
  const region = process.env.SPEECH_SDK_REGION;
  const language = 'en-IN';
  const {showMenu, setShowMenu} = useSubMenuedStore();
  const [currentView, setCurrentView] = useState('');
  // const [transcript, setTranscript] = useState('');
  const [msg, setMsg] = useState('');

  const {
    startTranscription,
    pauseTranscription,
    stopTranscription,
    setStartTranscription,
    setTranscript,
    setPauseTranscription,
    setStopTranscription,
  } = useTranscriptionStore();

  const channels = 1;
  const bitsPerChannel = 16;
  const sampleRate = 16000;

  let initializedCorrectly = false;
  let recognizer: SpeechRecognizer;

  const checkPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external storage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };

  const initializeAudio = async () => {
    await checkPermissions();
    if (!initializedCorrectly) {
      //creates a push stream system which allows new data to be pushed to the recognizer
      const pushStream = AudioInputStream.createPushStream();
      const options = {
        sampleRate,
        channels,
        bitsPerChannel,
        audioSource: 6,
      };
      // @ts-ignore
      AudioRecord.init(options);
      //everytime data is recieved from the mic, push it to the pushStream
      AudioRecord.on('data', data => {
        const pcmData = Buffer.from(data, 'base64');
        pushStream.write(pcmData);
      });

      AudioRecord.start();

      const speechConfig = SpeechConfig.fromSubscription(
        key as string,
        region as string,
      );
      speechConfig.speechRecognitionLanguage = language;
      const audioConfig = AudioConfig.fromStreamInput(pushStream); //the recognizer uses the stream to get audio data
      recognizer = new SpeechRecognizer(speechConfig, audioConfig);

      recognizer.sessionStarted = (s, e) => {
        console.log('sessionStarted');
        console.log(e.sessionId);
      };

      recognizer.sessionStopped = (s, e) => {
        console.log('sessionStopped');
      };

      recognizer.recognizing = (s, e) => {
        //The recognizer will return partial results. This is not called when recognition is stopped and sentences are formed but when recognizer picks up scraps of words on-the-fly.
        setMsg(e.result.text);
        console.log(e.result.text);
      };
      recognizer.recognized = (s, e) => {
        if (
          e.result.text !== undefined &&
          !pauseTranscription &&
          !stopTranscription
        ) {
          setTranscript(e.result.text);
        }
      };
      recognizer.startContinuousRecognitionAsync(
        () => {
          console.log('startContinuousRecognitionAsync');
        },
        err => {
          console.log(err);
        },
      );

      initializedCorrectly = true;
    }
  };

  //stops the audio stream and recognizer
  const stopAudio = async () => {
    AudioRecord.stop();
    if (recognizer) {
      recognizer.stopContinuousRecognitionAsync();
      initializedCorrectly = false;
    }
  };

  useEffect(() => {
    if (startTranscription) {
      setCurrentView('transcription');
      setPauseTranscription(false);
      setStopTranscription(false);
      initializeAudio();
    }
  }, [startTranscription]);

  useEffect(() => {
    if (stopTranscription || pauseTranscription) {
      stopAudio();
    }
  }, [pauseTranscription, startTranscription]);

  return (
    <View style={{flex: 1}}>
      {!currentView && (
        <LinearGradient
          colors={['#000000', '#000000', '#071f16']}
          start={{x: 0.5, y: 0.5}}
          style={styles.linearGradient}>
          <ScrollView>
            <View style={styles.scrollViewContent}>
              <View style={{flex: 1, gap: 6}}>
                <View>
                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={{color: 'white', fontSize: 20, fontWeight: '400'}}>
                      Hi Dr. Here is the list of surgeries
                    </Text>
                    <Text
                      style={{
                        color: '#FFFFFFBF',
                        fontSize: 18,
                        fontWeight: '400',
                        marginTop: 3,
                      }}>
                      Please tab to choose the mode
                    </Text>
                  </View>
                  <View style={{marginTop: 30}}>
                    <DateContainer />
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      padding: 10,
                      gap: 10,
                    }}>
                    {jobDetails.map((job, index) => (
                      <Fragment key={index}>
                        {showMenu === 0 && (
                          <JobCard
                            jobName={job.jobName}
                            progress={job.progress}
                            id={job.id}
                          />
                        )}
                        {showMenu === job.id && (
                          <View style={styles.container}>
                            <TouchableOpacity
                              style={{padding: 10}}
                              onPress={() => setShowMenu(0)}>
                              <Text
                                style={{
                                  color: 'red',
                                  fontSize: 20,
                                  fontWeight: '800',
                                }}>
                                X
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: 10,
                              }}
                              onPress={() => setCurrentView('nintidoc')}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 20,
                                  fontWeight: '500',
                                }}>
                                NintiDoc
                              </Text>
                              <Image
                                source={require('../assets/icons/arrow.png')}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 10,
                              }}>
                              <View>
                                <Text
                                  style={{
                                    color: 'white',
                                    fontSize: 20,
                                    fontWeight: '500',
                                  }}>
                                  Analyse recording
                                </Text>
                                <Text
                                  style={{
                                    color: 'white',
                                    fontSize: 10,
                                    fontWeight: '500',
                                  }}>
                                  (Beta)
                                </Text>
                              </View>
                              <Image
                                source={require('../assets/icons/arrow.png')}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <View style={styles.completedContainer}>
                                <Text
                                  style={{
                                    color: '#2FE48D',
                                    fontSize: 16,
                                    fontWeight: '400',
                                  }}>
                                  Mark as completed
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        )}
                      </Fragment>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      )}
      {currentView === 'nintidoc' && (
        <NintiDoc back={() => setCurrentView('')} />
      )}
      {currentView === 'transcription' && (
        <Transcription
          back={() => {
            setStopTranscription(true);
            setCurrentView('nintidoc');
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 50,
  },
  linearGradient: {
    flex: 1,
  },
  container: {
    borderRadius: 20,
    backgroundColor: '#202020',
    padding: 10,
  },
  completedContainer: {
    borderRadius: 20,
    borderColor: '#2FE48D',
    borderWidth: 2,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
