// panels/customer/screens/OrdersTabScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  Modal
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function OrdersTabScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Ongoing');
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState('All');

  // --- MOCK DATA ---
  const ongoingOrder = { 
    id: '1', 
    items: 'Fresh Vegetables Mix, Atta, Milk', 
    status: 'Out for Delivery', 
    eta: 'Arriving in 12 mins',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400'
  };

  const forgotItems = [
    { id: '1', name: 'Coriander', price: '₹10', image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Lemon', price: '₹15', image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Green Chilli', price: '₹10', image: 'https://via.placeholder.com/100' },
    { id: '4', name: 'Ginger', price: '₹20', image: 'https://via.placeholder.com/100' },
  ];

  const historyOrders = [
    { id: '2', store: 'Store Fresh', items: 'Atta, Rice, Oil', total: '₹1200', status: 'Delivered', date: 'Yesterday', image: 'https://via.placeholder.com/100' },
    { id: '3', store: 'Green Valley', items: 'Vegetables', total: '₹350', status: 'Delivered', date: '20 Nov', image: 'https://via.placeholder.com/100' },
  ];

  // --- RENDER COMPONENTS ---

  const renderHeader = () => (
    <View style={styles.header}>
        <Text style={styles.screenTitle}>My Orders</Text>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setShowFilter(true)}>
            <Ionicons name="filter" size={20} color="#333" />
        </TouchableOpacity>
    </View>
  );

  const renderTabs = () => (
      <View style={styles.tabContainer}>
          {['Ongoing', 'History'].map((tab) => (
              <TouchableOpacity 
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[styles.tabItem, activeTab === tab && styles.activeTab]}
              >
                  <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              </TouchableOpacity>
          ))}
      </View>
  );

  // --- ONGOING TAB CONTENT ---
  const renderOngoingContent = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Card (Improved Spacing) */}
        <View style={styles.heroCard}>
            <View style={styles.heroTopRow}>
                <View style={styles.liveBadge}>
                    <View style={styles.pulseDot} />
                    <Text style={styles.liveText}>LIVE TRACKING</Text>
                </View>
                <Text style={styles.etaText}>{ongoingOrder.eta}</Text>
            </View>

            <View style={styles.heroMiddle}>
                <Text style={styles.heroTitle} numberOfLines={2}>
                    {ongoingOrder.items}
                </Text>
                <Text style={styles.heroStatus}>{ongoingOrder.status}</Text>
            </View>

            <View style={styles.heroBottom}>
                <TouchableOpacity 
                    style={styles.trackBtn}
                    onPress={() => navigation.navigate('OrderTracking')}
                >
                    <Text style={styles.trackBtnText}>Track Order</Text>
                    <Ionicons name="arrow-forward" size={16} color="#D97706" />
                </TouchableOpacity>
                <Image source={{ uri: ongoingOrder.image }} style={styles.heroImage} />
            </View>
        </View>

        {/* "Did you forget" Section */}
        <View style={styles.suggestionSection}>
            <Text style={styles.sectionTitle}>Bhul to nahi gaye?</Text>
            <Text style={styles.sectionSub}>Add these to your next order</Text>
            
            <FlatList 
                data={forgotItems}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingVertical: 10 }}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.miniCard}>
                        <Image source={{ uri: item.image }} style={styles.miniImg} />
                        <Text style={styles.miniName}>{item.name}</Text>
                        <View style={styles.miniFooter}>
                            <Text style={styles.miniPrice}>{item.price}</Text>
                            <View style={styles.addIcon}>
                                <Ionicons name="add" size={14} color="#fff" />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    </ScrollView>
  );

  // --- HISTORY TAB CONTENT ---
  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyCard}>
        <View style={styles.cardHeader}>
            <View style={styles.storeInfo}>
                <Image source={{ uri: item.image }} style={styles.storeIcon} />
                <View>
                    <Text style={styles.storeName}>{item.store}</Text>
                    <Text style={styles.orderDate}>{item.date} • {item.total}</Text>
                </View>
            </View>
            <View style={styles.statusChip}>
                <Text style={styles.statusText}>{item.status}</Text>
            </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.cardFooter}>
            <Text style={styles.itemsText} numberOfLines={1}>{item.items}</Text>
            <TouchableOpacity style={styles.reorderBtn}>
                <Ionicons name="refresh" size={14} color="#12783D" />
                <Text style={styles.reorderText}>Reorder</Text>
            </TouchableOpacity>
        </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#FFFBF2" barStyle="dark-content" />
      
      {renderHeader()}
      {renderTabs()}

      <View style={styles.content}>
        {activeTab === 'Ongoing' ? renderOngoingContent() : (
            <FlatList
                data={historyOrders}
                renderItem={renderHistoryItem}
                keyExtractor={item => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            />
        )}
      </View>

      {/* Filter Modal (Same as before) */}
      <Modal visible={showFilter} transparent animationType="fade">
          <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowFilter(false)}>
              <View style={styles.filterModal}>
                  <Text style={styles.filterTitle}>Filter History</Text>
                  {['All', 'Delivered', 'Cancelled'].map(type => (
                      <TouchableOpacity 
                        key={type} 
                        style={styles.filterOption}
                        onPress={() => { setFilterType(type); setShowFilter(false); }}
                      >
                          <Text style={[styles.filterText, filterType === type && styles.selectedFilter]}>{type}</Text>
                          {filterType === type && <Ionicons name="checkmark" size={18} color="#12783D" />}
                      </TouchableOpacity>
                  ))}
              </View>
          </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF2' },
  
  header: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      paddingHorizontal: wp('5%'), paddingVertical: hp('2%'),
  },
  screenTitle: { fontSize: hp('3%'), fontWeight: '800', color: '#111827' },
  filterBtn: { padding: 8, backgroundColor: '#fff', borderRadius: 12, elevation: 2 },

  tabContainer: {
      flexDirection: 'row', backgroundColor: '#F3F4F6', marginHorizontal: wp('5%'),
      borderRadius: 16, padding: 4, marginBottom: hp('2%'),
  },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 12 },
  activeTab: { backgroundColor: '#fff', elevation: 2 },
  tabText: { fontSize: hp('1.8%'), fontWeight: '600', color: '#6B7280' },
  activeTabText: { color: '#111827', fontWeight: '700' },

  content: { flex: 1, paddingHorizontal: wp('5%') },

  // --- IMPROVED HERO CARD ---
  heroCard: {
      backgroundColor: '#D97706', // Burnt Orange
      borderRadius: 24,
      padding: wp('5%'),
      marginBottom: hp('3%'),
      elevation: 4,
      shadowColor: '#D97706', shadowOpacity: 0.3, shadowRadius: 10,
  },
  heroTopRow: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      marginBottom: hp('2%'),
  },
  liveBadge: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)',
      paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20,
  },
  pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4ADE80', marginRight: 6 },
  liveText: { color: '#fff', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  etaText: { color: '#fff', fontWeight: '700', fontSize: 12 },

  heroMiddle: { marginBottom: hp('2.5%') },
  heroTitle: { color: '#fff', fontSize: hp('2.4%'), fontWeight: '700', marginBottom: 6, lineHeight: 24 },
  heroStatus: { color: 'rgba(255,255,255,0.9)', fontSize: hp('1.8%'), fontWeight: '500' },

  heroBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  trackBtn: {
      backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center',
      paddingVertical: 10, paddingHorizontal: 20, borderRadius: 30, gap: 6,
  },
  trackBtnText: { color: '#D97706', fontWeight: '800', fontSize: hp('1.6%') },
  heroImage: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#fff' },

  // --- SUGGESTION SECTION ---
  suggestionSection: { marginTop: 10 },
  sectionTitle: { fontSize: hp('2.2%'), fontWeight: '800', color: '#1F2937', marginBottom: 4 },
  sectionSub: { fontSize: hp('1.6%'), color: '#6B7280', marginBottom: 16 },
  
  miniCard: {
      width: wp('28%'), backgroundColor: '#fff', borderRadius: 16, padding: 10, marginRight: 12,
      elevation: 2, marginBottom: 10,
  },
  miniImg: { width: '100%', height: 70, borderRadius: 8, resizeMode: 'contain', marginBottom: 8 },
  miniName: { fontSize: 12, fontWeight: '600', color: '#333', marginBottom: 6 },
  miniFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  miniPrice: { fontSize: 12, fontWeight: '700', color: '#12783D' },
  addIcon: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#12783D', alignItems: 'center', justifyContent: 'center' },

  // --- HISTORY CARD ---
  historyCard: {
      backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16,
      elevation: 1, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 8,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  storeInfo: { flexDirection: 'row', alignItems: 'center' },
  storeIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#f0f0f0', marginRight: 12 },
  storeName: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  orderDate: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  statusChip: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: '#ECFDF5' },
  statusText: { color: '#059669', fontSize: 11, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginBottom: 12 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemsText: { fontSize: 13, color: '#4B5563', flex: 1, marginRight: 16 },
  reorderBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1, borderColor: '#12783D', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  reorderText: { color: '#12783D', fontSize: 12, fontWeight: '700' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' },
  filterModal: { width: wp('70%'), backgroundColor: '#fff', borderRadius: 16, padding: 20, elevation: 10 },
  filterTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  filterOption: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  filterText: { fontSize: 16, color: '#4B5563' },
  selectedFilter: { color: '#12783D', fontWeight: '700' }
});
