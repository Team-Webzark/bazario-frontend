import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- MOCK DATA (Replace with API later) ---
const CATEGORIES = [
  { id: '1', name: 'Fruits & Veg', icon: 'nutrition' },
  { id: '2', name: 'Dairy & Eggs', icon: 'water' },
  { id: '3', name: 'Staples', icon: 'cube' },
  { id: '4', name: 'Snacks', icon: 'pizza' },
  { id: '5', name: 'Beverages', icon: 'cafe' },
  { id: '6', name: 'Personal', icon: 'body' },
];

const NEARBY_SHOPS = [
  { id: '1', name: 'Sharma Kirana', distance: '1.2 km', rating: '4.7', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Patel Mart', distance: '0.8 km', rating: '4.5', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Fresh Veggies', distance: '2.1 km', rating: '4.8', image: 'https://via.placeholder.com/100' },
];

const SMART_SHELF_ITEMS = [
  { id: '1', name: 'Aashirvaad Atta', weight: '5kg', price: '₹240', oldPrice: '₹280', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Amul Butter', weight: '500g', price: '₹280', oldPrice: '', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Tata Salt', weight: '1kg', price: '₹25', oldPrice: '₹30', image: 'https://via.placeholder.com/150' },
];

export default function HomeScreen({ navigation }) {

  // --- RENDER HELPERS ---
  const renderCategory = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => navigation.navigate('CategoryListing', { category: item.name })}
    >
      <View style={styles.categoryIconBox}>
        <Ionicons name={item.icon} size={24} color="#12783D" />
      </View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderShopCard = ({ item }) => (
    <TouchableOpacity style={styles.shopCard}>
      <Image source={{ uri: item.image }} style={styles.shopImage} />
      <View style={styles.shopInfo}>
        <Text style={styles.shopName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.shopMeta}>📍 {item.distance} • ⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderProductCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productWeight}>{item.weight}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>{item.price}</Text>
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

      {/* --- HEADER (Fixed) --- */}
      <View style={styles.header}>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={20} color="#12783D" />
          <Text style={styles.locationText}>Civil Lines, Bareilly</Text>
          <Ionicons name="chevron-down" size={16} color="#333" />
        </View>
        <TouchableOpacity 
          style={styles.searchBar} 
          onPress={() => navigation.navigate('Search')}
        >
          <Ionicons name="search" size={20} color="#888" />
          <Text style={styles.placeholderText}>Search "atta", "milk", "chips"...</Text>
        </TouchableOpacity>
      </View>

      {/* --- SCROLLABLE CONTENT --- */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        
        {/* 1. Smart Hero Card */}
        <View style={styles.heroSection}>
          <View style={styles.heroCard}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Running low on essentials?</Text>
              <Text style={styles.heroSubtitle}>It's been 7 days since you bought Milk & Bread.</Text>
              <TouchableOpacity style={styles.heroButton}>
                <Text style={styles.heroButtonText}>Refill Now</Text>
              </TouchableOpacity>
            </View>
            <Image 
              source={{ uri: 'https://via.placeholder.com/100' }} 
              style={styles.heroImage} 
            />
          </View>
        </View>

        {/* 2. Categories Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategory}
            keyExtractor={item => item.id}
            numColumns={3}
            scrollEnabled={false} // Because it's inside ScrollView
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
          />
        </View>

        {/* 3. Local Shops Strip */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Neighborhood Shops</Text>
            <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
          </View>
          <FlatList
            data={NEARBY_SHOPS}
            renderItem={renderShopCard}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 4 }}
          />
        </View>

        {/* 4. Smart Shelf (Horizontal Products) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget Picks for You</Text>
          <FlatList
            data={SMART_SHELF_ITEMS}
            renderItem={renderProductCard}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 4 }}
          />
        </View>

        {/* 5. Recipe Banner */}
        <TouchableOpacity 
          style={styles.recipeBanner}
          onPress={() => navigation.navigate('RecipesTab')}
        >
          <View>
            <Text style={styles.recipeTitle}>What's for dinner?</Text>
            <Text style={styles.recipeSubtitle}>Find easy 15-min recipes</Text>
          </View>
          <Ionicons name="restaurant" size={40} color="#fff" />
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  
  // Header
  header: { backgroundColor: '#fff', padding: 16, elevation: 2 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  locationText: { fontSize: 16, fontWeight: 'bold', color: '#333', marginLeft: 6, marginRight: 4 },
  searchBar: { 
    flexDirection: 'row', alignItems: 'center', 
    backgroundColor: '#F0F2F5', borderRadius: 8, padding: 10 
  },
  placeholderText: { color: '#888', marginLeft: 8, fontSize: 14 },

  // Sections
  section: { marginTop: 24, paddingHorizontal: 16 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 12 },
  seeAll: { color: '#12783D', fontWeight: '600' },

  // Hero Card
  heroSection: { padding: 16 },
  heroCard: { 
    backgroundColor: '#E6F4EA', borderRadius: 12, padding: 16, 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  heroContent: { flex: 1, marginRight: 12 },
  heroTitle: { fontSize: 18, fontWeight: 'bold', color: '#0F5132', marginBottom: 4 },
  heroSubtitle: { fontSize: 13, color: '#444', marginBottom: 12 },
  heroButton: { backgroundColor: '#12783D', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, alignSelf: 'flex-start' },
  heroButtonText: { color: '#fff', fontWeight: '600', fontSize: 12 },
  heroImage: { width: 80, height: 80, resizeMode: 'contain' },

  // Category Item
  categoryItem: { width: '30%', alignItems: 'center', marginBottom: 8 },
  categoryIconBox: { 
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#E8F5E9', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 8 
  },
  categoryText: { fontSize: 12, color: '#333', textAlign: 'center' },

  // Shop Card
  shopCard: { 
    width: 140, backgroundColor: '#fff', borderRadius: 8, marginRight: 12, 
    overflow: 'hidden', elevation: 1 
  },
  shopImage: { width: '100%', height: 90 },
  shopInfo: { padding: 8 },
  shopName: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  shopMeta: { fontSize: 11, color: '#666', marginTop: 4 },

  // Product Card
  productCard: { 
    width: 130, backgroundColor: '#fff', borderRadius: 8, marginRight: 12, 
    padding: 8, elevation: 1, borderWidth: 1, borderColor: '#eee'
  },
  productImage: { width: '100%', height: 100, resizeMode: 'contain', marginBottom: 8 },
  productDetails: { alignItems: 'flex-start' },
  productName: { fontSize: 13, color: '#333', marginBottom: 4, height: 36 },
  productWeight: { fontSize: 11, color: '#888', marginBottom: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  productPrice: { fontSize: 14, fontWeight: 'bold', color: '#222' },
  oldPrice: { fontSize: 11, color: '#999', textDecorationLine: 'line-through', marginLeft: 6 },
  addButton: { 
    width: '100%', backgroundColor: '#E8F5E9', paddingVertical: 6, 
    borderRadius: 4, alignItems: 'center', borderWidth: 1, borderColor: '#12783D' 
  },
  addButtonText: { color: '#12783D', fontSize: 12, fontWeight: 'bold' },

  // Recipe Banner
  recipeBanner: {
    margin: 16, padding: 20, backgroundColor: '#F79009', borderRadius: 12,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2
  },
  recipeTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  recipeSubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 14, marginTop: 4 },
});
