// panels/customer/components/Home/StoreCard.js

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function StoreCard() {
  return (
    <View>
      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>From neighborhood stores</Text>
      
      <View style={styles.storeCard}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200' }} 
          style={styles.storeImg} 
        />
        
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>Fresh Veggies & More</Text>
          <Text style={styles.storeMeta}>1.2 km • Open Now</Text>
        </View>
        
        <TouchableOpacity style={styles.storeLockBtn}>
          <Ionicons name="lock-closed" size={18} color="#fff" />
          <Text style={styles.storeLockText}>Item 1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1F1F1F' 
  },
  
  storeCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    borderRadius: 16, 
    padding: 12, 
    marginTop: 12, 
    elevation: 1, 
    marginBottom: 20 
  },
  
  storeImg: { 
    width: 60, 
    height: 60, 
    borderRadius: 12, 
    marginRight: 12, 
    backgroundColor: '#eee' 
  },
  
  storeInfo: { 
    flex: 1 
  },
  
  storeName: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  
  storeMeta: { 
    fontSize: 12, 
    color: '#888' 
  },
  
  storeLockBtn: { 
    backgroundColor: '#FB8C00', 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  
  storeLockText: { 
    color: '#fff', 
    fontSize: 10, 
    fontWeight: 'bold' 
  },
});
