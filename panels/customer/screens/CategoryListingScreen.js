// panels/customer/screens/CategoryListingScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  Modal
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// --- MOCK DATA ---
const PRODUCTS = [
  { 
      id: '1', 
      brand: 'Aashirvaad',
      name: 'Shudh Chakki Atta', 
      weight: '5 kg', 
      price: '₹240', 
      mrp: '₹280', 
      rating: 4.5,
      tag: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200' 
  },
  { 
      id: '2', 
      brand: 'Fortune',
      name: 'Sun Lite Refined Oil', 
      weight: '1 L', 
      price: '₹150', 
      mrp: '₹180', 
      rating: 4.2,
      tag: '15% OFF',
      image: 'https://images.unsplash.com/photo-1626109333063-7267a376a22d?w=200' 
  },
];

const CATEGORY_TABS = ['All', 'Atta', 'Rice', 'Oil', 'Dals', 'Spices'];

export default function CategoryListingScreen({ route, navigation }) {
  const { category } = route.params || { category: 'Staples' };
  const [activeTab, setActiveTab] = useState('All');
  const [filterVisible, setFilterVisible] = useState(false);

  const handleAdd = (item) => {
    // Add to cart logic
    alert(`${item.name} added to cart`);
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.9}
    >
      {/* Left: Image */}
      <View style={styles.imageBox}>
         <Image source={{ uri: item.image }} style={styles.image} />
         {item.tag && (
             <View style={styles.tagBadge}>
                <Text style={styles.tagText}>{item.tag}</Text>
             </View>
         )}
      </View>

      {/* Center: Details */}
      <View style={styles.content}>
         <Text style={styles.brandName}>{item.brand}</Text>
         <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
         <Text style={styles.weight}>{item.weight}</Text>
         
         <View style={styles.ratingRow}>
            <View style={styles.starBadge}>
                <Text style={styles.starText}>{item.rating}</Text>
                <Ionicons name="star" size={10} color="#fff" />
            </View>
            <Text style={styles.ratingCount}>(124)</Text>
         </View>
      </View>

      {/* Right: Price & Action */}
      <View style={styles.actionColumn}>
         <View>
             <Text style={styles.price}>{item.price}</Text>
             <Text style={styles.mrp}>{item.mrp}</Text>
         </View>
         <TouchableOpacity style={styles.addBtn} onPress={() => handleAdd(item)}>
             <Text style={styles.addBtnText}>ADD</Text>
         </TouchableOpacity>
      </View>

    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#FFF8E1" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
           <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category}</Text>
        <View style={styles.headerRight}>
           <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Search')}>
              <Ionicons name="search-outline" size={24} color="#1F2937" />
           </TouchableOpacity>
           <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Cart')}>
              <Ionicons name="cart-outline" size={24} color="#1F2937" />
           </TouchableOpacity>
        </View>
      </View>

      {/* Category Tabs */}
      <View style={styles.tabSection}>
         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
            {CATEGORY_TABS.map((tab) => (
               <TouchableOpacity 
                  key={tab} 
                  style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
                  onPress={() => setActiveTab(tab)}
               >
                  <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
               </TouchableOpacity>
            ))}
         </ScrollView>
      </View>

      {/* Filter Strip */}
      <View style={styles.filterStrip}>
         <Text style={styles.resultCount}>{PRODUCTS.length} Items</Text>
         <TouchableOpacity style={styles.filterBtn} onPress={() => setFilterVisible(true)}>
             <Ionicons name="options-outline" size={16} color="#12783D" />
             <Text style={styles.filterBtnText}>Sort & Filter</Text>
         </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={PRODUCTS}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterVisible}
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Sort & Filter</Text>
                    <TouchableOpacity onPress={() => setFilterVisible(false)}>
                        <Ionicons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.filterSectionTitle}>Sort By</Text>
                <TouchableOpacity style={styles.radioOption}>
                    <Ionicons name="radio-button-on" size={20} color="#12783D" />
                    <Text style={styles.radioText}>Relevance</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioOption}>
                    <Ionicons name="radio-button-off" size={20} color="#666" />
                    <Text style={styles.radioText}>Price: Low to High</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.applyBtn} onPress={() => setFilterVisible(false)}>
                    <Text style={styles.applyBtnText}>Apply Filters</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' }, // Light Grey Background
  
  // Header
  header: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff', elevation: 2
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
  headerRight: { flexDirection: 'row', gap: 16 },
  iconBtn: { padding: 4 },

  // Tabs
  tabSection: { backgroundColor: '#fff', paddingBottom: 12 },
  tabScroll: { paddingHorizontal: 16, gap: 12 },
  tabItem: { 
      paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, 
      backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: 'transparent'
  },
  activeTabItem: { backgroundColor: '#E8F5E9', borderColor: '#12783D' },
  tabText: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  activeTabText: { color: '#12783D', fontWeight: '700' },

  // Filter Strip
  filterStrip: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      paddingHorizontal: 16, paddingVertical: 12
  },
  resultCount: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  filterBtn: { 
      flexDirection: 'row', alignItems: 'center', gap: 4,
      backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8,
      borderWidth: 1, borderColor: '#E0E0E0'
  },
  filterBtnText: { fontSize: 12, fontWeight: '700', color: '#12783D' },

  // List
  listContent: { paddingHorizontal: 16, paddingBottom: 20 },
  
  // Product Card
  card: {
      flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16,
      padding: 12, marginBottom: 12, elevation: 1
  },
  imageBox: { width: 80, height: 80, marginRight: 12, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%', resizeMode: 'contain' },
  tagBadge: {
      position: 'absolute', top: 0, left: 0,
      backgroundColor: '#12783D', paddingHorizontal: 6, paddingVertical: 2, 
      borderRadius: 4, borderTopLeftRadius: 8
  },
  tagText: { color: '#fff', fontSize: 8, fontWeight: '700' },

  content: { flex: 1, justifyContent: 'center' },
  brandName: { fontSize: 11, color: '#6B7280', fontWeight: '600', marginBottom: 2 },
  productName: { fontSize: 14, fontWeight: '700', color: '#1F2937', marginBottom: 4, lineHeight: 18 },
  weight: { fontSize: 12, color: '#9CA3AF', marginBottom: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  starBadge: { 
      flexDirection: 'row', alignItems: 'center', gap: 2, 
      backgroundColor: '#22C55E', paddingHorizontal: 4, paddingVertical: 1, borderRadius: 4 
  },
  starText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  ratingCount: { fontSize: 10, color: '#9CA3AF' },

  // Right Action Column
  actionColumn: { alignItems: 'flex-end', justifyContent: 'space-between' },
  price: { fontSize: 16, fontWeight: '800', color: '#1F2937' },
  mrp: { fontSize: 11, color: '#9CA3AF', textDecorationLine: 'line-through' },
  
  addBtn: {
      backgroundColor: '#F0FDF4', paddingHorizontal: 16, paddingVertical: 6, 
      borderRadius: 8, borderWidth: 1, borderColor: '#12783D'
  },
  addBtnText: { color: '#12783D', fontSize: 12, fontWeight: '800' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700' },
  filterSectionTitle: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 12 },
  radioOption: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  radioText: { fontSize: 16, color: '#333' },
  applyBtn: { backgroundColor: '#12783D', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  applyBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
