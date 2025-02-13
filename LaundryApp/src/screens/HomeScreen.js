import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import VendorCard from '../components/VendorCard';

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [service, setService] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Set the correct backend URL (adjust this for emulator vs real device)
  const BASE_URL = '';

  // Fetch user's current location
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          setLoading(false);
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      } catch (err) {
        setError('Failed to get location');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Search for vendors based on location or preferred location
  const searchVendors = async () => {
    setLoading(true);
    setError('');
    setVendors([]);

    let params = new URLSearchParams();
    let endpoint = '';

    if (preferredLocation.trim()) {
      endpoint = `${BASE_URL}/vendors/searchbylocation`;
      params.append('location', preferredLocation);
    } else if (location) {
      endpoint = `${BASE_URL}/vendors/search`;
      params.append('latitude', location.latitude);
      params.append('longitude', location.longitude);
    } else {
      setError('Please enable location or enter a preferred location.');
      setLoading(false);
      return;
    }

    if (service.trim()) {
      params.append('service', service);
    }

    console.log(`${endpoint}?${params.toString()}`);

    try {
      const response = await fetch(`${endpoint}?${params.toString()}`);
      const data = await response.json();
      console.log('Response:', data);
      setVendors(data);

      if (data.length === 0) {
        setError('No vendors found for the given search criteria.');
      }
    } catch (err) {
      setError('Failed to fetch vendors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter service (e.g., Wash)"
        value={service}
        onChangeText={setService}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter preferred location (e.g., Hyderabad)"
        value={preferredLocation}
        onChangeText={setPreferredLocation}
      />
      <Button title="Search" onPress={searchVendors} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={vendors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <VendorCard vendor={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 4, padding: 8, marginBottom: 16 },
  error: { color: 'red', marginBottom: 16, textAlign: 'center' },
});

export default HomeScreen;
