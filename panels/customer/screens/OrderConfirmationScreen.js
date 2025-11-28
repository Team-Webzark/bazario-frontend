import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  BackHandler
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function OrderConfirmationScreen({ navigation }) {
  
  // Prevent going back to Payment Screen
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('HomeTab');
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#12783D" barStyle="light-content" />
      
      <View style={styles.content}>
        <View style={styles.successIcon}>
           <Ionicons name="checkmark" size={60} color="#fff" />
        </View>
        
        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.subTitle}>Your order #12345 has been confirmed.</Text>
        <Text style={styles.estimate}>Arriving in 45 mins</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.trackButton}
          onPress={() => navigation.navigate('OrderTracking')}
        >
          <Text style={styles.trackText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.homeButton}
          onPress={() => navigation.navigate('HomeTab')}
        >
          <Text style={styles.homeText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 24 },
  
  content: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  successIcon: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#12783D', justifyContent: 'center', alignItems: 'center', marginBottom: 24, elevation: 5 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#12783D', marginBottom: 8 },
  subTitle: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 8 },
  estimate: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 16 },

  footer: { width: '100%', marginBottom: 20 },
  trackButton: { backgroundColor: '#12783D', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 16 },
  trackText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  homeButton: { padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#ccc' },
  homeText: { color: '#666', fontWeight: 'bold', fontSize: 16 },
});



