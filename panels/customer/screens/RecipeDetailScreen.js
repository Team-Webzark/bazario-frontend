// panels/customer/screens/RecipeDetailScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Linking
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const IMG_HEIGHT = height * 0.45;

export default function RecipeDetailScreen({ navigation, route }) {
  const { recipe } = route.params || { 
      recipe: { 
          name: 'Masala Poha', 
          image: 'https://via.placeholder.com/400', 
          time: '15 min', 
          type: 'Veg',
          calories: '250 Cal',
          videoUrl: 'https://www.youtube.com/watch?v=example' 
      } 
  };

  const [ingredients, setIngredients] = useState([
    { id: '1', name: 'Poha (Medium)', qty: '500g', price: 45, selected: true },
    { id: '2', name: 'Onion', qty: '1 kg', price: 30, selected: true },
    { id: '3', name: 'Raw Peanuts', qty: '250g', price: 60, selected: false },
    { id: '4', name: 'Green Chillies', qty: '100g', price: 10, selected: true },
    { id: '5', name: 'Mustard Seeds', qty: '50g', price: 5, selected: false },
  ]);

  const steps = [
    "Wash poha in a strainer and keep aside.",
    "Heat oil in a pan, crackle mustard seeds & roast peanuts.",
    "Sauté onions and chillies until soft.",
    "Add turmeric, salt and mixed poha. Steam for 2 mins."
  ];

  const toggleIngredient = (id) => {
    setIngredients(prev => prev.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const selectedItems = ingredients.filter(i => i.selected);
  const totalPrice = selectedItems.reduce((sum, i) => sum + i.price, 0);

  const openVideo = () => {
    if (recipe.videoUrl) Linking.openURL(recipe.videoUrl);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* 1. Fixed Background Image */}
      <Image source={{ uri: recipe.image }} style={styles.fixedImage} />
      <View style={styles.imageOverlay} />

      {/* 2. Floating Back Button (Always Visible) */}
      <SafeAreaView style={styles.topBar} edges={['top']}>
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
         </TouchableOpacity>
      </SafeAreaView>

      {/* 3. Scrollable Content */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Transparent Spacer for Image Visibility */}
        <View style={{ height: IMG_HEIGHT - 40 }} />

        {/* White Sheet Starts Here */}
        <View style={styles.sheet}>
            
            {/* Header Info */}
            <View style={styles.headerInfo}>
               <Text style={styles.title}>{recipe.name}</Text>
               <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                     <Ionicons name="time-outline" size={16} color="#666" />
                     <Text style={styles.metaText}>{recipe.time}</Text>
                  </View>
                  <View style={styles.metaItem}>
                     <Ionicons name="flame-outline" size={16} color="#666" />
                     <Text style={styles.metaText}>{recipe.calories}</Text>
                  </View>
                  <View style={styles.metaItem}>
                     <Ionicons name="leaf" size={16} color="#12783D" />
                     <Text style={[styles.metaText, { color: '#12783D' }]}>{recipe.type}</Text>
                  </View>
               </View>
            </View>

            <View style={styles.divider} />

            {/* Ingredients */}
            <View style={styles.section}>
               <Text style={styles.sectionTitle}>Ingredients</Text>
               <Text style={styles.sectionSub}>Select items to buy</Text>
               
               <View style={styles.ingList}>
                  {ingredients.map((item) => (
                     <TouchableOpacity 
                        key={item.id} 
                        style={[styles.ingRow, item.selected && styles.ingRowSelected]}
                        onPress={() => toggleIngredient(item.id)}
                        activeOpacity={0.7}
                     >
                        <View style={styles.ingInfo}>
                           <Text style={styles.ingName}>{item.name}</Text>
                           <Text style={styles.ingQty}>{item.qty}</Text>
                        </View>
                        <View style={styles.ingRight}>
                           <Text style={styles.ingPrice}>₹{item.price}</Text>
                           <View style={[styles.checkbox, item.selected ? styles.checkboxActive : styles.checkboxInactive]}>
                              {item.selected && <Ionicons name="checkmark" size={14} color="#fff" />}
                           </View>
                        </View>
                     </TouchableOpacity>
                  ))}
               </View>
            </View>

            {/* Steps */}
            <View style={styles.section}>
               <Text style={styles.sectionTitle}>Instructions</Text>
               {steps.map((step, index) => (
                  <View key={index} style={styles.stepRow}>
                     <View style={styles.stepNum}><Text style={styles.stepNumText}>{index + 1}</Text></View>
                     <Text style={styles.stepText}>{step}</Text>
                  </View>
               ))}
            </View>

            {/* YouTube Video Link */}
            <TouchableOpacity style={styles.videoCard} onPress={openVideo}>
               <Image 
                 source={{ uri: recipe.image }} // Using recipe image as thumbnail
                 style={styles.videoThumb} 
                 blurRadius={2} // Slight blur for effect
               />
               <View style={styles.videoOverlay}>
                  <View style={styles.playBtn}>
                     <Ionicons name="play" size={24} color="#fff" style={{ marginLeft: 4 }} />
                  </View>
                  <Text style={styles.videoText}>Watch Recipe Video</Text>
               </View>
            </TouchableOpacity>

            <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* 4. Sticky Footer */}
      <View style={styles.footer}>
         <View>
            <Text style={styles.totalLabel}>Total Cost</Text>
            <Text style={styles.totalValue}>₹{totalPrice}</Text>
         </View>
         <TouchableOpacity style={styles.addToCartBtn} onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.btnText}>Add {selectedItems.length} Items</Text>
            <Ionicons name="basket" size={20} color="#fff" style={{ marginLeft: 8 }} />
         </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  // 1. Fixed Image
  fixedImage: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: IMG_HEIGHT, width: width,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: IMG_HEIGHT, backgroundColor: 'rgba(0,0,0,0.3)'
  },

  // 2. Top Bar
  topBar: { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: 20, zIndex: 10 },
  backBtn: { 
    width: 40, height: 40, borderRadius: 20, 
    backgroundColor: 'rgba(0,0,0,0.4)', 
    justifyContent: 'center', alignItems: 'center', marginTop: 10
  },

  // 3. Scrollable Sheet
  scrollContent: { flexGrow: 1 },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30, borderTopRightRadius: 30,
    padding: 24,
    minHeight: height * 0.6, // Ensure it covers enough space
  },

  // Header Info
  headerInfo: { marginBottom: 16 },
  title: { fontSize: 26, fontWeight: '800', color: '#1F2937', marginBottom: 12 },
  metaRow: { flexDirection: 'row', gap: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 14, fontWeight: '600', color: '#666' },

  divider: { height: 1, backgroundColor: '#F3F4F6', marginBottom: 24 },

  // Sections
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 4 },
  sectionSub: { fontSize: 13, color: '#9CA3AF', marginBottom: 16 },

  // Ingredients
  ingList: { gap: 12 },
  ingRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB',
    backgroundColor: '#fff'
  },
  ingRowSelected: { backgroundColor: '#F0FDF4', borderColor: '#DCFCE7' },
  ingInfo: { flex: 1 },
  ingName: { fontSize: 15, fontWeight: '600', color: '#374151' },
  ingQty: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  ingRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  ingPrice: { fontSize: 14, fontWeight: '700', color: '#111827' },
  
  checkbox: { width: 22, height: 22, borderRadius: 6, justifyContent: 'center', alignItems: 'center', borderWidth: 1.5 },
  checkboxActive: { backgroundColor: '#12783D', borderColor: '#12783D' },
  checkboxInactive: { borderColor: '#D1D5DB' },

  // Steps
  stepRow: { flexDirection: 'row', marginBottom: 20 },
  stepNum: { 
    width: 24, height: 24, borderRadius: 12, backgroundColor: '#FEF3C7', 
    justifyContent: 'center', alignItems: 'center', marginRight: 12 
  },
  stepNumText: { fontSize: 12, fontWeight: 'bold', color: '#D97706' },
  stepText: { flex: 1, fontSize: 15, color: '#4B5563', lineHeight: 22 },

  // Video Card
  videoCard: {
    height: 180, borderRadius: 16, overflow: 'hidden',
    backgroundColor: '#000', marginBottom: 20, position: 'relative',
    justifyContent: 'center', alignItems: 'center'
  },
  videoThumb: { width: '100%', height: '100%', opacity: 0.7 },
  videoOverlay: { position: 'absolute', alignItems: 'center' },
  playBtn: { 
    width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,0,0,0.9)', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 8 
  },
  videoText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  // 4. Footer
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff', padding: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderTopWidth: 1, borderTopColor: '#F3F4F6', elevation: 20
  },
  totalLabel: { fontSize: 12, color: '#6B7280' },
  totalValue: { fontSize: 22, fontWeight: '800', color: '#111827' },
  addToCartBtn: {
    backgroundColor: '#12783D', flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 24, borderRadius: 16,
    shadowColor: '#12783D', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, elevation: 6
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
