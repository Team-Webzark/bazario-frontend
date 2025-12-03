import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NavigateToCustomerScreen = ({ navigation }) => {
  const customerPhone = '+919876543210';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Step 3: Deliver to Customer</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {/* Customer Icon */}
        <View style={styles.iconCircle}>
          <Ionicons name="person" size={64} color="#00C853" />
        </View>

        {/* Customer Details */}
        <Text style={styles.customerName}>Rahul Sharma</Text>
        <Text style={styles.address}>Flat 302, Green View Apartments</Text>
        <Text style={styles.address}>Civil Lines, Near Clock Tower</Text>
        <View style={styles.distanceRow}>
          <Ionicons name="location-sharp" size={16} color="#00C853" />
          <Text style={styles.distance}> 2.8 km away</Text>
        </View>

        {/* COD Alert */}
        <View style={styles.codAlert}>
          <Ionicons name="cash-outline" size={24} color="#D32F2F" style={{ marginRight: 12 }} />
          <Text style={styles.codText}>Cash to Collect: ₹250</Text>
        </View>

        {/* Special Instructions */}
        <View style={styles.instructionBox}>
          <Ionicons name="clipboard-outline" size={24} color="#333" style={{ marginRight: 12 }} />
          <Text style={styles.instructionText}>Leave at guard gate</Text>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => Linking.openURL(`tel:${customerPhone}`)}
        >
          <Ionicons name="call" size={24} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.callText}>Call Customer</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.reachedButton}
          onPress={() => navigation.navigate('DeliveryConfirmation')}
        >
          <Text style={styles.reachedText}>I've Reached Location</Text>
          <Ionicons name="arrow-forward" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateToCustomerScreen;

const styles = StyleSheet.create({
  // ... (same as before, icon styles adjusted)
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 40, alignItems: 'center' },
  iconCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', marginBottom: 24, elevation: 4 },
  customerName: { fontSize: 24, fontWeight: '800', color: '#333', marginBottom: 12, textAlign: 'center' },
  address: { fontSize: 16, color: '#757575', marginBottom: 4, textAlign: 'center' },
  distanceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  distance: { fontSize: 16, color: '#00C853', fontWeight: '600' },
  codAlert: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFE5E5', borderWidth: 2, borderColor: '#FF5252', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 20, marginBottom: 16, width: '100%' },
  codText: { fontSize: 18, fontWeight: '800', color: '#D32F2F', flex: 1 },
  instructionBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 16, marginBottom: 24, width: '100%', elevation: 1 },
  instructionText: { fontSize: 16, color: '#333', flex: 1 },
  callButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00C853', paddingVertical: 16, borderRadius: 28, width: '100%', elevation: 3 },
  callText: { fontSize: 18, fontWeight: '700', color: '#FFF' },
  bottomSection: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#E0E0E0' },
  reachedButton: { backgroundColor: '#00C853', paddingVertical: 18, borderRadius: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 3 },
  reachedText: { fontSize: 18, fontWeight: '700', color: '#FFF', marginRight: 8 },
});
