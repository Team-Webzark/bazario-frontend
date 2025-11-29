// panels/customer/screens/AddressSelectionScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddressSelectionScreen({ navigation }) {
  const [addresses, setAddresses] = useState([
    { id: '1', type: 'Home', address: 'Flat 204, Skyline Apartments, Civil Lines, Bareilly', selected: true },
    { id: '2', type: 'Work', address: 'Office 302, IT Park, Bareilly', selected: false },
  ]);

  const selectAddress = (id) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      selected: addr.id === id
    })));
  };

  // Use existing LocationCaptureScreen for adding new address
  const handleAddNew = () => {
    navigation.navigate('LocationCapture', { 
        registrationData: {}, // Empty data for new address
        isNewAddress: true 
    });
  };

  const renderAddress = ({ item }) => (
    <TouchableOpacity 
      style={[styles.addressCard, item.selected && styles.selectedCard]} 
      onPress={() => selectAddress(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.typeRow}>
          <Ionicons 
            name={item.type === 'Home' ? 'home' : item.type === 'Work' ? 'briefcase' : 'location'} 
            size={20} 
            color={item.selected ? '#12783D' : '#6B7280'} 
          />
          <Text style={[styles.addressType, item.selected && styles.selectedText]}>{item.type}</Text>
        </View>
        <View style={styles.radioOuter}>
            {item.selected && <View style={styles.radioInner} />}
        </View>
      </View>
      <Text style={styles.addressText}>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Delivery Address</Text>
      </View>

      <FlatList
        data={addresses}
        renderItem={renderAddress}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <TouchableOpacity style={styles.addButton} onPress={handleAddNew}>
            <Ionicons name="add-circle-outline" size={24} color="#12783D" />
            <Text style={styles.addButtonText}>Add New Address</Text>
          </TouchableOpacity>
        }
      />

      {/* Proceed Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.proceedButton}
          onPress={() => navigation.navigate('Payment', { 
              selectedAddress: addresses.find(a => a.selected) 
          })}
        >
          <Text style={styles.proceedBtnText}>Proceed to Payment</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backBtn: { marginRight: 16 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#111827' },
  
  listContent: { padding: 20 },
  
  // Address Card
  addressCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {
    borderColor: '#12783D',
    backgroundColor: '#F0FDF4',
  },
  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeRow: { flexDirection: 'row', alignItems: 'center' },
  addressType: { fontWeight: '700', marginLeft: 8, fontSize: 16, color: '#4B5563' },
  selectedText: { color: '#12783D' },
  
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#12783D',
  },
  
  addressText: {
    color: '#6B7280',
    fontSize: 14,
    lineHeight: 22,
    marginLeft: 28, // Align with text above
  },
  
  // Add Button
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: '#12783D',
    borderRadius: 16,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  addButtonText: {
    color: '#12783D',
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 16,
  },
  
  // Footer
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  proceedButton: {
    backgroundColor: '#12783D',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#12783D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  proceedBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
