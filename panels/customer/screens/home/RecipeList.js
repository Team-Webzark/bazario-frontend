// panels/customer/components/Home/RecipeList.js

import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RECIPES = [
  { id: '1', name: 'Paneer Curry', time: '25 min', type: 'Veg', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400' },
  { id: '2', name: 'Veg Biryani', time: '40 min', type: 'Veg', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400' },
  { id: '3', name: 'Chicken Pasta', time: '15 min', type: 'Non-veg', image: 'https://images.unsplash.com/photo-1551183053-bf91b1d31162?w=400' },
];

export default function RecipeList() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.recipeCard}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      
      {/* Type Badge (Top Left) */}
      <View style={[styles.badge, item.type === 'Veg' ? styles.vegBadge : styles.nonVegBadge]}>
         <Text style={[styles.badgeText, { color: item.type === 'Veg' ? '#1B5E20' : '#B71C1C' }]}>
            {item.type === 'Veg' ? '●' : '●'}
         </Text>
      </View>

      {/* Bottom Info */}
      <View style={styles.recipeContent}>
          <Text style={styles.recipeName} numberOfLines={1}>{item.name}</Text>
          <View style={styles.metaRow}>
             <Ionicons name="time-outline" size={12} color="#666" />
             <Text style={styles.recipeTime}>{item.time}</Text>
          </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
        <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>Cook something new</Text>
            <TouchableOpacity onPress={() => navigation.navigate('RecipesTab')}>
                <Text style={styles.seeAll}>See all ›</Text>
            </TouchableOpacity>
        </View>
        <FlatList 
            data={RECIPES}
            horizontal
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1F2937' },
  seeAll: { fontSize: 14, fontWeight: '600', color: '#12783D' },
  horizontalList: { paddingRight: 20 },
  
  recipeCard: { 
      width: 160, borderRadius: 16, marginRight: 12, marginBottom:22,
      backgroundColor: '#fff', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4,
      overflow: 'hidden'
  },
  recipeImage: { width: '100%', height: 110, resizeMode: 'cover' },
  
  badge: { 
      position: 'absolute', top: 8, left: 8, 
      width: 16, height: 16, borderRadius: 4, backgroundColor: '#fff',
      justifyContent: 'center', alignItems: 'center', borderWidth: 1
  },
  vegBadge: { borderColor: '#2E7D32' },
  nonVegBadge: { borderColor: '#C62828' },
  badgeText: { fontSize: 10, fontWeight: '900', marginTop: -2 },

  recipeContent: { padding: 10 },
  recipeName: { color: '#1F2937', fontWeight: '700', fontSize: 14, marginBottom: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  recipeTime: { color: '#6B7280', fontSize: 12, fontWeight: '500' },
});
