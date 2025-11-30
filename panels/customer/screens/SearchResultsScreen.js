// panels/customer/screens/SearchResultsScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  TextInput,
  ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock Data
const ALL_PRODUCTS = [
  { id: '1', name: 'Maggi Masala Noodles', weight: '70g', price: 14, store: 'Fresh Mart', eta: '15 mins', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200' },
  { id: '2', name: 'Maggi Chicken Noodles', weight: '70g', price: 18, store: 'Daily Needs', eta: '25 mins', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200' },
  { id: '3', name: 'Maggi Hot Heads', weight: '70g', price: 20, store: 'Super Store', eta: '30 mins', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200' },
  { id: '4', name: 'Yippee Noodles', weight: '65g', price: 12, store: 'Fresh Mart', eta: '15 mins', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200' },
];

const RECIPES = [
  { id: '1', name: 'Maggi Masala Bowl', time: '10 min', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200' },
  { id: '2', name: 'Spicy Vegetable Noodles', time: '15 min', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200' },
];

export default function SearchResultsScreen({ route, navigation }) {
  const { query: initialQuery } = route.params || { query: '' };
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('Products'); // 'Products' | 'Recipes'
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  
  // Cart State (Local for demo)
  const [cartCount, setCartCount] = useState(0);

  // Search Logic
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const filtered = ALL_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.prodImage} />
      <View style={styles.prodInfo}>
         <Text style={styles.prodName}>{item.name}</Text>
         <Text style={styles.prodStore}>From: {item.store} • {item.eta}</Text>
         <Text style={styles.prodPrice}>₹{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
         <Text style={styles.addBtnText}>Add</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderRecipe = ({ item }) => (
    <TouchableOpacity 
      style={styles.recipeCard}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <Text style={styles.recipeName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.recipeTime}>⏱ {item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header with Search Bar & Cart */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
           <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.searchBox}>
           <Ionicons name="search" size={20} color="#12783D" />
           <TextInput
             style={styles.input}
             placeholder="Search products..."
             value={query}
             onChangeText={setQuery}
             autoFocus={false} 
           />
           {query.length > 0 && (
             <TouchableOpacity onPress={() => setQuery('')}>
                <Ionicons name="close-circle" size={18} color="#ccc" />
             </TouchableOpacity>
           )}
        </View>
        
        {/* Functional Cart Icon */}
        <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('Cart')}>
           <Ionicons name="cart-outline" size={26} color="#333" />
           {cartCount > 0 && (
             <View style={styles.badge}>
               <Text style={styles.badgeText}>{cartCount}</Text>
             </View>
           )}
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
         <TouchableOpacity 
            style={[styles.tab, activeTab === 'Products' && styles.activeTab]} 
            onPress={() => setActiveTab('Products')}
         >
            <Text style={[styles.tabText, activeTab === 'Products' && styles.activeTabText]}>Products</Text>
            {activeTab === 'Products' && <View style={styles.activeLine} />}
         </TouchableOpacity>
         <TouchableOpacity 
            style={[styles.tab, activeTab === 'Recipes' && styles.activeTab]}
            onPress={() => setActiveTab('Recipes')}
         >
            <Text style={[styles.tabText, activeTab === 'Recipes' && styles.activeTabText]}>Recipes</Text>
            {activeTab === 'Recipes' && <View style={styles.activeLine} />}
         </TouchableOpacity>
      </View>

      {/* Content Area */}
      {loading ? (
         <View style={styles.center}>
            <ActivityIndicator size="large" color="#F97316" />
         </View>
      ) : (
         <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            {/* Product List (Only in Products Tab) */}
            {activeTab === 'Products' && (
               <View>
                  {results.map((item) => (
                     <View key={item.id}>{renderProduct({ item })}</View>
                  ))}
                  {results.length === 0 && (
                     <Text style={styles.noResultText}>No products found for "{query}"</Text>
                  )}
               </View>
            )}

            {/* Recipe List (Only in Recipes Tab) */}
            {activeTab === 'Recipes' && (
               <View style={styles.recipeGrid}>
                   {RECIPES.map(item => (
                       <View key={item.id} style={{ width: '48%', marginBottom: 16 }}>
                           {renderRecipe({ item })}
                       </View>
                   ))}
               </View>
            )}

         </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF2' },
  
  // Header
  header: { 
      flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12,
      backgroundColor: '#fff' 
  },
  backBtn: { marginRight: 12 },
  searchBox: { 
      flex: 1, flexDirection: 'row', alignItems: 'center', 
      backgroundColor: '#F3F4F6', borderRadius: 24, paddingHorizontal: 12, height: 44,
      marginRight: 12
  },
  input: { flex: 1, marginLeft: 8, fontSize: 16, color: '#333' },
  
  // Cart
  cartBtn: { position: 'relative', padding: 4 },
  badge: {
      position: 'absolute', top: 0, right: -2, backgroundColor: '#EF4444',
      width: 16, height: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center'
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },

  // Tabs
  tabContainer: { 
      flexDirection: 'row', backgroundColor: '#fff', paddingHorizontal: 20,
      borderBottomWidth: 1, borderBottomColor: '#eee'
  },
  tab: { marginRight: 24, paddingVertical: 12 },
  tabText: { fontSize: 16, color: '#999', fontWeight: '600' },
  activeTabText: { color: '#111', fontWeight: '800' },
  activeLine: { 
      height: 3, backgroundColor: '#F97316', borderRadius: 2, 
      position: 'absolute', bottom: 0, width: '60%' 
  },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 16 },

  // Product Card
  productCard: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
      borderRadius: 16, padding: 12, marginBottom: 16,
      elevation: 1, shadowColor: '#000', shadowOpacity: 0.05
  },
  prodImage: { width: 70, height: 70, resizeMode: 'contain', marginRight: 16 },
  prodInfo: { flex: 1 },
  prodName: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  prodStore: { fontSize: 12, color: '#6B7280', marginBottom: 6 },
  prodPrice: { fontSize: 16, fontWeight: '800', color: '#F97316' },
  
  addBtn: {
      backgroundColor: '#F97316', paddingHorizontal: 20, paddingVertical: 8,
      borderRadius: 20
  },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  // Recipe Grid (Recipes Tab)
  recipeGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  recipeCard: { backgroundColor: '#fff', borderRadius: 16, paddingBottom: 12, overflow: 'hidden' },
  recipeImage: { width: '100%', height: 120, borderTopLeftRadius: 16, borderTopRightRadius: 16, marginBottom: 8, resizeMode: 'cover' },
  recipeName: { fontSize: 14, fontWeight: '700', color: '#333', marginBottom: 2, paddingHorizontal: 8 },
  recipeTime: { fontSize: 12, color: '#666', paddingHorizontal: 8 },

  noResultText: { textAlign: 'center', marginTop: 40, color: '#999', fontSize: 16 }
});
