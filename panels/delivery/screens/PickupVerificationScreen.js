import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ... (MOCK_ITEMS logic same)

const PickupVerificationScreen = ({ navigation }) => {
  // ... (state and toggle logic same)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order #4455</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Alert Banner */}
      <View style={styles.alertBanner}>
        <Ionicons name="alert-circle" size={20} color="#333" style={{ marginRight: 8 }} />
        <Text style={styles.alertText}>Check expiry date for Milk</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Verify Items ({items.length})</Text>
        
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemRow}
            onPress={() => toggleItem(item.id)}
          >
            <View style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
              {item.checked && <Ionicons name="checkmark" size={18} color="#FFF" />}
            </View>
            <Text style={[styles.itemName, item.checked && styles.itemNameChecked]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.uploadButton}>
          <Ionicons name="camera-outline" size={20} color="#333" style={{ marginRight: 8 }} />
          <Text style={styles.uploadText}>Upload Bill Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.confirmButton, !allChecked && styles.confirmButtonDisabled]}
          onPress={() => allChecked && navigation.navigate('NavigateToCustomer')}
          disabled={!allChecked}
        >
          <Text style={styles.confirmText}>
            {allChecked ? 'Confirm Pickup' : 'Check all items first'}
          </Text>
          {allChecked && <Ionicons name="arrow-forward" size={24} color="#FFF" />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PickupVerificationScreen;

const styles = StyleSheet.create({
  // ... (styles largely the same, adjusting icons)
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  alertBanner: { backgroundColor: '#FFD54F', flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, marginHorizontal: 16, marginTop: 16, borderRadius: 12 },
  alertText: { fontSize: 14, fontWeight: '600', color: '#333', flex: 1 },
  scrollContainer: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 12 },
  itemRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingVertical: 16, paddingHorizontal: 16, marginBottom: 8, borderRadius: 12, elevation: 1 },
  checkbox: { width: 28, height: 28, borderRadius: 6, borderWidth: 2, borderColor: '#CCC', marginRight: 12, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: '#00C853', borderColor: '#00C853' },
  itemName: { fontSize: 16, color: '#333', flex: 1 },
  itemNameChecked: { textDecorationLine: 'line-through', color: '#999' },
  bottomSection: { padding: 16, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#E0E0E0' },
  uploadButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5', paddingVertical: 14, borderRadius: 28, marginBottom: 12, borderWidth: 2, borderColor: '#E0E0E0' },
  uploadText: { fontSize: 16, fontWeight: '600', color: '#333' },
  confirmButton: { backgroundColor: '#00C853', paddingVertical: 18, borderRadius: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation: 3 },
  confirmButtonDisabled: { backgroundColor: '#E0E0E0' },
  confirmText: { fontSize: 18, fontWeight: '700', color: '#FFF', marginRight: 8 },
});
