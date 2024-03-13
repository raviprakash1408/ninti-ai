/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import DateContainer from './DateContainer';
import JobCard from './JobCard';
import {jobDetails} from '../utils/JobDetails';

export default function Dashboard() {
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
                  <JobCard
                    key={index}
                    jobName={job.jobName}
                    progress={job.progress}
                  />
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
