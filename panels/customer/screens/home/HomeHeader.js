// panels/customer/components/Home/HomeHeader.js

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  FlatList,
  Dimensions,
  Pressable // Use Pressable for better touch handling
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');

export default function HomeHeader({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  
  const [activeLocation, setActiveLocation] = useState({
    id: '1',
    type: 'Home',
    address: 'Civil Lines, Bareilly'
  });

  const savedAddresses = [
    { id: '1', type: 'Home', address: 'Civil Lines, Bareilly', fullAddress: 'Flat 204, Skyline Apts' },
    { id: '2', type: 'Work', address: 'IT Park, Bareilly', fullAddress: 'Office 302, Tech Hub' },
    { id: '3', type: 'Other', address: 'Model Town, Bareilly', fullAddress: 'House No. 55' },
  ];

  const handleSelectAddress = (item) => {
    setActiveLocation(item);
    setModalVisible(false);
  };

  const handleAddNew = () => {
    setModalVisible(false);
    navigation.navigate('LocationCapture', { isNewAddress: true });
  };

  // Navigate to Search Screen
  const handleSearchPress = () => {
    navigation.navigate('Search'); // Assuming 'Search' is the route name for SearchScreen
  };

  return (
    <View style={styles.header}>
      
      {/* --- TOP ROW --- */}
      <View style={styles.headerTop}>
        <View style={styles.brandWrapper}>
          <Text style={styles.brandTitle}>Bazario</Text>
          
          <TouchableOpacity 
            style={styles.locationRow} 
            onPress={() => setModalVisible(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="location-sharp" size={14} color="#12783D" />
            <Text style={styles.locationSubtitle} numberOfLines={1}>
              {activeLocation.type} - {activeLocation.address}
            </Text>
            <Ionicons name="chevron-down" size={12} color="#666" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={24} color="#333" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* --- SEARCH BAR (FUNCTIONAL) --- */}
      <Pressable 
        style={styles.searchContainer} 
        onPress={handleSearchPress}
      >
        <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
        <Text style={styles.placeholderText}>Search atta, oil, maggi...</Text>
      </Pressable>

      {/* --- LOCATION MODAL --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackdrop} 
            onPress={() => setModalVisible(false)} 
          />
          
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Location</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={savedAddresses}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.addressItem, 
                    activeLocation.id === item.id && styles.selectedItem
                  ]}
                  onPress={() => handleSelectAddress(item)}
                >
                  <View style={styles.iconBox}>
                    <Ionicons 
                      name={item.type === 'Home' ? 'home' : item.type === 'Work' ? 'briefcase' : 'location'} 
                      size={20} 
                      color={activeLocation.id === item.id ? '#12783D' : '#666'} 
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.addrType, activeLocation.id === item.id && styles.selectedText]}>
                      {item.type}
                    </Text>
                    <Text style={styles.addrFull}>{item.fullAddress}, {item.address}</Text>
                  </View>
                  {activeLocation.id === item.id && (
                    <Ionicons name="checkmark-circle" size={20} color="#12783D" />
                  )}
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity style={styles.addNewBtn} onPress={handleAddNew}>
              <Ionicons name="add" size={20} color="#12783D" />
              <Text style={styles.addNewText}>Add New Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  brandWrapper: { flex: 1, justifyContent: 'center' },
  brandTitle: { fontSize: 26, fontWeight: '900', color: '#12783D', marginBottom: 2, letterSpacing: -0.5 },
  
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationSubtitle: { fontSize: 13, color: '#333', fontWeight: '700', maxWidth: 200 }, 
  
  cartBtn: { width: 44, height: 44, backgroundColor: '#fff', borderRadius: 22, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#eee', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4 },
  cartBadge: { position: 'absolute', top: -2, right: -2, backgroundColor: '#D32F2F', width: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: '#fff' },
  cartBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },

  // Updated Search Container Style
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    borderRadius: 24, 
    paddingHorizontal: 16, 
    height: 48, 
    borderWidth: 1, 
    borderColor: '#F0F0F0', 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.05, 
    shadowRadius: 5 
  },
  searchIcon: { marginRight: 8 },
  placeholderText: { flex: 1, fontSize: 15, color: '#999' }, // Mimics placeholder

  // Modal Styles
  modalOverlay: { flex: 1, justifyContent: 'flex-end'},
  modalBackdrop: { flex: 1 },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: height * 0.6, elevation: 20 },
  
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  
  addressItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  selectedItem: { backgroundColor: '#F0FDF4', marginHorizontal: -20, paddingHorizontal: 20 },
  
  iconBox: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  addrType: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 2 },
  selectedText: { color: '#12783D' },
  addrFull: { fontSize: 12, color: '#666' },

  addNewBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, marginTop: 10, borderStyle: 'dashed', borderWidth: 1, borderColor: '#12783D', borderRadius: 12 },
  addNewText: { color: '#12783D', fontWeight: '700', marginLeft: 8, fontSize: 16 },
});
