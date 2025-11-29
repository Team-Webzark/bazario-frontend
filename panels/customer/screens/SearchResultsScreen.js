import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButton from '../../universalLogins/components/BackButton';

export default function SearchResultsScreen({ route, navigation }) {
  const { query } = route.params || { query: 'Items' };
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  // Mock Search Logic
  useEffect(() => {
    setTimeout(() => {
      // Mock Data
      const allProducts = [
        { id: '1', name: 'Aashirvaad Atta', weight: '5 kg', price: '₹240', image: 'https://via.placeholder.com/150' },
        { id: '2', name: 'Fortune Oil', weight: '1 L', price: '₹150', image: 'https://via.placeholder.com/150' },
        { id: '3', name: 'Amul Butter', weight: '500g', price: '₹245', image: 'https://via.placeholder.com/150' },
        { id: '4', name: 'Tata Salt', weight: '1 kg', price: '₹25', image: 'https://via.placeholder.com/150' },
      ];

      // Simple filter simulation
      const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(filtered);
      setLoading(false);
    }, 1000); // Simulate 1s network delay
  }, [query]);

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.weight}>{item.weight}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity style={styles.addBtn}>
           <Text style={styles.addText}>ADD</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <BackButton navigation={navigation} style={{ position: 'absolute', top: 16, left: 16, zIndex: 10 }} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <Text style={styles.title}>Results for "{query}"</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
           <Ionicons name="cart-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.center}>
           <ActivityIndicator size="large" color="#12783D" />
           <Text style={styles.loadingText}>Searching...</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
             <View style={styles.emptyState}>
                <Ionicons name="search" size={60} color="#ddd" />
                <Text style={styles.emptyTitle}>No items found</Text>
                <Text style={styles.emptySub}>Try searching for something else.</Text>
             </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', elevation: 2 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333', flex: 1, marginLeft: 16 },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#666' },

  list: { padding: 12 },
  row: { justifyContent: 'space-between' },
  
  card: { width: '48%', backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 12, elevation: 1 },
  image: { width: '100%', height: 100, resizeMode: 'contain', marginBottom: 8 },
  name: { fontSize: 14, fontWeight: '500', color: '#333', height: 40 },
  weight: { fontSize: 12, color: '#888', marginBottom: 6 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  addBtn: { paddingHorizontal: 12, paddingVertical: 4, borderWidth: 1, borderColor: '#12783D', borderRadius: 4, backgroundColor: '#F0FDF4' },
  addText: { fontSize: 12, fontWeight: 'bold', color: '#12783D' },

  emptyState: { alignItems: 'center', marginTop: 60 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 16 },
  emptySub: { color: '#888', marginTop: 8 },
});



