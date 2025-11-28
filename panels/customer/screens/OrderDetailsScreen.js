import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function OrderDetailsScreen({ route, navigation }) {
  // Receive Order ID from previous screen
  const { orderId } = route.params || { orderId: '#12345' };

  // Mock Data (In real app, fetch from API)
  const order = {
    id: orderId,
    status: 'Delivered', 
    date: '25 Nov 2025, 02:30 PM',
    total: '₹485',
    items: [
      { id: '1', name: 'Aashirvaad Atta', quantity: 1, price: 240 },
      { id: '2', name: 'Amul Butter', quantity: 1, price: 245 }
    ],
    address: 'Flat 204, Skyline Apts, Civil Lines, Bareilly',
    paymentMethod: 'UPI'
  };

  // --- REORDER LOGIC ---
  const handleReorder = () => {
    Alert.alert(
      "Reorder items?",
      "This will add all items from this order to your current cart.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Yes, Reorder", 
          onPress: () => {
            navigation.navigate('Cart'); 
            // In real app: dispatch(addItemsToCart(order.items))
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Status Card */}
        <View style={styles.statusCard}>
           <View style={styles.statusHeader}>
              <Text style={styles.orderId}>{order.id}</Text>
              <View style={styles.statusBadge}>
                 <Text style={styles.statusText}>{order.status}</Text>
              </View>
           </View>
           <Text style={styles.dateText}>{order.date}</Text>
           <View style={styles.divider} />
           <Text style={styles.deliveredText}>
              <Ionicons name="checkmark-circle" size={16} color="#12783D" /> Delivered successfully
           </Text>
        </View>

        {/* Items List */}
        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Items in this order</Text>
           {order.items.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                 <View style={styles.qtyBox}>
                    <Text style={styles.qtyText}>{item.quantity}x</Text>
                 </View>
                 <Text style={styles.itemName}>{item.name}</Text>
                 <Text style={styles.itemPrice}>₹{item.price}</Text>
              </View>
           ))}
           <View style={styles.divider} />
           <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Grand Total</Text>
              <Text style={styles.totalValue}>{order.total}</Text>
           </View>
        </View>

        {/* Delivery Info */}
        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Delivery Information</Text>
           <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Address</Text>
              <Text style={styles.detailValue}>{order.address}</Text>
           </View>
           <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Mode</Text>
              <Text style={styles.detailValue}>{order.paymentMethod}</Text>
           </View>
        </View>

      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
         <TouchableOpacity 
            style={styles.rateButton}
            onPress={() => navigation.navigate('OrderRating')}
         >
            <Text style={styles.rateText}>Rate Order</Text>
         </TouchableOpacity>
         
         <TouchableOpacity 
            style={styles.reorderButton}
            onPress={handleReorder}
         >
            <Text style={styles.reorderText}>Reorder Items</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', elevation: 2 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 16, color: '#333' },

  content: { padding: 16, paddingBottom: 100 },

  statusCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 16, elevation: 1 },
  statusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderId: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  statusBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  statusText: { color: '#12783D', fontSize: 12, fontWeight: 'bold' },
  dateText: { color: '#888', fontSize: 12, marginTop: 4 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 12 },
  deliveredText: { color: '#333', fontSize: 14 },

  section: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 16 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#888', marginBottom: 12 },
  
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  qtyBox: { backgroundColor: '#F0F2F5', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginRight: 12 },
  qtyText: { fontSize: 12, fontWeight: 'bold', color: '#333' },
  itemName: { flex: 1, fontSize: 14, color: '#333' },
  itemPrice: { fontSize: 14, fontWeight: 'bold', color: '#333' },

  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  totalValue: { fontSize: 16, fontWeight: 'bold', color: '#12783D' },

  detailRow: { marginBottom: 12 },
  detailLabel: { fontSize: 12, color: '#888', marginBottom: 2 },
  detailValue: { fontSize: 14, color: '#333', lineHeight: 20 },

  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 16, backgroundColor: '#fff', elevation: 10, flexDirection: 'row', justifyContent: 'space-between' },
  rateButton: { flex: 1, padding: 14, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#ddd', marginRight: 8 },
  rateText: { color: '#333', fontWeight: 'bold' },
  reorderButton: { flex: 1, backgroundColor: '#12783D', padding: 14, borderRadius: 8, alignItems: 'center', marginLeft: 8 },
  reorderText: { color: '#fff', fontWeight: 'bold' },
});



