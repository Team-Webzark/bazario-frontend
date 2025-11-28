import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SavedAddressesScreen({ navigation }) {
  const [addresses, setAddresses] = useState([
    { id: '1', type: 'Home', text: 'Flat 204, Skyline Apts, Civil Lines, Bareilly', isDefault: true },
    { id: '2', type: 'Work', text: 'Office 302, IT Park, Bareilly', isDefault: false },
  ]);

  const handleDelete = (id) => {
    Alert.alert("Delete Address", "Are you sure?", [
      { text: "Cancel" },
      { text: "Delete", onPress: () => setAddresses(prev => prev.filter(a => a.id !== id)), style: 'destructive' }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconBox}>
           <Ionicons name={item.type === 'Home' ? 'home' : 'briefcase'} size={20} color="#12783D" />
        </View>
        <View style={{ flex: 1 }}>
           <Text style={styles.type}>{item.type} {item.isDefault && <Text style={styles.defaultTag}>(Default)</Text>}</Text>
           <Text style={styles.text}>{item.text}</Text>
        </View>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
           <Ionicons name="trash-outline" size={20} color="#FF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
         </TouchableOpacity>
         <Text style={styles.title}>Saved Addresses</Text>
      </View>

      <FlatList 
        data={addresses} 
        renderItem={renderItem} 
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity style={styles.addBtn}>
         <Text style={styles.addText}>+ Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', elevation: 2 },
  title: { fontSize: 18, fontWeight: 'bold', marginLeft: 16, color: '#333' },
  list: { padding: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 1 },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  iconBox: { marginRight: 12, marginTop: 2 },
  type: { fontWeight: 'bold', fontSize: 16, color: '#333', marginBottom: 4 },
  defaultTag: { fontSize: 12, color: '#888', fontWeight: 'normal' },
  text: { color: '#666', lineHeight: 20 },
  addBtn: { margin: 16, padding: 16, backgroundColor: '#fff', borderWidth: 1, borderColor: '#12783D', borderRadius: 12, alignItems: 'center', borderStyle: 'dashed' },
  addText: { color: '#12783D', fontWeight: 'bold' },
});



