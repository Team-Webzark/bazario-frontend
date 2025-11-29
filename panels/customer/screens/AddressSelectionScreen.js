import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Modal,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButton from '../../universalLogins/components/BackButton';

export default function AddressSelectionScreen({ navigation }) {
  const [addresses, setAddresses] = useState([
    { id: '1', type: 'Home', address: 'Flat 204, Skyline Apartments, Civil Lines, Bareilly', selected: true },
    { id: '2', type: 'Work', address: 'Office 302, IT Park, Bareilly', selected: false },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState('');

  const selectAddress = (id) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      selected: addr.id === id
    })));
  };

  const addNewAddress = () => {
    if (newAddress.trim()) {
      setAddresses([...addresses, {
        id: Date.now().toString(),
        type: 'Other',
        address: newAddress,
        selected: true // Auto-select new address
      }]);
      setNewAddress('');
      setModalVisible(false);
    }
  };

  const renderAddress = ({ item }) => (
    <TouchableOpacity 
      style={[styles.addressCard, item.selected && styles.selectedCard]} 
      onPress={() => selectAddress(item.id)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.typeRow}>
          <Ionicons 
            name={item.type === 'Home' ? 'home' : item.type === 'Work' ? 'briefcase' : 'location'} 
            size={18} 
            color={item.selected ? '#12783D' : '#666'} 
          />
          <Text style={[styles.addressType, item.selected && styles.selectedText]}>{item.type}</Text>
        </View>
        {item.selected && <Ionicons name="checkmark-circle" size={22} color="#12783D" />}
      </View>
      <Text style={styles.addressText}>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <BackButton navigation={navigation} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Address</Text>
      </View>

      <FlatList
        data={addresses}
        renderItem={renderAddress}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Ionicons name="add" size={20} color="#12783D" />
            <Text style={styles.addButtonText}>Add New Address</Text>
          </TouchableOpacity>
        }
      />

      {/* Proceed Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.proceedButton}
          onPress={() => navigation.navigate('Payment')}
        >
          <Text style={styles.proceedBtnText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>

      {/* Simple Add Address Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Address</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Enter full address"
              value={newAddress}
              onChangeText={setNewAddress}
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
                <Text style={{ color: '#666' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addNewAddress} style={styles.saveBtn}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Save Address</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', elevation: 2 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 16, color: '#333' },
  
  listContent: { padding: 16 },
  addressCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 1, borderWidth: 1, borderColor: 'transparent' },
  selectedCard: { borderColor: '#12783D', backgroundColor: '#F0FDF4' },
  
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  typeRow: { flexDirection: 'row', alignItems: 'center' },
  addressType: { fontWeight: 'bold', marginLeft: 8, color: '#666' },
  selectedText: { color: '#12783D' },
  addressText: { color: '#555', lineHeight: 20 },
  
  addButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#12783D', borderRadius: 12, backgroundColor: '#E8F5E9' },
  addButtonText: { color: '#12783D', fontWeight: 'bold', marginLeft: 8 },
  
  footer: { padding: 16, backgroundColor: '#fff', elevation: 10 },
  proceedButton: { backgroundColor: '#12783D', padding: 16, borderRadius: 8, alignItems: 'center' },
  proceedBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 12 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 16, height: 80, textAlignVertical: 'top' },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end' },
  cancelBtn: { padding: 12, marginRight: 16 },
  saveBtn: { backgroundColor: '#12783D', padding: 12, borderRadius: 8 },
});



