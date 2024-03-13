/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {JobDetails} from '../utils/JobDetails';
import {Bar} from 'react-native-progress';

const JobCard = ({jobName, progress}: JobDetails) => {
  const decimalProgress = progress / 100;
  return (
    <View
      style={{
        height: 154,
        borderRadius: 20,
        backgroundColor: '#202020',
        padding: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          height: '100%',
          justifyContent: 'space-between',
        }}>
        <View style={{width: 3, height: '100%', backgroundColor: '#2FE48D'}} />
        <View style={{justifyContent: 'space-between', paddingVertical: 10}}>
          <Text style={{fontSize: 20, fontWeight: '500', color: 'white'}}>
            {jobName}
          </Text>
          <View style={{gap: 10}}>
            <Bar
              progress={decimalProgress}
              width={300}
              height={10}
              color="#59CFA5"
              unfilledColor="#ccc"
              borderWidth={0}
            />
            <Text style={{fontSize: 16, fontWeight: '400', color: 'white'}}>
              Sun, 15 Jan 2024
            </Text>
          </View>
        </View>
        <View style={{gap: 5}}>
          <View style={styles.dots} />
          <View style={styles.dots} />
          <View style={styles.dots} />
        </View>
      </View>
    </View>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  dots: {
    width: 4,
    height: 4,
    // @ts-ignore
    borderRadius: '50%',
    backgroundColor: 'white',
  },
});
