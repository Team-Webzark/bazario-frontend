import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params || { recipe: { name: 'Recipe', image: 'https://via.placeholder.com/150' } };

  // Mock Ingredients Logic
  const [servings, setServings] = useState(2);
  const [ingredients, setIngredients] = useState([
    { id: '1', name: 'Poha (Flattened Rice)', baseQty: 100, unit: 'g', price: 40, selected: true },
    { id: '2', name: 'Peanuts', baseQty: 50, unit: 'g', price: 20, selected: true },
    { id: '3', name: 'Onion', baseQty: 1, unit: 'pc', price: 10, selected: true },
    { id: '4', name: 'Mustard Seeds', baseQty: 1, unit: 'tsp', price: 5, selected: false }, // Assume user has this
  ]);

  const toggleIngredient = (id) => {
    setIngredients(prev => prev.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const selectedCount = ingredients.filter(i => i.selected).length;
  const totalPrice = ingredients
    .filter(i => i.selected)
    .reduce((sum, i) => sum + i.price, 0);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      
      {/* Hero Image Header */}
      <View style={styles.imageHeader}>
         <Image source={{ uri: recipe.image }} style={styles.heroImage} />
         <View style={styles.overlay} />
         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
         </TouchableOpacity>
         <View style={styles.headerContent}>
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <View style={styles.badges}>
               <View style={styles.badge}><Text style={styles.badgeText}>15 min</Text></View>
               <View style={styles.badge}><Text style={styles.badgeText}>Easy</Text></View>
            </View>
         </View>
      </View>

      <ScrollView style={styles.scrollContent}>
        
        {/* Servings Control */}
        <View style={styles.section}>
           <View style={styles.servingRow}>
              <Text style={styles.sectionTitle}>Ingredients for</Text>
              <View style={styles.stepper}>
                 <TouchableOpacity onPress={() => setServings(Math.max(1, servings - 1))}>
                    <Ionicons name="remove-circle-outline" size={28} color="#12783D" />
                 </TouchableOpacity>
                 <Text style={styles.servingCount}>{servings} People</Text>
                 <TouchableOpacity onPress={() => setServings(servings + 1)}>
                    <Ionicons name="add-circle-outline" size={28} color="#12783D" />
                 </TouchableOpacity>
              </View>
           </View>
           <Text style={styles.subText}>Uncheck items you already have at home.</Text>
        </View>

        {/* Ingredients List */}
        <View style={styles.ingredientsList}>
           {ingredients.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.ingredientRow, item.selected && styles.selectedRow]}
                onPress={() => toggleIngredient(item.id)}
              >
                 <Ionicons 
                    name={item.selected ? "checkbox" : "square-outline"} 
                    size={24} 
                    color={item.selected ? "#12783D" : "#999"} 
                 />
                 <View style={styles.ingInfo}>
                    <Text style={[styles.ingName, item.selected && styles.boldText]}>
                       {item.name}
                    </Text>
                    <Text style={styles.ingQty}>
                       {item.baseQty * (servings/2)} {item.unit}
                    </Text>
                 </View>
                 <Text style={styles.ingPrice}>₹{item.price}</Text>
              </TouchableOpacity>
           ))}
        </View>

        {/* Instructions Placeholder */}
        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Instructions</Text>
           <Text style={styles.instructionText}>
              1. Rinse the poha in a colander...{'\n'}
              2. Heat oil in a pan...{'\n'}
              3. Add mustard seeds and peanuts...
           </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky 'Add to Cart' Footer */}
      <View style={styles.footer}>
         <View>
            <Text style={styles.totalLabel}>{selectedCount} items selected</Text>
            <Text style={styles.totalPrice}>₹{totalPrice}</Text>
         </View>
         <TouchableOpacity 
            style={styles.addToCartBtn}
            onPress={() => navigation.navigate('Cart')}
         >
            <Text style={styles.btnText}>Add Ingredients</Text>
            <Ionicons name="cart" size={20} color="#fff" style={{ marginLeft: 8 }} />
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  
  // Image Header
  imageHeader: { height: 250, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  backBtn: { position: 'absolute', top: 40, left: 20, padding: 8, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20 },
  headerContent: { position: 'absolute', bottom: 20, left: 20 },
  recipeName: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  badges: { flexDirection: 'row' },
  badge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginRight: 8 },
  badgeText: { color: '#fff', fontWeight: '600' },

  scrollContent: { flex: 1 },
  section: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  
  // Servings
  servingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  stepper: { flexDirection: 'row', alignItems: 'center' },
  servingCount: { fontSize: 16, fontWeight: 'bold', color: '#333', marginHorizontal: 12 },
  subText: { color: '#888', fontSize: 13 },

  // Ingredients
  ingredientsList: { padding: 20 },
  ingredientRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f9f9f9' },
  selectedRow: { backgroundColor: '#F0FDF4', marginHorizontal: -20, paddingHorizontal: 20 }, // Highlight effect
  ingInfo: { flex: 1, marginLeft: 12 },
  ingName: { fontSize: 16, color: '#555' },
  boldText: { fontWeight: 'bold', color: '#333' },
  ingQty: { fontSize: 12, color: '#888' },
  ingPrice: { fontWeight: 'bold', color: '#333' },

  instructionText: { lineHeight: 24, color: '#555', marginTop: 8 },

  // Footer
  footer: { position: 'absolute', bottom: 0, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff', elevation: 20, borderTopWidth: 1, borderTopColor: '#eee' },
  totalLabel: { color: '#888', fontSize: 12 },
  totalPrice: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  addToCartBtn: { flexDirection: 'row', backgroundColor: '#12783D', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});



