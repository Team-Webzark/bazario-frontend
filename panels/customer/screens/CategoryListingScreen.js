import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
   ScrollView,
    StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- MOCK DATA ---
const PRODUCTS = [
  { id: '1', name: 'Aashirvaad Atta', weight: '5 kg', price: '₹240', oldPrice: '₹280', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Fortune Oil', weight: '1 L', price: '₹150', oldPrice: '₹180', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Tata Salt', weight: '1 kg', price: '₹25', oldPrice: '₹30', image: 'https://via.placeholder.com/150' },
  { id: '4', name: 'India Gate Rice', weight: '5 kg', price: '₹550', oldPrice: '₹700', image: 'https://via.placeholder.com/150' },
  { id: '5', name: 'Maggi Noodles', weight: '280g', price: '₹45', oldPrice: '', image: 'https://via.placeholder.com/150' },
  { id: '6', name: 'Sugar', weight: '1 kg', price: '₹42', oldPrice: '₹50', image: 'https://via.placeholder.com/150' },
];

export default function CategoryListingScreen({ route, navigation }) {
  const { category } = route.params || { category: 'Products' };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.weight}>{item.weight}</Text>
      
      <View style={styles.footer}>
        <View>
            <Text style={styles.price}>{item.price}</Text>
            {item.oldPrice ? <Text style={styles.oldPrice}>{item.oldPrice}</Text> : null}
        </View>
        <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category}</Text>
        <TouchableOpacity>
            <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* FILTER STRIP */}
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.filterChipActive}>
                <Text style={styles.filterTextActive}>All</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.filterChip}>
                <Text style={styles.filterText}>Price Low to High</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.filterChip}>
                <Text style={styles.filterText}>Brands</Text>
            </TouchableOpacity>
        </ScrollView>
      </View>

      {/* PRODUCT GRID */}
      <FlatList
        data={PRODUCTS}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16, backgroundColor: '#fff', elevation: 2 
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },

  filterRow: { paddingVertical: 12, backgroundColor: '#fff', paddingLeft: 16 },
  filterChip: { 
    paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, 
    borderWidth: 1, borderColor: '#ddd', marginRight: 8 
  },
  filterChipActive: { 
    paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, 
    backgroundColor: '#12783D', marginRight: 8 
  },
  filterText: { fontSize: 13, color: '#333' },
  filterTextActive: { fontSize: 13, color: '#fff', fontWeight: 'bold' },

  listContent: { padding: 8 },
  row: { justifyContent: 'space-between' },
  
  card: { 
    width: '48%', backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 12,
    elevation: 1
  },
  image: { width: '100%', height: 120, resizeMode: 'contain', marginBottom: 8 },
  name: { fontSize: 14, fontWeight: '500', color: '#333', height: 40 },
  weight: { fontSize: 12, color: '#888', marginBottom: 8 },
  
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 14, fontWeight: 'bold', color: '#222' },
  oldPrice: { fontSize: 11, color: '#999', textDecorationLine: 'line-through' },
  
  addButton: { 
    paddingVertical: 4, paddingHorizontal: 12, borderRadius: 4, 
    borderWidth: 1, borderColor: '#12783D', backgroundColor: '#F0FDF4'
  },
  addButtonText: { color: '#12783D', fontSize: 12, fontWeight: 'bold' },
});



