import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ProfileContext from './ProfileContext';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  const { profile, setProfile } = useContext(ProfileContext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [image, setImage] = useState(profile.image);
  const [showRetake, setShowRetake] = useState(false);

  useEffect(() => {
    setName(profile.name);
    setAge(profile.age);
    setImage(profile.image);
  }, [profile]);

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
      setShowRetake(true);
    }
  };

  const saveProfile = () => {
    setProfile({ image, name, age });
    setEditing(false);
    setShowRetake(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <Image source={require('.././assets/default.png')} style={styles.profileImage} />
        )}
      </TouchableOpacity>
      {showRetake && (
        <View style={styles.buttonContainer}>
          <Button title="Retake" onPress={pickImage} />
          <Button title="Set Profile Image" onPress={saveProfile} />
        </View>
      )}
      <Text style={styles.label}>Name: {name}</Text>
      <Text style={styles.label}>Age: {age}</Text>
      <TouchableOpacity style={styles.editIcon} onPress={() => setEditing(true)}>
        <Ionicons name="create" size={24} color="black" />
      </TouchableOpacity>
      {editing && (
        <View style={styles.editContainer}>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
          <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Age" keyboardType="numeric" />
          <Button title="Save Profile" onPress={saveProfile} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  editContainer: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
});