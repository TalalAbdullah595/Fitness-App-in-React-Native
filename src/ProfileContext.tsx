import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileContextProps {
  profile: {
    image: string | null;
    name: string;
    age: string;
  };
  setProfile: (profile: { image: string | null; name: string; age: string }) => void;
}

const ProfileContext = createContext<ProfileContextProps>({
  profile: { image: null, name: '', age: '' },
  setProfile: () => {},
});

interface ProfileProviderProps {
  children: React.ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profile, setProfileState] = useState<{ image: string | null; name: string; age: string }>({
    image: null,
    name: '',
    age: '',
  });

  useEffect(() => {
    const loadProfile = async () => {
      const storedProfile = await AsyncStorage.getItem('profile');
      if (storedProfile) {
        setProfileState(JSON.parse(storedProfile));
      }
    };
    loadProfile();
  }, []);

  const setProfile = async (newProfile: { image: string | null; name: string; age: string }) => {
    setProfileState(newProfile);
    await AsyncStorage.setItem('profile', JSON.stringify(newProfile));
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;