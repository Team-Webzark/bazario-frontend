import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButton from '../../universalLogins/components/BackButton';

export default function PaymentScreen({ navigation }) {
  const [selectedMethod, setSelectedMethod] = useState('razorpay'); // 'razorpay' or 'cod'
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = () => {
    setLoading(true);

    // Simulate Payment Processing Delay
    setTimeout(() => {
      setLoading(false);
      // Navigate to Success Screen
      navigation.replace('OrderConfirmation');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <BackButton navigation={navigation} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 40 }} />
      </View>

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
        >
          <View style={styles.row}>
             <View style={styles.iconBox}>
                <Ionicons name="card" size={24} color="#12783D" />
             </View>
             <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Pay Online (UPI / Cards)</Text>
                <Text style={styles.optionSub}>Fast & Secure</Text>
             </View>
          </View>
          <View style={styles.radio}>
             {selectedMethod === 'razorpay' && <View style={styles.radioActive} />}
          </View>
        </TouchableOpacity>

        {/* COD Option */}
        <TouchableOpacity 
          style={[styles.optionCard, selectedMethod === 'cod' && styles.selectedOption]}
          onPress={() => setSelectedMethod('cod')}
        >
           <View style={styles.row}>
             <View style={styles.iconBox}>
                <Ionicons name="cash" size={24} color="#F79009" />
             </View>
             <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Cash on Delivery</Text>
                <Text style={styles.optionSub}>Pay when order arrives</Text>
             </View>
          </View>
          <View style={styles.radio}>
             {selectedMethod === 'cod' && <View style={styles.radioActive} />}
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
            <Text style={styles.payBtnText}>
              {selectedMethod === 'cod' ? 'Place Order' : 'Pay & Order'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', elevation: 2 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 16, color: '#333' },
  
  amountBanner: { padding: 20, backgroundColor: '#fff', alignItems: 'center', marginBottom: 12 },
  amountLabel: { color: '#666', fontSize: 14 },
  amountValue: { color: '#12783D', fontSize: 32, fontWeight: 'bold', marginTop: 4 },

  section: { padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  
  optionCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 1 },
  selectedOption: { borderWidth: 1, borderColor: '#12783D', backgroundColor: '#F0FDF4' },
  
  row: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  optionTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  optionSub: { fontSize: 12, color: '#888' },
  
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
  radioActive: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#12783D' },

  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: '#fff', elevation: 10 },
  payButton: { backgroundColor: '#12783D', padding: 16, borderRadius: 8, alignItems: 'center' },
  payBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});



