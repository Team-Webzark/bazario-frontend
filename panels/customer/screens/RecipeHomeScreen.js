// panels/customer/screens/RecipeHomeScreen.js

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  Dimensions,
  ScrollView,
  Animated
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

// --- COLORS ---
const COLORS = {
    primary: '#12783D', // Green (Recipe Mode)
    primaryLight: '#E8F5E9',
    accent: '#FF7043',  // Orange (Ingredient Mode)
    accentLight: '#FFF3E0',
    text: '#1F2937',
    bg: '#FFF8E1',
    white: '#fff'
};

// Mock Data
const RECIPES = [
  { id: '1', name: 'Spicy Paneer Curry', time: '20 min', type: 'Veg', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', height: hp('35%') },
  { id: '2', name: 'Chicken Grill', time: '45 min', type: 'Non-veg', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400', height: hp('25%') },
  { id: '3', name: 'Suji Halwa', time: '15 min', type: 'Veg', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', height: hp('25%') },
  { id: '4', name: 'Egg Curry', time: '30 min', type: 'Non-veg', image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400', height: hp('35%') },
];

const FILTERS = ['Under 15 min', 'Budget-friendly', 'Healthy', 'Kids Special'];
const INGREDIENT_CHIPS = ['Suji', 'Paneer', 'Aloo', 'Besan'];
const RECIPE_CHIPS = ['Pizza', 'Pasta', 'Biryani', 'Burger'];

export default function RecipeHomeScreen({ navigation }) {
  const [searchMode, setSearchMode] = useState('ingredient'); // 'ingredient' | 'recipe'
  const [activeFilter, setActiveFilter] = useState('Under 15 min');
  const [query, setQuery] = useState('');

  // Animation
  const toggleAnim = useRef(new Animated.Value(0)).current;

  const toggleSearchMode = () => {
    const newMode = searchMode === 'ingredient' ? 'recipe' : 'ingredient';
    setSearchMode(newMode);
    setQuery('');
    
    Animated.spring(toggleAnim, {
      toValue: newMode === 'recipe' ? 1 : 0,
      useNativeDriver: true,
    }).start();
  };

  const isRecipeMode = searchMode === 'recipe';
  const activeColor = isRecipeMode ? COLORS.primary : COLORS.accent;
  const activeBg = isRecipeMode ? COLORS.primaryLight : COLORS.accentLight;

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { height: item.height }]}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={[styles.typeBadge, item.type === 'Veg' ? styles.bgGreen : styles.bgRed]}>
         <Text style={styles.typeText}>{item.type}</Text>
      </View>
      <View style={styles.overlay}>
         <Text style={styles.recipeName} numberOfLines={2}>{item.name}</Text>
         <Text style={styles.cookTime}>Cook time: {item.time}</Text>
         <TouchableOpacity style={styles.viewBtn}>
            <Text style={styles.viewBtnText}>View recipe</Text>
         </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={COLORS.bg} barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Recipes</Text>
        
        {/* Toggle Switch */}
        <TouchableOpacity 
            style={styles.toggleContainer} 
            onPress={toggleSearchMode}
            activeOpacity={0.9}
        >
            <Animated.View style={[
                styles.toggleThumb, 
                { 
                    borderColor: activeColor,
                    backgroundColor: activeBg,
                    transform: [{ 
                        translateX: toggleAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [2, 34] 
                        }) 
                    }] 
                }
            ]} />
            <View style={styles.iconWrapper}>
                <Ionicons name="basket" size={16} color={!isRecipeMode ? COLORS.accent : '#9CA3AF'} />
            </View>
            <View style={styles.iconWrapper}>
                <Ionicons name="fast-food" size={16} color={isRecipeMode ? COLORS.primary : '#9CA3AF'} />
            </View>
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: hp('2%') }}
      >
        {/* Dynamic Search Section */}
        <View style={styles.magicSearchSection}>
            <View style={styles.labelRow}>
                <Text style={styles.magicLabel}>
                    {isRecipeMode ? "Craving something specific?" : "What's in your kitchen?"}
                </Text>
                <View style={[styles.modeBadge, { backgroundColor: activeBg }]}>
                    <Text style={[styles.modeText, { color: activeColor }]}>
                        {isRecipeMode ? 'Dish Name' : 'Ingredient'}
                    </Text>
                </View>
            </View>

            <View style={[styles.magicInputContainer, { borderColor: '#F3F4F6' }]}>
                <Ionicons 
                    name={isRecipeMode ? "search-outline" : "basket-outline"} 
                    size={20} 
                    color={activeColor} 
                />
                <TextInput 
                    placeholder={isRecipeMode ? "e.g. Shahi Paneer..." : "e.g. Suji, Aloo..."}
                    style={styles.magicInput} 
                    placeholderTextColor="#9CA3AF"
                    value={query}
                    onChangeText={setQuery}
                />
                <TouchableOpacity style={[styles.arrowBtn, { backgroundColor: activeColor }]}>
                    <Ionicons name="arrow-forward" size={18} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Chips */}
            <View style={styles.chipRow}>
                {(isRecipeMode ? RECIPE_CHIPS : INGREDIENT_CHIPS).map(item => (
                    <TouchableOpacity key={item} onPress={() => setQuery(item)}>
                        <Text style={[styles.quickChip, { color: activeColor, backgroundColor: activeBg }]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        {/* Filters */}
        <View style={styles.filterContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: wp('4%') }}>
                {FILTERS.map((filter) => (
                <TouchableOpacity 
                    key={filter}
                    style={[styles.filterPill, activeFilter === filter && styles.activePill]}
                    onPress={() => setActiveFilter(filter)}
                >
                    <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>
                        {filter}
                    </Text>
                </TouchableOpacity>
                ))}
            </ScrollView>
        </View>

        {/* Grid */}
        <FlatList
            data={RECIPES}
            renderItem={renderRecipeCard}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContent}
            scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  
  header: { 
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      paddingHorizontal: wp('4%'), marginTop: hp('1.5%'), marginBottom: hp('2.5%')
  },
  headerTitle: { fontSize: hp('3.2%'), fontWeight: '800', color: COLORS.text },
  
  // Toggle
  toggleContainer: {
      width: 64, height: 32, backgroundColor: '#fff', borderRadius: 20,
      flexDirection: 'row', alignItems: 'center', padding: 2,
      borderWidth: 1, borderColor: '#E5E7EB'
  },
  toggleThumb: {
      position: 'absolute', left: 2,
      width: 26, height: 26, borderRadius: 13,
      borderWidth: 1,
      shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, elevation: 2
  },
  iconWrapper: { flex: 1, alignItems: 'center', zIndex: 10 },

  // Search Section
  magicSearchSection: {
      marginHorizontal: wp('4%'),
      backgroundColor: '#fff', borderRadius: 20, padding: 16,
      elevation: 3, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10
  },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  magicLabel: { fontSize: hp('1.8%'), fontWeight: '700', color: COLORS.text },
  modeBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  modeText: { fontSize: 10, fontWeight: '700' },

  magicInputContainer: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: '#F9FAFB', borderRadius: 12,
      paddingHorizontal: 12, height: hp('6%'), marginBottom: 12,
      borderWidth: 1
  },
  magicInput: { flex: 1, marginLeft: 8, fontSize: hp('1.8%'), color: '#333' },
  arrowBtn: {
      width: 32, height: 32, borderRadius: 10,
      justifyContent: 'center', alignItems: 'center'
  },
  chipRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  quickChip: {
      fontSize: 12, fontWeight: '600',
      paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8
  },

  // Filters
  filterContainer: { marginVertical: hp('2%') },
  filterPill: {
      paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
      backgroundColor: '#fff', marginRight: 8,
      borderWidth: 1, borderColor: 'transparent'
  },
  activePill: { backgroundColor: COLORS.accent, elevation: 2 },
  filterText: { fontSize: hp('1.6%'), color: '#4B5563', fontWeight: '600' },
  activeFilterText: { color: '#fff' },

  // Grid
  listContent: { paddingHorizontal: wp('4%') },
  columnWrapper: { justifyContent: 'space-between' },
  card: {
      width: wp('44%'), borderRadius: 20, marginBottom: hp('2%'),
      overflow: 'hidden', backgroundColor: '#000', position: 'relative', elevation: 4
  },
  image: { width: '100%', height: '100%', resizeMode: 'cover', opacity: 0.85 },
  typeBadge: {
      position: 'absolute', top: 12, left: 12, paddingHorizontal: 8, paddingVertical: 4,
      borderRadius: 8, zIndex: 2
  },
  bgGreen: { backgroundColor: '#4ADE80' },
  bgRed: { backgroundColor: '#EF4444' },
  typeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  overlay: {
      position: 'absolute', bottom: 0, left: 0, right: 0,
      padding: 12, backgroundColor: 'rgba(0,0,0,0.4)', paddingBottom: 16
  },
  recipeName: {
      color: '#fff', fontSize: hp('2%'), fontWeight: '800', marginBottom: 4
  },
  cookTime: { color: '#E5E7EB', fontSize: hp('1.4%'), marginBottom: 10 },
  viewBtn: {
      backgroundColor: COLORS.accent, paddingVertical: 6, paddingHorizontal: 12,
      borderRadius: 12, alignSelf: 'flex-start'
  },
  viewBtnText: { color: '#fff', fontSize: 10, fontWeight: '700' },
});
