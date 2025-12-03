import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OrderRequestModal = ({ navigation }) => {
  const [seconds, setSeconds] = useState(45);
  // ... (timer logic same)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>NEW ORDER REQUEST</Text>

        {/* Timer Circle */}
        <View style={styles.timerCircle}>
          <Text style={styles.timerText}>00:{seconds.toString().padStart(2, '0')}</Text>
        </View>

        {/* Earnings */}
        <View style={styles.earningsBox}>
          <Text style={styles.earningsLabel}>Earnings</Text>
          <Text style={styles.earningsAmount}>₹45</Text>
        </View>

        {/* Details */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Ionicons name="storefront-outline" size={24} color="#333" style={styles.detailIcon} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Pickup</Text>
              <Text style={styles.detailValue}>Sharma Kirana</Text>
              <Text style={styles.detailDistance}>1.2 km away</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={24} color="#333" style={styles.detailIcon} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Drop</Text>
              <Text style={styles.detailValue}>Civil Lines</Text>
              <Text style={styles.detailDistance}>2 km away</Text>
            </View>
          </View>
        </View>

        <View style={styles.safetyRow}>
          <MaterialIcons name="security" size={16} color="#AAA" />
          <Text style={styles.safetyNote}> Park safely before accepting</Text>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.rejectText}>Reject</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => navigation.navigate('NavigateToShop')}
        >
          <Ionicons name="play" size={20} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.acceptText}>ACCEPT ORDER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OrderRequestModal;

// Styles update: remove emoji styles, add icon styles
const styles = StyleSheet.create({
  // ... (container, content, title, timerCircle, timerText, earningsBox styles same)
  container: { flex: 1, backgroundColor: '#1A1A1A' },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 40, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '800', color: '#FFF', letterSpacing: 1, marginBottom: 32 },
  timerCircle: { width: 160, height: 160, borderRadius: 80, borderWidth: 8, borderColor: '#FF6B6B', backgroundColor: 'rgba(255, 107, 107, 0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  timerText: { fontSize: 40, fontWeight: '800', color: '#FFF' },
  earningsBox: { alignItems: 'center', marginBottom: 24 },
  earningsLabel: { fontSize: 14, color: '#AAA', marginBottom: 4 },
  earningsAmount: { fontSize: 48, fontWeight: '900', color: '#00C853' },
  detailsCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, width: '100%', marginBottom: 16 },
  detailRow: { flexDirection: 'row', alignItems: 'center' },
  detailIcon: { marginRight: 16 },
  detailInfo: { flex: 1 },
  detailLabel: { fontSize: 12, color: '#757575', marginBottom: 2 },
  detailValue: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 2 },
  detailDistance: { fontSize: 13, color: '#00C853' },
  divider: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 16 },
  safetyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  safetyNote: { fontSize: 12, color: '#AAA' },
  buttonRow: { flexDirection: 'row', paddingHorizontal: 20, paddingBottom: 24, gap: 12 },
  rejectButton: { flex: 1, backgroundColor: '#2A2A2A', paddingVertical: 16, borderRadius: 28, alignItems: 'center' },
  rejectText: { fontSize: 16, fontWeight: '700', color: '#AAA' },
  acceptButton: { flex: 2, backgroundColor: '#00C853', paddingVertical: 16, borderRadius: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 4 },
  acceptText: { fontSize: 16, fontWeight: '800', color: '#FFF' },
});
