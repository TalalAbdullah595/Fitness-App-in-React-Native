// import { View, Text, TouchableOpacity } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useLocalSearchParams, useRouter } from 'expo-router'
// import { fetchExercisesByBodypart } from './api/apihandler';
// import { StatusBar } from 'expo-status-bar';
// import { Image } from 'react-native';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import ExerciseList from './ExerciseList';
// import { ScrollView } from 'react-native-virtualized-view'

// export default function Exercises() {
//     const router = useRouter();
//     const [exercises, setExercises] = useState([]);
//     const item = useLocalSearchParams();
//     // console.log('got item: ', item);

//     useEffect(()=>{
//         if(item && typeof item.name === 'string') getExercises(item.name);
//     },[item]);

//     const getExercises = async (bodypart: string)=>{
//         let data = await fetchExercisesByBodypart(bodypart);
//         // console.log('got data: ', data);
//         setExercises(data);
//     }
//   return (
//     <ScrollView>
//         <StatusBar style="light" />
//         <Image 
//             source={{ uri: item.image as string }}
//             style={{width: wp(100), height: hp(45)}}
//             className="rounded-b-[40px]"
//         />
//         <TouchableOpacity
//             onPress={()=> router.back()}
//             className="bg-rose-500 mx-4 absolute flex justify-center items-center pr-1 rounded-full"
//             style={{height: hp(5.5), width: hp(5.5), marginTop: hp(7)}}
//         >
//                  <Ionicons name="caret-back-outline" size={hp(4)} color="white" />
//         </TouchableOpacity>

//         {/* exercises */}
//         <View className="mx-4 space-y-3 mt-4">
//             <Text style={{fontSize: hp(3)}} className="font-semibold text-neutral-700">
//                 {item.name} exercises
//             </Text>
//             <View className="mb-10">
//                 <ExerciseList data={exercises} />
//             </View>
//         </View>
//     </ScrollView>
//   )
// }





import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchExercisesByBodypart } from './api/apihandler';
import { StatusBar } from 'expo-status-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ExerciseList from './ExerciseList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Exercises() {
  const router = useRouter();
  const [exercises, setExercises] = useState([]);
  const item = useLocalSearchParams();

  useEffect(() => {
    if (item && typeof item.name === 'string') getExercises(item.name);
  }, [item]);

  const getExercises = async (bodypart: string) => {
    let data = await fetchExercisesByBodypart(bodypart);
    setExercises(data);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <StatusBar style="light" />
      
      <Image 
        source={{ uri: item.image as string }}
        style={styles.headerImage}
      />

      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Ionicons name="caret-back-outline" size={hp(4)} color="white" />
      </TouchableOpacity>

      {/* exercises */}
      <View style={styles.exercisesContainer}>
        <Text style={styles.headingText}>
          {item.name} exercises
        </Text>
        <View style={styles.exerciseListContainer}>
          <ExerciseList data={exercises} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  headerImage: {
    width: wp(100),
    height: hp(45),
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  backButton: {
    position: 'absolute',
    top: hp(7),
    left: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f43f5e', // rose-500
    borderRadius: 50,
    height: hp(5.5),
    width: hp(5.5),
    paddingRight: 1,
  },
  exercisesContainer: {
    marginHorizontal: wp(4),
    marginTop: hp(4),
  },
  headingText: {
    fontSize: hp(3),
    fontWeight: '600',
    color: '#4B5563', // text-neutral-700
    marginBottom: hp(2),
  },
  exerciseListContainer: {
    marginBottom: hp(10),
  },
});
