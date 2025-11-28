import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function OrdersTabScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'history'

  const activeOrders = [
    { id: '1', orderId: '#12345', status: 'Out for Delivery', items: 'Aashirvaad Atta, Amul Butter + 2 more', total: '₹485', date: 'Today, 2:30 PM' },
  ];

  const pastOrders = [
    { id: '2', orderId: '#11223', status: 'Delivered', items: 'Tata Salt, Sugar, Maggi', total: '₹210', date: 'Yesterday' },
    { id: '3', orderId: '#10101', status: 'Delivered', items: 'Fortune Oil, Rice', total: '₹850', date: '20 Nov 2025' },
  ];

  const renderOrder = ({ item, isHistory }) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetails', { orderId: item.orderId })}
    >
      <View style={styles.cardHeader}>
        <View>
           <Text style={styles.orderId}>Order {item.orderId}</Text>
           <Text style={styles.orderDate}>{item.date}</Text>
        </View>
        <View style={[styles.statusTag, isHistory ? styles.statusDelivered : styles.statusActive]}>
           <Text style={[styles.statusText, isHistory ? styles.textDelivered : styles.textActive]}>
             {item.status}
           </Text>
        </View>
      </View>

      <View style={styles.divider} />
      
      <Text style={styles.itemsText}>{item.items}</Text>
      
      <View style={styles.cardFooter}>
         <Text style={styles.totalText}>Total: <Text style={styles.totalAmount}>{item.total}</Text></Text>
         
         {!isHistory ? (
           <TouchableOpacity 
             style={styles.trackButton}
             onPress={() => navigation.navigate('OrderTracking')}
           >
             <Text style={styles.trackText}>Track Order</Text>
             <Ionicons name="chevron-forward" size={16} color="#fff" />
           </TouchableOpacity>
         ) : (
            <TouchableOpacity 
              style={styles.reorderButton}
              onPress={() => navigation.navigate('OrderDetails', { orderId: item.orderId })}
            >
              <Text style={styles.reorderText}>Reorder</Text>
              <Ionicons name="refresh" size={16} color="#12783D" />
            </TouchableOpacity>
         )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>History</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={activeTab === 'active' ? activeOrders : pastOrders}
        renderItem={({ item }) => renderOrder({ item, isHistory: activeTab === 'history' })}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
             <Text style={styles.emptyText}>No orders found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { padding: 16, backgroundColor: '#fff', elevation: 2 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },

  tabContainer: { flexDirection: 'row', padding: 16, backgroundColor: '#fff' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: '#12783D' },
  tabText: { fontSize: 16, color: '#888', fontWeight: '600' },
  activeTabText: { color: '#12783D' },

  listContent: { padding: 16 },
  
  orderCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  orderId: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  orderDate: { fontSize: 12, color: '#888', marginTop: 2 },
  
  statusTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  statusActive: { backgroundColor: '#E8F5E9' },
  statusDelivered: { backgroundColor: '#F0F0F0' },
  statusText: { fontSize: 12, fontWeight: 'bold' },
  textActive: { color: '#12783D' },
  textDelivered: { color: '#666' },

  divider: { height: 1, backgroundColor: '#eee', marginVertical: 12 },
  itemsText: { fontSize: 14, color: '#555', marginBottom: 12, lineHeight: 20 },
  
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalText: { fontSize: 14, color: '#666' },
  totalAmount: { fontWeight: 'bold', color: '#333', fontSize: 16 },
  
  trackButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#12783D', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  trackText: { color: '#fff', fontWeight: 'bold', marginRight: 4, fontSize: 12 },

  reorderButton: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#12783D', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  reorderText: { color: '#12783D', fontWeight: 'bold', marginRight: 4, fontSize: 12 },

  emptyState: { alignItems: 'center', marginTop: 40 },
  emptyText: { color: '#888' },
});



