import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as ExpoLocation from 'expo-location';
import { LocationObject } from 'expo-location';

  const Location: React.FC = () => {
    const [location, setLocation] = useState<LocationObject | null>(null);
    // const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [mapRegion, setMapRegion] = useState({
      latitude: 24.933467,
      longitude: 67.087592,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    const gymLocations = [
      { latitude: 24.81460634929076, longitude: 67.02064751419691 },
      { latitude: 24.779664508174605, longitude: 67.05419300013885 },
      { latitude: 24.932614009534547, longitude: 67.08727968061392 },
    ];
    useEffect(() => {
      (async () => {
        // Request location permissions
        const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
          return;
        }
  
        // Get the user's current location
        const userLocation = await ExpoLocation.getCurrentPositionAsync({});
        setLocation(userLocation);
  
        // Update the map region to focus on the user's location
        setMapRegion({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      })();
    }, []);
  
    return (
      <View style={styles.container}>
        <MapView style={styles.map} region={mapRegion}>
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="You are here"
            />
          )}
           {gymLocations.map((loc, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
            title={`TriFit Gym Location ${index + 1}`}
          />
        ))}
        </MapView>
      </View>
    );
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Location;
