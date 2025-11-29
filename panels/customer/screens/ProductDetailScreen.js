// panels/customer/screens/ProductDetailScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

// Mock Data
const RELATED_PRODUCTS = [
  { id: '1', name: 'Fortune Oil', image: 'https://images.unsplash.com/photo-1626109333063-7267a376a22d?w=200' },
  { id: '2', name: 'Tata Salt', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200' },
  { id: '3', name: 'Sugar', image: 'https://via.placeholder.com/100' },
];

const STORE_OPTIONS = [
  { id: '1', name: 'FreshMart', price: '₹250', eta: '20 mins', selected: true },
  { id: '2', name: 'Daily Needs', price: '₹260', eta: '35 mins', selected: false },
  { id: '3', name: 'Apna Bazar', price: '₹245', eta: '45 mins', selected: false },
];

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params || {};
  const item = product || {
    id: '1',
    name: 'Premium Wheat Atta',
    weight: '5 kg',
    price: '₹250',
    mrp: '₹300',
    rating: 4.8,
    reviews: 234,
    discount: '17% OFF',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400',
    description: 'Premium quality whole wheat atta, sourced from the finest grains.'
  };

  const [quantity, setQuantity] = useState(0);
  const [selectedStore, setSelectedStore] = useState(STORE_OPTIONS[0].id);

  const handleAddToCart = () => setQuantity(1);
  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0));

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFEDD5" barStyle="dark-content" />

      {/* Background Header */}
      <View style={styles.bgHeader} />

      {/* Top Bar */}
      <SafeAreaView style={styles.topBar} edges={['top']}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
         </TouchableOpacity>
         <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart-outline" size={24} color="#fff" />
            {quantity > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{quantity}</Text></View>}
         </TouchableOpacity>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
         
         {/* Product Image Area */}
         <View style={styles.imageArea}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            {/* Pagination Dots (Visual only) */}
            <View style={styles.dotsRow}>
               <View style={[styles.dot, styles.activeDot]} />
               <View style={styles.dot} />
               <View style={styles.dot} />
            </View>
         </View>

         {/* Main Content Card */}
         <View style={styles.contentCard}>
            
            {/* Title & Rating */}
            <Text style={styles.title}>{item.name} {item.weight}</Text>
            <View style={styles.ratingRow}>
               <Text style={styles.ratingText}>{item.rating}</Text>
               <Ionicons name="star" size={14} color="#F59E0B" />
               <Ionicons name="star" size={14} color="#F59E0B" />
               <Text style={styles.reviewCount}>({item.reviews})</Text>
               <View style={styles.offerBadge}>
                  <Text style={styles.offerText}>Offer</Text>
               </View>
            </View>

            {/* Price */}
            <View style={styles.priceRow}>
               <Text style={styles.mrp}>MRP {item.mrp}</Text>
               <Ionicons name="arrow-forward" size={14} color="#9CA3AF" />
               <Text style={styles.sellingPrice}>Offer {item.price} <Text style={styles.discount}>({item.discount})</Text></Text>
            </View>

            <View style={styles.divider} />

            {/* Store Availability */}
            <Text style={styles.sectionTitle}>Available from 3 stores</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storeScroll}>
               {STORE_OPTIONS.map((store) => (
                  <TouchableOpacity 
                     key={store.id} 
                     style={[styles.storeCard, selectedStore === store.id && styles.selectedStoreCard]}
                     onPress={() => setSelectedStore(store.id)}
                  >
                     <Text style={[styles.storeName, selectedStore === store.id && styles.selectedStoreText]}>{store.name}</Text>
                     <Text style={[styles.storePrice, selectedStore === store.id && styles.selectedStoreText]}>{store.price}</Text>
                     <View style={styles.etaBadge}>
                        <Text style={styles.etaText}>{store.eta}</Text>
                     </View>
                  </TouchableOpacity>
               ))}
            </ScrollView>

            {/* Quantity Selector Row */}
            <View style={styles.selectorRow}>
               <Text style={styles.qtyLabel}>Quantity</Text>
               <View style={styles.dropdown}>
                  <Text style={styles.dropdownText}>1kg / 5kg</Text>
                  <Ionicons name="chevron-down" size={16} color="#333" />
               </View>
            </View>

            {/* Add to Cart Button */}
            {quantity === 0 ? (
               <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
                  <Text style={styles.addToCartText}>Add to cart</Text>
               </TouchableOpacity>
            ) : (
               <View style={styles.stepperBtn}>
                  <TouchableOpacity onPress={decrement} style={styles.stepIcon}><Ionicons name="remove" size={24} color="#fff" /></TouchableOpacity>
                  <Text style={styles.stepValue}>{quantity}</Text>
                  <TouchableOpacity onPress={increment} style={styles.stepIcon}><Ionicons name="add" size={24} color="#fff" /></TouchableOpacity>
               </View>
            )}

            {/* Goes Well With */}
            <View style={styles.relatedSection}>
               <View style={styles.relatedHeader}>
                  <Text style={styles.sectionTitle}>Goes well with</Text>
                  <Ionicons name="chevron-forward" size={20} color="#6B7280" />
               </View>
               <FlatList 
                  data={RELATED_PRODUCTS}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                     <View style={styles.relatedCard}>
                        <Image source={{ uri: item.image }} style={styles.relatedImg} />
                        <Text style={styles.relatedName}>{item.name}</Text>
                     </View>
                  )}
               />
            </View>

            {/* Description */}
            <View style={styles.descSection}>
               <Text style={styles.descText}>{item.description}</Text>
               <Text style={styles.readMore}>Read more...</Text>
            </View>

         </View>
         
         <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBF7' }, // Light cream base

  // Background Header
  bgHeader: {
      position: 'absolute', top: 0, left: 0, right: 0, height: hp('35%'),
      backgroundColor: '#FFEDD5', // Light Orange
      borderBottomLeftRadius: 40, borderBottomRightRadius: 40,
  },

  topBar: {
      flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10
  },
  iconBtn: { 
      width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.2)',
      justifyContent: 'center', alignItems: 'center' 
  },
  badge: { position: 'absolute', top: -2, right: -2, backgroundColor: '#EF4444', width: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: '#fff' },
  badgeText: { fontSize: 10, color: '#fff', fontWeight: 'bold' },

  scrollContent: { paddingTop: 20 },

  // Image Area
  imageArea: { alignItems: 'center', marginBottom: 20 },
  productImage: { width: 220, height: 220, resizeMode: 'contain' },
  dotsRow: { flexDirection: 'row', marginTop: 16, gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.1)' },
  activeDot: { backgroundColor: '#F97316' }, // Orange

  // Content Card
  contentCard: {
      backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30,
      padding: 24, minHeight: hp('60%'),
      shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 5
  },
  
  title: { fontSize: 22, fontWeight: '800', color: '#1F2937', marginBottom: 8 },
  
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  ratingText: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginRight: 4 },
  reviewCount: { fontSize: 14, color: '#6B7280', marginLeft: 4, marginRight: 12 },
  offerBadge: { backgroundColor: '#F97316', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  offerText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },

  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  mrp: { fontSize: 14, color: '#6B7280', textDecorationLine: 'line-through', marginRight: 8 },
  sellingPrice: { fontSize: 18, fontWeight: '700', color: '#DC2626' }, // Red for offer price
  discount: { fontWeight: '400' },

  divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 16 },

  // Stores
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#374151', marginBottom: 12 },
  storeScroll: { marginBottom: 24 },
  storeCard: { 
      width: 100, padding: 12, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB',
      marginRight: 12, alignItems: 'center', backgroundColor: '#fff'
  },
  selectedStoreCard: { borderColor: '#F97316', backgroundColor: '#FFF7ED' },
  storeName: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  storePrice: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 },
  selectedStoreText: { color: '#C2410C' },
  etaBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  etaText: { fontSize: 10, color: '#6B7280' },

  // Selector
  selectorRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  qtyLabel: { fontSize: 16, color: '#374151' },
  dropdown: { 
      flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB',
      paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, gap: 8 
  },
  dropdownText: { fontSize: 14, fontWeight: '600', color: '#1F2937' },

  // Main Button
  addToCartBtn: {
      backgroundColor: '#F97316', borderRadius: 30, paddingVertical: 16, alignItems: 'center',
      marginBottom: 32, shadowColor: '#F97316', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, elevation: 4
  },
  addToCartText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  
  stepperBtn: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      backgroundColor: '#F97316', borderRadius: 30, paddingVertical: 8, paddingHorizontal: 20,
      marginBottom: 32
  },
  stepIcon: { padding: 8 },
  stepValue: { fontSize: 20, fontWeight: 'bold', color: '#fff' },

  // Related
  relatedSection: { marginBottom: 24 },
  relatedHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  relatedCard: { 
      width: 90, padding: 10, borderRadius: 16, backgroundColor: '#F9FAFB', 
      marginRight: 12, alignItems: 'center' 
  },
  relatedImg: { width: 50, height: 50, resizeMode: 'contain', marginBottom: 8 },
  relatedName: { fontSize: 12, color: '#374151', textAlign: 'center' },

  // Description
  descSection: { backgroundColor: '#F9FAFB', padding: 16, borderRadius: 16 },
  descText: { fontSize: 14, color: '#6B7280', lineHeight: 22 },
  readMore: { color: '#F97316', fontWeight: '600', marginTop: 4 },
});
