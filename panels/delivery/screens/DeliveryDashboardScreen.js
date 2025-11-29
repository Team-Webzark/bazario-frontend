import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButton from '../../universalLogins/components/BackButton';

export default function DeliveryDashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} fallbackRoute="UniversalSignIn" />
      <View style={styles.header}>
        <Ionicons name="bicycle" size={60} color="#12783D" />
        <Text style={styles.title}>Delivery Partner</Text>
        <Text style={styles.subtitle}>Welcome to your Dashboard</Text>
      </View>
      <Text style={styles.info}>Delivery partner functionality coming soon!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#12783D',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  info: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

