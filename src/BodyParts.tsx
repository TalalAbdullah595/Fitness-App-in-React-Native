import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { bodyParts } from './constants/SliderImages';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function BodyParts() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { fontSize: hp(3) }]}>Exercises</Text>

      <FlatList
        data={bodyParts}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item, index }) => <BodyPartCard router={router} index={index} item={item} />}
      />
    </View>
  );
}

interface BodyPart {
  name: string;
  image: any; // You can replace 'any' with the specific type of the image if known
}

const BodyPartCard = ({ item, router, index }: { item: BodyPart; index: number; router: any }) => {
  return (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 200).springify()}>
      <TouchableOpacity style={[styles.cardContainer, { width: wp(45), height: wp(60) }]}
      onPress={()=> router.push({pathname: '/exercises', params: item})}
      >
        <Image
          source={item.image}
          resizeMode="cover"
          style={[styles.cardImage, { width: wp(40), height: wp(60) }]}
        />
        <Text style={[styles.cardText, { fontSize: hp(2.3) }]}>{item?.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16, // `mx-4` equivalent
  },
  heading: {
    paddingTop: 10,
    fontWeight: 'bold', 
    color: '#4B5563', // text-neutral-700
  },
  listContent: {
    paddingBottom: 50,
    paddingTop: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    justifyContent: 'flex-end', // `flex justify-end`
    padding: 16, // `p-4`
    marginBottom: 16, // `mb-4`
    overflow: 'hidden',
  },
  cardImage: {
    borderRadius: 35, 
    position: 'absolute',
  },

  cardText: {
    color: '#FFFFFF', // `text-white`
    fontWeight: '600', // `font-semibold`
    textAlign: 'center', // `text-center`
    letterSpacing: 0.5, // `tracking-wide`
  },
});
