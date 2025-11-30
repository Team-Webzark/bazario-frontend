// panels/customer/components/Home/BuyAgainList.js

import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BUY_AGAIN = [
  { id: '1', name: 'Amul Taaza Milk', weight: '500ml', price: '₹27', lastBought: '2 days ago', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200' },
  { id: '2', name: 'Aashirvaad Atta', weight: '5kg', price: '₹240', lastBought: '7 days ago', image: 'https://images.unsplash.com/photo-1615485500704-8e99099928b3?w=200' },
  { id: '3', name: 'Tata Salt', weight: '1kg', price: '₹25', lastBought: '15 days ago', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200' },
];

export default function BuyAgainList() {
  const navigation = useNavigation();

  // Handle Add to Cart (Simulation)
  const handleQuickAdd = (item) => {
    console.log(`Quick added ${item.name}`);
    // Yahan Redux action dispatch hoga real app mein
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.buyAgainCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.8}
    >
      {/* Product Image */}
      <View style={styles.imageWrapper}>
         <Image source={{ uri: item.image }} style={styles.buyAgainImage} />
         
         {/* Quick Add Button Over Image */}
         <TouchableOpacity 
            style={styles.addBtn} 
            onPress={() => handleQuickAdd(item)}
         >
            <Ionicons name="add" size={16} color="#fff" />
         </TouchableOpacity>
      </View>

      <View style={styles.buyAgainInfo}>
        <Text style={styles.buyAgainName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.weightPrice}>{item.weight} • {item.price}</Text>
        
        <View style={styles.lastBoughtRow}>
           <Ionicons name="time-outline" size={10} color="#888" />
           <Text style={styles.lastBoughtText}>Bought {item.lastBought}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Buy again</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CategoryListing', { category: 'Buy Again' })}>
                <Text style={styles.seeAllText}>View all ›</Text>
            </TouchableOpacity>
        </View>
        
        <FlatList 
            data={BUY_AGAIN}
            horizontal
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1F2937' },
  seeAllText: { color: '#12783D', fontSize: 14, fontWeight: '600' },
  horizontalList: { paddingRight: 20 },
  
  buyAgainCard: { 
      width: 140, backgroundColor: '#FFF', borderRadius: 16, 
      padding: 8, marginRight: 12, marginBottom: 24,
      borderWidth: 1, borderColor: '#F3F4F6',
      elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4 
  },
  
  imageWrapper: { position: 'relative', alignItems: 'center', marginBottom: 8 },
  buyAgainImage: { width: 80, height: 80, resizeMode: 'contain' },
  
  addBtn: { 
      position: 'absolute', bottom: 0, right: 0, 
      backgroundColor: '#12783D', width: 24, height: 24, borderRadius: 12, 
      justifyContent: 'center', alignItems: 'center', elevation: 2 
  },

  buyAgainInfo: { paddingHorizontal: 4 },
  buyAgainName: { fontSize: 13, fontWeight: '700', color: '#374151', marginBottom: 2, height: 36 },
  weightPrice: { fontSize: 11, color: '#111', fontWeight: '600', marginBottom: 4 },
  
  lastBoughtRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  lastBoughtText: { fontSize: 10, color: '#9CA3AF' },
});
