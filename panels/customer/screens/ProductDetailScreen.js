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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ route, navigation }) {
  // Get product data from navigation params (or fallback mock)
  const { product } = route.params || {};

  // Mock Data if product is undefined (for testing direct screen access)
  const item = product || {
    id: '1',
    name: 'Aashirvaad Superior MP Atta',
    weight: '5 kg',
    price: '₹240',
    mrp: '₹280',
    discount: '14% OFF',
    image: 'https://via.placeholder.com/300',
    details: 'Aashirvaad Superior MP Atta is made using the 4-step advantage process which ensures 100% pure and natural whole wheat atta.',
  };

  const [quantity, setQuantity] = useState(0); // 0 means not in cart

  const handleAddToCart = () => setQuantity(1);
  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0));

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F9F9F9" barStyle="dark-content" />

      {/* --- HEADER (Floating Back Button) --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartIcon}>
           <Ionicons name="cart-outline" size={24} color="#333" />
           {quantity > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{quantity}</Text></View>}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* --- IMAGE CAROUSEL --- */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* --- PRODUCT INFO --- */}
        <View style={styles.infoContainer}>
          <Text style={styles.brandText}>Aashirvaad</Text>
          <Text style={styles.nameText}>{item.name}</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>{item.price}</Text>
            <Text style={styles.mrpText}>{item.mrp}</Text>
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>{item.discount}</Text>
            </View>
          </View>
          
          <Text style={styles.taxText}>(Inclusive of all taxes)</Text>
        </View>

        {/* --- UNIT SELECTION --- */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Unit</Text>
            <View style={styles.unitOptionSelected}>
                <Text style={styles.unitText}>{item.weight}</Text>
                <View style={styles.radioCircleSelected} />
            </View>
            <View style={styles.unitOption}>
                <Text style={styles.unitText}>10 kg</Text>
                <Text style={styles.unitPrice}>₹480</Text>
            </View>
        </View>

        {/* --- PRODUCT DETAILS --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Details</Text>
          <Text style={styles.descriptionText}>{item.details}</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Shelf Life</Text>
            <Text style={styles.detailValue}>3 Months</Text>
          </View>
           <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>FSSAI License</Text>
            <Text style={styles.detailValue}>1001234567890</Text>
          </View>
        </View>

         {/* Spacer for bottom bar */}
         <View style={{ height: 100 }} />
      </ScrollView>

      {/* --- BOTTOM STICKY BAR --- */}
      <View style={styles.bottomBar}>
        {quantity === 0 ? (
          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.stepperContainer}>
             <TouchableOpacity onPress={decrement} style={styles.stepperBtn}>
               <Ionicons name="remove" size={24} color="#12783D" />
             </TouchableOpacity>
             <Text style={styles.stepperValue}>{quantity}</Text>
             <TouchableOpacity onPress={increment} style={styles.stepperBtn}>
               <Ionicons name="add" size={24} color="#12783D" />
             </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { 
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
    flexDirection: 'row', justifyContent: 'space-between', padding: 16,
  },
  backButton: { backgroundColor: '#fff', padding: 8, borderRadius: 20, elevation: 2 },
  cartIcon: { backgroundColor: '#fff', padding: 8, borderRadius: 20, elevation: 2 },
  badge: { position: 'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },

  scrollContent: { paddingTop: 60 },
  imageContainer: { alignItems: 'center', paddingVertical: 20, backgroundColor: '#F9F9F9' },
  image: { width: 200, height: 200, resizeMode: 'contain' },
  dotsContainer: { flexDirection: 'row', marginTop: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc', marginHorizontal: 4 },
  activeDot: { backgroundColor: '#12783D' },

  infoContainer: { padding: 16, borderBottomWidth: 8, borderBottomColor: '#F5F5F5' },
  brandText: { color: '#12783D', fontWeight: '600', fontSize: 14, marginBottom: 4 },
  nameText: { fontSize: 20, fontWeight: 'bold', color: '#222', marginBottom: 8 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  priceText: { fontSize: 22, fontWeight: 'bold', color: '#222', marginRight: 8 },
  mrpText: { fontSize: 16, color: '#888', textDecorationLine: 'line-through', marginRight: 8 },
  discountTag: { backgroundColor: '#E8F5E9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  discountText: { color: '#12783D', fontSize: 12, fontWeight: 'bold' },
  taxText: { color: '#888', fontSize: 12 },

  section: { padding: 16, borderBottomWidth: 8, borderBottomColor: '#F5F5F5' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 12 },
  
  unitOptionSelected: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: '#12783D', backgroundColor: '#F0FDF4',
    padding: 12, borderRadius: 8, marginBottom: 8
  },
  unitOption: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: '#eee', backgroundColor: '#fff',
    padding: 12, borderRadius: 8
  },
  radioCircleSelected: { width: 16, height: 16, borderRadius: 8, borderWidth: 5, borderColor: '#12783D' },
  unitText: { fontWeight: '500', color: '#333' },
  unitPrice: { fontWeight: 'bold', color: '#333' },

  descriptionText: { color: '#555', lineHeight: 20, marginBottom: 16 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  detailLabel: { color: '#666' },
  detailValue: { color: '#333', fontWeight: '500' },

  bottomBar: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    backgroundColor: '#fff', padding: 16, elevation: 10,
    borderTopWidth: 1, borderTopColor: '#eee'
  },
  addButton: { 
    backgroundColor: '#12783D', borderRadius: 8, paddingVertical: 14, 
    alignItems: 'center' 
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  
  stepperContainer: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#12783D',
    paddingVertical: 8, paddingHorizontal: 16
  },
  stepperBtn: { padding: 4 },
  stepperValue: { fontSize: 18, fontWeight: 'bold', color: '#12783D' },
});



