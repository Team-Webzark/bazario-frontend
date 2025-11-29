// panels/customer/screens/PaymentScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  StatusBar,
  Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentScreen({ navigation, route }) {
  const { selectedAddress } = route.params || {};
  const [selectedMethod, setSelectedMethod] = useState('razorpay'); // 'razorpay' or 'cod'
  const [loading, setLoading] = useState(false);

// In PaymentScreen.js

const handlePlaceOrder = () => {
  setLoading(true);

  setTimeout(() => {
    setLoading(false);
    // ✅ Correctly navigate to Confirmation Screen
    navigation.replace('OrderConfirmation'); 
  }, 2000);
};


  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>

      {/* Address Summary (Optional but helpful) */}
      {selectedAddress && (
        <View style={styles.addressBanner}>
            <Ionicons name="location-outline" size={16} color="#6B7280" />
            <Text style={styles.addressText} numberOfLines={1}>
                Delivering to: {selectedAddress.type}
            </Text>
        </View>
      )}

      {/* Total Amount Banner */}
      <View style={styles.amountBanner}>
        <Text style={styles.amountLabel}>Total Payable</Text>
        <Text style={styles.amountValue}>₹485</Text>
      </View>

      {/* Payment Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferred Payment</Text>
        
        {/* Razorpay Option */}
        <TouchableOpacity 
          style={[styles.optionCard, selectedMethod === 'razorpay' && styles.selectedOption]}
          onPress={() => setSelectedMethod('razorpay')}
          activeOpacity={0.8}
        >
          <View style={styles.row}>
             <View style={[styles.iconBox, { backgroundColor: '#E0F2F1' }]}>
                <Ionicons name="card-outline" size={24} color="#00897B" />
             </View>
             <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Pay Online</Text>
                <Text style={styles.optionSub}>UPI, Cards, NetBanking</Text>
             </View>
          </View>
          <View style={styles.radioOuter}>
             {selectedMethod === 'razorpay' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        {/* COD Option */}
        <TouchableOpacity 
          style={[styles.optionCard, selectedMethod === 'cod' && styles.selectedOption]}
          onPress={() => setSelectedMethod('cod')}
          activeOpacity={0.8}
        >
           <View style={styles.row}>
             <View style={[styles.iconBox, { backgroundColor: '#FFF3E0' }]}>
                <Ionicons name="cash-outline" size={24} color="#FB8C00" />
             </View>
             <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Cash on Delivery</Text>
                <Text style={styles.optionSub}>Pay when order arrives</Text>
             </View>
          </View>
          <View style={styles.radioOuter}>
             {selectedMethod === 'cod' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      </View>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.payButton}
          onPress={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={styles.btnContent}>
                <Text style={styles.payBtnText}>
                {selectedMethod === 'cod' ? 'Place Order' : 'Pay & Order'}
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
            </View>
          )}
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
  backBtn: { marginRight: 16 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#111827' },
  
  // Address Banner
  addressBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: '#F3F4F6',
      gap: 6
  },
  addressText: { fontSize: 13, color: '#6B7280', fontWeight: '500' },

  // Amount Banner
  amountBanner: { 
      padding: 32, 
      backgroundColor: '#fff', 
      alignItems: 'center', 
      marginBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6'
  },
  amountLabel: { color: '#6B7280', fontSize: 14, fontWeight: '500', marginBottom: 8 },
  amountValue: { color: '#111827', fontSize: 36, fontWeight: '800' },

  // Section
  section: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 16, color: '#374151' },
  
  // Option Card
  optionCard: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      backgroundColor: '#fff', 
      padding: 16, 
      borderRadius: 16, 
      marginBottom: 12, 
      borderWidth: 1.5,
      borderColor: '#F3F4F6',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2
  },
  selectedOption: { 
      borderColor: '#12783D', 
      backgroundColor: '#F0FDF4' 
  },
  
  row: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { 
      width: 48, 
      height: 48, 
      borderRadius: 24, 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginRight: 16 
  },
  optionInfo: { justifyContent: 'center' },
  optionTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 2 },
  optionSub: { fontSize: 13, color: '#6B7280' },
  
  // Radio
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#12783D',
  },

  // Footer
  footer: { 
      position: 'absolute', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      padding: 20, 
      backgroundColor: '#fff', 
      borderTopWidth: 1,
      borderTopColor: '#F3F4F6',
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.05,
      shadowRadius: 8
  },
  payButton: { 
      backgroundColor: '#12783D', 
      paddingVertical: 16, 
      borderRadius: 12, 
      alignItems: 'center',
      shadowColor: '#12783D',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4
  },
  btnContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8
  },
  payBtnText: { 
      color: '#fff', 
      fontWeight: '700', 
      fontSize: 16 
  },
});
