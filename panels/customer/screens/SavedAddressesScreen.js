// panels/customer/screens/SavedAddressesScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SavedAddressesScreen({ navigation }) {
  const [addresses, setAddresses] = useState([
    { id: '1', type: 'Home', text: 'Flat 204, Skyline Apts, Civil Lines, Bareilly', isDefault: true },
    { id: '2', type: 'Work', text: 'Office 302, IT Park, Bareilly', isDefault: false },
  ]);

  const handleDelete = (id) => {
    Alert.alert("Delete Address", "Are you sure you want to delete this address?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => setAddresses(prev => prev.filter(a => a.id !== id)), style: 'destructive' }
    ]);
  };

  const handleAddNew = () => {
    navigation.navigate('LocationCapture', { isNewAddress: true });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.iconBox}>
           <Ionicons 
             name={item.type === 'Home' ? 'home' : item.type === 'Work' ? 'briefcase' : 'location'} 
             size={20} color="#12783D" 
           />
        </View>
        <View style={{ flex: 1 }}>
           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.type}>{item.type}</Text>
              {item.isDefault && <View style={styles.defaultBadge}><Text style={styles.defaultText}>DEFAULT</Text></View>}
           </View>
           <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.actions}>
         <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionText}>Edit</Text>
         </TouchableOpacity>
         <View style={styles.verticalDivider} />
         <TouchableOpacity style={styles.actionBtn} onPress={() => handleDelete(item.id)}>
            <Text style={[styles.actionText, { color: '#EF4444' }]}>Delete</Text>
         </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
         </TouchableOpacity>
         <Text style={styles.title}>Saved Addresses</Text>
      </View>

      <FlatList 
        data={addresses} 
        renderItem={renderItem} 
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footer}>
         <TouchableOpacity style={styles.addBtn} onPress={handleAddNew}>
            <Ionicons name="add" size={20} color="#12783D" />
            <Text style={styles.addText}>Add New Address</Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  
  header: { 
      flexDirection: 'row', alignItems: 'center', paddingHorizontal: wp('5%'), 
      paddingVertical: hp('2%'), backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB'
  },
  backBtn: { padding: 4 },
  title: { fontSize: hp('2.2%'), fontWeight: '700', marginLeft: 16, color: '#111' },

  list: { padding: wp('5%') },
  
  card: { 
      backgroundColor: '#fff', borderRadius: 16, marginBottom: hp('2%'), 
      borderWidth: 1, borderColor: '#E5E7EB', overflow: 'hidden'
  },
  cardTop: { flexDirection: 'row', padding: 16 },
  
  iconBox: { 
      width: 36, height: 36, borderRadius: 18, backgroundColor: '#F0FDF4', 
      justifyContent: 'center', alignItems: 'center', marginRight: 12 
  },
  type: { fontWeight: '700', fontSize: 16, color: '#1F2937', marginBottom: 4 },
  defaultBadge: { backgroundColor: '#E5E7EB', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 8 },
  defaultText: { fontSize: 10, fontWeight: '700', color: '#4B5563' },
  text: { color: '#6B7280', lineHeight: 20, fontSize: 14 },

  divider: { height: 1, backgroundColor: '#F3F4F6' },
  
  actions: { flexDirection: 'row', height: 44 },
  actionBtn: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  actionText: { fontSize: 14, fontWeight: '600', color: '#12783D' },
  verticalDivider: { width: 1, backgroundColor: '#F3F4F6' },

  footer: { padding: wp('5%'), backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  addBtn: { 
      flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 16, 
      backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#12783D', 
      borderRadius: 16, borderStyle: 'dashed', gap: 8
  },
  addText: { color: '#12783D', fontWeight: '700', fontSize: 16 },
});
