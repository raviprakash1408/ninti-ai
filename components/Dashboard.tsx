/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {Fragment} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import DateContainer from './DateContainer';
import JobCard from './JobCard';
import {jobDetails} from '../utils/JobDetails';
import useSubMenuedStore from '../store/subMenuStore';

export default function Dashboard() {
  const {showMenu, setShowMenu} = useSubMenuedStore();
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#000000', '#000000', '#071f16']}
        start={{x: 0.5, y: 0.5}}
        style={styles.linearGradient}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingVertical: 50,
          }}>
          <View style={{flex: 1, gap: 6}}>
            <View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: '400'}}>
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
                      <View
                        style={{
                          borderRadius: 20,
                          backgroundColor: '#202020',
                          padding: 10,
                        }}>
                        <TouchableOpacity
                          style={{padding: 10}}
                          onPress={() => setShowMenu(0)}>
                          <Text style={{color: 'white', fontSize: 20}}>X</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 10,
                          }}>
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
                          <View
                            style={{
                              borderRadius: 20,
                              borderColor: '#2FE48D',
                              borderWidth: 2,
                              height: 46,
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 10,
                            }}>
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
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});
