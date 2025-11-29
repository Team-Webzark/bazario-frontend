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
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

// --- MOCK DATA ---
const PRODUCTS = [
  { 
      id: '1', 
      name: 'Aashirvaad Atta', 
      weight: '5 kg', 
      price: '₹240', 
      mrp: '₹280', 
      rating: 4.5,
      tag: 'Best for you',
      store: 'Sharma General Store',
      time: '15-25 mins',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200' 
  },
  { 
      id: '2', 
      name: 'Fortune Sun Lite Oil', 
      weight: '1 L', 
      price: '₹150', 
      mrp: '₹180', 
      rating: 4.2,
      tag: 'Budget pick',
      store: 'Daily Needs',
      time: '20-30 mins',
      image: 'https://images.unsplash.com/photo-1626109333063-7267a376a22d?w=200' 
  },
];

const TABS = ['All', 'Pill filters', 'Brand'];

export default function CategoryListingScreen({ route, navigation }) {
  const { category } = route.params || { category: 'Staples' };
  const [activeTab, setActiveTab] = useState('All');

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.9}
    >
      
      {/* 1. Image Section */}
      <View style={styles.imageContainer}>
         <Image source={{ uri: item.image }} style={styles.image} />
         {item.tag === 'Best for you' && (
             <View style={styles.sealBadge}>
                <Text style={styles.sealText}>Best{'\n'}You</Text>
             </View>
         )}
      </View>

      {/* 2. Content Section */}
      <View style={styles.content}>
         {/* Top Tag */}
         <View style={styles.tagWrapper}>
            <View style={styles.tagPill}>
                <Text style={styles.tagText}>{item.tag}</Text>
            </View>
         </View>

         <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
         
         {/* Weight & Rating */}
         <View style={styles.row}>
            <Text style={styles.label}>Weight</Text>
            <View style={styles.rating}>
                {[1,2,3,4].map(i => <Ionicons key={i} name="star" size={10} color="#FFC107" style={{ marginRight: 1 }} />)}
            </View>
         </View>

         {/* Price */}
         <View style={[styles.row, { marginTop: 6 }]}>
            <Text style={styles.priceLabel}>Sig <Text style={styles.price}>{item.price}</Text></Text>
            <Text style={styles.mrp}>{item.mrp} MRP</Text>
         </View>

         {/* Store Info */}
         <Text style={styles.storeInfo} numberOfLines={1}>From: {item.store} • {item.time}</Text>
      </View>

      {/* 3. Add Button (Vertically Centered) */}
      <TouchableOpacity style={styles.addBtn}>
         <Ionicons name="add" size={20} color="#374151" />
      </TouchableOpacity>

    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#FFF8E1" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
           <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category}</Text>
        <View style={styles.headerRight}>
           <TouchableOpacity style={styles.iconBtn}><Ionicons name="search-outline" size={22} color="#1F2937" /></TouchableOpacity>
           <TouchableOpacity style={styles.iconBtn}><Ionicons name="cart-outline" size={22} color="#1F2937" /></TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, alignItems: 'center' }}>
            {TABS.map((tab) => (
               <TouchableOpacity 
                  key={tab} 
                  style={styles.tabItem}
                  onPress={() => setActiveTab(tab)}
               >
                  <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                  {activeTab === tab && <View style={styles.activeLine} />}
               </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.filterBtn}>
               <Ionicons name="add" size={14} color="#1F2937" />
               <Text style={styles.filterBtnText}>Filter</Text>
            </TouchableOpacity>
         </ScrollView>
      </View>

      {/* Product List */}
      <FlatList
        data={PRODUCTS}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8E1' },
  
  // Header
  header: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      paddingHorizontal: wp('4%'), paddingVertical: hp('1.5%')
  },
  headerTitle: { fontSize: hp('2.4%'), fontWeight: '800', color: '#1F2937' },
  headerRight: { flexDirection: 'row', gap: 16 },
  iconBtn: { padding: 4 },

  // Tabs
  tabContainer: { height: 50 },
  tabItem: { marginRight: 24, height: '100%', justifyContent: 'center' },
  tabText: { fontSize: hp('1.7%'), color: '#9CA3AF', fontWeight: '600' },
  activeTabText: { color: '#1F2937', fontWeight: '800' },
  activeLine: { 
      width: 24, height: 3, backgroundColor: '#FF7043', borderRadius: 2, 
      position: 'absolute', bottom: 0, alignSelf: 'center'
  },
  filterBtn: { 
      flexDirection: 'row', alignItems: 'center', 
      borderWidth: 1, borderColor: '#1F2937', borderRadius: 20, 
      paddingHorizontal: 10, paddingVertical: 4, marginLeft: 12 
  },
  filterBtnText: { fontSize: 11, fontWeight: '700', color: '#1F2937', marginLeft: 4 },

  // List
  listContent: { paddingHorizontal: wp('4%'), paddingBottom: 20, paddingTop: 10 },
  
  card: {
      flexDirection: 'row', backgroundColor: '#fff', borderRadius: 20,
      padding: 12, marginBottom: 16, elevation: 2, alignItems: 'center',
      shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }
  },
  
  // Image Area
  imageContainer: { width: 80, height: 80, marginRight: 16, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%', resizeMode: 'contain' },
  sealBadge: {
      position: 'absolute', top: -6, right: -6,
      width: 28, height: 28, borderRadius: 14, 
      backgroundColor: '#FDE047', 
      justifyContent: 'center', alignItems: 'center',
      borderWidth: 1, borderColor: '#D97706', borderStyle: 'dashed', zIndex: 2
  },
  sealText: { fontSize: 6, fontWeight: 'bold', color: '#78350F', textAlign: 'center', lineHeight: 7 },

  // Content Area
  content: { flex: 1, paddingRight: 8 },
  
  tagWrapper: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 4 },
  tagPill: { backgroundColor: '#FFEDD5', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  tagText: { fontSize: 9, fontWeight: '700', color: '#9A3412' },

  name: { fontSize: hp('1.9%'), fontWeight: '800', color: '#1F2937', marginBottom: 6 },
  
  row: { flexDirection: 'row', alignItems: 'center' },
  label: { fontSize: 11, color: '#6B7280', marginRight: 6 },
  rating: { flexDirection: 'row', alignItems: 'center' },
  
  priceLabel: { fontSize: 11, color: '#6B7280', fontWeight: '600', marginRight: 8 },
  price: { fontSize: 13, fontWeight: '800', color: '#1F2937' },
  mrp: { fontSize: 11, color: '#EF4444', textDecorationLine: 'line-through' },
  
  storeInfo: { fontSize: 10, color: '#9CA3AF', marginTop: 6 },

  // Add Btn
  addBtn: {
      width: 36, height: 36, borderRadius: 18,
      backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB',
      justifyContent: 'center', alignItems: 'center'
  },
});
