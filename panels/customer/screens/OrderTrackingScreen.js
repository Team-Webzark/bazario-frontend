import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

export default function OrderTrackingScreen({ navigation }) {
  // --- MOCK DATA ---
  const [driverLocation, setDriverLocation] = useState({
    latitude: 28.3670, // Approx Civil Lines, Bareilly
    longitude: 79.4304,
  });
  
  const [customerLocation] = useState({
    latitude: 28.3630,
    longitude: 79.4350,
  });

  const [statusSteps] = useState([
    { title: 'Order Placed', time: '2:30 PM', completed: true },
    { title: 'Items Picked', time: '2:45 PM', completed: true },
    { title: 'Out for Delivery', time: '3:00 PM', completed: true, current: true },
    { title: 'Order Delivered', time: 'Est 3:15 PM', completed: false },
  ]);

  // Simulate Driver Movement (Simple Animation)
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation((prev) => ({
        latitude: prev.latitude - 0.0001,
        longitude: prev.longitude + 0.0001,
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCallDriver = () => {
    Linking.openURL(`tel:9876543210`);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />

      {/* --- MAP SECTION (Top Half) --- */}
      <View style={styles.mapContainer}>
        {/* Back Button Overlay */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.navigate('HomeTab')}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <MapView
          provider={PROVIDER_GOOGLE} // Remove if using Apple Maps on iOS
          style={styles.map}
          initialRegion={{
            latitude: 28.3650,
            longitude: 79.4320,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {/* Driver Marker */}
          <Marker coordinate={driverLocation} title="Delivery Partner">
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3063/3063823.png' }} style={{ width: 40, height: 40 }} />
          </Marker>

          {/* Customer Marker */}
          <Marker coordinate={customerLocation} title="Your Location">
             <Ionicons name="location" size={40} color="#EA4335" />
          </Marker>

          {/* Simple Line Route */}
          <Polyline 
            coordinates={[driverLocation, customerLocation]} 
            strokeWidth={4}
            strokeColor="#12783D"
            lineDashPattern={[1]}
          />
        </MapView>
      </View>

      {/* --- STATUS SHEET (Bottom Half) --- */}
      <View style={styles.bottomSheet}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          
          {/* Handle Bar */}
          <View style={styles.handleBar} />

          {/* Driver Info Card */}
          <View style={styles.driverCard}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
              style={styles.driverImage} 
            />
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>Ramesh Kumar</Text>
              <Text style={styles.driverRating}>⭐ 4.8 • UP-25-AB-1234</Text>
            </View>
            <TouchableOpacity style={styles.callButton} onPress={handleCallDriver}>
              <Ionicons name="call" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.divider} />

          {/* ETA Header */}
          <View style={styles.etaHeader}>
            <Text style={styles.etaTitle}>Arriving in 12 mins</Text>
            <Text style={styles.etaSub}>Your order is on the way</Text>
          </View>

          {/* Vertical Timeline */}
          <View style={styles.timelineContainer}>
            {statusSteps.map((step, index) => (
              <View key={index} style={styles.timelineRow}>
                {/* Left: Line & Dot */}
                <View style={styles.timelineLeft}>
                  <View style={[
                    styles.dot, 
                    step.completed ? styles.dotActive : styles.dotInactive,
                    step.current && styles.dotPulse
                  ]}>
                    {step.completed && <Ionicons name="checkmark" size={10} color="#fff" />}
                  </View>
                  {index < statusSteps.length - 1 && (
                    <View style={[styles.line, step.completed ? styles.lineActive : styles.lineInactive]} />
                  )}
                </View>

                {/* Right: Content */}
                <View style={styles.timelineContent}>
                  <Text style={[styles.stepTitle, step.completed && styles.textActive]}>{step.title}</Text>
                  <Text style={styles.stepTime}>{step.time}</Text>
                </View>
              </View>
            ))}
          </View>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  
  // Map Styles
  mapContainer: { height: height * 0.55, width: '100%' },
  map: { ...StyleSheet.absoluteFillObject },
  backButton: { 
    position: 'absolute', top: 50, left: 20, zIndex: 10,
    backgroundColor: '#fff', padding: 8, borderRadius: 20, elevation: 5 
  },

  // Bottom Sheet Styles
  bottomSheet: { 
    flex: 1, backgroundColor: '#fff', marginTop: -20, 
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 20, paddingTop: 12, elevation: 10
  },
  handleBar: { 
    width: 40, height: 4, backgroundColor: '#ddd', borderRadius: 2, 
    alignSelf: 'center', marginBottom: 20 
  },
  
  // Driver Card
  driverCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  driverImage: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  driverInfo: { flex: 1 },
  driverName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  driverRating: { fontSize: 12, color: '#666', marginTop: 2 },
  callButton: { 
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#12783D', 
    justifyContent: 'center', alignItems: 'center', elevation: 2 
  },
  
  divider: { height: 1, backgroundColor: '#F0F0F0', marginBottom: 20 },

  // ETA
  etaHeader: { marginBottom: 24 },
  etaTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  etaSub: { fontSize: 14, color: '#12783D', fontWeight: '600' },

  // Timeline
  timelineContainer: { paddingLeft: 4 },
  timelineRow: { flexDirection: 'row', minHeight: 60 },
  timelineLeft: { alignItems: 'center', width: 24, marginRight: 16 },
  
  dot: { width: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center', borderWidth: 2 },
  dotActive: { backgroundColor: '#12783D', borderColor: '#12783D' },
  dotInactive: { backgroundColor: '#fff', borderColor: '#ccc' },
  dotPulse: { borderWidth: 4, borderColor: '#A0CFA0' }, // Simple visual pulse effect
  
  line: { width: 2, flex: 1, marginVertical: 4 },
  lineActive: { backgroundColor: '#12783D' },
  lineInactive: { backgroundColor: '#eee' },

  timelineContent: { flex: 1, paddingTop: -2 },
  stepTitle: { fontSize: 16, color: '#888', fontWeight: '500' },
  textActive: { color: '#333', fontWeight: 'bold' },
  stepTime: { fontSize: 12, color: '#999', marginTop: 2 },
});



