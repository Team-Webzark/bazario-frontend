// panels/customer/screens/HomeScreen.js

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
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// --- MOCK DATA (Online Images) ---
const CATEGORIES = [
  { id: '1', name: 'Fruits & Veg', icon: 'nutrition-outline', color: '#FFF3E0' },
  { id: '2', name: 'Dairy', icon: 'water-outline', color: '#E3F2FD' },
  { id: '3', name: 'Snacks', icon: 'pizza-outline', color: '#FFF8E1' },
  { id: '4', name: 'Staples', icon: 'cube-outline', color: '#F3E5F5' },
  { id: '5', name: 'Beverages', icon: 'cafe-outline', color: '#E0F2F1' },
  { id: '6', name: 'Personal', icon: 'body-outline', color: '#FCE4EC' },
];

const BUY_AGAIN = [
  { id: '1', name: 'Amul Milk', lastBought: '2 days ago', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200' },
  { id: '2', name: 'Atta 5kg', lastBought: '7 days ago', image: 'https://images.unsplash.com/photo-1615485500704-8e99099928b3?w=200' },
  { id: '3', name: 'Tata Salt', lastBought: '15 days ago', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200' },
];

const RECIPES = [
  { id: '1', name: 'Paneer Curry', time: '25 min', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400' },
  { id: '2', name: 'Veg Biryani', time: '40 min', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400' },
  { id: '3', name: 'Pasta', time: '15 min', image: 'https://images.unsplash.com/photo-1551183053-bf91b1d31162?w=400' },
];

// --- ASSETS CONFIG ---
const ASSETS = {
    heroPerson: { uri: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400' },
    budgetIcon: { uri: 'https://cdn-icons-png.flaticon.com/512/1011/1011228.png' },
};

export default function HomeScreen({ navigation }) {

  const renderBuyAgain = ({ item }) => (
    <TouchableOpacity style={styles.buyAgainCard}>
      <Image source={{ uri: item.image }} style={styles.buyAgainImage} />
      <View style={styles.buyAgainInfo}>
        <Text style={styles.buyAgainName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.lastBoughtText}>{item.lastBought}</Text>
        <View style={styles.buyAgainRating}>
           <Ionicons name="star" size={10} color="#FFC107" />
           <Ionicons name="star" size={10} color="#FFC107" />
           <Ionicons name="star" size={10} color="#FFC107" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderRecipe = ({ item }) => (
    <TouchableOpacity style={styles.recipeCard}>
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      <View style={styles.recipeOverlay}>
         <Text style={styles.recipeName}>{item.name}</Text>
         <Text style={styles.recipeTime}>⏱ {item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#FFFBF2" barStyle="dark-content" />

      {/* --- HEADER (UPDATED) --- */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
           <View style={styles.brandWrapper}>
              <Text style={styles.brandTitle}>Bazario</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-sharp" size={14} color="#666" />
                <Text style={styles.locationSubtitle} numberOfLines={1}>
                  Civil Lines, Bareilly
                </Text>
                <Ionicons name="chevron-down" size={12} color="#666" />
              </View>
           </View>
           
           {/* Cart Icon */}
           <TouchableOpacity 
             style={styles.cartBtn} 
             onPress={() => navigation.navigate('Cart')}
           >
              <Ionicons name="cart-outline" size={24} color="#333" />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>2</Text>
              </View>
           </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
           <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
           <TextInput 
              placeholder="Search atta, oil, maggi..." 
              style={styles.searchInput} 
              placeholderTextColor="#999"
           />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        
        {/* 1. HERO BANNER */}
        <View style={styles.heroBanner}>
           <View style={styles.heroTextContent}>
              <Text style={styles.greeting}>Good evening, Shaw!</Text>
              <Text style={styles.heroSub}>Running low on essentials?</Text>
              <View style={styles.heroActions}>
                 <TouchableOpacity style={styles.ctaPrimary}>
                    <Text style={styles.ctaPrimaryText}>Refill essentials</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.ctaSecondary}>
                    <Text style={styles.ctaSecondaryText}>Plan meals</Text>
                 </TouchableOpacity>
              </View>
           </View>
           <Image 
              source={ASSETS.heroPerson}
              style={styles.heroPersonImage} 
           />
        </View>

        {/* 2. BUY AGAIN */}
        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Buy again</Text>
           <TouchableOpacity><Text style={styles.seeAllText}>View all ›</Text></TouchableOpacity>
        </View>
        <FlatList 
           data={BUY_AGAIN}
           horizontal
           renderItem={renderBuyAgain}
           keyExtractor={item => item.id}
           showsHorizontalScrollIndicator={false}
           contentContainerStyle={styles.horizontalList}
        />

        {/* 3. BUDGET TRACKER */}
        <View style={styles.budgetStrip}>
           <View style={styles.budgetLeft}>
              <Image source={ASSETS.budgetIcon} style={styles.budgetIcon} />
              <Text style={styles.budgetText}>For this week under <Text style={styles.budgetAmount}>₹500</Text></Text>
           </View>
           <Ionicons name="chevron-down" size={20} color="#666" />
        </View>

        {/* 4. TODAY'S RECIPES */}
        <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 12 }]}>Today's recipes</Text>
        <FlatList 
           data={RECIPES}
           horizontal
           renderItem={renderRecipe}
           keyExtractor={item => item.id}
           showsHorizontalScrollIndicator={false}
           contentContainerStyle={styles.horizontalList}
        />

        {/* 5. CATEGORIES GRID */}
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

        {/* 6. NEIGHBORHOOD STORES */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>From neighborhood stores</Text>
        <View style={styles.storeCard}>
           <Image source={{ uri: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200' }} style={styles.storeImg} />
           <View style={styles.storeInfo}>
              <Text style={styles.storeName}>Fresh Veggies & More</Text>
              <Text style={styles.storeMeta}>1.2 km • Open Now</Text>
           </View>
           <TouchableOpacity style={styles.storeLockBtn}>
              <Ionicons name="lock-closed" size={18} color="#fff" />
              <Text style={styles.storeLockText}>Item 1</Text>
           </TouchableOpacity>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFBF2' 
  }, 
  
  // --- HEADER STYLES ---
  header: { 
    paddingHorizontal: 20, 
    paddingTop: 10, 
    paddingBottom: 10 
  },
  headerTop: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  brandWrapper: { 
    flex: 1,
    justifyContent: 'center' 
  },
  brandTitle: { 
    fontSize: 26, 
    fontWeight: '900', 
    color: '#12783D', // Bazario Green
    marginBottom: 2,
    letterSpacing: -0.5
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  locationSubtitle: { 
    fontSize: 13, 
    color: '#555', 
    fontWeight: '500',
    maxWidth: 200
  },
  
  cartBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#D32F2F',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff'
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold'
  },

  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    borderRadius: 24, 
    paddingHorizontal: 16, 
    height: 48,
    borderWidth: 1, 
    borderColor: '#F0F0F0', 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.05, 
    shadowRadius: 5 
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#333', height: '100%' },

  // --- SCROLL CONTENT STYLES ---
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },

  // Hero
  heroBanner: { marginTop: 20, backgroundColor: '#FFD580', borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', minHeight: 160 },
  heroTextContent: { flex: 1, zIndex: 2 },
  greeting: { fontSize: 18, fontWeight: '800', color: '#3E2723', marginBottom: 4 },
  heroSub: { fontSize: 15, color: '#5D4037', marginBottom: 16, fontWeight: '600' },
  heroActions: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  ctaPrimary: { backgroundColor: '#F57C00', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  ctaPrimaryText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  ctaSecondary: { paddingVertical: 8, paddingHorizontal: 12 },
  ctaSecondaryText: { color: '#3E2723', fontWeight: '600', fontSize: 12 },
  heroPersonImage: { width: 110, height: 140, position: 'absolute', right: -10, bottom: 0, zIndex: 1, resizeMode: 'cover', borderRadius: 10 },

  // Sections
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F1F1F' },
  seeAllText: { color: '#757575', fontSize: 14 },
  horizontalList: { paddingRight: 20 },

  // Buy Again
  buyAgainCard: { width: 130, backgroundColor: '#FFF', borderRadius: 16, padding: 10, marginRight: 12, borderWidth: 1, borderColor: '#FFF8E1', elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4 },
  buyAgainImage: { width: 60, height: 60, alignSelf: 'center', marginBottom: 8, resizeMode: 'contain' },
  buyAgainName: { fontSize: 12, fontWeight: '600', color: '#333', height: 32 },
  lastBoughtText: { fontSize: 10, color: '#888', marginTop: 4 },
  buyAgainRating: { flexDirection: 'row', marginTop: 4 },

  // Budget
  budgetStrip: { marginTop: 24, backgroundColor: '#FFF3E0', borderRadius: 16, padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  budgetLeft: { flexDirection: 'row', alignItems: 'center' },
  budgetIcon: { width: 30, height: 30, marginRight: 10, resizeMode: 'contain' },
  budgetText: { fontSize: 14, color: '#5D4037' },
  budgetAmount: { fontWeight: 'bold', color: '#D84315' },

  // Recipe
  recipeCard: { width: 200, height: 120, borderRadius: 16, marginRight: 12, overflow: 'hidden', backgroundColor: '#f0f0f0' },
  recipeImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  recipeOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', padding: 10 },
  recipeName: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  recipeTime: { color: '#eee', fontSize: 11 },

  // Categories
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 24 },
  catItemGrid: { width: '30%', alignItems: 'center', marginBottom: 16 },
  catCircleBig: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  catLabelBig: { fontSize: 12, fontWeight: '600', color: '#3E2723' },

  // Store
  storeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 16, padding: 12, marginTop: 12, elevation: 1, marginBottom: 20 },
  storeImg: { width: 60, height: 60, borderRadius: 12, marginRight: 12, backgroundColor: '#eee' },
  storeInfo: { flex: 1 },
  storeName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  storeMeta: { fontSize: 12, color: '#888' },
  storeLockBtn: { backgroundColor: '#FB8C00', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  storeLockText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
});
