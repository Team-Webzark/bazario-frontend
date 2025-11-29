// panels/customer/screens/CartScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Aashirvaad Whole Wheat Atta', weight: '5 kg', price: 240, quantity: 1, image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Fortune Sun Lite Oil', weight: '1 L', price: 150, quantity: 2, image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Amul Butter Pasteurized', weight: '500g', price: 280, quantity: 1, image: 'https://via.placeholder.com/100' },
  ]);

  const [recommendations] = useState([
    { id: '4', name: 'Tata Salt', price: 25, image: 'https://via.placeholder.com/100' },
    { id: '5', name: 'Sugar', price: 45, image: 'https://via.placeholder.com/100' },
    { id: '6', name: 'Tea', price: 120, image: 'https://via.placeholder.com/100' },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const itemTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const grandTotal = itemTotal + 5; // + Platform fee

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <View>
           <Text style={styles.headerTitle}>Shopping Cart</Text>
           <Text style={styles.headerSubtitle}>{cartItems.length} Items • {cartItems.reduce((a, b) => a + b.quantity, 0)} Units</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Cart Items */}
        <View style={styles.cartList}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.itemWeight}>{item.weight}</Text>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
              </View>

              <View style={styles.counterContainer}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.counterBtn}>
                  <Ionicons name="remove" size={16} color="#12783D" />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.counterBtn}>
                  <Ionicons name="add" size={16} color="#12783D" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Recommendations */}
        <View style={styles.recSection}>
           <Text style={styles.sectionTitle}>You might need</Text>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recList}>
              {recommendations.map(item => (
                 <TouchableOpacity key={item.id} style={styles.recCard}>
                    <View style={styles.recImageContainer}>
                       <Image source={{ uri: item.image }} style={styles.recImage} />
                       <TouchableOpacity style={styles.recAddBtn}>
                          <Ionicons name="add" size={16} color="#fff" />
                       </TouchableOpacity>
                    </View>
                    <Text style={styles.recName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.recPrice}>₹{item.price}</Text>
                 </TouchableOpacity>
              ))}
           </ScrollView>
        </View>

        {/* Bill Summary */}
        <View style={styles.billCard}>
           <Text style={styles.sectionTitle}>Bill Details</Text>
           <View style={styles.billRow}>
              <Text style={styles.billLabel}>Item Total</Text>
              <Text style={styles.billValue}>₹{itemTotal}</Text>
           </View>
           <View style={styles.billRow}>
              <Text style={styles.billLabel}>Delivery Fee</Text>
              <Text style={[styles.billValue, { color: '#12783D' }]}>Free</Text>
           </View>
           <View style={styles.billRow}>
              <Text style={styles.billLabel}>Platform Fee</Text>
              <Text style={styles.billValue}>₹5</Text>
           </View>
           <View style={styles.divider} />
           <View style={styles.billRow}>
              <Text style={styles.totalLabel}>To Pay</Text>
              <Text style={styles.totalValue}>₹{grandTotal}</Text>
           </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.footer}>
         <View style={styles.footerInfo}>
            <Text style={styles.footerTotal}>₹{grandTotal}</Text>
            <Text style={styles.viewBillText}>View Bill</Text>
         </View>
         <TouchableOpacity 
            style={styles.checkoutBtn}
            onPress={() => navigation.navigate('AddressSelection')}
         >
            <Text style={styles.checkoutText}>Proceed to Pay</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
         </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: { marginRight: 16 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#111827' },
  headerSubtitle: { fontSize: 13, color: '#6B7280' },

  scrollContent: { padding: 20 },

  // Cart List
  cartList: { marginBottom: 24 },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: { width: 64, height: 64, borderRadius: 12, backgroundColor: '#F3F4F6' },
  itemInfo: { flex: 1, marginLeft: 16, marginRight: 8 },
  itemName: { fontSize: 15, fontWeight: '600', color: '#374151', marginBottom: 4 },
  itemWeight: { fontSize: 13, color: '#9CA3AF', marginBottom: 4 },
  itemPrice: { fontSize: 15, fontWeight: '700', color: '#111827' },

  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  counterBtn: { padding: 6 },
  counterValue: { fontSize: 14, fontWeight: '700', color: '#12783D', width: 20, textAlign: 'center' },

  // Recommendations
  recSection: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#374151', marginBottom: 12 },
  recList: { paddingRight: 20 },
  recCard: { width: 100, marginRight: 12 },
  recImageContainer: {
    width: 100, height: 100, backgroundColor: '#fff', borderRadius: 16,
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
    borderWidth: 1, borderColor: '#F3F4F6', position: 'relative'
  },
  recImage: { width: 60, height: 60, resizeMode: 'contain' },
  recAddBtn: {
    position: 'absolute', bottom: 6, right: 6,
    backgroundColor: '#12783D', width: 24, height: 24, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center'
  },
  recName: { fontSize: 13, color: '#4B5563', marginBottom: 2 },
  recPrice: { fontSize: 13, fontWeight: '700', color: '#111827' },

  // Bill
  billCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  billLabel: { fontSize: 14, color: '#6B7280' },
  billValue: { fontSize: 14, color: '#374151', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 12 },
  totalLabel: { fontSize: 16, fontWeight: '700', color: '#111827' },
  totalValue: { fontSize: 16, fontWeight: '700', color: '#111827' },

  // Footer
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  footerInfo: { justifyContent: 'center' },
  footerTotal: { fontSize: 18, fontWeight: '800', color: '#111827' },
  viewBillText: { fontSize: 12, color: '#12783D', fontWeight: '600' },
  
  checkoutBtn: {
    backgroundColor: '#12783D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#12783D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
