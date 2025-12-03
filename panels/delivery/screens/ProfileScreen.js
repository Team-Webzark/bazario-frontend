import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>RK</Text>
          </View>
          <Text style={styles.name}>Ravi Kumar</Text>
          <Text style={styles.limit}>Cash Limit: ₹2000</Text>
        </View>

        {/* Floating Cash */}
        <View style={styles.cashCard}>
          <Text style={styles.cashTitle}>Floating Cash</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '42%' }]} />
          </View>
          <View style={styles.cashRow}>
            <View>
              <Text style={styles.cashValue}>₹850</Text>
              <Text style={styles.cashLimit}>Limit: ₹2000</Text>
            </View>
            <TouchableOpacity style={styles.depositButton}>
              <Text style={styles.depositText}>Deposit Cash</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Vehicle Details */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Vehicle Details</Text>
          <View style={styles.infoRow}>
            <MaterialIcons name="two-wheeler" size={20} color="#666" style={{ marginRight: 8 }} />
            <Text style={styles.infoText}>Bike: Splendor (UP65C1234)</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="card-outline" size={20} color="#666" style={{ marginRight: 8 }} />
            <Text style={styles.infoText}>License: DL1234567</Text>
          </View>
        </View>

        {/* Shift Timer */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Shift Timer</Text>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={32} color="#00C853" style={{ marginRight: 8 }} />
            <Text style={styles.timerText}>04:30:15</Text>
          </View>
          <Text style={styles.timerSubtext}>Time remaining in shift</Text>
        </View>

        {/* Actions */}
        <View style={styles.infoCard}>
          <TouchableOpacity 
            style={styles.actionRow}
            onPress={() => navigation.navigate('DeliveryHelp')}
          >
            <Ionicons name="help-circle-outline" size={24} color="#333" style={{ marginRight: 12 }} />
            <Text style={styles.actionText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionRow}>
            <Ionicons name="log-out-outline" size={24} color="#FF5252" style={{ marginRight: 12 }} />
            <Text style={[styles.actionText, { color: '#FF5252' }]}>Logout</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  // ... (styles same, added infoRow)
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  profileHeader: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, alignItems: 'center', marginBottom: 16, elevation: 2 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#00C853', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { fontSize: 32, fontWeight: '800', color: '#FFF' },
  name: { fontSize: 20, fontWeight: '700', color: '#333', marginBottom: 4 },
  limit: { fontSize: 14, color: '#666' },
  cashCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, marginBottom: 16, elevation: 1 },
  cashTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 12 },
  progressBar: { height: 10, backgroundColor: '#E0E0E0', borderRadius: 5, overflow: 'hidden', marginBottom: 12 },
  progressFill: { height: '100%', backgroundColor: '#00C853', borderRadius: 5 },
  cashRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cashValue: { fontSize: 24, fontWeight: '800', color: '#333', marginBottom: 2 },
  cashLimit: { fontSize: 12, color: '#999' },
  depositButton: { backgroundColor: '#00C853', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  depositText: { fontSize: 14, fontWeight: '700', color: '#FFF' },
  infoCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, marginBottom: 12, elevation: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  infoText: { fontSize: 15, color: '#666' },
  timerText: { fontSize: 32, fontWeight: '800', color: '#00C853' },
  timerSubtext: { fontSize: 13, color: '#999', marginTop: 4 },
  actionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  actionText: { fontSize: 16, color: '#333', flex: 1, fontWeight: '500' },
});
