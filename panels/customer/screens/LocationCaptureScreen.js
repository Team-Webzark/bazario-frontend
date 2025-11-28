import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // Ensure installed

export default function LocationCaptureScreen({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 28.3670,
    longitude: 79.4304,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [address, setAddress] = useState('Civil Lines, Bareilly, UP');
  const [houseNo, setHouseNo] = useState('');

  const handleConfirm = () => {
    if (!houseNo) {
        alert("Please enter House / Flat No.");
        return;
    }
    // Save address logic here
    navigation.reset({ index: 0, routes: [{ name: 'CustomerTabs' }] });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />

      {/* --- MAP VIEW (Simulated) --- */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
        />
        
        {/* Center Fixed Pin */}
        <View style={styles.pinContainer}>
           <Ionicons name="location" size={40} color="#EA4335" />
           <View style={styles.pinShadow} />
        </View>

        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
           <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* --- BOTTOM SHEET FORM --- */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.bottomSheet}
      >
        <View style={styles.dragHandle} />
        
        <Text style={styles.sheetTitle}>Select Delivery Location</Text>
        
        <View style={styles.locationRow}>
           <Ionicons name="location-outline" size={20} color="#12783D" style={{ marginTop: 2 }} />
           <Text style={styles.detectedAddress}>{address}</Text>
        </View>
        
        <TouchableOpacity style={styles.changeBtn}>
           <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* House No Input */}
        <TextInput
          style={styles.input}
          placeholder="House / Flat / Block No."
          value={houseNo}
          onChangeText={setHouseNo}
        />

        {/* Landmark Input */}
        <TextInput
          style={styles.input}
          placeholder="Landmark (Optional)"
        />

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
           <Text style={styles.btnText}>Confirm Location</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  
  mapContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  map: { ...StyleSheet.absoluteFillObject },
  
  // Fixed Center Pin
  pinContainer: { alignItems: 'center', marginBottom: 40 }, // Offset to center tip
  pinShadow: { width: 10, height: 4, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 5, marginTop: 2 },

  backBtn: { position: 'absolute', top: 50, left: 20, backgroundColor: '#fff', padding: 10, borderRadius: 20, elevation: 5 },

  // Bottom Sheet
  bottomSheet: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, elevation: 20, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 10 },
  dragHandle: { width: 40, height: 5, backgroundColor: '#ddd', borderRadius: 2.5, alignSelf: 'center', marginBottom: 20 },
  
  sheetTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  
  locationRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  detectedAddress: { fontSize: 16, color: '#333', marginLeft: 8, lineHeight: 22, flex: 1 },
  
  changeBtn: { alignSelf: 'flex-end', marginBottom: 12 },
  changeText: { color: '#12783D', fontWeight: 'bold', fontSize: 14 },

  divider: { height: 1, backgroundColor: '#eee', marginBottom: 20 },

  input: { backgroundColor: '#F9F9F9', borderRadius: 12, padding: 16, marginBottom: 12, fontSize: 16, borderWidth: 1, borderColor: '#f0f0f0' },

  confirmBtn: { backgroundColor: '#12783D', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});



