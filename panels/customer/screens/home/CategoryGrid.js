// panels/customer/components/Home/CategoryGrid.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Mock Data
const CATEGORIES = [
  { id: '1', name: 'Fruits & Veg', icon: 'nutrition-outline', color: '#FFF3E0' },
  { id: '2', name: 'Dairy', icon: 'water-outline', color: '#E3F2FD' },
  { id: '3', name: 'Snacks', icon: 'pizza-outline', color: '#FFF8E1' },
  { id: '4', name: 'Staples', icon: 'cube-outline', color: '#F3E5F5' },
  { id: '5', name: 'Beverages', icon: 'cafe-outline', color: '#E0F2F1' },
  { id: '6', name: 'Personal', icon: 'body-outline', color: '#FCE4EC' },
];

export default function CategoryGrid({ navigation }) {
  return (
    <View style={styles.catGrid}>
      {CATEGORIES.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.catItemGrid}
          onPress={() => navigation.navigate('CategoryListing')}
        >
          <View style={[styles.catCircleBig, { backgroundColor: item.color }]}>
            <Ionicons name={item.icon} size={28} color="#5D4037" />
          </View>
          <Text style={styles.catLabelBig}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  catGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    marginTop: 24,
  },
  catItemGrid: { 
    width: '30%', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  catCircleBig: { 
    width: 64, 
    height: 64, 
    borderRadius: 32, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  catLabelBig: { 
    fontSize: 12, 
    fontWeight: '600', 
    color: '#3E2723',
    textAlign: 'center'
  },
});
