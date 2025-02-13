import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VendorCard = ({ vendor }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{vendor.name}</Text>
      <Text style={styles.location}>{vendor.location}</Text>
      <Text style={styles.services}>{vendor.services.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  services: {
    fontSize: 14,
    color: '#888',
  },
});

export default VendorCard;