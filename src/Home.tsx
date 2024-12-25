import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import BodyParts from './BodyParts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e3e3e3' }}>
      <StatusBar style="dark" />

      <View style={styles.mainContainer}>
        {/* Punchline */}
        <View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, { color: '#333' }]}>READY TO</Text>
            <Text style={[styles.text, { color: '#e53e3e' }]}>WORKOUT</Text>
          </View>
        </View>

        {/* Image */}
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/slide3.png')} style={styles.image} />
        </View>

        {/* Body parts list */}
        <View style={styles.bodyPartsList}>
          <BodyParts />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between', // This places content at top and bottom
    paddingHorizontal: wp(3), // For consistent padding
  },
  textContainer: {
    marginBottom: hp(3),
  },
  text: {
    fontSize: hp(4.5),
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: wp(95), // Adjust width
    height: hp(25), // Adjust height
    borderRadius: 25, // Rounded corners
  },
  bodyPartsList: {
    flex: 1, // This can be used for adding a list of body parts or other content later
  },
});
