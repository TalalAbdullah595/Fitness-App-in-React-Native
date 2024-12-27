// import { View, Text, FlatList, TouchableOpacity } from 'react-native'
// import React from 'react'
// import { useRouter } from 'expo-router'
// import { Image } from 'expo-image';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import Animated, { FadeInDown } from 'react-native-reanimated';

// interface ExerciseListProps {
//   data: ExerciseItem[];
// }

// export default function ExerciseList({data}: ExerciseListProps) {
//     const router = useRouter();
//   return (
//     <View>
//       <FlatList
//         data={data}
//         numColumns={2}
//         keyExtractor={item=> item.name}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{paddingBottom: 60, paddingTop: 20}}
//         columnWrapperStyle={{
//             justifyContent: 'space-between'
//         }}
//         renderItem={({item, index})=> <ExerciseCard router={router} index={index} item={item} />}
//       />
//     </View>
//   )
// }



// interface ExerciseItem {
//     name: string;
//     gifUrl: string;
//     [key: string]: any;
// }

// const ExerciseCard = ({item, router, index}: {item: ExerciseItem, router: any, index: number})=> {
//     return (
//         <Animated.View entering={FadeInDown.duration(400).delay(index*200).springify()}>
//             <TouchableOpacity onPress={()=> router.push({pathname: '/exerciseDetails', params: item})} className="flex py-3 space-y-2">
//                 <View  className="bg-white shadow rounded-[25px]">
//                     <Image
//                         source={{uri: item.gifUrl}}
//                         contentFit='cover'
//                         style={{width: wp(44), height: wp(52)}}
//                         className="rounded-[25px]"
//                     />
//                 </View>

//                 <Text  
//                     style={{fontSize: hp(1.7)}}
//                     className="text-neutral-700 font-semibold ml-1  tracking-wide"
//                 >
//                     {
//                         item?.name?.length>20? item.name.slice(0,20)+'...': item.name
//                     }
//                 </Text>
//             </TouchableOpacity>
//         </Animated.View>
//     )
// }






import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface ExerciseListProps {
  data: ExerciseItem[];
}

export default function ExerciseList({ data }: ExerciseListProps) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item, index }) => <ExerciseCard router={router} index={index} item={item} />}
      />
    </View>
  );
}

interface ExerciseItem {
  name: string;
  gifUrl: string;
  [key: string]: any;
}

const ExerciseCard = ({ item, router, index }: { item: ExerciseItem; router: any; index: number }) => {
  return (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 200).springify()}>
      <TouchableOpacity
        onPress={() => router.push({ pathname: '/exerciseDetails', params: item })}
        style={styles.cardContainer}
      >
        <View style={styles.card}>
          <Image
            source={{ uri: item.gifUrl }}
            contentFit="cover"
            style={styles.image}
          />
        </View>

        <Text style={styles.text}>
          {item?.name?.length > 20 ? item.name.slice(0, 20) + '...' : item.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    paddingBottom: 60,
    paddingTop: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 25,
  },
  image: {
    width: wp(44),
    height: wp(52),
    borderRadius: 25,
  },
  text: {
    fontSize: hp(1.7),
    color: '#4B5563', // text-neutral-700
    fontWeight: '600',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
});

