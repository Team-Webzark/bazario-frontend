import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Status */}
      <View style={styles.header}>
        <View style={[styles.statusBadge, isOnline && styles.statusBadgeOnline]}>
          <View style={[styles.statusDot, isOnline && styles.statusDotOnline]} />
          <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</Text>
        </View>
      </View>

      {/* Center Content */}
      <View style={styles.centerContent}>
        {isOnline ? (
          <>
            <View style={styles.radarAnimation}>
              <View style={[styles.radarRing, styles.ring1]} />
              <View style={[styles.radarRing, styles.ring2]} />
              <View style={[styles.radarRing, styles.ring3]} />
              <Ionicons name="navigate-circle" size={64} color="#00C853" />
            </View>
            <Text style={styles.searchingText}>Searching for orders...</Text>
            <Text style={styles.waitingText}>We'll notify you when order arrives</Text>
          </>
        ) : (
          <>
            <View style={styles.offlineIcon}>
              <MaterialIcons name="moped" size={64} color="#757575" />
            </View>
            <Text style={styles.offlineTitle}>You are offline</Text>
            <Text style={styles.offlineSubtitle}>Slide below to start receiving orders</Text>
          </>
        )}
      </View>

      {/* Bottom Card */}
      <View style={styles.bottomCard}>
        {!isOnline ? (
          <>
            <TouchableOpacity
              style={styles.goOnlineButton}
              onPress={() => {
                setIsOnline(true);
                setTimeout(() => navigation.navigate('OrderRequestModal'), 2000);
              }}
            >
              <Text style={styles.goOnlineText}>Slide to Go Online</Text>
            </TouchableOpacity>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Today's Earnings</Text>
                <Text style={styles.statValue}>₹0</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Orders</Text>
                <Text style={styles.statValue}>0</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.onlineStats}>
            <View style={styles.statBox}>
              <Text style={styles.statBoxLabel}>Earnings:</Text>
              <Text style={styles.statBoxValue}>₹450</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statBoxLabel}>Trips:</Text>
              <Text style={styles.statBoxValue}>8</Text>
            </View>
            
            <TouchableOpacity
              style={styles.goOfflineButton}
              onPress={() => setIsOnline(false)}
            >
              <Text style={styles.goOfflineText}>Go Offline</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#00C853" />
          <Text style={[styles.navLabel, { color: '#00C853' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('DeliveryEarnings')}
        >
          <Ionicons name="wallet-outline" size={24} color="#757575" />
          <Text style={styles.navLabel}>Earnings</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('DeliveryProfile')}
        >
          <Ionicons name="person-outline" size={24} color="#757575" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('DeliveryHelp')}
        >
          <Ionicons name="help-circle-outline" size={24} color="#757575" />
          <Text style={styles.navLabel}>Help</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  // ... (Same styles as before)
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { paddingHorizontal: 20, paddingVertical: 16, alignItems: 'flex-end' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E0E0E0', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  statusBadgeOnline: { backgroundColor: '#C8E6C9' },
  statusDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#757575', marginRight: 8 },
  statusDotOnline: { backgroundColor: '#00C853' },
  statusText: { fontSize: 14, fontWeight: '600', color: '#333' },
  centerContent: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  offlineIcon: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', marginBottom: 24, elevation: 4 },
  offlineTitle: { fontSize: 28, fontWeight: '800', color: '#333', marginBottom: 8 },
  offlineSubtitle: { fontSize: 16, color: '#757575', textAlign: 'center' },
  radarAnimation: { width: 200, height: 200, alignItems: 'center', justifyContent: 'center', marginBottom: 32, position: 'relative' },
  radarRing: { position: 'absolute', borderRadius: 9999, borderWidth: 2, borderColor: '#00C853', borderStyle: 'dashed' },
  ring1: { width: 100, height: 100 },
  ring2: { width: 150, height: 150, opacity: 0.6 },
  ring3: { width: 200, height: 200, opacity: 0.3 },
  searchingText: { fontSize: 24, fontWeight: '700', color: '#333', marginBottom: 8 },
  waitingText: { fontSize: 14, color: '#757575', textAlign: 'center' },
  bottomCard: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 8 },
  goOnlineButton: { backgroundColor: '#00C853', paddingVertical: 18, borderRadius: 28, alignItems: 'center', marginBottom: 20, elevation: 3 },
  goOnlineText: { fontSize: 18, fontWeight: '700', color: '#FFF' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  statItem: { alignItems: 'center', flex: 1 },
  statLabel: { fontSize: 14, color: '#757575', marginBottom: 4 },
  statValue: { fontSize: 24, fontWeight: '800', color: '#333' },
  divider: { width: 1, height: 40, backgroundColor: '#E0E0E0' },
  onlineStats: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  statBox: { alignItems: 'center' },
  statBoxLabel: { fontSize: 14, color: '#757575', marginBottom: 4 },
  statBoxValue: { fontSize: 28, fontWeight: '800', color: '#00C853' },
  goOfflineButton: { backgroundColor: '#F5F5F5', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: '#E0E0E0' },
  goOfflineText: { fontSize: 14, fontWeight: '600', color: '#757575' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#FFF', paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#E0E0E0' },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  navLabel: { fontSize: 11, color: '#757575', fontWeight: '600', marginTop: 4 },
});
