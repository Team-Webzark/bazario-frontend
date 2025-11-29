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
import BackButton from '../../universalLogins/components/BackButton';

export default function CartScreen({ navigation }) {
  // --- MOCK DATA (Initially populated) ---
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Aashirvaad Atta', weight: '5 kg', price: 240, quantity: 1, image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Fortune Sun Lite Oil', weight: '1 L', price: 150, quantity: 2, image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Amul Butter', weight: '500g', price: 280, quantity: 1, image: 'https://via.placeholder.com/100' },
  ]);

  const [recommendations] = useState([
    { id: '4', name: 'Tata Salt', price: 25, image: 'https://via.placeholder.com/100' },
    { id: '5', name: 'Sugar', price: 45, image: 'https://via.placeholder.com/100' },
  ]);

  // --- LOGIC ---
  const updateQuantity = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Calculations
  const itemTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = itemTotal > 500 ? 0 : 40; // Free delivery above ₹500
  const grandTotal = itemTotal + deliveryFee;

  // --- RENDER ITEMS ---
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.itemWeight}>{item.weight}</Text>
        <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
      </View>

      <View style={styles.actionsContainer}>
        {/* Stepper */}
        <View style={styles.stepper}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.stepBtn}>
            <Ionicons name="remove" size={16} color="#12783D" />
          </TouchableOpacity>
          <Text style={styles.stepValue}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.stepBtn}>
            <Ionicons name="add" size={16} color="#12783D" />
          </TouchableOpacity>
        </View>
        
        {/* Remove Button */}
        <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeBtn}>
           <Ionicons name="trash-outline" size={18} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Empty State
  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={80} color="#ccc" />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySub}>Add items to start shopping</Text>
        <TouchableOpacity 
          style={styles.browseButton}
          onPress={() => navigation.navigate('HomeTab')}
        >
          <Text style={styles.browseBtnText}>Browse Products</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <BackButton navigation={navigation} style={{ position: 'absolute', top: 16, left: 16, zIndex: 10 }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <Text style={styles.itemCount}>{cartItems.length} items</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Cart Items List */}
        <View style={styles.section}>
          {cartItems.map((item) => (
             <View key={item.id} style={{ marginBottom: 16 }}>
                {renderCartItem({ item })}
             </View>
          ))}
        </View>

        {/* Recommendations Horizontal Scroll */}
        <View style={styles.recSection}>
            <Text style={styles.recTitle}>You might be missing</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 16 }}>
                {recommendations.map(item => (
                    <View key={item.id} style={styles.recCard}>
                        <Image source={{ uri: item.image }} style={styles.recImage} />
                        <Text style={styles.recName}>{item.name}</Text>
                        <View style={styles.recFooter}>
                            <Text style={styles.recPrice}>₹{item.price}</Text>
                            <TouchableOpacity style={styles.recAddBtn}>
                                <Text style={styles.recAddText}>ADD</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>

        {/* Bill Details */}
        <View style={styles.billSection}>
            <Text style={styles.billTitle}>Bill Details</Text>
            
            <View style={styles.billRow}>
                <Text style={styles.billLabel}>Item Total</Text>
                <Text style={styles.billValue}>₹{itemTotal}</Text>
            </View>
            
            <View style={styles.billRow}>
                <Text style={styles.billLabel}>Delivery Fee</Text>
                <Text style={[styles.billValue, deliveryFee === 0 && styles.freeText]}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </Text>
            </View>

             <View style={styles.billRow}>
                <Text style={styles.billLabel}>Platform Fee</Text>
                <Text style={styles.billValue}>₹5</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.billRowTotal}>
                <Text style={styles.totalLabel}>To Pay</Text>
                <Text style={styles.totalValue}>₹{grandTotal + 5}</Text>
            </View>
        </View>

        {/* Extra padding for sticky footer */}
        <View style={{ height: 100 }} />

      </ScrollView>

      {/* Sticky Checkout Bar */}
      <View style={styles.checkoutFooter}>
         <View>
            <Text style={styles.footerTotal}>₹{grandTotal + 5}</Text>
            <Text style={styles.viewDetails}>View detailed bill</Text>
         </View>
         <TouchableOpacity 
            style={styles.payButton}
            onPress={() => navigation.navigate('AddressSelection')}
         >
            <Text style={styles.payBtnText}>Proceed to Pay</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 8 }} />
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  
  header: { backgroundColor: '#fff', padding: 16, elevation: 2, flexDirection: 'row', alignItems: 'baseline' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  itemCount: { fontSize: 14, color: '#888', marginLeft: 8 },

  scrollContent: { paddingTop: 16 },
  section: { backgroundColor: '#fff', padding: 16, marginBottom: 16 },

  // Cart Item
  cartItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  itemImage: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#f9f9f9' },
  itemInfo: { flex: 1, marginLeft: 12 },
  itemName: { fontSize: 14, color: '#333', fontWeight: '500' },
  itemWeight: { fontSize: 12, color: '#888', marginTop: 2 },
  itemPrice: { fontSize: 14, fontWeight: 'bold', color: '#333', marginTop: 4 },
  
  actionsContainer: { alignItems: 'flex-end' },
  stepper: { 
    flexDirection: 'row', alignItems: 'center', 
    borderWidth: 1, borderColor: '#12783D', borderRadius: 6, 
    backgroundColor: '#F0FDF4', paddingVertical: 4 
  },
  stepBtn: { paddingHorizontal: 8 },
  stepValue: { fontSize: 14, fontWeight: 'bold', color: '#12783D', width: 20, textAlign: 'center' },
  removeBtn: { marginTop: 8, padding: 4 },

  // Recommendations
  recSection: { marginBottom: 16 },
  recTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginLeft: 16, marginBottom: 12 },
  recCard: { 
    width: 110, backgroundColor: '#fff', borderRadius: 8, padding: 8, marginRight: 12,
    elevation: 1
  },
  recImage: { width: '100%', height: 80, resizeMode: 'contain', marginBottom: 8 },
  recName: { fontSize: 12, color: '#333', height: 32 },
  recFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  recPrice: { fontSize: 12, fontWeight: 'bold' },
  recAddBtn: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, borderWidth: 1, borderColor: '#12783D' },
  recAddText: { fontSize: 10, color: '#12783D', fontWeight: 'bold' },

  // Bill Details
  billSection: { backgroundColor: '#fff', padding: 16 },
  billTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 16 },
  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  billLabel: { color: '#666', fontSize: 14 },
  billValue: { color: '#333', fontSize: 14, fontWeight: '500' },
  freeText: { color: '#12783D', fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 12 },
  billRowTotal: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  totalValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },

  // Sticky Footer
  checkoutFooter: { 
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff', padding: 16, elevation: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderTopWidth: 1, borderTopColor: '#eee'
  },
  footerTotal: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  viewDetails: { fontSize: 12, color: '#12783D', fontWeight: '600' },
  payButton: { 
    backgroundColor: '#12783D', flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8
  },
  payBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  // Empty State
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginTop: 16 },
  emptySub: { fontSize: 14, color: '#888', marginTop: 8, marginBottom: 24 },
  browseButton: { backgroundColor: '#12783D', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 30 },
  browseBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});



