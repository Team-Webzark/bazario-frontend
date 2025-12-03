import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const NavigateToShopScreen = ({ navigation }) => {
  const shopPhone = '+919876543210';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Step 1: Go to Shop</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {/* Shop Icon */}
        <View style={styles.iconCircle}>
          <Ionicons name="storefront" size={64} color="#00C853" />
        </View>

        {/* Shop Details */}
        <Text style={styles.shopName}>Sharma General Store</Text>
        <Text style={styles.address}>Civil Lines, Near Clock Tower</Text>
        <View style={styles.distanceRow}>
          <Ionicons name="location-sharp" size={16} color="#00C853" />
          <Text style={styles.distance}> 1.2 km away</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => Linking.openURL(`tel:${shopPhone}`)}
          >
            <Ionicons name="call" size={20} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={styles.callText}>Call Shop</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.directionButton}>
            <MaterialIcons name="directions" size={20} color="#00C853" style={{ marginRight: 8 }} />
            <Text style={styles.directionText}>Get Directions</Text>
          </TouchableOpacity>
        </View>

        {/* Order Details */}
        <View style={styles.orderCard}>
          <Text style={styles.orderLabel}>Order #4455</Text>
          <Text style={styles.orderItems}>5 items to pickup</Text>
          <View style={styles.orderMeta}>
            <Ionicons name="time-outline" size={16} color="#757575" style={{ marginRight: 4 }} />
            <Text style={styles.metaText}>Expected time: 15 mins</Text>
          </View>
        </View>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.reachedButton}
          onPress={() => navigation.navigate('PickupVerification')}
        >
          <Text style={styles.reachedText}>I've Reached Shop</Text>
          <Ionicons name="arrow-forward" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateToShopScreen;

const styles = StyleSheet.create({
  // ... (container, header styles same)
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 40, alignItems: 'center' },
  iconCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', marginBottom: 24, elevation: 4 },
  shopName: { fontSize: 24, fontWeight: '800', color: '#333', marginBottom: 8, textAlign: 'center' },
  address: { fontSize: 16, color: '#757575', marginBottom: 8, textAlign: 'center' },
  distanceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  distance: { fontSize: 16, color: '#00C853', fontWeight: '600' },
  actionButtons: { flexDirection: 'row', gap: 12, marginBottom: 32, width: '100%' },
  callButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00C853', paddingVertical: 14, borderRadius: 28, elevation: 2 },
  callText: { fontSize: 16, fontWeight: '700', color: '#FFF' },
  directionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF', paddingVertical: 14, borderRadius: 28, borderWidth: 2, borderColor: '#00C853' },
  directionText: { fontSize: 16, fontWeight: '700', color: '#00C853' },
  orderCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, width: '100%', elevation: 2 },
  orderLabel: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 4 },
  orderItems: { fontSize: 16, color: '#757575', marginBottom: 12 },
  orderMeta: { flexDirection: 'row', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  metaText: { fontSize: 14, color: '#757575' },
  bottomSection: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#E0E0E0' },
  reachedButton: { backgroundColor: '#00C853', paddingVertical: 18, borderRadius: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 3 },
  reachedText: { fontSize: 18, fontWeight: '700', color: '#FFF', marginRight: 8 },
});
